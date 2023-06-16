export default class Component {
    constructor(templateID, hostElementId, insertLocation, newElementId) {
        this.hostElement = document.getElementById(hostElementId);
        this.templateElement = (document.getElementById(templateID));
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(insertLocation);
    }
    attach(insert) {
        this.hostElement.insertAdjacentElement(insert ? "afterbegin" : "beforeend", this.element);
    }
}
//# sourceMappingURL=Component.js.map