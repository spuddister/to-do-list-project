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
/* harmony export */   "dataController": () => (/* binding */ dataController)
/* harmony export */ });



let dataController = (function() {
    let projects = [];
    let tasks = [];

    let defaultProjects = ['Default Project', 'Work'];
    let defaultTasks = [
        [   
            'Go grocery shopping',
            'Default Project',
            '2022-07-27',
            'false',
        ],
        [
            'Read The Foundation by Isaac Asimov',
            'Default Project',
            '2022-05-31',
            'false',
        ],
        [
            'Learn how to use localStorage',
            'Work',
            '2022-05-31',
            'true',
        ]
        ,
        [
            'Sweep and mop the floors',
            'Default Project',
            '2022-05-31',
            'false',
        ]
        ,
        [
            'Send Jan an email about our trip to Jamaica',
            'Work',
            '2022-08-11',
            'false',
        ]
        ,
        [
            'Replace Google Chrome with Firefox',
            'Work',
            '2022-04-06',
            'true',
        ]
    ];
    
    if (storageAvailable('localStorage')) {
        if (localStorage.getItem('tasks') != null) {
            tasks = convertStorageData(localStorage.getItem('tasks'));
        } else {
            tasks = defaultTasks;
        }
        if (localStorage.getItem('projects') != null) {
            projects = localStorage.getItem('projects').split(',');
        } else {
            projects = defaultProjects;
        }
            
    } else {
        projects = defaultProjects;
        tasks = defaultTasks;
    }


    function convertStorageData(data) {
        let tempArray = data.split(',')
        let convertedData = Array.from(Array(tempArray.length/4), () => new Array(4));
        let k = 0;
        let j = 0;
        for(let i=0; i< tempArray.length; i++){
            k=Math.floor(i/4);
            j = i%4;
            convertedData[k][j] = tempArray[i];
        }
        return convertedData;
    }
    
    // localStorage.clear();
    // localStorage.setItem("tasks", tasks);
    // localStorage.setItem("projects", projects);
    // console.log(localStorage.getItem('projects'))


    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function updateLocalStorage(){ //possibly not needed
        localStorage.clear();
        localStorage.setItem('tasks', tasks);
        localStorage.setItem('projects', projects);
    }

    function setTask(task){
        tasks.push(task);
        localStorage.setItem('tasks', tasks);
    }

    function deleteTask(task){
        // let index = tasks.findIndex()
        //instead of finding the specific task, this function should except a new list of tasks and update the storage with that instead
    }

    function getTasks(){
        return tasks;
    }

    return {
        setTask: setTask,
        getTasks: getTasks,
        deleteTask: deleteTask,

    }

})();





/***/ }),

/***/ "./src/projectmanager.js":
/*!*******************************!*\
  !*** ./src/projectmanager.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectController": () => (/* binding */ projectController)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");



