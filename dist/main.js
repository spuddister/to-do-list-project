/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
    console.log(menuItems);
    const projectList = document.getElementById('project-list');
    

    function newProject() {
        
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


let taskManager = (function(){
    const tableBody = document.getElementById('table-body');
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('new-task-request', newTaskRequest);
    _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('task-added', newTask);

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
    ];

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

        const tdDelete = document.createElement('td');
        tdDelete.appendChild(deleteBtn);

        const tr = document.createElement('tr');
        tr.appendChild(tdAddBtn);
        tr.appendChild(tdTaskName);
        tr.appendChild(tdDueDate);
        tr.appendChild(tdDelete);
        
        tableBody.insertBefore(tr, tableBody.firstChild);
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
            tdCheckBtn.classList.add('td-1');
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
function taskBtnToggle() {
    newTaskBtn.classList.toggle('is-loading');
}

const newProjectBtn = document.getElementById('new-project-button');
newProjectBtn.addEventListener('click', function(){
    _pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.publish('new-project-request');
    projectBtnToggle();    
});
_pubsub__WEBPACK_IMPORTED_MODULE_2__.pubsub.subscribe('project-added', projectBtnToggle)
function projectBtnToggle() {
    newProjectBtn.classList.toggle('is-loading');
}


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7OztBQUdsQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRXVCOzs7Ozs7Ozs7Ozs7Ozs7QUNkeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3JCK0I7O0FBRWhDO0FBQ0E7QUFDQSxJQUFJLHFEQUFnQjtBQUNwQixJQUFJLHFEQUFnQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG1EQUFjO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixtREFBYztBQUM5QjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsQ0FBQzs7O0FBR29COzs7Ozs7VUM5SXJCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ04wQztBQUNMO0FBQ0g7O0FBRWxDO0FBQ0E7QUFDQSxJQUFJLG1EQUFjO0FBQ2xCO0FBQ0EsQ0FBQztBQUNELHFEQUFnQjtBQUNoQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUksbURBQWM7QUFDbEI7QUFDQSxDQUFDO0FBQ0QscURBQWdCO0FBQ2hCO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9tZW51LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Rhc2ttYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwdWJzdWIgfSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuXG5sZXQgbWVudUNvbnRyb2xsZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgbGV0IG1lbnVJdGVtcyA9IFsuLi5kb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdtZW51LWl0ZW0nKV07XG4gICAgY29uc29sZS5sb2cobWVudUl0ZW1zKTtcbiAgICBjb25zdCBwcm9qZWN0TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWxpc3QnKTtcbiAgICBcblxuICAgIGZ1bmN0aW9uIG5ld1Byb2plY3QoKSB7XG4gICAgICAgIFxuICAgIH1cbn0pKClcblxuZXhwb3J0IHttZW51Q29udHJvbGxlcn07XG4iLCJ2YXIgcHVic3ViID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaCAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50TmFtZSk7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIHB1Ymxpc2g6IHB1Ymxpc2gsXG4gICAgfVxufSkoKTtcblxuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7cHVic3VifSBmcm9tIFwiLi9wdWJzdWJcIjtcblxubGV0IHRhc2tNYW5hZ2VyID0gKGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLWJvZHknKTtcbiAgICBwdWJzdWIuc3Vic2NyaWJlKCduZXctdGFzay1yZXF1ZXN0JywgbmV3VGFza1JlcXVlc3QpO1xuICAgIHB1YnN1Yi5zdWJzY3JpYmUoJ3Rhc2stYWRkZWQnLCBuZXdUYXNrKTtcblxuICAgIGxldCB0YXNrcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgICAgIGR1ZURhdGU6ICcyMDIyLTA3LTI3JyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdSZWFkIGEgYm9vaycsXG4gICAgICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNS0zMScsXG4gICAgICAgICAgICBjb21wbGV0ZTogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdGFza0Rlc2M6ICdUZXN0IGV4YW1wbGUnLFxuICAgICAgICAgICAgZHVlRGF0ZTogJzIwMjItMDUtMzEnLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICB9XG4gICAgXTtcblxuICAgIHJlbmRlclRhc2tzKCk7XG5cbiAgICBmdW5jdGlvbiBuZXdUYXNrUmVxdWVzdCgpIHtcbiAgICAgICAgY29uc3QgdGRBZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpPT57XG4gICAgICAgICAgICBwdWJzdWIucHVibGlzaCgndGFzay1hZGRlZCcsIHtcbiAgICAgICAgICAgIHRhc2tEZXNjOiBpbnB1dFRhc2tOYW1lLnZhbHVlLFxuICAgICAgICAgICAgZHVlRGF0ZTogaW5wdXREdWVEYXRlLnZhbHVlLFxuICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLFxuICAgICAgICAgICAgfVxuICAgICAgICApfSk7XG4gICAgICAgIGFkZEJ0bi5jbGFzc0xpc3QuYWRkKCdidXR0b24nLCAnaXMtcHJpbWFyeScsICdpcy1saWdodCcpO1xuICAgICAgICBhZGRCdG4udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICAgICAgdGRBZGRCdG4uYXBwZW5kQ2hpbGQoYWRkQnRuKTtcblxuICAgICAgICBjb25zdCB0ZFRhc2tOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgaW5wdXRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0VGFza05hbWUuY2xhc3NMaXN0LmFkZCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXRUYXNrTmFtZS50eXBlID0gJ3RleHQnO1xuICAgICAgICBpbnB1dFRhc2tOYW1lLnBsYWNlaG9sZGVyID0gJ0dvIGdyb2Nlcnkgc2hvcHBpbmcuLi4nXG4gICAgICAgIGlucHV0VGFza05hbWUuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCAoZSk9PntcbiAgICAgICAgICAgIGlmKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ3Rhc2stYWRkZWQnLCB7XG4gICAgICAgICAgICAgICAgdGFza0Rlc2M6IGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICAgICAgZHVlRGF0ZTogaW5wdXREdWVEYXRlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGRUYXNrTmFtZS5hcHBlbmRDaGlsZChpbnB1dFRhc2tOYW1lKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIGNvbnN0IGlucHV0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGlucHV0RHVlRGF0ZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgICAgICBpbnB1dER1ZURhdGUudHlwZSA9ICdkYXRlJztcbiAgICAgICAgdGREdWVEYXRlLmFwcGVuZENoaWxkKGlucHV0RHVlRGF0ZSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG5cbiAgICAgICAgY29uc3QgdGREZWxldGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZERlbGV0ZS5hcHBlbmRDaGlsZChkZWxldGVCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRBZGRCdG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICBcbiAgICAgICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5ld1Rhc2sodGFzaykge1xuICAgICAgICB0YXNrcy51bnNoaWZ0KHRhc2spO1xuICAgICAgICByZW5kZXJUYXNrcygpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsZWFyVGFibGUoKSB7XG4gICAgICAgIHRhYmxlQm9keS5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrKGluZGV4KSB7XG4gICAgICAgIHRhc2tzLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgcmVuZGVyVGFza3MoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJUYXNrcygpIHtcbiAgICAgICAgY2xlYXJUYWJsZSgpO1xuICAgICAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGRDaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICBjb25zdCBsYmxDaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICBsYmxDaGVja0J0bi5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuICAgICAgICAgICAgY29uc3QgY2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgY2hlY2tCdG4udHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgICAgICBjaGVja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRkQ2hlY2tCdG4uY2xhc3NMaXN0LmFkZCgndGQtMScpO1xuICAgICAgICAgICAgbGJsQ2hlY2tCdG4uYXBwZW5kQ2hpbGQoY2hlY2tCdG4pO1xuICAgICAgICAgICAgdGRDaGVja0J0bi5hcHBlbmRDaGlsZChsYmxDaGVja0J0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRkVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGRUYXNrTmFtZS5pbm5lclRleHQgPSB0YXNrLnRhc2tEZXNjO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICAgICAgdGREdWVEYXRlLmlubmVyVGV4dCA9IHRhc2suZHVlRGF0ZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PntcbiAgICAgICAgICAgICAgICBkZWxldGVUYXNrKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlQnRuLmNsYXNzTGlzdC5hZGQoJ3RhZycsICdpcy1kZWxldGUnKTtcbiAgICAgICAgICAgIGNvbnN0IHRkRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgICAgIHRkRGVsZXRlLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgICAgICAgICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgICAgIHRyLmFwcGVuZENoaWxkKHRkQ2hlY2tCdG4pO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZER1ZURhdGUpO1xuICAgICAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICAgICAgaWYgKHRhc2suY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgIGNoZWNrQnRuLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSkoKTtcblxuXG5leHBvcnQge3Rhc2tNYW5hZ2VyfTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3Rhc2tNYW5hZ2VyfSBmcm9tICcuL3Rhc2ttYW5hZ2VyJztcbmltcG9ydCB7bWVudUNvbnRyb2xsZXJ9IGZyb20gJy4vbWVudSdcbmltcG9ydCB7IHB1YnN1YiB9IGZyb20gJy4vcHVic3ViJztcblxuY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1idXR0b24nKTtcbm5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgIHB1YnN1Yi5wdWJsaXNoKCduZXctdGFzay1yZXF1ZXN0Jyk7XG4gICAgdGFza0J0blRvZ2dsZSgpOyAgICBcbn0pO1xucHVic3ViLnN1YnNjcmliZSgndGFzay1hZGRlZCcsIHRhc2tCdG5Ub2dnbGUpXG5mdW5jdGlvbiB0YXNrQnRuVG9nZ2xlKCkge1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtbG9hZGluZycpO1xufVxuXG5jb25zdCBuZXdQcm9qZWN0QnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ldy1wcm9qZWN0LWJ1dHRvbicpO1xubmV3UHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgcHVic3ViLnB1Ymxpc2goJ25ldy1wcm9qZWN0LXJlcXVlc3QnKTtcbiAgICBwcm9qZWN0QnRuVG9nZ2xlKCk7ICAgIFxufSk7XG5wdWJzdWIuc3Vic2NyaWJlKCdwcm9qZWN0LWFkZGVkJywgcHJvamVjdEJ0blRvZ2dsZSlcbmZ1bmN0aW9uIHByb2plY3RCdG5Ub2dnbGUoKSB7XG4gICAgbmV3UHJvamVjdEJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdpcy1sb2FkaW5nJyk7XG59XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==