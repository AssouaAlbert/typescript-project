/* --------------------------------- Imports ------------------------------- */

import _ from "lodash";
import ProjectInput from "./components/ProjectInput";
import ProjectList from "./components/ProjectList";

/* ---------------------------------- Inits --------------------------------- */
new ProjectInput();
new ProjectList("active");
new ProjectList("finished");
