namespace App {
  export class State<T> {
    protected listeners: Listener<T>[] = [];
    addListeners(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }
}
