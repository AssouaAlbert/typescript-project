(()=>{"use strict";function e(e){let t=!0;return e.required&&(t=t&&0!==e.value.toString().trim().length),null!=e.minLenght&&"string"==typeof e.value&&(t=t&&e.value.trim().length>=e.minLenght),null!=e.maxLenght&&"string"==typeof e.value&&(t=t&&e.value.trim().length<=e.maxLenght),null!=e.min&&"number"==typeof e.value&&(t=t&&e.value>e.min),null!=e.max&&"number"==typeof e.value&&(t=t&&e.value<e.max),t}function t(e,t,n){const r=n.value;return{configurable:!0,get(){return r.bind(this)}}}var n;!function(e){e[e.FINISHED=0]="FINISHED",e[e.ACTIVE=1]="ACTIVE"}(n||(n={}));class r{constructor(e,t,n,r,s){this.id=e,this.title=t,this.description=n,this.people=r,this.status=s,this.id=e,this.title=t,this.description=n,this.people=r,this.status=s}}class s{constructor(){this.listeners=[]}addListeners(e){this.listeners.push(e)}}class i extends s{constructor(){super(),this.projects=[]}static getInstance(){return this.instance?this.instance:this.instance=new i}addProject(e,t,s){const i=new r(Math.random().toString(),e,t,s,n.ACTIVE);this.projects.push(i);for(const e of this.listeners)e([...this.projects])}}const l=i.getInstance();class o{constructor(e,t,n,r){this.hostElement=document.getElementById(t),this.templateElement=document.getElementById(e);const s=document.importNode(this.templateElement.content,!0);this.element=s.firstElementChild,r&&(this.element.id=r),this.attach(n)}attach(e){this.hostElement.insertAdjacentElement(e?"afterbegin":"beforeend",this.element)}}class a extends o{constructor(){super("project-input","app",!1,"user-input"),this.titleInputElement=this.element.querySelector("#title"),this.descriptionInputElement=this.element.querySelector("#description"),this.peopleInputElement=this.element.querySelector("#people"),this.configure()}gatherUserInput(){const t=this.titleInputElement.value,n=this.descriptionInputElement.value,r=this.peopleInputElement.value,s=e({value:t,required:!0}),i=e({value:n,required:!0}),l=e({value:r,required:!0,min:1,max:12});return s&&i&&l?[t,n,parseFloat(r)]:void alert("Invalid input. Please fill all fields")}clearInputs(){this.titleInputElement.value="",this.descriptionInputElement.value="",this.peopleInputElement.value=""}submitHandler(e){e.preventDefault();const t=this.gatherUserInput();if(Array.isArray(t)){const[e,n,r]=t;l.addProject(e,n,r),this.clearInputs()}}configure(){this.element.addEventListener("submit",this.submitHandler)}render(){}}!function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);i>3&&l&&Object.defineProperty(t,n,l)}([t],a.prototype,"submitHandler",null);var c=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class d extends o{get persons(){return 1===this.project.people?"1 person":`${this.project.people} persons assigned`}constructor(e,t){super("single-project",e,!1,t.id),this.project=t,this.configure(),this.render()}configure(){this.element.addEventListener("dragstart",this.dragStartHandler),this.element.addEventListener("dragend",this.dragEndHandler)}render(){this.element.draggable=!0,this.element.querySelector("h2").textContent=this.project.title,this.element.querySelector("h3").textContent=this.persons,this.element.querySelector("p").textContent=this.project.description}dragStartHandler(e){e.dataTransfer.setData("text/plain",this.project.id),e.dataTransfer.effectAllowed="move"}dragEndHandler(e){}}c([t],d.prototype,"dragStartHandler",null),c([t],d.prototype,"dragEndHandler",null);var p=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l};class u extends o{constructor(e){super("project-list","app",!1,`${e}-projects`),this.type=e,this.assignedProjects=[],l.addListeners((e=>{const t=e.filter((e=>"active"==this.type?e.status===n.ACTIVE:e.status===n.FINISHED));this.assignedProjects=t,this.renderProjects()})),this.configure(),this.render()}renderProjects(){const e=document.getElementById(`${this.type}-project-list`);e.innerHTML="";for(const t of this.assignedProjects)new d(e.id,t)}configure(){this.element.addEventListener("dragover",this.dragLeaveHandeler),this.element.addEventListener("dragleave",this.dragOverHandeler),this.element.addEventListener("drop",this.dropHandeler)}render(){const e=`${this.type}-project-list`;this.element.querySelector("ul").id=`${e}`,this.element.querySelector("h2").textContent=`${this.type} Projects`.toUpperCase()}dragOverHandeler(e){this.element.querySelector("ul").classList.remove("droppabble")}dropHandeler(e){}dragLeaveHandeler(e){this.element.querySelector("ul").classList.add("droppabble")}}p([t],u.prototype,"dragOverHandeler",null),p([t],u.prototype,"dropHandeler",null),p([t],u.prototype,"dragLeaveHandeler",null),new a,new u("active"),new u("finished")})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TzlFLEdBQUkyRSxFQUUvQixDQUNBaEMsWUFDRS9DLEtBQUtxQyxRQUFRd0IsaUJBQWlCLFdBQVk3RCxLQUFLb0YsbUJBQy9DcEYsS0FBS3FDLFFBQVF3QixpQkFBaUIsWUFBYTdELEtBQUtxRixrQkFDaERyRixLQUFLcUMsUUFBUXdCLGlCQUFpQixPQUFRN0QsS0FBS3NGLGFBQzdDLENBQ0F4QixTQUNFLE1BQU1vQixFQUFTLEdBQUdsRixLQUFLMkUsb0JBQ3ZCM0UsS0FBS3FDLFFBQVFPLGNBQWMsTUFBT3hDLEdBQUssR0FBRzhFLElBQzFDbEYsS0FBS3FDLFFBQVFPLGNBQWMsTUFBTzBCLFlBQ2hDLEdBQUd0RSxLQUFLMkUsZ0JBQWdCWSxhQUM1QixDQUVBRixpQkFBaUI3QixHQUNBeEQsS0FBS3FDLFFBQVFPLGNBQWMsTUFDbkM0QyxVQUFVQyxPQUFPLGFBQzFCLENBRUFILGFBQWE5QixHQUFxQixDQUVsQzRCLGtCQUFrQjVCLEdBQ0R4RCxLQUFLcUMsUUFBUU8sY0FBYyxNQUNuQzRDLFVBQVVFLElBQUksYUFDdkIsRUFWQSxHQURDbEcsRyxxQ0FNRCxHQURDQSxHLGlDQUdELEdBRENBLEcsc0NDbERELElBQUlrRCxFQUNKLElBQUlnQyxFQUFZLFVBQ2hCLElBQUlBLEVBQVksVyIsInNvdXJjZXMiOlsid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9oZWxwZXJzL3ZhbGlkYXRlLnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9lbnVtL3N0YXR1cy50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvY2xhc3Nlcy9iYXNlL1Byb2plY3RzLnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9pbnRlcmZhY2VzL3N0YXRlLnRzIiwid2VicGFjazovL3VuZGVyc3RhbmRpbmctdHlwZXNjcmlwdC8uL3NyYy9zdGF0ZS9TdGF0ZS50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvY2xhc3Nlcy9iYXNlL0NvbXBvbmVudC50cyIsIndlYnBhY2s6Ly91bmRlcnN0YW5kaW5nLXR5cGVzY3JpcHQvLi9zcmMvY29tcG9uZW50cy9Qcm9qZWN0SW5wdXQudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvUHJvamVjdEl0ZW0udHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2NvbXBvbmVudHMvUHJvamVjdExpc3QudHMiLCJ3ZWJwYWNrOi8vdW5kZXJzdGFuZGluZy10eXBlc2NyaXB0Ly4vc3JjL2FwcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVmFsaWRhdGlvbiBmcm9tIFwiLi4vaW50ZXJmYWNlcy92YWxpZGF0aW9uXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2YWxpZGF0ZSh2YWxpZGF0YWJsZTogVmFsaWRhdGlvbik6IGJvb2xlYW4ge1xyXG4gIGxldCBpc1ZhbGlkYXRlID0gdHJ1ZTtcclxuICBpZiAodmFsaWRhdGFibGUucmVxdWlyZWQpIHtcclxuICAgIGlzVmFsaWRhdGUgPSBpc1ZhbGlkYXRlICYmIHZhbGlkYXRhYmxlLnZhbHVlLnRvU3RyaW5nKCkudHJpbSgpLmxlbmd0aCAhPT0gMDtcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlLm1pbkxlbmdodCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZS52YWx1ZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICBpc1ZhbGlkYXRlID1cclxuICAgICAgaXNWYWxpZGF0ZSAmJiB2YWxpZGF0YWJsZS52YWx1ZS50cmltKCkubGVuZ3RoID49IHZhbGlkYXRhYmxlLm1pbkxlbmdodDtcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlLm1heExlbmdodCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZS52YWx1ZSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICBpc1ZhbGlkYXRlID1cclxuICAgICAgaXNWYWxpZGF0ZSAmJiB2YWxpZGF0YWJsZS52YWx1ZS50cmltKCkubGVuZ3RoIDw9IHZhbGlkYXRhYmxlLm1heExlbmdodDtcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlLm1pbiAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZS52YWx1ZSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICBpc1ZhbGlkYXRlID0gaXNWYWxpZGF0ZSAmJiB2YWxpZGF0YWJsZS52YWx1ZSA+IHZhbGlkYXRhYmxlLm1pbjtcclxuICB9XHJcbiAgaWYgKHZhbGlkYXRhYmxlLm1heCAhPSBudWxsICYmIHR5cGVvZiB2YWxpZGF0YWJsZS52YWx1ZSA9PSBcIm51bWJlclwiKSB7XHJcbiAgICBpc1ZhbGlkYXRlID0gaXNWYWxpZGF0ZSAmJiB2YWxpZGF0YWJsZS52YWx1ZSA8IHZhbGlkYXRhYmxlLm1heDtcclxuICB9XHJcbiAgcmV0dXJuIGlzVmFsaWRhdGU7XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYXV0b2JpbmQoXHJcbiAgXzogYW55LFxyXG4gIF8yOiBzdHJpbmcsXHJcbiAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXHJcbik6IGFueSB7XHJcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gIC8qKiBEbyBub3QgY2hhbmdlIHRoZSB2YWx1ZSBvZiB0aGUgbWV0aG9kICovXHJcbiAgY29uc3QgbmV3RGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgY29uZmlndXJhYmxlOiB0cnVlLFxyXG4gICAgZ2V0KCkge1xyXG4gICAgICBjb25zdCBib3VuZEZ4biA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgIHJldHVybiBib3VuZEZ4bjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gbmV3RGVzY3JpcHRvcjtcclxufVxyXG4iLCIgIGV4cG9ydCAgZW51bSBTdGF0dXMge1xyXG4gICAgRklOSVNIRUQsXHJcbiAgICBBQ1RJVkUsXHJcbiAgfVxyXG5cclxuIiwiaW1wb3J0IHsgU3RhdHVzIH0gZnJvbSBcIi4uLy4uL2VudW0vc3RhdHVzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9qZWN0cyB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgc3RhdHVzOiBTdGF0dXNcclxuICApIHtcclxuICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgIHRoaXMucGVvcGxlID0gcGVvcGxlO1xyXG4gICAgdGhpcy5zdGF0dXMgPSBzdGF0dXM7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBMaXN0ZW5lciBmcm9tIFwiLi4vdHlwZXMvbGlzdGVuZXJzXCI7XHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YXRlPFQ+IHtcclxuICBwcm90ZWN0ZWQgbGlzdGVuZXJzOiBMaXN0ZW5lcjxUPltdID0gW107XHJcbiAgYWRkTGlzdGVuZXJzKGxpc3RlbmVyRm46IExpc3RlbmVyPFQ+KSB7XHJcbiAgICB0aGlzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyRm4pO1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi4vZW51bS9zdGF0dXNcIjtcclxuaW1wb3J0IFByb2plY3RzIGZyb20gXCIuLi9jbGFzc2VzL2Jhc2UvUHJvamVjdHNcIjtcclxuaW1wb3J0IFN0YXRlIGZyb20gXCIuLi9pbnRlcmZhY2VzL3N0YXRlXCI7XHJcblxyXG5jbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0cz4ge1xyXG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RzW10gPSBbXTtcclxuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCk6IFByb2plY3RTdGF0ZSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHJldHVybiAodGhpcy5pbnN0YW5jZSA9IG5ldyBQcm9qZWN0U3RhdGUoKSk7XHJcbiAgfVxyXG4gIGFkZFByb2plY3QodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgcGVvcGxlOiBudW1iZXIpIHtcclxuICAgIGNvbnN0IG5ld1Byb2plY3Q6IFByb2plY3RzID0gbmV3IFByb2plY3RzKFxyXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgcGVvcGxlLFxyXG4gICAgICBTdGF0dXMuQUNUSVZFXHJcbiAgICApO1xyXG5cclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIGZvciAoY29uc3QgbGlzdGVuZXJGbiBvZiB0aGlzLmxpc3RlbmVycykge1xyXG4gICAgICBsaXN0ZW5lckZuKFsuLi50aGlzLnByb2plY3RzXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFByb2plY3RTdGF0ZS5nZXRJbnN0YW5jZSgpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8XHJcbiAgVCBleHRlbmRzIEhUTUxFbGVtZW50LFxyXG4gIFUgZXh0ZW5kcyBIVE1MRWxlbWVudFxyXG4+IHtcclxuICB0ZW1wbGF0ZUVsZW1lbnQ6IEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgaG9zdEVsZW1lbnQ6IFQ7XHJcbiAgZWxlbWVudDogVTtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbXBsYXRlSUQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW50SWQ6IHN0cmluZyxcclxuICAgIGluc2VydExvY2F0aW9uOiBib29sZWFuLFxyXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50ID0gPFQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaG9zdEVsZW1lbnRJZCk7XHJcbiAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IDxIVE1MVGVtcGxhdGVFbGVtZW50PihcclxuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJRCkhXHJcbiAgICApO1xyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShcclxuICAgICAgdGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCxcclxuICAgICAgdHJ1ZVxyXG4gICAgKTtcclxuICAgIHRoaXMuZWxlbWVudCA9IDxVPmltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdHRhY2goaW5zZXJ0TG9jYXRpb24pO1xyXG4gIH1cclxuICBwcml2YXRlIGF0dGFjaChpbnNlcnQ6IGJvb2xlYW4pIHtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFxyXG4gICAgICBpbnNlcnQgPyBcImFmdGVyYmVnaW5cIiA6IFwiYmVmb3JlZW5kXCIsXHJcbiAgICAgIHRoaXMuZWxlbWVudFxyXG4gICAgKTtcclxuICB9XHJcbiAgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgYWJzdHJhY3QgcmVuZGVyKCk6IHZvaWQ7XHJcbn1cclxuIiwiXHJcbmltcG9ydCB2YWxpZGF0ZSBmcm9tIFwiLi4vaGVscGVycy92YWxpZGF0ZVwiO1xyXG5pbXBvcnQgYXV0b2JpbmQgZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcclxuaW1wb3J0IHByb2plY3RTdGF0ZSBmcm9tIFwiLi4vc3RhdGUvU3RhdGVcIjtcclxuXHJcbmltcG9ydCBDb21wb25lbnQgZnJvbSBcIi4uL2NsYXNzZXMvYmFzZS9Db21wb25lbnRcIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxcclxuICBIVE1MRExpc3RFbGVtZW50LFxyXG4gIEhUTUxFbGVtZW50XHJcbj4ge1xyXG4gIHRpdGxlSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uSW5wdXRFbGVtZW50OiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZUlucHV0RWxlbWVudDogSFRNTElucHV0RWxlbWVudDtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKFwicHJvamVjdC1pbnB1dFwiLCBcImFwcFwiLCBmYWxzZSwgXCJ1c2VyLWlucHV0XCIpO1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcclxuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjdGl0bGVcIikhXHJcbiAgICApO1xyXG4gICAgdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudCA9IDxIVE1MSW5wdXRFbGVtZW50PihcclxuICAgICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVzY3JpcHRpb25cIikhXHJcbiAgICApO1xyXG4gICAgdGhpcy5wZW9wbGVJbnB1dEVsZW1lbnQgPSA8SFRNTElucHV0RWxlbWVudD4oXHJcbiAgICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3Blb3BsZVwiKSFcclxuICAgICk7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gIH1cclxuICBwcml2YXRlIGdhdGhlclVzZXJJbnB1dCgpOiBbc3RyaW5nLCBzdHJpbmcsIG51bWJlcl0gfCB2b2lkIHtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGhpcy5kZXNjcmlwdGlvbklucHV0RWxlbWVudC52YWx1ZTtcclxuICAgIGNvbnN0IHBlb3BsZSA9IHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlO1xyXG4gICAgY29uc3QgdGl0bGVWYWxpZGF0ZTogQm9vbGVhbiA9IHZhbGlkYXRlKHsgdmFsdWU6IHRpdGxlLCByZXF1aXJlZDogdHJ1ZSB9KTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uVmFsaWRhdGU6IEJvb2xlYW4gPSB2YWxpZGF0ZSh7XHJcbiAgICAgIHZhbHVlOiBkZXNjcmlwdGlvbixcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICB9KTtcclxuICAgIGNvbnN0IHBlb3BsZVZhbGlkYXRlOiBCb29sZWFuID0gdmFsaWRhdGUoe1xyXG4gICAgICB2YWx1ZTogcGVvcGxlLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgbWluOiAxLFxyXG4gICAgICBtYXg6IDEyLFxyXG4gICAgfSk7XHJcbiAgICBpZiAoIXRpdGxlVmFsaWRhdGUgfHwgIWRlc2NyaXB0aW9uVmFsaWRhdGUgfHwgIXBlb3BsZVZhbGlkYXRlKSB7XHJcbiAgICAgIGFsZXJ0KFwiSW52YWxpZCBpbnB1dC4gUGxlYXNlIGZpbGwgYWxsIGZpZWxkc1wiKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sIHBhcnNlRmxvYXQocGVvcGxlKV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGNsZWFySW5wdXRzKCk6IHZvaWQge1xyXG4gICAgdGhpcy50aXRsZUlucHV0RWxlbWVudC52YWx1ZSA9IFwiXCI7XHJcbiAgICB0aGlzLmRlc2NyaXB0aW9uSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgIHRoaXMucGVvcGxlSW5wdXRFbGVtZW50LnZhbHVlID0gXCJcIjtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgQGF1dG9iaW5kXHJcbiAgcHJpdmF0ZSBzdWJtaXRIYW5kbGVyKGU6IEV2ZW50KSB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCB1c2VySW5wdXQgPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodXNlcklucHV0KSkge1xyXG4gICAgICBjb25zdCBbdGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGVdID0gdXNlcklucHV0O1xyXG4gICAgICBwcm9qZWN0U3RhdGUuYWRkUHJvamVjdCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSk7XHJcbiAgICAgIHRoaXMuY2xlYXJJbnB1dHMoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7fVxyXG59XHJcbiIsImltcG9ydCBhdXRvYmluZCBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xyXG5cclxuaW1wb3J0IHsgRHJhZ2FibGUsIERyYWdUYXJnZXQgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9kcmFnLWRyb3BcIjtcclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vY2xhc3Nlcy9iYXNlL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgUHJvamVjdHMgZnJvbSBcIi4uL2NsYXNzZXMvYmFzZS9Qcm9qZWN0c1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTElFbGVtZW50PlxyXG4gIGltcGxlbWVudHMgRHJhZ2FibGVcclxue1xyXG4gIHByaXZhdGUgcHJvamVjdDogUHJvamVjdHM7XHJcbiAgZ2V0IHBlcnNvbnMoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0LnBlb3BsZSA9PT0gMVxyXG4gICAgICA/IFwiMSBwZXJzb25cIlxyXG4gICAgICA6IGAke3RoaXMucHJvamVjdC5wZW9wbGV9IHBlcnNvbnMgYXNzaWduZWRgO1xyXG4gIH1cclxuICBjb25zdHJ1Y3Rvcihob3N0SWQ6IHN0cmluZywgcHJvamVjdDogUHJvamVjdHMpIHtcclxuICAgIHN1cGVyKFwic2luZ2xlLXByb2plY3RcIiwgaG9zdElkLCBmYWxzZSwgcHJvamVjdC5pZCk7XHJcbiAgICB0aGlzLnByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG4gIGNvbmZpZ3VyZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdlbmRcIiwgdGhpcy5kcmFnRW5kSGFuZGxlcik7XHJcbiAgfVxyXG4gIHJlbmRlcigpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5kcmFnZ2FibGUgPSB0cnVlO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJoMlwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgzXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucGVyc29ucztcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwicFwiKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XHJcbiAgfVxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdTdGFydEhhbmRsZXIoZTogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBlLmRhdGFUcmFuc2ZlciEuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcclxuICAgIGUuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XHJcbiAgfVxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdFbmRIYW5kbGVyKGU6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gIH1cclxufVxyXG4iLCJpbXBvcnQgeyBTdGF0dXMgfSBmcm9tIFwiLi4vZW51bS9zdGF0dXNcIjtcclxuaW1wb3J0IGF1dG9iaW5kIGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XHJcblxyXG5pbXBvcnQgeyBEcmFnYWJsZSwgRHJhZ1RhcmdldCB9IGZyb20gXCIuLi9pbnRlcmZhY2VzL2RyYWctZHJvcFwiO1xyXG5pbXBvcnQgcHJvamVjdFN0YXRlIGZyb20gXCIuLi9zdGF0ZS9TdGF0ZVwiO1xyXG5cclxuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi4vY2xhc3Nlcy9iYXNlL0NvbXBvbmVudFwiO1xyXG5pbXBvcnQgUHJvamVjdHMgZnJvbSBcIi4uL2NsYXNzZXMvYmFzZS9Qcm9qZWN0c1wiO1xyXG5pbXBvcnQgUHJvamVjdEl0ZW0gZnJvbSBcIi4uL2NvbXBvbmVudHMvUHJvamVjdEl0ZW1cIjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFByb2plY3RMaXN0XHJcbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERMaXN0RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XHJcbntcclxuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0c1tdO1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgdHlwZTogXCJhY3RpdmVcIiB8IFwiZmluaXNoZWRcIikge1xyXG4gICAgc3VwZXIoXCJwcm9qZWN0LWxpc3RcIiwgXCJhcHBcIiwgZmFsc2UsIGAke3R5cGV9LXByb2plY3RzYCk7XHJcbiAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSBbXTtcclxuICAgIHByb2plY3RTdGF0ZS5hZGRMaXN0ZW5lcnMoKHByb2plY3RzOiBQcm9qZWN0c1tdKSA9PiB7XHJcbiAgICAgIGNvbnN0IHJlbGV2YW50UHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2opID0+IHtcclxuICAgICAgICBpZiAodGhpcy50eXBlID09IFwiYWN0aXZlXCIpIHtcclxuICAgICAgICAgIHJldHVybiBwcm9qLnN0YXR1cyA9PT0gU3RhdHVzLkFDVElWRTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb2ouc3RhdHVzID09PSBTdGF0dXMuRklOSVNIRUQ7XHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLmFzc2lnbmVkUHJvamVjdHMgPSByZWxldmFudFByb2plY3RzO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xyXG4gICAgY29uc3QgbGlzdElkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7dGhpcy50eXBlfS1wcm9qZWN0LWxpc3RgKSE7XHJcbiAgICBsaXN0SWQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGZvciAoY29uc3QgcHJvaiBvZiB0aGlzLmFzc2lnbmVkUHJvamVjdHMpIHtcclxuICAgICAgbmV3IFByb2plY3RJdGVtKGxpc3RJZC5pZCwgcHJvaik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGNvbmZpZ3VyZSgpIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ292ZXJcIiwgdGhpcy5kcmFnTGVhdmVIYW5kZWxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImRyYWdsZWF2ZVwiLCB0aGlzLmRyYWdPdmVySGFuZGVsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRlbGVyKTtcclxuICB9XHJcbiAgcmVuZGVyKCkge1xyXG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0LWxpc3RgO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSEuaWQgPSBgJHtsaXN0SWR9YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID1cclxuICAgICAgYCR7dGhpcy50eXBlfSBQcm9qZWN0c2AudG9VcHBlckNhc2UoKTtcclxuICB9XHJcbiAgQGF1dG9iaW5kXHJcbiAgZHJhZ092ZXJIYW5kZWxlcihlOiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwidWxcIikhO1xyXG4gICAgbGlzdEVsLmNsYXNzTGlzdC5yZW1vdmUoXCJkcm9wcGFiYmxlXCIpO1xyXG4gIH1cclxuICBAYXV0b2JpbmRcclxuICBkcm9wSGFuZGVsZXIoZTogRHJhZ0V2ZW50KTogdm9pZCB7fVxyXG4gIEBhdXRvYmluZFxyXG4gIGRyYWdMZWF2ZUhhbmRlbGVyKGU6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJ1bFwiKSE7XHJcbiAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZChcImRyb3BwYWJibGVcIik7XHJcbiAgfVxyXG59XHJcbiIsIi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBJbXBvcnRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbmltcG9ydCBQcm9qZWN0SW5wdXQgZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9qZWN0SW5wdXRcIlxyXG5pbXBvcnQgUHJvamVjdExpc3QgZnJvbSBcIi4vY29tcG9uZW50cy9Qcm9qZWN0TGlzdFwiXHJcblxyXG4gIC8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSW5pdHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbiAgbmV3IFByb2plY3RJbnB1dCgpO1xyXG4gIG5ldyBQcm9qZWN0TGlzdChcImFjdGl2ZVwiKTtcclxuICBuZXcgUHJvamVjdExpc3QoXCJmaW5pc2hlZFwiKTtcclxuIl0sIm5hbWVzIjpbInZhbGlkYXRlIiwidmFsaWRhdGFibGUiLCJpc1ZhbGlkYXRlIiwicmVxdWlyZWQiLCJ2YWx1ZSIsInRvU3RyaW5nIiwidHJpbSIsImxlbmd0aCIsIm1pbkxlbmdodCIsIm1heExlbmdodCIsIm1pbiIsIm1heCIsImF1dG9iaW5kIiwiXyIsIl8yIiwiZGVzY3JpcHRvciIsIm9yaWdpbmFsTWV0aG9kIiwiY29uZmlndXJhYmxlIiwiZ2V0IiwiYmluZCIsInRoaXMiLCJTdGF0dXMiLCJQcm9qZWN0cyIsImNvbnN0cnVjdG9yIiwiaWQiLCJ0aXRsZSIsImRlc2NyaXB0aW9uIiwicGVvcGxlIiwic3RhdHVzIiwiU3RhdGUiLCJsaXN0ZW5lcnMiLCJhZGRMaXN0ZW5lcnMiLCJsaXN0ZW5lckZuIiwicHVzaCIsIlByb2plY3RTdGF0ZSIsInN1cGVyIiwicHJvamVjdHMiLCJzdGF0aWMiLCJpbnN0YW5jZSIsImFkZFByb2plY3QiLCJuZXdQcm9qZWN0IiwiTWF0aCIsInJhbmRvbSIsIkFDVElWRSIsImdldEluc3RhbmNlIiwiQ29tcG9uZW50IiwidGVtcGxhdGVJRCIsImhvc3RFbGVtZW50SWQiLCJpbnNlcnRMb2NhdGlvbiIsIm5ld0VsZW1lbnRJZCIsImhvc3RFbGVtZW50IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInRlbXBsYXRlRWxlbWVudCIsImltcG9ydGVkTm9kZSIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiZWxlbWVudCIsImZpcnN0RWxlbWVudENoaWxkIiwiYXR0YWNoIiwiaW5zZXJ0IiwiaW5zZXJ0QWRqYWNlbnRFbGVtZW50IiwiUHJvamVjdElucHV0IiwidGl0bGVJbnB1dEVsZW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiZGVzY3JpcHRpb25JbnB1dEVsZW1lbnQiLCJwZW9wbGVJbnB1dEVsZW1lbnQiLCJjb25maWd1cmUiLCJnYXRoZXJVc2VySW5wdXQiLCJ0aXRsZVZhbGlkYXRlIiwiZGVzY3JpcHRpb25WYWxpZGF0ZSIsInBlb3BsZVZhbGlkYXRlIiwicGFyc2VGbG9hdCIsImFsZXJ0IiwiY2xlYXJJbnB1dHMiLCJzdWJtaXRIYW5kbGVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidXNlcklucHV0IiwiQXJyYXkiLCJpc0FycmF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsInJlbmRlciIsIlByb2plY3RJdGVtIiwicGVyc29ucyIsInByb2plY3QiLCJob3N0SWQiLCJkcmFnU3RhcnRIYW5kbGVyIiwiZHJhZ0VuZEhhbmRsZXIiLCJkcmFnZ2FibGUiLCJ0ZXh0Q29udGVudCIsImRhdGFUcmFuc2ZlciIsInNldERhdGEiLCJlZmZlY3RBbGxvd2VkIiwiUHJvamVjdExpc3QiLCJ0eXBlIiwiYXNzaWduZWRQcm9qZWN0cyIsInJlbGV2YW50UHJvamVjdHMiLCJmaWx0ZXIiLCJwcm9qIiwiRklOSVNIRUQiLCJyZW5kZXJQcm9qZWN0cyIsImxpc3RJZCIsImlubmVySFRNTCIsImRyYWdMZWF2ZUhhbmRlbGVyIiwiZHJhZ092ZXJIYW5kZWxlciIsImRyb3BIYW5kZWxlciIsInRvVXBwZXJDYXNlIiwiY2xhc3NMaXN0IiwicmVtb3ZlIiwiYWRkIl0sInNvdXJjZVJvb3QiOiIifQ==