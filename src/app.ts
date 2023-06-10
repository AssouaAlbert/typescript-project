//Auto Bind decorator
function autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (e: Event) {
    e.preventDefault()
    const result = originalMethod.bind(_);
    console.log("🚀 ~ file: app.ts:11 ~ _:", _)
    // console.log("🚀 ~ file: app.ts:11 ~ result:", this)
    return result;
  };
  return descriptor;
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
  @autobind
  private submitHandler(e: Event) {
    e.preventDefault();
    console.log(this.titleInputElement.value)
  }

  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  private attach() {
    // Specify the position of the newly copied/imported node
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}
let p = new ProjectInput();
console.log("🚀 ~ file: app.ts:64 ~ p:", p)
