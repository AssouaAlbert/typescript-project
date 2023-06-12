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
type Listener = (item: Projects[]) => void;

/* ------------------------------- Interfaces ------------------------------- */
interface Validation {
  value: string | number;
  required?: boolean;
  minLenght?: number;
  maxLenght?: number;
  min?: number;
  max?: number;
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
//Project State Management
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Projects[] = [];
  private static instance: ProjectState;
  private constructor() {}

  static getInstance(): ProjectState {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new ProjectState());
  }
  addListeners(listenerFn: Listener) {
    this.listeners.push(listenerFn);
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

class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Projects[];
  constructor(private type: "active" | "finished") {
    this.assignedProjects = [];
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-list")
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <HTMLElement>importedNode.querySelector("section");
    this.element.id = `${this.type}-projects`;
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
    this.attach();
    this.render();
  }
  private renderProjects() {
    const listId = document.getElementById(`${this.type}-project-list`)!;
    listId.innerHTML = "";
    for (const proj of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = proj.title;
      listId?.insertAdjacentElement("beforeend", listItem);
    }
  }
  private configure() {
    // this.element.addEventListener("submit", this.submitHandler);
  }

  private render() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = `${listId}`;
    this.element.querySelector("h2")!.textContent =
      `${this.type} Projects`.toUpperCase();
  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;
  constructor() {

    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app")!; //Typescript does not know what element will be returned, so use type casting

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    ); //document.importNode adds a copy of the node to the targeted DOM like document.createElement.
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = "user-input";
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")!
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")!
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")!
    );
    this.attach();
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

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    // Specify the position of the newly copied/imported node
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

/* ---------------------------------- Inits --------------------------------- */

let projectState = ProjectState.getInstance();
let p = new ProjectInput();
let activeProjectList = new ProjectList("active");
let finishedProjectList = new ProjectList("finished");
