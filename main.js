/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
let projects = [
    {
        project: 'Default Project',
        tasks: [
            {
                taskDesc: 'Go grocery shopping',
                dueDate: '2022-07-27',
                complete: false,
            },
            {
                taskDesc: 'Read a book',
                dueDate: '2022-05-31',
                complete: true,
            },
            {
                taskDesc: 'Test example',
                dueDate: '2022-05-31',
                complete: false,
            }
        ]
    }
    
];



/***/ }),

/***/ "./src/menu.js":
/*!*********************!*\
  !*** ./src/menu.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "menuController": () => (/* binding */ menuController)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");



let menuController = (function() {
    let menuItems = [...document.getElementsByClassName('menu-item')];
    const projectList = document.getElementById('project-list');
    const dltProjectBtn = document.getElementById('delete-project-button');
    dltProjectBtn.style.display = 'none';
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-project-request', newProjectRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('project-added', newProject);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-project-cancelled', cancelProjectRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('menu-item-selected', menuItemSelection);

    let projects = ['Default Project'];

    render();

    menuItems.forEach(item => {
        menuItemAddEventListener(item);
    });
    
    function menuItemAddEventListener(item) {
        item.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('menu-item-selected', item);
        })
    }

    function menuItemSelection(selectedItem) {
        menuItems.forEach(item => {
            item.classList.remove('is-active');
        });
        selectedItem.classList.add('is-active');
    }

    function newProjectRequest() {
        const liProjectName = document.createElement('li');
        const inputProjectName = document.createElement('input');
        inputProjectName.classList.add('input');
        inputProjectName.type = 'text';
        inputProjectName.placeholder = 'Project name'
        inputProjectName.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('project-added', inputProjectName.value)
            }
        });
        liProjectName.appendChild(inputProjectName);

        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('project-added', inputProjectName.value)
        });
        addBtn.classList.add('button', 'is-primary', 'is-light', 'new-project-button');
        addBtn.textContent = 'Add';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('new-project-cancelled');
        })
        cancelBtn.classList.add('button', 'is-danger', 'is-light', 'new-project-button');
        cancelBtn.textContent = 'Cancel';

        const btnDiv = document.createElement('div');
        btnDiv.appendChild(addBtn);
        btnDiv.appendChild(cancelBtn);
        liProjectName.appendChild(btnDiv);
        projectList.appendChild(liProjectName);
    }

    function newProject(projectName) {
        projects.push(projectName);
        projectList.lastChild.remove();
        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.innerText = projectName;
        menuItemAddEventListener(anchorElement);
        anchorElement.classList.add('menu-item');
        menuItemSelection(anchorElement);
        menuItems.push(anchorElement);
        listElement.appendChild(anchorElement);
        projectList.appendChild(listElement);
    }

    function cancelProjectRequest() {
        projectList.lastChild.remove();
    }

    function render() {
        projects.forEach(project => {
            newProject(project);
        });
    }
})()



/***/ }),

/***/ "./src/pubsub.js":
/*!***********************!*\
  !*** ./src/pubsub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pubsub": () => (/* binding */ pubsub)
/* harmony export */ });
var pubsub = (function () {
    let events = {};

    function subscribe (eventName, fn) {
        events[eventName] = events[eventName] || [];
        events[eventName].push(fn);
    }

    function publish (eventName, data) {
        console.log(eventName);
        if (events[eventName]) {
            events[eventName].forEach(function(fn) {
              fn(data);
            });
        }
    }

    return {
        subscribe: subscribe,
        publish: publish,
    }
})();



/***/ }),

/***/ "./src/taskmanager.js":
/*!****************************!*\
  !*** ./src/taskmanager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "taskManager": () => (/* binding */ taskManager)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data */ "./src/data.js");



