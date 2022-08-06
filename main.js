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

    let projects = ['Default Project'];

    render();

    menuItems.forEach(item => {
        item.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('menu-item-selected', item);
        })
    });

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
        anchorElement.addEventListener('click', function(){
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('project-selected', projectName);
        });
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
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('project-selected', filterTasksByProject);

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

    function filterTasksByProject(project) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LHFEQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksbURBQWM7QUFDbEI7QUFDQSxDQUFDO0FBQ0QscURBQWdCO0FBQ2hCLHFEQUFnQjtBQUNoQjtBQUNBO0FBQ0E7OztBQUdBLEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvZGF0YS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvcHJvamVjdG1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3B1YnN1Yi5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvdGFza21hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlxuXG5cbmxldCBkYXRhQ29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgcHJvamVjdHMgPSBbXTtcbiAgICBsZXQgdGFza3MgPSBbXTtcblxuICAgIGxldCBkZWZhdWx0UHJvamVjdHMgPSBbJ0RlZmF1bHQgUHJvamVjdCcsICdXb3JrJ107XG4gICAgbGV0IGRlZmF1bHRUYXNrcyA9IFtcbiAgICAgICAgWyAgIFxuICAgICAgICAgICAgJ0dvIGdyb2Nlcnkgc2hvcHBpbmcnLFxuICAgICAgICAgICAgJ0RlZmF1bHQgUHJvamVjdCcsXG4gICAgICAgICAgICAnMjAyMi0wNy0yNycsXG4gICAgICAgICAgICAnZmFsc2UnLFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAnUmVhZCBUaGUgRm91bmRhdGlvbiBieSBJc2FhYyBBc2ltb3YnLFxuICAgICAgICAgICAgJ0RlZmF1bHQgUHJvamVjdCcsXG4gICAgICAgICAgICAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICAnZmFsc2UnLFxuICAgICAgICBdLFxuICAgICAgICBbXG4gICAgICAgICAgICAnTGVhcm4gaG93IHRvIHVzZSBsb2NhbFN0b3JhZ2UnLFxuICAgICAgICAgICAgJ1dvcmsnLFxuICAgICAgICAgICAgJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgJ3RydWUnLFxuICAgICAgICBdXG4gICAgICAgICxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1N3ZWVwIGFuZCBtb3AgdGhlIGZsb29ycycsXG4gICAgICAgICAgICAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgICAgICcyMDIyLTA1LTMxJyxcbiAgICAgICAgICAgICdmYWxzZScsXG4gICAgICAgIF1cbiAgICAgICAgLFxuICAgICAgICBbXG4gICAgICAgICAgICAnU2VuZCBKYW4gYW4gZW1haWwgYWJvdXQgb3VyIHRyaXAgdG8gSmFtYWljYScsXG4gICAgICAgICAgICAnV29yaycsXG4gICAgICAgICAgICAnMjAyMi0wOC0xMScsXG4gICAgICAgICAgICAnZmFsc2UnLFxuICAgICAgICBdXG4gICAgICAgICxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ1JlcGxhY2UgR29vZ2xlIENocm9tZSB3aXRoIEZpcmVmb3gnLFxuICAgICAgICAgICAgJ1dvcmsnLFxuICAgICAgICAgICAgJzIwMjItMDQtMDYnLFxuICAgICAgICAgICAgJ3RydWUnLFxuICAgICAgICBdXG4gICAgXTtcbiAgICBcbiAgICBpZiAoc3RvcmFnZUF2YWlsYWJsZSgnbG9jYWxTdG9yYWdlJykpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRhc2tzID0gY29udmVydFN0b3JhZ2VEYXRhKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0YXNrcycpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRhc2tzID0gZGVmYXVsdFRhc2tzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgncHJvamVjdHMnKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBwcm9qZWN0cyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdwcm9qZWN0cycpLnNwbGl0KCcsJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9qZWN0cyA9IGRlZmF1bHRQcm9qZWN0cztcbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJvamVjdHMgPSBkZWZhdWx0UHJvamVjdHM7XG4gICAgICAgIHRhc2tzID0gZGVmYXVsdFRhc2tzO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gY29udmVydFN0b3JhZ2VEYXRhKGRhdGEpIHtcbiAgICAgICAgbGV0IHRlbXBBcnJheSA9IGRhdGEuc3BsaXQoJywnKVxuICAgICAgICBsZXQgY29udmVydGVkRGF0YSA9IEFycmF5LmZyb20oQXJyYXkodGVtcEFycmF5Lmxlbmd0aC80KSwgKCkgPT4gbmV3IEFycmF5KDQpKTtcbiAgICAgICAgbGV0IGsgPSAwO1xuICAgICAgICBsZXQgaiA9IDA7XG4gICAgICAgIGZvcihsZXQgaT0wOyBpPCB0ZW1wQXJyYXkubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgaz1NYXRoLmZsb29yKGkvNCk7XG4gICAgICAgICAgICBqID0gaSU0O1xuICAgICAgICAgICAgY29udmVydGVkRGF0YVtrXVtqXSA9IHRlbXBBcnJheVtpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udmVydGVkRGF0YTtcbiAgICB9XG4gICAgXG4gICAgLy8gbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJ0YXNrc1wiLCB0YXNrcyk7XG4gICAgLy8gbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBwcm9qZWN0cyk7XG4gICAgLy8gY29uc29sZS5sb2cobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Byb2plY3RzJykpXG5cblxuICAgIGZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgICAgICBsZXQgc3RvcmFnZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgICAgICBjb25zdCB4ID0gJ19fc3RvcmFnZV90ZXN0X18nO1xuICAgICAgICAgICAgc3RvcmFnZS5zZXRJdGVtKHgsIHgpO1xuICAgICAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgcmV0dXJuIGUgaW5zdGFuY2VvZiBET01FeGNlcHRpb24gJiYgKFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUuY29kZSA9PT0gMTAxNCB8fFxuICAgICAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgICAgIC8vIGV2ZXJ5dGhpbmcgZXhjZXB0IEZpcmVmb3hcbiAgICAgICAgICAgICAgICBlLm5hbWUgPT09ICdRdW90YUV4Y2VlZGVkRXJyb3InIHx8XG4gICAgICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgICAgIGUubmFtZSA9PT0gJ05TX0VSUk9SX0RPTV9RVU9UQV9SRUFDSEVEJykgJiZcbiAgICAgICAgICAgICAgICAvLyBhY2tub3dsZWRnZSBRdW90YUV4Y2VlZGVkRXJyb3Igb25seSBpZiB0aGVyZSdzIHNvbWV0aGluZyBhbHJlYWR5IHN0b3JlZFxuICAgICAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZSgpeyAvL3Bvc3NpYmx5IG5vdCBuZWVkZWRcbiAgICAgICAgbG9jYWxTdG9yYWdlLmNsZWFyKCk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIHRhc2tzKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3Byb2plY3RzJywgcHJvamVjdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFRhc2sodGFzayl7XG4gICAgICAgIHRhc2tzLnB1c2godGFzayk7XG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0YXNrcycsIHRhc2tzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKHRhc2spe1xuICAgICAgICAvLyBsZXQgaW5kZXggPSB0YXNrcy5maW5kSW5kZXgoKVxuICAgICAgICAvL2luc3RlYWQgb2YgZmluZGluZyB0aGUgc3BlY2lmaWMgdGFzaywgdGhpcyBmdW5jdGlvbiBzaG91bGQgZXhjZXB0IGEgbmV3IGxpc3Qgb2YgdGFza3MgYW5kIHVwZGF0ZSB0aGUgc3RvcmFnZSB3aXRoIHRoYXQgaW5zdGVhZFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFRhc2tzKCl7XG4gICAgICAgIHJldHVybiB0YXNrcztcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzZXRUYXNrOiBzZXRUYXNrLFxuICAgICAgICBnZXRUYXNrczogZ2V0VGFza3MsXG4gICAgICAgIGRlbGV0ZVRhc2s6IGRlbGV0ZVRhc2ssXG5cbiAgICB9XG5cbn0pKCk7XG5cblxuXG5leHBvcnQge2RhdGFDb250cm9sbGVyfTsiLCJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuXG5sZXQgcHJvamVjdENvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LWl0ZW0nKV07XG4gICAgY29uc3QgcHJvamVjdExpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1saXN0Jyk7XG4gICAgY29uc3QgZGx0UHJvamVjdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZWxldGUtcHJvamVjdC1idXR0b24nKTtcbiAgICBkbHRQcm9qZWN0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtcmVxdWVzdCcsIG5ld1Byb2plY3RSZXF1ZXN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgbmV3UHJvamVjdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtY2FuY2VsbGVkJywgY2FuY2VsUHJvamVjdFJlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ21lbnUtaXRlbS1zZWxlY3RlZCcsIG1lbnVJdGVtU2VsZWN0aW9uKTtcblxuICAgIGxldCBwcm9qZWN0cyA9IFsnRGVmYXVsdCBQcm9qZWN0J107XG5cbiAgICByZW5kZXIoKTtcblxuICAgIG1lbnVJdGVtcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIG1lbnVJdGVtU2VsZWN0aW9uKHNlbGVjdGVkSXRlbSkge1xuICAgICAgICBtZW51SXRlbXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxlY3RlZEl0ZW0uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3UHJvamVjdFJlcXVlc3QoKSB7XG4gICAgICAgIGNvbnN0IGxpUHJvamVjdE5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBpbnB1dFByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUucGxhY2Vob2xkZXIgPSAnUHJvamVjdCBuYW1lJ1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXByZXNzJywgKGUpPT57XG4gICAgICAgICAgICBpZihlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0LWFkZGVkJywgaW5wdXRQcm9qZWN0TmFtZS52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxpUHJvamVjdE5hbWUuYXBwZW5kQ2hpbGQoaW5wdXRQcm9qZWN0TmFtZSk7XG5cbiAgICAgICAgY29uc3QgYWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJvamVjdC1hZGRlZCcsIGlucHV0UHJvamVjdE5hbWUudmFsdWUpXG4gICAgICAgIH0pO1xuICAgICAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnLCAnbmV3LXByb2plY3QtYnV0dG9uJyk7XG4gICAgICAgIGFkZEJ0bi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGNhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3LXByb2plY3QtY2FuY2VsbGVkJyk7XG4gICAgICAgIH0pXG4gICAgICAgIGNhbmNlbEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtZGFuZ2VyJywgJ2lzLWxpZ2h0JywgJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdG4udGV4dENvbnRlbnQgPSAnQ2FuY2VsJztcblxuICAgICAgICBjb25zdCBidG5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgYnRuRGl2LmFwcGVuZENoaWxkKGFkZEJ0bik7XG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChjYW5jZWxCdG4pO1xuICAgICAgICBsaVByb2plY3ROYW1lLmFwcGVuZENoaWxkKGJ0bkRpdik7XG4gICAgICAgIHByb2plY3RMaXN0LmFwcGVuZENoaWxkKGxpUHJvamVjdE5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Byb2plY3QocHJvamVjdE5hbWUpIHtcbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0TmFtZSk7XG4gICAgICAgIHByb2plY3RMaXN0Lmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICBjb25zdCBhbmNob3JFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBhbmNob3JFbGVtZW50LmlubmVyVGV4dCA9IHByb2plY3ROYW1lO1xuICAgICAgICBhbmNob3JFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdwcm9qZWN0LXNlbGVjdGVkJywgcHJvamVjdE5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5jaG9yRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdtZW51LWl0ZW0nKTtcbiAgICAgICAgbWVudUl0ZW1TZWxlY3Rpb24oYW5jaG9yRWxlbWVudCk7XG4gICAgICAgIG1lbnVJdGVtcy5wdXNoKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBsaXN0RWxlbWVudC5hcHBlbmRDaGlsZChhbmNob3JFbGVtZW50KTtcbiAgICAgICAgcHJvamVjdExpc3QuYXBwZW5kQ2hpbGQobGlzdEVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFByb2plY3RSZXF1ZXN0KCkge1xuICAgICAgICBwcm9qZWN0TGlzdC5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgbmV3UHJvamVjdChwcm9qZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKVxuXG5leHBvcnQge3Byb2plY3RDb250cm9sbGVyfTsiLCJ2YXIgcHVic3ViID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaCAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIHB1Ymxpc2g6IHB1Ymxpc2gsXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7cHVic3VifSBmcm9tIFwiLi9wdWJzdWJcIjtcbmltcG9ydCB7ZGF0YUNvbnRyb2xsZXJ9IGZyb20gXCIuL2RhdGFcIjtcblxubGV0IHRhc2tNYW5hZ2VyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLWJvZHknKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1yZXF1ZXN0JywgbmV3VGFza1JlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCBuZXdUYXNrKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1jYW5jZWxsZWQnLCBjYW5jZWxUYXNrUmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgncHJvamVjdC1zZWxlY3RlZCcsIGZpbHRlclRhc2tzQnlQcm9qZWN0KTtcblxuICAgIGxldCB0YXNrcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA3LTI3JyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdSZWFkIGEgYm9vaycsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdUZXN0IGV4YW1wbGUnLFxuICAgICAgICAgICAgZHVlRGF0ZTogJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgXVxuICAgIC8vIGNvbnNvbGUudGFibGUodGFza3MpXG5cbiAgICBsZXQgdGFza3MyID0gZGF0YUNvbnRyb2xsZXIuZ2V0VGFza3MoKTtcbiAgICAvLyBjb25zb2xlLnRhYmxlKHRhc2tzMilcblxuICAgIHJlbmRlclRhc2tzKCk7XG5cbiAgICBmdW5jdGlvbiBuZXdUYXNrUmVxdWVzdCgpIHtcbiAgICAgICAgY29uc3QgdGRBZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFzay1hZGRlZCcsIHtcbiAgICAgICAgICAgIHRhc2tEZXNjOiBpbnB1dFRhc2tOYW1lLnZhbHVlLFxuICAgICAgICAgICAgZHVlRGF0ZTogaW5wdXREdWVEYXRlLnZhbHVlLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICApfSk7XG4gICAgICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtcHJpbWFyeScsICdpcy1saWdodCcpO1xuICAgICAgICBhZGRCdG4udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgICAgdGRBZGRCdG4uYXBwZW5kQ2hpbGQoYWRkQnRuKTtcblxuICAgICAgICBjb25zdCB0ZFRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgaW5wdXRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0VGFza05hbWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRUYXNrTmFtZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLnBsYWNlaG9sZGVyID0gJ0dvIGdyb2Nlcnkgc2hvcHBpbmcuLi4nXG4gICAgICAgIGlucHV0VGFza05hbWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSk9PntcbiAgICAgICAgICAgIGlmKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2stYWRkZWQnLCB7XG4gICAgICAgICAgICAgICAgdGFza0Rlc2M6IGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZTogaW5wdXREdWVEYXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGRUYXNrTmFtZS5hcHBlbmRDaGlsZChpbnB1dFRhc2tOYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGlucHV0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dER1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgdGREdWVEYXRlLmFwcGVuZENoaWxkKGlucHV0RHVlRGF0ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgnbmV3LXRhc2stY2FuY2VsbGVkJyk7XG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IHRkRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkQWRkQnRuKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRHVlRGF0ZSk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRGVsZXRlKTtcbiAgICAgICAgXG4gICAgICAgIHRhYmxlQm9keS5pbnNlcnRCZWZvcmUodHIsIHRhYmxlQm9keS5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW5jZWxUYXNrUmVxdWVzdCgpIHtcbiAgICAgICAgdGFibGVCb2R5LmZpcnN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbmV3VGFzayh0YXNrKSB7XG4gICAgICAgIHRhc2tzLnVuc2hpZnQodGFzayk7XG4gICAgICAgIHJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJUYWJsZSgpIHtcbiAgICAgICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVRhc2soaW5kZXgpIHtcbiAgICAgICAgdGFza3Muc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICByZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclRhc2tzKCkge1xuICAgICAgICBjbGVhclRhYmxlKCk7XG4gICAgICAgIHRhc2tzLmZvckVhY2goKHRhc2ssIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0ZENoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIGNvbnN0IGxibENoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKTtcbiAgICAgICAgICAgIGxibENoZWNrQnRuLmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94Jyk7XG4gICAgICAgICAgICBjb25zdCBjaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgICAgICBjaGVja0J0bi50eXBlID0gJ2NoZWNrYm94JztcbiAgICAgICAgICAgIGNoZWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHIuY2xhc3NMaXN0LmFkZCgnY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5jb21wbGV0ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHIuY2xhc3NMaXN0LnJlbW92ZSgnY29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgdGFzay5jb21wbGV0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGJsQ2hlY2tCdG4uYXBwZW5kQ2hpbGQoY2hlY2tCdG4pO1xuICAgICAgICAgICAgdGRDaGVja0J0bi5hcHBlbmRDaGlsZChsYmxDaGVja0J0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRkVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGRUYXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRhc2tEZXNjO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGREdWVEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICBkZWxldGVUYXNrKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3RhZycsICdpcy1kZWxldGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHRkRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHRkRGVsZXRlLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkQ2hlY2tCdG4pO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZER1ZURhdGUpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICAgICAgaWYgKHRhc2suY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgIGNoZWNrQnRuLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsdGVyVGFza3NCeVByb2plY3QocHJvamVjdCkge1xuICAgICAgICAvL2ZpbHRlciB0YXNrcyBiYXNlZCBvbiB3aGljaCBwcm9qZWN0IGlzIHNlbGVjdGVkIGFuZCB1cGRhdGUgYSB2YXJpYWJsZSB0aGF0IGlzIG1heWJlIGNhbGxlZCBkaXNwbGF5ZWRUYXNrc1xuICAgICAgICAvL3VwZGF0ZSB0aGUgdGFibGUgdGl0bGVcbiAgICB9XG59KSgpO1xuXG5cbmV4cG9ydCB7dGFza01hbmFnZXJ9OyAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dGFza01hbmFnZXJ9IGZyb20gJy4vdGFza21hbmFnZXInO1xuaW1wb3J0IHttZW51Q29udHJvbGxlcn0gZnJvbSAnLi9wcm9qZWN0bWFuYWdlcidcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gJy4vcHVic3ViJztcblxuY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1idXR0b24nKTtcbm5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1yZXF1ZXN0Jyk7XG4gICAgdGFza0J0blRvZ2dsZSgpOyAgICBcbn0pO1xucHVic3ViLnN1YnNjcmliZSgndGFzay1hZGRlZCcsIHRhc2tCdG5Ub2dnbGUpXG5wdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1jYW5jZWxsZWQnLCB0YXNrQnRuVG9nZ2xlKTtcbmZ1bmN0aW9uIHRhc2tCdG5Ub2dnbGUoKSB7XG4gICAgbmV3VGFza0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdpcy1sb2FkaW5nJyk7XG59XG5cbmNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXByb2plY3QtYnV0dG9uJyk7XG5uZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3LXByb2plY3QtcmVxdWVzdCcpO1xuICAgIHByb2plY3RCdG5Ub2dnbGUoKTsgICAgXG59KTtcbnB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3QtYWRkZWQnLCBwcm9qZWN0QnRuVG9nZ2xlKVxucHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtY2FuY2VsbGVkJywgcHJvamVjdEJ0blRvZ2dsZSk7XG5mdW5jdGlvbiBwcm9qZWN0QnRuVG9nZ2xlKCkge1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5cbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9