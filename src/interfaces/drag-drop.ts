namespace App {
  export interface Dragable {
    dragStartHandler(e: DragEvent): void;
    dragEndHandler(e: DragEvent): void;
  }
  export interface DragTarget {
    dragOverHandeler(e: DragEvent): void;
    dropHandeler(e: DragEvent): void;
    dragLeaveHandeler(e: DragEvent): void;
  }
}
