namespace App {
  export abstract class Component<
    T extends HTMLElement,
    U extends HTMLElement
  > {
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
}
