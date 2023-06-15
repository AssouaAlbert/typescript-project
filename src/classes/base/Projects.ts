/* --------------------------------- Imports (Not mandatory if they share same namespace)-------------------------------- */

/// <reference path="./Component.ts"/>
/// <reference path="../../interfaces/drag-drop.ts"/>
/// <reference path="../../interfaces//validation.ts"/>
/// <reference path="../../decorators/autobind.ts"/>
/// <reference path="../../enum/status.ts"/>
/// <reference path="../../helpers/validate.ts"/>

namespace App {
  export class Projects {
    constructor(
      public id: string,
      public title: string,
      public description: string,
      public people: number,
      public status: Status
    ) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.people = people;
      this.status = status;
    }
  }
}
