/* --------------------------------- Imports -------------------------------- */
// import ProjectList from "./projectList";
// import {autobind} from "./decorators/autobind";
// import validate from "./helpers/validate";

/* ------------------------------- Decorators ------------------------------- */
// Auto Bind decorator
function autobind(_: any, _2: string, descriptor: PropertyDescriptor): any {
  const originalMethod = descriptor.value;
  /** Do not change the value of the method */
  const newDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFxn = originalMethod.bind(this);
      return boundFxn;
    },
  };
  return newDescriptor;
}
/* ---------------------------------- Enum ---------------------------------- */
enum Status {
  FINISHED,
  ACTIVE,
}
/* ----------------------------- Function types ----------------------------- */
type Listener<T> = (item: T[]) => void;

/* ------------------------------- Interfaces ------------------------------- */
interface Validation {
  value: string | number;
  required?: boolean;
  minLenght?: number;
  maxLenght?: number;
  min?: number;
  max?: number;
}

//Drag and drop interface
interface Dragable {
  dragStartHandler(e: DragEvent): void;
  dragEndHandler(e: DragEvent): void;
}
interface DragTarget {
  dragOverHandeler(e: DragEvent): void;
  dropHandeler(e: DragEvent): void;
  dragLeaveHandeler(e: DragEvent): void;
}

/* -------------------------------- Functions ------------------------------- */
function validate(validatable: Validation): boolean {
  let isValidate = true;
  if (validatable.required) {
    isValidate = isValidate && validatable.value.toString().trim().length !== 0;
  }
  if (validatable.minLenght != null && typeof validatable.value == "string") {
    isValidate =
      isValidate && validatable.value.trim().length >= validatable.minLenght;
  }
  if (validatable.maxLenght != null && typeof validatable.value == "string") {
    isValidate =
      isValidate && validatable.value.trim().length <= validatable.maxLenght;
  }
  if (validatable.min != null && typeof validatable.value == "number") {
    isValidate = isValidate && validatable.value > validatable.min;
  }
  if (validatable.max != null && typeof validatable.value == "number") {
    isValidate = isValidate && validatable.value < validatable.max;
  }
  return isValidate;
}

/* --------------------------------- Base  Classes -------------------------------- */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateID: string,
    hostElementId: string,
    insertLocation: boolean,
    newElementId?: string
  ) {
    this.hostElement = <T>document.getElementById(hostElementId);
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateID)!
    );
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <U>importedNode.firstElementChild;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertLocation);
  }
  private attach(insert: boolean) {
    this.hostElement.insertAdjacentElement(
      insert ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  abstract render(): void;
}
class State<T> {
  protected listeners: Listener<T>[] = [];
  addListeners(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}
/* --------------------------------- Classes -------------------------------- */
class Projects {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: Status
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.people = people;
    this.status = status;
  }
}

class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragable
{
  private project: Projects;
  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} + persons assigned`;
  }
  constructor(hostId: string, project: Projects) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.render();
  }
  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }
  render(): void {
    this.element.draggable = true;
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons;
    this.element.querySelector("p")!.textContent = this.project.description;
  }
  @autobind
  dragStartHandler(e: DragEvent): void {
    e.dataTransfer!.setData('text/plain', this.project.id)
    e.dataTransfer!.effectAllowed= "move"
  }
  @autobind
  dragEndHandler(e: DragEvent): void {
    console.log(e);
  }
}
//Project State Management
class ProjectState extends State<Projects> {
  private projects: Projects[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ProjectState());
  }
  addProject(title: string, description: string, people: number) {
    const newProject: Projects = new Projects(
      Math.random().toString(),
      title,
      description,
      people,
      Status.ACTIVE
    );

    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects]);
    }
  }
}

class ProjectList
  extends Component<HTMLDListElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Projects[];
  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);
    this.assignedProjects = [];
    projectState.addListeners((projects: Projects[]) => {
      const relevantProjects = projects.filter((proj) => {
        if (this.type == "active") {
          return proj.status === Status.ACTIVE;
        }
        return proj.status === Status.FINISHED;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
    this.configure();
    this.render();
  }
  private renderProjects() {
    const listId = document.getElementById(`${this.type}-project-list`)!;
    listId.innerHTML = "";
    for (const proj of this.assignedProjects) {
      new ProjectItem(listId.id, proj);
    }
  }
  configure() {
    this.element.addEventListener("dragover", this.dragLeaveHandeler);
    this.element.addEventListener("dragleave", this.dragOverHandeler);
    this.element.addEventListener("drop", this.dropHandeler);
  }
  render() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = `${listId}`;
    this.element.querySelector("h2")!.textContent =
      `${this.type} Projects`.toUpperCase();
  }
  @autobind
  dragOverHandeler(e: DragEvent): void {

    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppabble");
  }
  @autobind
  dropHandeler(e: DragEvent): void {}
  @autobind
  dragLeaveHandeler(e: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.add("droppabble");
  }
}

class ProjectInput extends Component<HTMLDListElement, HTMLElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {
    super("project-input", "app", false, "user-input");
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.configure();
  }
  private gatherUserInput(): [string, string, number] | void {
    const title = this.titleInputElement.value;
    const description = this.descriptionInputElement.value;
    const people = this.peopleInputElement.value;
    const titleValidate: Boolean = validate({ value: title, required: true });
    const descriptionValidate: Boolean = validate({
      value: description,
      required: true,
    });
    const peopleValidate: Boolean = validate({
      value: people,
      required: true,
      min: 1,
      max: 12,
    });
    if (!titleValidate || !descriptionValidate || !peopleValidate) {
      alert("Invalid input. Please fill all fields");
      return;
    } else {
      return [title, description, parseFloat(people)];
    }
  }

  private clearInputs(): void {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
    return;
  }
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);
      this.clearInputs();
    }
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  render() {}
}

/* ---------------------------------- Inits --------------------------------- */

let projectState = ProjectState.getInstance();
let p = new ProjectInput();
let activeProjectList = new ProjectList("active");
let finishedProjectList = new ProjectList("finished");