let taskManager = (function(){
    const tableBody = document.getElementById('table-body');
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-task-request', newTaskRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('task-added', newTask);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-task-cancelled', cancelTaskRequest);

    renderTasks();

    function newTaskRequest() {
        const tdAddBtn = document.createElement('td');
        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', (e)=>{
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('task-added', {
            taskDesc: inputTaskName.value,
            dueDate: inputDueDate.value,
            complete: false,
            }
        )});
        addBtn.classList.add('button', 'is-primary', 'is-light');
        addBtn.textContent = 'Add';
        tdAddBtn.appendChild(addBtn);

        const tdTaskName = document.createElement('td');
        const inputTaskName = document.createElement('input');
        inputTaskName.classList.add('input');
        inputTaskName.type = 'text';
        inputTaskName.placeholder = 'Go grocery shopping...'
        inputTaskName.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('task-added', {
                taskDesc: inputTaskName.value,
                dueDate: inputDueDate.value,
                complete: false,
                })
            }
        });
        tdTaskName.appendChild(inputTaskName);
        
        const tdDueDate = document.createElement('td');
        const inputDueDate = document.createElement('input');
        inputDueDate.classList.add('input');
        inputDueDate.type = 'date';
        tdDueDate.appendChild(inputDueDate);
        
        const deleteBtn = document.createElement('a');
        deleteBtn.classList.add('tag', 'is-delete');
        deleteBtn.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('new-task-cancelled');
        })
        const tdDelete = document.createElement('td');
        tdDelete.appendChild(deleteBtn);

        const tr = document.createElement('tr');
        tr.appendChild(tdAddBtn);
        tr.appendChild(tdTaskName);
        tr.appendChild(tdDueDate);
        tr.appendChild(tdDelete);
        
        tableBody.insertBefore(tr, tableBody.firstChild);
    }

    function cancelTaskRequest() {
        tableBody.firstChild.remove();
    }

    function newTask(task) {
        tasks.unshift(task);
        renderTasks();
    }

    function clearTable() {
        tableBody.innerHTML = '';
    }

    function deleteTask(index) {
        tasks.splice(index,1);
        renderTasks();
    }

    function renderTasks() {
        clearTable();
        tasks.forEach((task, index) => {
            const tdCheckBtn = document.createElement('td');
            const lblCheckBtn = document.createElement('label');
            lblCheckBtn.classList.add('checkbox');
            const checkBtn = document.createElement('input');
            checkBtn.type = 'checkbox';
            checkBtn.addEventListener('change', function() {
                if (this.checked) {
                    tr.classList.add('complete');
                    task.complete = true;
                } else {
                    tr.classList.remove('complete');
                    task.complete = false;
                }
            });
            lblCheckBtn.appendChild(checkBtn);
            tdCheckBtn.appendChild(lblCheckBtn);

            const tdTaskName = document.createElement('td');
            tdTaskName.innerText = task.taskDesc;
            
            const tdDueDate = document.createElement('td');
            tdDueDate.innerText = task.dueDate;
            
            const deleteBtn = document.createElement('a');
            deleteBtn.addEventListener('click', ()=>{
                deleteTask(index);
            });
            deleteBtn.classList.add('tag', 'is-delete');
            const tdDelete = document.createElement('td');
            tdDelete.appendChild(deleteBtn);

            const tr = document.createElement('tr');
            tr.appendChild(tdCheckBtn);
            tr.appendChild(tdTaskName);
            tr.appendChild(tdDueDate);
            tr.appendChild(tdDelete);
            if (task.complete === true) {
                tr.classList.add('complete');
                checkBtn.checked = true;
            }            
            tableBody.appendChild(tr);
        });
    }
})();


 

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _taskmanager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./taskmanager */ "./src/taskmanager.js");
/* harmony import */ var _menu__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./menu */ "./src/menu.js");
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");




const newTaskBtn = document.getElementById('new-task-button');
newTaskBtn.addEventListener('click', function(){
    _pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.publish('new-task-request');
    taskBtnToggle();    
});
_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.subscribe('task-added', taskBtnToggle)
_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.subscribe('new-task-cancelled', taskBtnToggle);
function taskBtnToggle() {
    newTaskBtn.classList.toggle('is-loading');
}

