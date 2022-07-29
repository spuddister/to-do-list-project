/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/* harmony export */   "renderTasks": () => (/* binding */ renderTasks)
/* harmony export */ });
/* harmony import */ var _pubsub__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubsub */ "./src/pubsub.js");


const tableBody = document.getElementById('table-body');
const newTaskBtn = document.getElementById('new-task-button');
newTaskBtn.addEventListener('click', newTaskRequest);
_pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.subscribe('add-task', newTask);

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

function newTaskRequest() {
    const tdAddBtn = document.createElement('td');
    const addBtn = document.createElement('button');
    addBtn.addEventListener('click', (e)=>{
        _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('add-task', {
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
            _pubsub__WEBPACK_IMPORTED_MODULE_0__.pubsub.publish('add-task', {
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
    newTaskBtn.classList.add('is-loading');
}

function newTask(task) {
    tasks.unshift(task);
    newTaskBtn.classList.remove('is-loading');
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




(0,_taskmanager__WEBPACK_IMPORTED_MODULE_0__.renderTasks)();



})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEIrQjs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EscURBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBYztBQUMxQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFcUI7Ozs7OztVQzVJckI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ04wQzs7OztBQUkxQyx5REFBVyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9wdWJzdWIuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0Ly4vc3JjL3Rhc2ttYW5hZ2VyLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgcHVic3ViID0gKGZ1bmN0aW9uICgpIHtcbiAgICBsZXQgZXZlbnRzID0ge307XG5cbiAgICBmdW5jdGlvbiBzdWJzY3JpYmUgKGV2ZW50TmFtZSwgZm4pIHtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0gPSBldmVudHNbZXZlbnROYW1lXSB8fCBbXTtcbiAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHVibGlzaCAoZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgICAgIGlmIChldmVudHNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgZXZlbnRzW2V2ZW50TmFtZV0uZm9yRWFjaChmdW5jdGlvbihmbikge1xuICAgICAgICAgICAgICBmbihkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgICAgIHB1Ymxpc2g6IHB1Ymxpc2gsXG4gICAgfVxuXG4gICAgXG59KSgpO1xuXG5leHBvcnQge3B1YnN1Yn07IiwiaW1wb3J0IHtwdWJzdWJ9IGZyb20gXCIuL3B1YnN1YlwiO1xuXG5jb25zdCB0YWJsZUJvZHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFibGUtYm9keScpO1xuY29uc3QgbmV3VGFza0J0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduZXctdGFzay1idXR0b24nKTtcbm5ld1Rhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBuZXdUYXNrUmVxdWVzdCk7XG5wdWJzdWIuc3Vic2NyaWJlKCdhZGQtdGFzaycsIG5ld1Rhc2spO1xuXG5sZXQgdGFza3MgPSBbXG4gICAge1xuICAgICAgICB0YXNrRGVzYzogJ0dvIGdyb2Nlcnkgc2hvcHBpbmcnLFxuICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNy0yNycsXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza0Rlc2M6ICdSZWFkIGEgYm9vaycsXG4gICAgICAgIGR1ZURhdGU6ICcyMDIyLTA1LTMxJyxcbiAgICAgICAgY29tcGxldGU6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tEZXNjOiAnVGVzdCBleGFtcGxlJyxcbiAgICAgICAgZHVlRGF0ZTogJzIwMjItMDUtMzEnLFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gbmV3VGFza1JlcXVlc3QoKSB7XG4gICAgY29uc3QgdGRBZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGFkZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKT0+e1xuICAgICAgICBwdWJzdWIucHVibGlzaCgnYWRkLXRhc2snLCB7XG4gICAgICAgIHRhc2tEZXNjOiBpbnB1dFRhc2tOYW1lLnZhbHVlLFxuICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfVxuICAgICl9KTtcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnKTtcbiAgICBhZGRCdG4udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICB0ZEFkZEJ0bi5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXG4gICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgY29uc3QgaW5wdXRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRUYXNrTmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgIGlucHV0VGFza05hbWUudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dFRhc2tOYW1lLnBsYWNlaG9sZGVyID0gJ0dvIGdyb2Nlcnkgc2hvcHBpbmcuLi4nXG4gICAgaW5wdXRUYXNrTmFtZS5hZGRFdmVudExpc3RlbmVyKCdrZXlwcmVzcycsIChlKT0+e1xuICAgICAgICBpZihlLmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2FkZC10YXNrJywge1xuICAgICAgICAgICAgdGFza0Rlc2M6IGlucHV0VGFza05hbWUudmFsdWUsXG4gICAgICAgICAgICBkdWVEYXRlOiBpbnB1dER1ZURhdGUudmFsdWUsXG4gICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSk7XG4gICAgdGRUYXNrTmFtZS5hcHBlbmRDaGlsZChpbnB1dFRhc2tOYW1lKTtcbiAgICBcbiAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIGNvbnN0IGlucHV0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXREdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgaW5wdXREdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgdGREdWVEYXRlLmFwcGVuZENoaWxkKGlucHV0RHVlRGF0ZSk7XG4gICAgXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG5cbiAgICBjb25zdCB0ZERlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZEFkZEJ0bik7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgXG4gICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpO1xufVxuXG5mdW5jdGlvbiBuZXdUYXNrKHRhc2spIHtcbiAgICB0YXNrcy51bnNoaWZ0KHRhc2spO1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtbG9hZGluZycpO1xuICAgIHJlbmRlclRhc2tzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVGFibGUoKSB7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrKGluZGV4KSB7XG4gICAgdGFza3Muc3BsaWNlKGluZGV4LDEpO1xuICAgIHJlbmRlclRhc2tzKCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclRhc2tzKCkge1xuICAgIGNsZWFyVGFibGUoKTtcbiAgICB0YXNrcy5mb3JFYWNoKCh0YXNrLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCB0ZENoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgY29uc3QgbGJsQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpO1xuICAgICAgICBsYmxDaGVja0J0bi5jbGFzc0xpc3QuYWRkKCdjaGVja2JveCcpO1xuICAgICAgICBjb25zdCBjaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGNoZWNrQnRuLnR5cGUgPSAnY2hlY2tib3gnO1xuICAgICAgICBjaGVja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QuYWRkKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0ci5jbGFzc0xpc3QucmVtb3ZlKCdjb21wbGV0ZScpO1xuICAgICAgICAgICAgICAgIHRhc2suY29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRkQ2hlY2tCdG4uY2xhc3NMaXN0LmFkZCgndGQtMScpO1xuICAgICAgICBsYmxDaGVja0J0bi5hcHBlbmRDaGlsZChjaGVja0J0bik7XG4gICAgICAgIHRkQ2hlY2tCdG4uYXBwZW5kQ2hpbGQobGJsQ2hlY2tCdG4pO1xuXG4gICAgICAgIGNvbnN0IHRkVGFza05hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZFRhc2tOYW1lLmlubmVyVGV4dCA9IHRhc2sudGFza0Rlc2M7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICB0ZER1ZURhdGUuaW5uZXJUZXh0ID0gdGFzay5kdWVEYXRlO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgICAgICBkZWxldGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+e1xuICAgICAgICAgICAgZGVsZXRlVGFzayhpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgICBkZWxldGVCdG4uY2xhc3NMaXN0LmFkZCgndGFnJywgJ2lzLWRlbGV0ZScpO1xuICAgICAgICBjb25zdCB0ZERlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHRkRGVsZXRlLmFwcGVuZENoaWxkKGRlbGV0ZUJ0bik7XG5cbiAgICAgICAgY29uc3QgdHIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZENoZWNrQnRuKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRHVlRGF0ZSk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkRGVsZXRlKTtcbiAgICAgICAgaWYgKHRhc2suY29tcGxldGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRyLmNsYXNzTGlzdC5hZGQoJ2NvbXBsZXRlJyk7XG4gICAgICAgICAgICBjaGVja0J0bi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgfSAgICAgICAgICAgIFxuICAgICAgICB0YWJsZUJvZHkuYXBwZW5kQ2hpbGQodHIpO1xuICAgIH0pO1xufVxuXG5leHBvcnQge3JlbmRlclRhc2tzfTsgIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3JlbmRlclRhc2tzfSBmcm9tICcuL3Rhc2ttYW5hZ2VyJztcblxuXG5cbnJlbmRlclRhc2tzKCk7XG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9