import { Status } from "../enum/status";
import Projects from "../classes/base/Projects";
import State from "../interfaces/state";
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return (this.instance = new ProjectState());
    }
    addProject(title, description, people) {
        const newProject = new Projects(Math.random().toString(), title, description, people, Status.ACTIVE);
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn([...this.projects]);
        }
    }
}
export default ProjectState.getInstance();
//# sourceMappingURL=State.js.map