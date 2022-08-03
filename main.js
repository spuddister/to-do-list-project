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
    // if (storageAvailable('localStorage')) {
    //     console.log('local storage available');
    // } else {
        let projects = ['Default Project', 'Work']
        let tasks = [
            [   
                'Go grocery shopping',
                'Default Project',
                '2022-07-27',
                false,
            ],
            [
                'Read The Foundation by Isaac Asimov',
                'Default Project',
                '2022-05-31',
                false,
            ],
            [
                'Learn how to use localStorage',
                'Work',
                '2022-05-31',
                true,
            ]
            ,
            [
                'Sweep and mop the floors',
                'Default Project',
                '2022-05-31',
                false,
            ]
            ,
            [
                'Send Jan an email about our trip to Jamaica',
                'Work',
                '2022-08-11',
                false,
            ]
            ,
            [
                'Replace Google Chrome with Firefox',
                'Work',
                '2022-04-06',
                true,
            ]
        ];
    // }

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
    
    localStorage.clear();
    localStorage.setItem("tasks", tasks);
    localStorage.setItem("projects", projects);
    let task1 = convertStorageData(localStorage.getItem('tasks'))
    // console.table(tasks);
    // console.table(localStorage);
    console.table(task1)

})();

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLENBQUM7OztBQUdvQjs7Ozs7O1VDckpyQjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOMEM7QUFDSztBQUNiOztBQUVsQztBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBSSxtREFBYztBQUNsQjtBQUNBLENBQUM7QUFDRCxxREFBZ0I7QUFDaEIscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7O0FBR0EsRSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9kYXRhLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wcm9qZWN0bWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy90YXNrbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5cblxubGV0IGRhdGFDb250cm9sbGVyID0gKGZ1bmN0aW9uKCkge1xuICAgIC8vIGlmIChzdG9yYWdlQXZhaWxhYmxlKCdsb2NhbFN0b3JhZ2UnKSkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZygnbG9jYWwgc3RvcmFnZSBhdmFpbGFibGUnKTtcbiAgICAvLyB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJvamVjdHMgPSBbJ0RlZmF1bHQgUHJvamVjdCcsICdXb3JrJ11cbiAgICAgICAgbGV0IHRhc2tzID0gW1xuICAgICAgICAgICAgWyAgIFxuICAgICAgICAgICAgICAgICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgICAgICAgICAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAnMjAyMi0wNy0yNycsXG4gICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICdSZWFkIFRoZSBGb3VuZGF0aW9uIGJ5IElzYWFjIEFzaW1vdicsXG4gICAgICAgICAgICAgICAgJ0RlZmF1bHQgUHJvamVjdCcsXG4gICAgICAgICAgICAgICAgJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnTGVhcm4gaG93IHRvIHVzZSBsb2NhbFN0b3JhZ2UnLFxuICAgICAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICAgICAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICAgICxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAnU3dlZXAgYW5kIG1vcCB0aGUgZmxvb3JzJyxcbiAgICAgICAgICAgICAgICAnRGVmYXVsdCBQcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICAsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ1NlbmQgSmFuIGFuIGVtYWlsIGFib3V0IG91ciB0cmlwIHRvIEphbWFpY2EnLFxuICAgICAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICAgICAnMjAyMi0wOC0xMScsXG4gICAgICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICBdXG4gICAgICAgICAgICAsXG4gICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgJ1JlcGxhY2UgR29vZ2xlIENocm9tZSB3aXRoIEZpcmVmb3gnLFxuICAgICAgICAgICAgICAgICdXb3JrJyxcbiAgICAgICAgICAgICAgICAnMjAyMi0wNC0wNicsXG4gICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgXTtcbiAgICAvLyB9XG5cbiAgICBmdW5jdGlvbiBjb252ZXJ0U3RvcmFnZURhdGEoZGF0YSkge1xuICAgICAgICBsZXQgdGVtcEFycmF5ID0gZGF0YS5zcGxpdCgnLCcpXG4gICAgICAgIGxldCBjb252ZXJ0ZWREYXRhID0gQXJyYXkuZnJvbShBcnJheSh0ZW1wQXJyYXkubGVuZ3RoLzQpLCAoKSA9PiBuZXcgQXJyYXkoNCkpO1xuICAgICAgICBsZXQgayA9IDA7XG4gICAgICAgIGxldCBqID0gMDtcbiAgICAgICAgZm9yKGxldCBpPTA7IGk8IHRlbXBBcnJheS5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBrPU1hdGguZmxvb3IoaS80KTtcbiAgICAgICAgICAgIGogPSBpJTQ7XG4gICAgICAgICAgICBjb252ZXJ0ZWREYXRhW2tdW2pdID0gdGVtcEFycmF5W2ldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb252ZXJ0ZWREYXRhO1xuICAgIH1cbiAgICBcbiAgICBsb2NhbFN0b3JhZ2UuY2xlYXIoKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInRhc2tzXCIsIHRhc2tzKTtcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcInByb2plY3RzXCIsIHByb2plY3RzKTtcbiAgICBsZXQgdGFzazEgPSBjb252ZXJ0U3RvcmFnZURhdGEobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3Rhc2tzJykpXG4gICAgLy8gY29uc29sZS50YWJsZSh0YXNrcyk7XG4gICAgLy8gY29uc29sZS50YWJsZShsb2NhbFN0b3JhZ2UpO1xuICAgIGNvbnNvbGUudGFibGUodGFzazEpXG5cbn0pKCk7XG5cbmZ1bmN0aW9uIHN0b3JhZ2VBdmFpbGFibGUodHlwZSkge1xuICAgIGxldCBzdG9yYWdlO1xuICAgIHRyeSB7XG4gICAgICAgIHN0b3JhZ2UgPSB3aW5kb3dbdHlwZV07XG4gICAgICAgIGNvbnN0IHggPSAnX19zdG9yYWdlX3Rlc3RfXyc7XG4gICAgICAgIHN0b3JhZ2Uuc2V0SXRlbSh4LCB4KTtcbiAgICAgICAgc3RvcmFnZS5yZW1vdmVJdGVtKHgpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgY2F0Y2goZSkge1xuICAgICAgICByZXR1cm4gZSBpbnN0YW5jZW9mIERPTUV4Y2VwdGlvbiAmJiAoXG4gICAgICAgICAgICAvLyBldmVyeXRoaW5nIGV4Y2VwdCBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDIyIHx8XG4gICAgICAgICAgICAvLyBGaXJlZm94XG4gICAgICAgICAgICBlLmNvZGUgPT09IDEwMTQgfHxcbiAgICAgICAgICAgIC8vIHRlc3QgbmFtZSBmaWVsZCB0b28sIGJlY2F1c2UgY29kZSBtaWdodCBub3QgYmUgcHJlc2VudFxuICAgICAgICAgICAgLy8gZXZlcnl0aGluZyBleGNlcHQgRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnUXVvdGFFeGNlZWRlZEVycm9yJyB8fFxuICAgICAgICAgICAgLy8gRmlyZWZveFxuICAgICAgICAgICAgZS5uYW1lID09PSAnTlNfRVJST1JfRE9NX1FVT1RBX1JFQUNIRUQnKSAmJlxuICAgICAgICAgICAgLy8gYWNrbm93bGVkZ2UgUXVvdGFFeGNlZWRlZEVycm9yIG9ubHkgaWYgdGhlcmUncyBzb21ldGhpbmcgYWxyZWFkeSBzdG9yZWRcbiAgICAgICAgICAgIChzdG9yYWdlICYmIHN0b3JhZ2UubGVuZ3RoICE9PSAwKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7ZGF0YUNvbnRyb2xsZXJ9OyIsImltcG9ydCB7IHB1YnN1YiB9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5cbmxldCBwcm9qZWN0Q29udHJvbGxlciA9IChmdW5jdGlvbigpIHtcbiAgICBsZXQgbWVudUl0ZW1zID0gWy4uLmRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ21lbnUtaXRlbScpXTtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICBjb25zdCBkbHRQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2RlbGV0ZS1wcm9qZWN0LWJ1dHRvbicpO1xuICAgIGRsdFByb2plY3RCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctcHJvamVjdC1yZXF1ZXN0JywgbmV3UHJvamVjdFJlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3QtYWRkZWQnLCBuZXdQcm9qZWN0KTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctcHJvamVjdC1jYW5jZWxsZWQnLCBjYW5jZWxQcm9qZWN0UmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgnbWVudS1pdGVtLXNlbGVjdGVkJywgbWVudUl0ZW1TZWxlY3Rpb24pO1xuXG4gICAgbGV0IHByb2plY3RzID0gWydEZWZhdWx0IFByb2plY3QnXTtcblxuICAgIHJlbmRlcigpO1xuXG4gICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIG1lbnVJdGVtQWRkRXZlbnRMaXN0ZW5lcihpdGVtKTtcbiAgICB9KTtcbiAgICBcbiAgICBmdW5jdGlvbiBtZW51SXRlbUFkZEV2ZW50TGlzdGVuZXIoaXRlbSkge1xuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCdtZW51LWl0ZW0tc2VsZWN0ZWQnLCBpdGVtKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZW51SXRlbVNlbGVjdGlvbihzZWxlY3RlZEl0ZW0pIHtcbiAgICAgICAgbWVudUl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZWN0ZWRJdGVtLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Byb2plY3RSZXF1ZXN0KCkge1xuICAgICAgICBjb25zdCBsaVByb2plY3ROYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgaW5wdXRQcm9qZWN0TmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0UHJvamVjdE5hbWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dFByb2plY3ROYW1lLnBsYWNlaG9sZGVyID0gJ1Byb2plY3QgbmFtZSdcbiAgICAgICAgaW5wdXRQcm9qZWN0TmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKT0+e1xuICAgICAgICAgICAgaWYoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgncHJvamVjdC1hZGRlZCcsIGlucHV0UHJvamVjdE5hbWUudmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsaVByb2plY3ROYW1lLmFwcGVuZENoaWxkKGlucHV0UHJvamVjdE5hbWUpO1xuXG4gICAgICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Byb2plY3QtYWRkZWQnLCBpbnB1dFByb2plY3ROYW1lLnZhbHVlKVxuICAgICAgICB9KTtcbiAgICAgICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdpcy1wcmltYXJ5JywgJ2lzLWxpZ2h0JywgJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xuICAgICAgICBhZGRCdG4udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNhbmNlbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBjYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ25ldy1wcm9qZWN0LWNhbmNlbGxlZCcpO1xuICAgICAgICB9KVxuICAgICAgICBjYW5jZWxCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLWRhbmdlcicsICdpcy1saWdodCcsICduZXctcHJvamVjdC1idXR0b24nKTtcbiAgICAgICAgY2FuY2VsQnRuLnRleHRDb250ZW50ID0gJ0NhbmNlbCc7XG5cbiAgICAgICAgY29uc3QgYnRuRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGJ0bkRpdi5hcHBlbmRDaGlsZChhZGRCdG4pO1xuICAgICAgICBidG5EaXYuYXBwZW5kQ2hpbGQoY2FuY2VsQnRuKTtcbiAgICAgICAgbGlQcm9qZWN0TmFtZS5hcHBlbmRDaGlsZChidG5EaXYpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaVByb2plY3ROYW1lKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gICAgICAgIHByb2plY3RzLnB1c2gocHJvamVjdE5hbWUpO1xuICAgICAgICBwcm9qZWN0TGlzdC5sYXN0Q2hpbGQucmVtb3ZlKCk7XG4gICAgICAgIGNvbnN0IGxpc3RFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgY29uc3QgYW5jaG9yRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgYW5jaG9yRWxlbWVudC5pbm5lclRleHQgPSBwcm9qZWN0TmFtZTtcbiAgICAgICAgbWVudUl0ZW1BZGRFdmVudExpc3RlbmVyKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBhbmNob3JFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ21lbnUtaXRlbScpO1xuICAgICAgICBtZW51SXRlbVNlbGVjdGlvbihhbmNob3JFbGVtZW50KTtcbiAgICAgICAgbWVudUl0ZW1zLnB1c2goYW5jaG9yRWxlbWVudCk7XG4gICAgICAgIGxpc3RFbGVtZW50LmFwcGVuZENoaWxkKGFuY2hvckVsZW1lbnQpO1xuICAgICAgICBwcm9qZWN0TGlzdC5hcHBlbmRDaGlsZChsaXN0RWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FuY2VsUHJvamVjdFJlcXVlc3QoKSB7XG4gICAgICAgIHByb2plY3RMaXN0Lmxhc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBuZXdQcm9qZWN0KHByb2plY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG59KSgpXG5cbmV4cG9ydCB7cHJvamVjdENvbnRyb2xsZXJ9OyIsInZhciBwdWJzdWIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGxldCBldmVudHMgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHN1YnNjcmliZSAoZXZlbnROYW1lLCBmbikge1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXSA9IGV2ZW50c1tldmVudE5hbWVdIHx8IFtdO1xuICAgICAgICBldmVudHNbZXZlbnROYW1lXS5wdXNoKGZuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwdWJsaXNoIChldmVudE5hbWUsIGRhdGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXZlbnROYW1lKTtcbiAgICAgICAgaWYgKGV2ZW50c1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICBldmVudHNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGZuKSB7XG4gICAgICAgICAgICAgIGZuKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdWJzY3JpYmU6IHN1YnNjcmliZSxcbiAgICAgICAgcHVibGlzaDogcHVibGlzaCxcbiAgICB9XG59KSgpO1xuXG5leHBvcnQge3B1YnN1Yn07IiwiaW1wb3J0IHtwdWJzdWJ9IGZyb20gXCIuL3B1YnN1YlwiO1xuaW1wb3J0IHtwcm9qZWN0c30gZnJvbSBcIi4vZGF0YVwiO1xuXG5sZXQgdGFza01hbmFnZXIgPSAoZnVuY3Rpb24oKXtcbiAgICBjb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtYm9keScpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy10YXNrLXJlcXVlc3QnLCBuZXdUYXNrUmVxdWVzdCk7XG4gICAgcHVic3ViLnN1YnNjcmliZSgndGFzay1hZGRlZCcsIG5ld1Rhc2spO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ25ldy10YXNrLWNhbmNlbGxlZCcsIGNhbmNlbFRhc2tSZXF1ZXN0KTtcblxuICAgIGxldCB0YXNrcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA3LTI3JyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdSZWFkIGEgYm9vaycsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdUZXN0IGV4YW1wbGUnLFxuICAgICAgICAgICAgZHVlRGF0ZTogJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgXVxuXG4gICAgcmVuZGVyVGFza3MoKTtcblxuICAgIGZ1bmN0aW9uIG5ld1Rhc2tSZXF1ZXN0KCkge1xuICAgICAgICBjb25zdCB0ZEFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCd0YXNrLWFkZGVkJywge1xuICAgICAgICAgICAgdGFza0Rlc2M6IGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICB9XG4gICAgICAgICl9KTtcbiAgICAgICAgYWRkQnRuLmNsYXNzTGlzdC5hZGQoJ2J1dHRvbicsICdpcy1wcmltYXJ5JywgJ2lzLWxpZ2h0Jyk7XG4gICAgICAgIGFkZEJ0bi50ZXh0Q29udGVudCA9ICdBZGQnO1xuICAgICAgICB0ZEFkZEJ0bi5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRkVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBpbnB1dFRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLnR5cGUgPSAndGV4dCc7XG4gICAgICAgIGlucHV0VGFza05hbWUucGxhY2Vob2xkZXIgPSAnR28gZ3JvY2VyeSBzaG9wcGluZy4uLidcbiAgICAgICAgaW5wdXRUYXNrTmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKT0+e1xuICAgICAgICAgICAgaWYoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFzay1hZGRlZCcsIHtcbiAgICAgICAgICAgICAgICB0YXNrRGVzYzogaW5wdXRUYXNrTmFtZS52YWx1ZSxcbiAgICAgICAgICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0ZFRhc2tOYW1lLmFwcGVuZENoaWxkKGlucHV0VGFza05hbWUpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgdGREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgaW5wdXREdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXREdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RHVlRGF0ZS50eXBlID0gJ2RhdGUnO1xuICAgICAgICB0ZER1ZURhdGUuYXBwZW5kQ2hpbGQoaW5wdXREdWVEYXRlKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3RhZycsICdpcy1kZWxldGUnKTtcbiAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1jYW5jZWxsZWQnKTtcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZERlbGV0ZS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRBZGRCdG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICBcbiAgICAgICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbmNlbFRhc2tSZXF1ZXN0KCkge1xuICAgICAgICB0YWJsZUJvZHkuZmlyc3RDaGlsZC5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZXdUYXNrKHRhc2spIHtcbiAgICAgICAgdGFza3MudW5zaGlmdCh0YXNrKTtcbiAgICAgICAgcmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbGVhclRhYmxlKCkge1xuICAgICAgICB0YWJsZUJvZHkuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayhpbmRleCkge1xuICAgICAgICB0YXNrcy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgIHJlbmRlclRhc2tzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyVGFza3MoKSB7XG4gICAgICAgIGNsZWFyVGFibGUoKTtcbiAgICAgICAgdGFza3MuZm9yRWFjaCgodGFzaywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRkQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgY29uc3QgbGJsQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICAgICAgbGJsQ2hlY2tCdG4uY2xhc3NMaXN0LmFkZCgnY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGNvbnN0IGNoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgIGNoZWNrQnRuLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICAgICAgY2hlY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgICAgICB0YXNrLmNvbXBsZXRlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBsYmxDaGVja0J0bi5hcHBlbmRDaGlsZChjaGVja0J0bik7XG4gICAgICAgICAgICB0ZENoZWNrQnRuLmFwcGVuZENoaWxkKGxibENoZWNrQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZFRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGFza0Rlc2M7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZER1ZURhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2soaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgndGFnJywgJ2lzLWRlbGV0ZScpO1xuICAgICAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRDaGVja0J0bik7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRHVlRGF0ZSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgICAgICAgICBpZiAodGFzay5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tCdG4uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgICAgICB9ICAgICAgICAgICAgXG4gICAgICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgICAgICB9KTtcbiAgICB9XG59KSgpO1xuXG5cbmV4cG9ydCB7dGFza01hbmFnZXJ9OyAiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dGFza01hbmFnZXJ9IGZyb20gJy4vdGFza21hbmFnZXInO1xuaW1wb3J0IHttZW51Q29udHJvbGxlcn0gZnJvbSAnLi9wcm9qZWN0bWFuYWdlcidcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gJy4vcHVic3ViJztcblxuY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1idXR0b24nKTtcbm5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1yZXF1ZXN0Jyk7XG4gICAgdGFza0J0blRvZ2dsZSgpOyAgICBcbn0pO1xucHVic3ViLnN1YnNjcmliZSgndGFzay1hZGRlZCcsIHRhc2tCdG5Ub2dnbGUpXG5wdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1jYW5jZWxsZWQnLCB0YXNrQnRuVG9nZ2xlKTtcbmZ1bmN0aW9uIHRhc2tCdG5Ub2dnbGUoKSB7XG4gICAgbmV3VGFza0J0bi5jbGFzc0xpc3QudG9nZ2xlKCdpcy1sb2FkaW5nJyk7XG59XG5cbmNvbnN0IG5ld1Byb2plY3RCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXByb2plY3QtYnV0dG9uJyk7XG5uZXdQcm9qZWN0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICBwdWJzdWIucHVibGlzaCgnbmV3LXByb2plY3QtcmVxdWVzdCcpO1xuICAgIHByb2plY3RCdG5Ub2dnbGUoKTsgICAgXG59KTtcbnB1YnN1Yi5zdWJzY3JpYmUoJ3Byb2plY3QtYWRkZWQnLCBwcm9qZWN0QnRuVG9nZ2xlKVxucHVic3ViLnN1YnNjcmliZSgnbmV3LXByb2plY3QtY2FuY2VsbGVkJywgcHJvamVjdEJ0blRvZ2dsZSk7XG5mdW5jdGlvbiBwcm9qZWN0QnRuVG9nZ2xlKCkge1xuICAgIG5ld1Byb2plY3RCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5cbiAgIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9