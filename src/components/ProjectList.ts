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

/// <reference path="../components/ProjectInput.ts"/>
/// <reference path="../components/ProjectItem.ts"/>
namespace App {
  export class ProjectList
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
  //   export let p = (() => new ProjectInput())();
//   export let activeProjectList = new ProjectList("active");
//   export let finishedProjectList = new ProjectList("finished");
}
