import autobind from "../decorators/autobind";

import { Dragable, DragTarget } from "../interfaces/drag-drop";
import Component from "../classes/base/Component";
import Projects from "../classes/base/Projects";

export default class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Dragable
{
  private project: Projects;
  get persons() {
    return this.project.people === 1
      ? "1 person"
      : `${this.project.people} persons assigned`;
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
    e.dataTransfer!.setData("text/plain", this.project.id);
    e.dataTransfer!.effectAllowed = "move";
  }
  @autobind
  dragEndHandler(e: DragEvent): void {
  }
}
