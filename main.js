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
        inputProjectName.placeholder = 'Project name';
        inputProjectName.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') {
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('project-added', inputProjectName.value);
            }
        });
        liProjectName.appendChild(inputProjectName);

        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('project-added', inputProjectName.value);
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
    const tableTitle = document.getElementById('table-title');
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-task-request', newTaskRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('task-added', newTask);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-task-cancelled', cancelTaskRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('menu-item-selected', filterTasks);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('menu-item-selected', tableTitleUpdate);

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
                _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('task-added', [
                inputTaskName.value,
                // project name,
                inputDueDate.value,
                'false',
                ])
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

    function tableTitleUpdate(menuItem){
        tableTitle.textContent = menuItem.textContent;
    }

    function filterTasks(menuItem) {
        let filterValue = menuItem.innerText;
        if (filterValue == 'All Tasks') {
            return getTasks();
        } else if(filterValue == 'Today'){
            
        } else if(filterValue == 'This Week'){

        } else {

        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDSztBQUNiOztBQUVsQztBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7O0FBR0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wcm9qZWN0bWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy90YXNrbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxubGV0IGRhdGFDb250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIGxldCBwcm9qZWN0cyA9IFtdO1xuICAgIGxldCB0YXNrcyA9IFtdO1xuXG4gICAgbGV0IGRlZmF1bHRQcm9qZWN0cyA9IFsnRGVmYXVsdCBQcm9qZWN0JywgJ1dvcmsnXTtcbiAgICBsZXQgZGVmYXVsdFRhc2tzID0gW1xuICAgICAgICBbICAgXG4gICAgICAgICAgICAnR28gZ3JvY2VyeSBzaG9wcGluZycsXG4gICAgICAgICAgICAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgICAgICcyMDIyLTA3LTI3JyxcbiAgICAgICAgICAgICdmYWxzZScsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdSZWFkIFRoZSBGb3VuZGF0aW9uIGJ5IElzYWFjIEFzaW1vdicsXG4gICAgICAgICAgICAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgICAgICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgICdmYWxzZScsXG4gICAgICAgIF0sXG4gICAgICAgIFtcbiAgICAgICAgICAgICdMZWFybiBob3cgdG8gdXNlIGxvY2FsU3RvcmFnZScsXG4gICAgICAgICAgICAnV29yaycsXG4gICAgICAgICAgICAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICAndHJ1ZScsXG4gICAgICAgIF1cbiAgICAgICAgLFxuICAgICAgICBbXG4gICAgICAgICAgICAnU3dlZXAgYW5kIG1vcCB0aGUgZmxvb3JzJyxcbiAgICAgICAgICAgICdEZWZhdWx0IFByb2plY3QnLFxuICAgICAgICAgICAgJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgJ2ZhbHNlJyxcbiAgICAgICAgXVxuICAgICAgICAsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdTZW5kIEphbiBhbiBlbWFpbCBhYm91dCBvdXIgdHJpcCB0byBKYW1haWNhJyxcbiAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICcyMDIyLTA4LTExJyxcbiAgICAgICAgICAgICdmYWxzZScsXG4gICAgICAgIF1cbiAgICAgICAgLFxuICAgICAgICBbXG4gICAgICAgICAgICAnUmVwbGFjZSBHb29nbGUgQ2hyb21lIHdpdGggRmlyZWZveCcsXG4gICAgICAgICAgICAnV29yaycsXG4gICAgICAgICAgICAnMjAyMi0wNC0wNicsXG4gICAgICAgICAgICAndHJ1ZScsXG4gICAgICAgIF1cbiAgICBdO1xuICAgIFxuICAgIGlmIChzdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgICAgICBpZiAobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGFza3MgPSBjb252ZXJ0U3RvcmFnZURhdGEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGFza3MgPSBkZWZhdWx0VGFza3M7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpICE9IG51bGwpIHtcbiAgICAgICAgICAgIHByb2plY3RzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykuc3BsaXQoJywnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2plY3RzID0gZGVmYXVsdFByb2plY3RzO1xuICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcm9qZWN0cyA9IGRlZmF1bHRQcm9qZWN0cztcbiAgICAgICAgdGFza3MgPSBkZWZhdWx0VGFza3M7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0U3RvcmFnZURhdGEoZGF0YSkge1xuICAgICAgICBsZXQgdGVtcEFycmF5ID0gZGF0YS5zcGxpdCgnLCcpXG4gICAgICAgIGxldCBjb252ZXJ0ZWREYXRhID0gQXJyYXkuZnJvbShBcnJheSh0ZW1wQXJyYXkubGVuZ3RoLzQpLCAoKSA9PiBuZXcgQXJyYXkoNCkpO1xuICAgICAgICBsZXQgayA9IDA7XG4gICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBrPU1hdGguZmxvb3IoaS80KTtcbiAgICAgICAgICAgIGogPSBpJTQ7XG4gICAgICAgICAgICBjb252ZXJ0ZWREYXRhW2tdW2pdID0gdGVtcEFycmF5W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb252ZXJ0ZWREYXRhO1xuICAgIH1cbiAgICBcbiAgICAvLyBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIHRhc2tzKTtcbiAgICAvLyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIHByb2plY3RzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSlcblxuXG4gICAgZnVuY3Rpb24gc3RvcmFnZUF2YWlsYWJsZSh0eXBlKSB7XG4gICAgICAgIGxldCBzdG9yYWdlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc3RvcmFnZSA9IHdpbmRvd1t0eXBlXTtcbiAgICAgICAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgICAgICBzdG9yYWdlLnNldEl0ZW0oeCwgeCk7XG4gICAgICAgICAgICBzdG9yYWdlLnJlbW92ZUl0ZW0oeCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgICAgIGUuY29kZSA9PT0gMjIgfHxcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5jb2RlID09PSAxMDE0IHx8XG4gICAgICAgICAgICAgICAgLy8gdGVzdCBuYW1lIGZpZWxkIHRvbywgYmVjYXVzZSBjb2RlIG1pZ2h0IG5vdCBiZSBwcmVzZW50XG4gICAgICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgICAgIGUubmFtZSA9PT0gJ1F1b3RhRXhjZWVkZWRFcnJvcicgfHxcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgICAgIC8vIGFja25vd2xlZGdlIFF1b3RhRXhjZWVkZWRFcnJvciBvbmx5IGlmIHRoZXJlJ3Mgc29tZXRoaW5nIGFscmVhZHkgc3RvcmVkXG4gICAgICAgICAgICAgICAgKHN0b3JhZ2UgJiYgc3RvcmFnZS5sZW5ndGggIT09IDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTG9jYWxTdG9yYWdlKCl7IC8vcG9zc2libHkgbm90IG5lZWRlZFxuICAgICAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgdGFza3MpO1xuICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgncHJvamVjdHMnLCBwcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0VGFzayh0YXNrKXtcbiAgICAgICAgdGFza3MucHVzaCh0YXNrKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Rhc2tzJywgdGFza3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVRhc2sodGFzayl7XG4gICAgICAgIC8vIGxldCBpbmRleCA9IHRhc2tzLmZpbmRJbmRleCgpXG4gICAgICAgIC8vaW5zdGVhZCBvZiBmaW5kaW5nIHRoZSBzcGVjaWZpYyB0YXNrLCB0aGlzIGZ1bmN0aW9uIHNob3VsZCBleGNlcHQgYSBuZXcgbGlzdCBvZiB0YXNrcyBhbmQgdXBkYXRlIHRoZSBzdG9yYWdlIHdpdGggdGhhdCBpbnN0ZWFkXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGFza3MoKXtcbiAgICAgICAgcmV0dXJuIHRhc2tzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNldFRhc2s6IHNldFRhc2ssXG4gICAgICAgIGdldFRhc2tzOiBnZXRUYXNrcyxcbiAgICAgICAgZGVsZXRlVGFzazogZGVsZXRlVGFzayxcblxuICAgIH1cblxufSkoKTtcblxuXG5cbmV4cG9ydCB7ZGF0YUNvbnRyb2xsZXJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5cbmxldCBwcm9qZWN0Q29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgbWVudUl0ZW1zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaXRlbScpXTtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICBjb25zdCBkbHRQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGRsdFByb2plY3RCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctcHJvamVjdC1yZXF1ZXN0JywgbmV3UHJvamVjdFJlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3QtYWRkZWQnLCBuZXdQcm9qZWN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctcHJvamVjdC1jYW5jZWxsZWQnLCBjYW5jZWxQcm9qZWN0UmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbWVudS1pdGVtLXNlbGVjdGVkJywgbWVudUl0ZW1TZWxlY3Rpb24pO1xuXG4gICAgbGV0IHByb2plY3RzID0gWydEZWZhdWx0IFByb2plY3QnLCAndGVzdCddO1xuXG4gICAgcmVuZGVyKCk7XG5cbiAgICBmb3IobGV0IGk9MDsgaTw9MjsgaSsrKXtcbiAgICAgICAgbWVudUl0ZW1zW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBtZW51SXRlbXNbaV0pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lbnVJdGVtU2VsZWN0aW9uKHNlbGVjdGVkSXRlbSkge1xuICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3UHJvamVjdFJlcXVlc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpUHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBpbnB1dFByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUucGxhY2Vob2xkZXIgPSAnUHJvamVjdCBuYW1lJztcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKT0+e1xuICAgICAgICAgICAgaWYoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJvamVjdC1hZGRlZCcsIGlucHV0UHJvamVjdE5hbWUudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGlQcm9qZWN0TmFtZS5hcHBlbmRDaGlsZChpbnB1dFByb2plY3ROYW1lKTtcblxuICAgICAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0LWFkZGVkJywgaW5wdXRQcm9qZWN0TmFtZS52YWx1ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnLCAnbmV3LXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ0bi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3LXByb2plY3QtY2FuY2VsbGVkJyk7XG4gICAgICAgIH0pXG4gICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtZGFuZ2VyJywgJ2lzLWxpZ2h0JywgJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcblxuICAgICAgICBjb25zdCBidG5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGFkZEJ0bik7XG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgICAgICBsaVByb2plY3ROYW1lLmFwcGVuZENoaWxkKGJ0bkRpdik7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpUHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Byb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHByb2plY3RMaXN0Lmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQoYnVpbGRQcm9qZWN0TGlzdEl0ZW0ocHJvamVjdE5hbWUpKTsgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJ1aWxkUHJvamVjdExpc3RJdGVtKHByb2plY3ROYW1lKXtcbiAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBhbmNob3JFbGVtZW50LmlubmVyVGV4dCA9IHByb2plY3ROYW1lO1xuICAgICAgICBhbmNob3JFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBhbmNob3JFbGVtZW50KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGFuY2hvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbWVudS1pdGVtJyk7XG4gICAgICAgIG1lbnVJdGVtU2VsZWN0aW9uKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBtZW51SXRlbXMucHVzaChhbmNob3JFbGVtZW50KTtcbiAgICAgICAgbGlzdEVsZW1lbnQuYXBwZW5kQ2hpbGQoYW5jaG9yRWxlbWVudCk7XG4gICAgICAgIHJldHVybiBsaXN0RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5jZWxQcm9qZWN0UmVxdWVzdCgpIHtcbiAgICAgICAgcHJvamVjdExpc3QubGFzdENoaWxkLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGJ1aWxkUHJvamVjdExpc3RJdGVtKHByb2plY3QpKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKVxuXG5leHBvcnQge3Byb2plY3RDb250cm9sbGVyfTsiLCJ2YXIgcHVic3ViID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaCAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIHB1Ymxpc2g6IHB1Ymxpc2gsXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7cHVic3VifSBmcm9tIFwiLi9wdWJzdWJcIjtcbmltcG9ydCB7ZGF0YUNvbnRyb2xsZXJ9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBpc1RoaXNXZWVrIGZyb20gJ2RhdGUtZm5zL2lzVGhpc1dlZWsnO1xuaW1wb3J0IGlzVG9kYXkgZnJvbSAnZGF0ZS1mbnMvaXNUb2RheSc7XG5cbmxldCB0YXNrTWFuYWdlciA9IChmdW5jdGlvbigpe1xuICAgIGNvbnN0IHRhYmxlQm9keSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZS1ib2R5Jyk7XG4gICAgY29uc3QgdGFibGVUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWJsZS10aXRsZScpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy10YXNrLXJlcXVlc3QnLCBuZXdUYXNrUmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgndGFzay1hZGRlZCcsIG5ld1Rhc2spO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy10YXNrLWNhbmNlbGxlZCcsIGNhbmNlbFRhc2tSZXF1ZXN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBmaWx0ZXJUYXNrcyk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbWVudS1pdGVtLXNlbGVjdGVkJywgdGFibGVUaXRsZVVwZGF0ZSk7XG5cbiAgICBsZXQgdGFza3MgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhc2tEZXNjOiAnR28gZ3JvY2VyeSBzaG9wcGluZycsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNy0yNycsXG4gICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhc2tEZXNjOiAnUmVhZCBhIGJvb2snLFxuICAgICAgICAgICAgZHVlRGF0ZTogJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRhc2tEZXNjOiAnVGVzdCBleGFtcGxlJyxcbiAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIF1cbiAgICAvLyBjb25zb2xlLnRhYmxlKHRhc2tzKVxuXG4gICAgbGV0IHRhc2tzMiA9IGRhdGFDb250cm9sbGVyLmdldFRhc2tzKCk7XG4gICAgLy8gY29uc29sZS50YWJsZSh0YXNrczIpXG5cbiAgICByZW5kZXJUYXNrcygpO1xuXG4gICAgZnVuY3Rpb24gbmV3VGFza1JlcXVlc3QoKSB7XG4gICAgICAgIGNvbnN0IHRkQWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2stYWRkZWQnLCB7XG4gICAgICAgICAgICB0YXNrRGVzYzogaW5wdXRUYXNrTmFtZS52YWx1ZSxcbiAgICAgICAgICAgIGR1ZURhdGU6IGlucHV0RHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgKX0pO1xuICAgICAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnKTtcbiAgICAgICAgYWRkQnRuLnRleHRDb250ZW50ID0gJ0FkZCc7XG4gICAgICAgIHRkQWRkQnRuLmFwcGVuZENoaWxkKGFkZEJ0bik7XG5cbiAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGlucHV0VGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0VGFza05hbWUudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5wbGFjZWhvbGRlciA9ICdHbyBncm9jZXJ5IHNob3BwaW5nLi4uJ1xuICAgICAgICBpbnB1dFRhc2tOYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpPT57XG4gICAgICAgICAgICBpZihlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrLWFkZGVkJywgW1xuICAgICAgICAgICAgICAgIGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICAgICAgLy8gcHJvamVjdCBuYW1lLFxuICAgICAgICAgICAgICAgIGlucHV0RHVlRGF0ZS52YWx1ZSxcbiAgICAgICAgICAgICAgICAnZmFsc2UnLFxuICAgICAgICAgICAgICAgIF0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0ZFRhc2tOYW1lLmFwcGVuZENoaWxkKGlucHV0VGFza05hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgaW5wdXREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXREdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICB0ZER1ZURhdGUuYXBwZW5kQ2hpbGQoaW5wdXREdWVEYXRlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3RhZycsICdpcy1kZWxldGUnKTtcbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1jYW5jZWxsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZERlbGV0ZS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRBZGRCdG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICBcbiAgICAgICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFRhc2tSZXF1ZXN0KCkge1xuICAgICAgICB0YWJsZUJvZHkuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3MudW5zaGlmdCh0YXNrKTtcbiAgICAgICAgcmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhclRhYmxlKCkge1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIHJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNsZWFyVGFibGUoKTtcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRkQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgY29uc3QgbGJsQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbGJsQ2hlY2tCdG4uY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNoZWNrQnRuLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsYmxDaGVja0J0bi5hcHBlbmRDaGlsZChjaGVja0J0bik7XG4gICAgICAgICAgICB0ZENoZWNrQnRuLmFwcGVuZENoaWxkKGxibENoZWNrQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZFRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGFza0Rlc2M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZER1ZURhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2soaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgndGFnJywgJ2lzLWRlbGV0ZScpO1xuICAgICAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRDaGVja0J0bik7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRHVlRGF0ZSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgICAgICAgICBpZiAodGFzay5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tCdG4uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0YWJsZVRpdGxlVXBkYXRlKG1lbnVJdGVtKXtcbiAgICAgICAgdGFibGVUaXRsZS50ZXh0Q29udGVudCA9IG1lbnVJdGVtLnRleHRDb250ZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbHRlclRhc2tzKG1lbnVJdGVtKSB7XG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IG1lbnVJdGVtLmlubmVyVGV4dDtcbiAgICAgICAgaWYgKGZpbHRlclZhbHVlID09ICdBbGwgVGFza3MnKSB7XG4gICAgICAgICAgICByZXR1cm4gZ2V0VGFza3MoKTtcbiAgICAgICAgfSBlbHNlIGlmKGZpbHRlclZhbHVlID09ICdUb2RheScpe1xuICAgICAgICAgICAgXG4gICAgICAgIH0gZWxzZSBpZihmaWx0ZXJWYWx1ZSA9PSAnVGhpcyBXZWVrJyl7XG5cbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICB9XG4gICAgICAgIC8vZmlsdGVyIHRhc2tzIGJhc2VkIG9uIHdoaWNoIHByb2plY3QgaXMgc2VsZWN0ZWQgYW5kIHVwZGF0ZSBhIHZhcmlhYmxlIHRoYXQgaXMgbWF5YmUgY2FsbGVkIGRpc3BsYXllZFRhc2tzXG4gICAgICAgIC8vdXBkYXRlIHRoZSB0YWJsZSB0aXRsZVxuXG4gICAgfVxufSkoKTtcblxuXG5leHBvcnQge3Rhc2tNYW5hZ2VyfTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3Rhc2tNYW5hZ2VyfSBmcm9tICcuL3Rhc2ttYW5hZ2VyJztcbmltcG9ydCB7bWVudUNvbnRyb2xsZXJ9IGZyb20gJy4vcHJvamVjdG1hbmFnZXInXG5pbXBvcnQgeyBwdWJzdWIgfSBmcm9tICcuL3B1YnN1Yic7XG5cbmNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYnV0dG9uJyk7XG5uZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3LXRhc2stcmVxdWVzdCcpO1xuICAgIHRhc2tCdG5Ub2dnbGUoKTsgICAgXG59KTtcbnB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCB0YXNrQnRuVG9nZ2xlKVxucHVic3ViLnN1YnNjcmliZSgnbmV3LXRhc2stY2FuY2VsbGVkJywgdGFza0J0blRvZ2dsZSk7XG5mdW5jdGlvbiB0YXNrQnRuVG9nZ2xlKCkge1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5jb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xubmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgcHVic3ViLnB1Ymxpc2goJ25ldy1wcm9qZWN0LXJlcXVlc3QnKTtcbiAgICBwcm9qZWN0QnRuVG9nZ2xlKCk7ICAgIFxufSk7XG5wdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgcHJvamVjdEJ0blRvZ2dsZSlcbnB1YnN1Yi5zdWJzY3JpYmUoJ25ldy1wcm9qZWN0LWNhbmNlbGxlZCcsIHByb2plY3RCdG5Ub2dnbGUpO1xuZnVuY3Rpb24gcHJvamVjdEJ0blRvZ2dsZSgpIHtcbiAgICBuZXdQcm9qZWN0QnRuLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWxvYWRpbmcnKTtcbn1cblxuXG4gICJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==