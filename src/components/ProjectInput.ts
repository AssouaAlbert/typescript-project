/// <reference path="../enum/status.ts"/>
/// <reference path="../helpers/validate.ts"/>
/// <reference path="../decorators/autobind.ts"/>

/// <reference path="../interfaces/drag-drop.ts"/>
/// <reference path="../interfaces/state.ts"/>
/// <reference path="../interfaces/validation.ts"/>

/// <reference path="../types/listeners.ts"/>

/// <reference path="../state/State.ts"/>

/// <reference path="../classes/base/Component.ts"/>
/// <reference path="../classes/base/Projects.ts"/>

/// <reference path="../components/ProjectItem.ts"/>
/// <reference path="../components/ProjectList.ts"/>

namespace App {
  export class ProjectInput extends Component<HTMLDListElement, HTMLElement> {
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
  
}
