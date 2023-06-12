class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  constructor(private type: "active" | "finished") {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-list")
    );
    this.hostElement = <HTMLDivElement>document.getElementById("app");
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = <HTMLElement>importedNode.firstChild;
    this.element.id = `${this.type}-project`;
    this.attach();
    this.render();
  }
  private configure() {
    // this.element.addEventListener("submit", this.submitHandler);
  }

  private render() {
    const listId = `${this.type}-project-list`;
    this.element.querySelector("ul")!.id = `${listId}`
    this.element.querySelector("h2")!.textContent = `${this.type} Projects`.toUpperCase();


  }
  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

export default ProjectList
