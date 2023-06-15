import { Status } from "../enum/status.js";
import Projects from "../classes/base/Projects.js";
import State from "../interfaces/state.js";

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
export default ProjectState.getInstance();
