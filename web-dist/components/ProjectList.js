var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Status } from "../enum/status";
import autobind from "../decorators/autobind";
import projectState from "../state/State";
import Component from "../classes/base/Component";
import ProjectItem from "../components/ProjectItem";
export default class ProjectList extends Component {
    constructor(type) {
        super("project-list", "app", false, `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        projectState.addListeners((projects) => {
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
    renderProjects() {
        const listId = document.getElementById(`${this.type}-project-list`);
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
        this.element.querySelector("ul").id = `${listId}`;
        this.element.querySelector("h2").textContent =
            `${this.type} Projects`.toUpperCase();
    }
    dragOverHandeler(e) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.remove("droppabble");
    }
    dropHandeler(e) { }
    dragLeaveHandeler(e) {
        const listEl = this.element.querySelector("ul");
        listEl.classList.add("droppabble");
    }
}
__decorate([
    autobind
], ProjectList.prototype, "dragOverHandeler", null);
__decorate([
    autobind
], ProjectList.prototype, "dropHandeler", null);
__decorate([
    autobind
], ProjectList.prototype, "dragLeaveHandeler", null);
//# sourceMappingURL=ProjectList.js.map