/* --------------------------------- Imports (Not mandatory if they share same namespace)-------------------------------- */

// / <reference path="./enum/status.ts"/>
// / <reference path="./helpers/validate.ts"/>
// / <reference path="./decorators/autobind.ts"/>

// / <reference path="./interfaces/drag-drop.ts"/>
// / <reference path="./interfaces/state.ts"/>
// / <reference path="./interfaces/validation.ts"/>

// / <reference path="./types/listeners.ts"/>

// / <reference path="./state/State.ts"/>

// / <reference path="./classes/base/Component.ts"/>
// / <reference path="./classes/base/Projects.ts"/>

/// <reference path="./components/ProjectInput.ts"/>
/// <reference path="./components/ProjectList.ts"/>

namespace App {
  /* ---------------------------------- Inits --------------------------------- */
  new ProjectInput();
  new ProjectList("active");
  new ProjectList("finished");
}