let projectController = (function() {
    let menuItems = [...document.getElementsByClassName('menu-item')];
    const projectList = document.getElementById('project-list');
    const dltProjectBtn = document.getElementById('delete-project-button');
    dltProjectBtn.style.display = 'none';
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-project-request', newProjectRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('project-added', newProject);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-project-cancelled', cancelProjectRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('menu-item-selected', menuItemSelection);

    let projects = ['Default Project', 'test'];

    render();

    for(let i=0; i<=2; i++){
        menuItems[i].addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('menu-item-selected', menuItems[i]);
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
        projectList.appendChild(buildProjectListItem(projectName)); ;
    }

    function buildProjectListItem(projectName){
        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.innerText = projectName;
        anchorElement.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('menu-item-selected', anchorElement);
        });
        anchorElement.classList.add('menu-item');
        menuItemSelection(anchorElement);
        menuItems.push(anchorElement);
        listElement.appendChild(anchorElement);
        return listElement;
    }

    function cancelProjectRequest() {
        projectList.lastChild.remove();
    }

    function render() {
        projects.forEach(project => {
            projectList.appendChild(buildProjectListItem(project));
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
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('menu-item-selected', filterTasks);

    let tasks = [
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
    // console.table(tasks)

    let tasks2 = _data__WEBPACK_IMPORTED_MODULE_1__.dataController.getTasks();
    // console.table(tasks2)

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

    function filterTasks(menuItem) {
        // console.log(menuItem.innerText)
        //filter tasks based on which project is selected and update a variable that is maybe called displayedTasks
        //update the table title

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
/* harmony import */ var _projectmanager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projectmanager */ "./src/projectmanager.js");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LG1EQUFjO0FBQ2xCO0FBQ0EsQ0FBQztBQUNELHFEQUFnQjtBQUNoQixxREFBZ0I7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFJLG1EQUFjO0FBQ2xCO0FBQ0EsQ0FBQztBQUNELHFEQUFnQjtBQUNoQixxREFBZ0I7QUFDaEI7QUFDQTtBQUNBOzs7QUFHQSxFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Byb2plY3RtYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Rhc2ttYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcblxuXG5sZXQgZGF0YUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IHByb2plY3RzID0gW107XG4gICAgbGV0IHRhc2tzID0gW107XG5cbiAgICBsZXQgZGVmYXVsdFByb2plY3RzID0gWydEZWZhdWx0IFByb2plY3QnLCAnV29yayddO1xuICAgIGxldCBkZWZhdWx0VGFza3MgPSBbXG4gICAgICAgIFsgICBcbiAgICAgICAgICAgICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgICAgICdEZWZhdWx0IFByb2plY3QnLFxuICAgICAgICAgICAgJzIwMjItMDctMjcnLFxuICAgICAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1JlYWQgVGhlIEZvdW5kYXRpb24gYnkgSXNhYWMgQXNpbW92JyxcbiAgICAgICAgICAgICdEZWZhdWx0IFByb2plY3QnLFxuICAgICAgICAgICAgJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgXSxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ0xlYXJuIGhvdyB0byB1c2UgbG9jYWxTdG9yYWdlJyxcbiAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgICd0cnVlJyxcbiAgICAgICAgXVxuICAgICAgICAsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdTd2VlcCBhbmQgbW9wIHRoZSBmbG9vcnMnLFxuICAgICAgICAgICAgJ0RlZmF1bHQgUHJvamVjdCcsXG4gICAgICAgICAgICAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICAnZmFsc2UnLFxuICAgICAgICBdXG4gICAgICAgICxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1NlbmQgSmFuIGFuIGVtYWlsIGFib3V0IG91ciB0cmlwIHRvIEphbWFpY2EnLFxuICAgICAgICAgICAgJ1dvcmsnLFxuICAgICAgICAgICAgJzIwMjItMDgtMTEnLFxuICAgICAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgXVxuICAgICAgICAsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdSZXBsYWNlIEdvb2dsZSBDaHJvbWUgd2l0aCBGaXJlZm94JyxcbiAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICcyMDIyLTA0LTA2JyxcbiAgICAgICAgICAgICd0cnVlJyxcbiAgICAgICAgXVxuICAgIF07XG4gICAgXG4gICAgaWYgKHN0b3JhZ2VBdmFpbGFibGUoJ2xvY2FsU3RvcmFnZScpKSB7XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0YXNrcyA9IGNvbnZlcnRTdG9yYWdlRGF0YShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGFza3MnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YXNrcyA9IGRlZmF1bHRUYXNrcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgcHJvamVjdHMgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKS5zcGxpdCgnLCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvamVjdHMgPSBkZWZhdWx0UHJvamVjdHM7XG4gICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgIH0gZWxzZSB7XG4gICAgICAgIHByb2plY3RzID0gZGVmYXVsdFByb2plY3RzO1xuICAgICAgICB0YXNrcyA9IGRlZmF1bHRUYXNrcztcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGNvbnZlcnRTdG9yYWdlRGF0YShkYXRhKSB7XG4gICAgICAgIGxldCB0ZW1wQXJyYXkgPSBkYXRhLnNwbGl0KCcsJylcbiAgICAgICAgbGV0IGNvbnZlcnRlZERhdGEgPSBBcnJheS5mcm9tKEFycmF5KHRlbXBBcnJheS5sZW5ndGgvNCksICgpID0+IG5ldyBBcnJheSg0KSk7XG4gICAgICAgIGxldCBrID0gMDtcbiAgICAgICAgbGV0IGogPSAwO1xuICAgICAgICBmb3IobGV0IGk9MDsgaTwgdGVtcEFycmF5Lmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGs9TWF0aC5mbG9vcihpLzQpO1xuICAgICAgICAgICAgaiA9IGklNDtcbiAgICAgICAgICAgIGNvbnZlcnRlZERhdGFba11bal0gPSB0ZW1wQXJyYXlbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlZERhdGE7XG4gICAgfVxuICAgIFxuICAgIC8vIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwidGFza3NcIiwgdGFza3MpO1xuICAgIC8vIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgcHJvamVjdHMpO1xuICAgIC8vIGNvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpKVxuXG5cbiAgICBmdW5jdGlvbiBzdG9yYWdlQXZhaWxhYmxlKHR5cGUpIHtcbiAgICAgICAgbGV0IHN0b3JhZ2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBzdG9yYWdlID0gd2luZG93W3R5cGVdO1xuICAgICAgICAgICAgY29uc3QgeCA9ICdfX3N0b3JhZ2VfdGVzdF9fJztcbiAgICAgICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh4KTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBlIGluc3RhbmNlb2YgRE9NRXhjZXB0aW9uICYmIChcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5jb2RlID09PSAyMiB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgICAgICAvLyB0ZXN0IG5hbWUgZmllbGQgdG9vLCBiZWNhdXNlIGNvZGUgbWlnaHQgbm90IGJlIHByZXNlbnRcbiAgICAgICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgICAgIC8vIEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdOU19FUlJPUl9ET01fUVVPVEFfUkVBQ0hFRCcpICYmXG4gICAgICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgICAgICAoc3RvcmFnZSAmJiBzdG9yYWdlLmxlbmd0aCAhPT0gMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVMb2NhbFN0b3JhZ2UoKXsgLy9wb3NzaWJseSBub3QgbmVlZGVkXG4gICAgICAgIGxvY2FsU3RvcmFnZS5jbGVhcigpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCB0YXNrcyk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdwcm9qZWN0cycsIHByb2plY3RzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRUYXNrKHRhc2spe1xuICAgICAgICB0YXNrcy5wdXNoKHRhc2spO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGFza3MnLCB0YXNrcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayh0YXNrKXtcbiAgICAgICAgLy8gbGV0IGluZGV4ID0gdGFza3MuZmluZEluZGV4KClcbiAgICAgICAgLy9pbnN0ZWFkIG9mIGZpbmRpbmcgdGhlIHNwZWNpZmljIHRhc2ssIHRoaXMgZnVuY3Rpb24gc2hvdWxkIGV4Y2VwdCBhIG5ldyBsaXN0IG9mIHRhc2tzIGFuZCB1cGRhdGUgdGhlIHN0b3JhZ2Ugd2l0aCB0aGF0IGluc3RlYWRcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUYXNrcygpe1xuICAgICAgICByZXR1cm4gdGFza3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2V0VGFzazogc2V0VGFzayxcbiAgICAgICAgZ2V0VGFza3M6IGdldFRhc2tzLFxuICAgICAgICBkZWxldGVUYXNrOiBkZWxldGVUYXNrLFxuXG4gICAgfVxuXG59KSgpO1xuXG5cblxuZXhwb3J0IHtkYXRhQ29udHJvbGxlcn07IiwiaW1wb3J0IHsgcHVic3ViIH0gZnJvbSBcIi4vcHVic3ViXCI7XG5cblxubGV0IHByb2plY3RDb250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCBtZW51SXRlbXMgPSBbLi4uZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVudS1pdGVtJyldO1xuICAgIGNvbnN0IHByb2plY3RMaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtbGlzdCcpO1xuICAgIGNvbnN0IGRsdFByb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlLXByb2plY3QtYnV0dG9uJyk7XG4gICAgZGx0UHJvamVjdEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy1wcm9qZWN0LXJlcXVlc3QnLCBuZXdQcm9qZWN0UmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJvamVjdC1hZGRlZCcsIG5ld1Byb2plY3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy1wcm9qZWN0LWNhbmNlbGxlZCcsIGNhbmNlbFByb2plY3RSZXF1ZXN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBtZW51SXRlbVNlbGVjdGlvbik7XG5cbiAgICBsZXQgcHJvamVjdHMgPSBbJ0RlZmF1bHQgUHJvamVjdCcsICd0ZXN0J107XG5cbiAgICByZW5kZXIoKTtcblxuICAgIGZvcihsZXQgaT0wOyBpPD0yOyBpKyspe1xuICAgICAgICBtZW51SXRlbXNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ21lbnUtaXRlbS1zZWxlY3RlZCcsIG1lbnVJdGVtc1tpXSk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVudUl0ZW1TZWxlY3Rpb24oc2VsZWN0ZWRJdGVtKSB7XG4gICAgICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGVjdGVkSXRlbS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQcm9qZWN0UmVxdWVzdCgpIHtcbiAgICAgICAgY29uc3QgbGlQcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGlucHV0UHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5wbGFjZWhvbGRlciA9ICdQcm9qZWN0IG5hbWUnXG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSk9PntcbiAgICAgICAgICAgIGlmKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3QtYWRkZWQnLCBpbnB1dFByb2plY3ROYW1lLnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGlQcm9qZWN0TmFtZS5hcHBlbmRDaGlsZChpbnB1dFByb2plY3ROYW1lKTtcblxuICAgICAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0LWFkZGVkJywgaW5wdXRQcm9qZWN0TmFtZS52YWx1ZSlcbiAgICAgICAgfSk7XG4gICAgICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtcHJpbWFyeScsICdpcy1saWdodCcsICduZXctcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctcHJvamVjdC1jYW5jZWxsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgY2FuY2VsQnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdpcy1kYW5nZXInLCAnaXMtbGlnaHQnLCAnbmV3LXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ0bi50ZXh0Q29udGVudCA9ICdDYW5jZWwnO1xuXG4gICAgICAgIGNvbnN0IGJ0bkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQoYWRkQnRuKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGNhbmNlbEJ0bik7XG4gICAgICAgIGxpUHJvamVjdE5hbWUuYXBwZW5kQ2hpbGQoYnRuRGl2KTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlQcm9qZWN0TmFtZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3UHJvamVjdChwcm9qZWN0TmFtZSkge1xuICAgICAgICBwcm9qZWN0cy5wdXNoKHByb2plY3ROYW1lKTtcbiAgICAgICAgcHJvamVjdExpc3QubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChidWlsZFByb2plY3RMaXN0SXRlbShwcm9qZWN0TmFtZSkpOyA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYnVpbGRQcm9qZWN0TGlzdEl0ZW0ocHJvamVjdE5hbWUpe1xuICAgICAgICBjb25zdCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIGNvbnN0IGFuY2hvckVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuaW5uZXJUZXh0ID0gcHJvamVjdE5hbWU7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ21lbnUtaXRlbS1zZWxlY3RlZCcsIGFuY2hvckVsZW1lbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5jaG9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZW51LWl0ZW0nKTtcbiAgICAgICAgbWVudUl0ZW1TZWxlY3Rpb24oYW5jaG9yRWxlbWVudCk7XG4gICAgICAgIG1lbnVJdGVtcy5wdXNoKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChhbmNob3JFbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIGxpc3RFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFByb2plY3RSZXF1ZXN0KCkge1xuICAgICAgICBwcm9qZWN0TGlzdC5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQoYnVpbGRQcm9qZWN0TGlzdEl0ZW0ocHJvamVjdCkpO1xuICAgICAgICB9KTtcbiAgICB9XG59KSgpXG5cbmV4cG9ydCB7cHJvamVjdENvbnRyb2xsZXJ9OyIsInZhciBwdWJzdWIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCBldmVudHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZSAoZXZlbnROYW1lLCBmbikge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdWJsaXNoIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICAgICAgcHVibGlzaDogcHVibGlzaCxcbiAgICB9XG59KSgpO1xuXG5leHBvcnQge3B1YnN1Yn07IiwiaW1wb3J0IHtwdWJzdWJ9IGZyb20gXCIuL3B1YnN1YlwiO1xuaW1wb3J0IHtkYXRhQ29udHJvbGxlcn0gZnJvbSBcIi4vZGF0YVwiO1xuaW1wb3J0IGlzVGhpc1dlZWsgZnJvbSAnZGF0ZS1mbnMvaXNUaGlzV2Vlayc7XG5pbXBvcnQgaXNUb2RheSBmcm9tICdkYXRlLWZucy9pc1RvZGF5JztcblxubGV0IHRhc2tNYW5hZ2VyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLWJvZHknKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1yZXF1ZXN0JywgbmV3VGFza1JlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCBuZXdUYXNrKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1jYW5jZWxsZWQnLCBjYW5jZWxUYXNrUmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbWVudS1pdGVtLXNlbGVjdGVkJywgZmlsdGVyVGFza3MpO1xuXG4gICAgbGV0IHRhc2tzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0YXNrRGVzYzogJ0dvIGdyb2Nlcnkgc2hvcHBpbmcnLFxuICAgICAgICAgICAgZHVlRGF0ZTogJzIwMjItMDctMjcnLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0YXNrRGVzYzogJ1JlYWQgYSBib29rJyxcbiAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0YXNrRGVzYzogJ1Rlc3QgZXhhbXBsZScsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICBdXG4gICAgLy8gY29uc29sZS50YWJsZSh0YXNrcylcblxuICAgIGxldCB0YXNrczIgPSBkYXRhQ29udHJvbGxlci5nZXRUYXNrcygpO1xuICAgIC8vIGNvbnNvbGUudGFibGUodGFza3MyKVxuXG4gICAgcmVuZGVyVGFza3MoKTtcblxuICAgIGZ1bmN0aW9uIG5ld1Rhc2tSZXF1ZXN0KCkge1xuICAgICAgICBjb25zdCB0ZEFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrLWFkZGVkJywge1xuICAgICAgICAgICAgdGFza0Rlc2M6IGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICl9KTtcbiAgICAgICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdpcy1wcmltYXJ5JywgJ2lzLWxpZ2h0Jyk7XG4gICAgICAgIGFkZEJ0bi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICB0ZEFkZEJ0bi5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRkVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBpbnB1dFRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0VGFza05hbWUucGxhY2Vob2xkZXIgPSAnR28gZ3JvY2VyeSBzaG9wcGluZy4uLidcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKT0+e1xuICAgICAgICAgICAgaWYoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFzay1hZGRlZCcsIHtcbiAgICAgICAgICAgICAgICB0YXNrRGVzYzogaW5wdXRUYXNrTmFtZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0ZFRhc2tOYW1lLmFwcGVuZENoaWxkKGlucHV0VGFza05hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgaW5wdXREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXREdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICB0ZER1ZURhdGUuYXBwZW5kQ2hpbGQoaW5wdXREdWVEYXRlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3RhZycsICdpcy1kZWxldGUnKTtcbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1jYW5jZWxsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZERlbGV0ZS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRBZGRCdG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICBcbiAgICAgICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFRhc2tSZXF1ZXN0KCkge1xuICAgICAgICB0YWJsZUJvZHkuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3MudW5zaGlmdCh0YXNrKTtcbiAgICAgICAgcmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhclRhYmxlKCkge1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIHJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNsZWFyVGFibGUoKTtcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRkQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgY29uc3QgbGJsQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbGJsQ2hlY2tCdG4uY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNoZWNrQnRuLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsYmxDaGVja0J0bi5hcHBlbmRDaGlsZChjaGVja0J0bik7XG4gICAgICAgICAgICB0ZENoZWNrQnRuLmFwcGVuZENoaWxkKGxibENoZWNrQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZFRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGFza0Rlc2M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZER1ZURhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2soaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgndGFnJywgJ2lzLWRlbGV0ZScpO1xuICAgICAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRDaGVja0J0bik7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRHVlRGF0ZSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgICAgICAgICBpZiAodGFzay5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tCdG4uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaWx0ZXJUYXNrcyhtZW51SXRlbSkge1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhtZW51SXRlbS5pbm5lclRleHQpXG4gICAgICAgIC8vZmlsdGVyIHRhc2tzIGJhc2VkIG9uIHdoaWNoIHByb2plY3QgaXMgc2VsZWN0ZWQgYW5kIHVwZGF0ZSBhIHZhcmlhYmxlIHRoYXQgaXMgbWF5YmUgY2FsbGVkIGRpc3BsYXllZFRhc2tzXG4gICAgICAgIC8vdXBkYXRlIHRoZSB0YWJsZSB0aXRsZVxuXG4gICAgfVxufSkoKTtcblxuXG5leHBvcnQge3Rhc2tNYW5hZ2VyfTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3Rhc2tNYW5hZ2VyfSBmcm9tICcuL3Rhc2ttYW5hZ2VyJztcbmltcG9ydCB7bWVudUNvbnRyb2xsZXJ9IGZyb20gJy4vcHJvamVjdG1hbmFnZXInXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL3B1YnN1Yic7XG5cbmNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYnV0dG9uJyk7XG5uZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3LXRhc2stcmVxdWVzdCcpO1xuICAgIHRhc2tCdG5Ub2dnbGUoKTsgICAgXG59KTtcbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCB0YXNrQnRuVG9nZ2xlKVxucHVic3ViLnN1YnNjcmliZSgnbmV3LXRhc2stY2FuY2VsbGVkJywgdGFza0J0blRvZ2dsZSk7XG5mdW5jdGlvbiB0YXNrQnRuVG9nZ2xlKCkge1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5jb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xubmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgcHVic3ViLnB1Ymxpc2goJ25ldy1wcm9qZWN0LXJlcXVlc3QnKTtcbiAgICBwcm9qZWN0QnRuVG9nZ2xlKCk7ICAgIFxufSk7XG5wdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgcHJvamVjdEJ0blRvZ2dsZSlcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ldy1wcm9qZWN0LWNhbmNlbGxlZCcsIHByb2plY3RCdG5Ub2dnbGUpO1xuZnVuY3Rpb24gcHJvamVjdEJ0blRvZ2dsZSgpIHtcbiAgICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWxvYWRpbmcnKTtcbn1cblxuXG4gICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==