const newProjectBtn = document.getElementById('new-project-button');
newProjectBtn.addEventListener('click', function(){
    _pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.publish('new-project-request');
    projectBtnToggle();    
});
_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.subscribe('project-added', projectBtnToggle)
_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.subscribe('new-project-cancelled', projectBtnToggle);
function projectBtnToggle() {
    newProjectBtn.classList.toggle('is-loading');
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDTDtBQUNIOztBQUVsQztBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9tZW51LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Rhc2ttYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJsZXQgcHJvamVjdHMgPSBbXG4gICAge1xuICAgICAgICBwcm9qZWN0OiAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgdGFza3M6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0YXNrRGVzYzogJ0dvIGdyb2Nlcnkgc2hvcHBpbmcnLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA3LTI3JyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjOiAnUmVhZCBhIGJvb2snLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGFza0Rlc2M6ICdUZXN0IGV4YW1wbGUnLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9XG4gICAgXG5dO1xuXG5leHBvcnQge3Byb2plY3RzfTsiLCJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuXG5sZXQgbWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LWl0ZW0nKV07XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgY29uc3QgZGx0UHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxldGUtcHJvamVjdC1idXR0b24nKTtcbiAgICBkbHRQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtcmVxdWVzdCcsIG5ld1Byb2plY3RSZXF1ZXN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgbmV3UHJvamVjdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtY2FuY2VsbGVkJywgY2FuY2VsUHJvamVjdFJlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ21lbnUtaXRlbS1zZWxlY3RlZCcsIG1lbnVJdGVtU2VsZWN0aW9uKTtcblxuICAgIGxldCBwcm9qZWN0cyA9IFsnRGVmYXVsdCBQcm9qZWN0J107XG5cbiAgICByZW5kZXIoKTtcblxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBtZW51SXRlbUFkZEV2ZW50TGlzdGVuZXIoaXRlbSk7XG4gICAgfSk7XG4gICAgXG4gICAgZnVuY3Rpb24gbWVudUl0ZW1BZGRFdmVudExpc3RlbmVyKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbWVudS1pdGVtLXNlbGVjdGVkJywgaXRlbSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVudUl0ZW1TZWxlY3Rpb24oc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdGVkSXRlbS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQcm9qZWN0UmVxdWVzdCgpIHtcbiAgICAgICAgY29uc3QgbGlQcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGlucHV0UHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5wbGFjZWhvbGRlciA9ICdQcm9qZWN0IG5hbWUnXG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSk9PntcbiAgICAgICAgICAgIGlmKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3QtYWRkZWQnLCBpbnB1dFByb2plY3ROYW1lLnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGlQcm9qZWN0TmFtZS5hcHBlbmRDaGlsZChpbnB1dFByb2plY3ROYW1lKTtcblxuICAgICAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0LWFkZGVkJywgaW5wdXRQcm9qZWN0TmFtZS52YWx1ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtcHJpbWFyeScsICdpcy1saWdodCcsICduZXctcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctcHJvamVjdC1jYW5jZWxsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdpcy1kYW5nZXInLCAnaXMtbGlnaHQnLCAnbmV3LXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuXG4gICAgICAgIGNvbnN0IGJ0bkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQoYWRkQnRuKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgICAgIGxpUHJvamVjdE5hbWUuYXBwZW5kQ2hpbGQoYnRuRGl2KTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlQcm9qZWN0TmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3UHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdExpc3QubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICBjb25zdCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuaW5uZXJUZXh0ID0gcHJvamVjdE5hbWU7XG4gICAgICAgIG1lbnVJdGVtQWRkRXZlbnRMaXN0ZW5lcihhbmNob3JFbGVtZW50KTtcbiAgICAgICAgYW5jaG9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZW51LWl0ZW0nKTtcbiAgICAgICAgbWVudUl0ZW1TZWxlY3Rpb24oYW5jaG9yRWxlbWVudCk7XG4gICAgICAgIG1lbnVJdGVtcy5wdXNoKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChhbmNob3JFbGVtZW50KTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFByb2plY3RSZXF1ZXN0KCkge1xuICAgICAgICBwcm9qZWN0TGlzdC5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgbmV3UHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKVxuXG5leHBvcnQge21lbnVDb250cm9sbGVyfTsiLCJ2YXIgcHVic3ViID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaCAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIHB1Ymxpc2g6IHB1Ymxpc2gsXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7cHVic3VifSBmcm9tIFwiLi9wdWJzdWJcIjtcbmltcG9ydCB7cHJvamVjdHN9IGZyb20gXCIuL2RhdGFcIjtcblxubGV0IHRhc2tNYW5hZ2VyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLWJvZHknKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1yZXF1ZXN0JywgbmV3VGFza1JlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCBuZXdUYXNrKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1jYW5jZWxsZWQnLCBjYW5jZWxUYXNrUmVxdWVzdCk7XG5cbiAgICByZW5kZXJUYXNrcygpO1xuXG4gICAgZnVuY3Rpb24gbmV3VGFza1JlcXVlc3QoKSB7XG4gICAgICAgIGNvbnN0IHRkQWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2stYWRkZWQnLCB7XG4gICAgICAgICAgICB0YXNrRGVzYzogaW5wdXRUYXNrTmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGR1ZURhdGU6IGlucHV0RHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKX0pO1xuICAgICAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICAgIHRkQWRkQnRuLmFwcGVuZENoaWxkKGFkZEJ0bik7XG5cbiAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGlucHV0VGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0VGFza05hbWUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5wbGFjZWhvbGRlciA9ICdHbyBncm9jZXJ5IHNob3BwaW5nLi4uJ1xuICAgICAgICBpbnB1dFRhc2tOYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpPT57XG4gICAgICAgICAgICBpZihlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrLWFkZGVkJywge1xuICAgICAgICAgICAgICAgIHRhc2tEZXNjOiBpbnB1dFRhc2tOYW1lLnZhbHVlLFxuICAgICAgICAgICAgICAgIGR1ZURhdGU6IGlucHV0RHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRkVGFza05hbWUuYXBwZW5kQ2hpbGQoaW5wdXRUYXNrTmFtZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBpbnB1dER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dER1ZURhdGUuY2xhc3NMaXN0LmFkZCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXREdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgICAgIHRkRHVlRGF0ZS5hcHBlbmRDaGlsZChpbnB1dER1ZURhdGUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgndGFnJywgJ2lzLWRlbGV0ZScpO1xuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ldy10YXNrLWNhbmNlbGxlZCcpO1xuICAgICAgICB9KVxuICAgICAgICBjb25zdCB0ZERlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHRkRGVsZXRlLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZEFkZEJ0bik7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkVGFza05hbWUpO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZER1ZURhdGUpO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgICAgIFxuICAgICAgICB0YWJsZUJvZHkuaW5zZXJ0QmVmb3JlKHRyLCB0YWJsZUJvZHkuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsVGFza1JlcXVlc3QoKSB7XG4gICAgICAgIHRhYmxlQm9keS5maXJzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Rhc2sodGFzaykge1xuICAgICAgICB0YXNrcy51bnNoaWZ0KHRhc2spO1xuICAgICAgICByZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyVGFibGUoKSB7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKGluZGV4KSB7XG4gICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgcmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJUYXNrcygpIHtcbiAgICAgICAgY2xlYXJUYWJsZSgpO1xuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGRDaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICBjb25zdCBsYmxDaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBsYmxDaGVja0J0bi5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY2hlY2tCdG4udHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICBjaGVja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGxibENoZWNrQnRuLmFwcGVuZENoaWxkKGNoZWNrQnRuKTtcbiAgICAgICAgICAgIHRkQ2hlY2tCdG4uYXBwZW5kQ2hpbGQobGJsQ2hlY2tCdG4pO1xuXG4gICAgICAgICAgICBjb25zdCB0ZFRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHRkVGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50YXNrRGVzYztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgdGREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHRkRHVlRGF0ZS5pbm5lclRleHQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT57XG4gICAgICAgICAgICAgICAgZGVsZXRlVGFzayhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG4gICAgICAgICAgICBjb25zdCB0ZERlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZERlbGV0ZS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZENoZWNrQnRuKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkVGFza05hbWUpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRGVsZXRlKTtcbiAgICAgICAgICAgIGlmICh0YXNrLmNvbXBsZXRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdHIuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICBjaGVja0J0bi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhYmxlQm9keS5hcHBlbmRDaGlsZCh0cik7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pKCk7XG5cblxuZXhwb3J0IHt0YXNrTWFuYWdlcn07ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt0YXNrTWFuYWdlcn0gZnJvbSAnLi90YXNrbWFuYWdlcic7XG5pbXBvcnQge21lbnVDb250cm9sbGVyfSBmcm9tICcuL21lbnUnXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL3B1YnN1Yic7XG5cbmNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYnV0dG9uJyk7XG5uZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3LXRhc2stcmVxdWVzdCcpO1xuICAgIHRhc2tCdG5Ub2dnbGUoKTsgICAgXG59KTtcbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCB0YXNrQnRuVG9nZ2xlKVxucHVic3ViLnN1YnNjcmliZSgnbmV3LXRhc2stY2FuY2VsbGVkJywgdGFza0J0blRvZ2dsZSk7XG5mdW5jdGlvbiB0YXNrQnRuVG9nZ2xlKCkge1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5jb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xubmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgcHVic3ViLnB1Ymxpc2goJ25ldy1wcm9qZWN0LXJlcXVlc3QnKTtcbiAgICBwcm9qZWN0QnRuVG9nZ2xlKCk7ICAgIFxufSk7XG5wdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgcHJvamVjdEJ0blRvZ2dsZSlcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ldy1wcm9qZWN0LWNhbmNlbGxlZCcsIHByb2plY3RCdG5Ub2dnbGUpO1xuZnVuY3Rpb24gcHJvamVjdEJ0blRvZ2dsZSgpIHtcbiAgICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWxvYWRpbmcnKTtcbn1cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9