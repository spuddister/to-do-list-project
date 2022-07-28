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
        console.log(eventName, data);
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
/* harmony export */   "newTask": () => (/* binding */ newTask),
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
    )})
    addBtn.classList.add('button', 'is-primary', 'is-light');
    addBtn.textContent = 'Add';
    
    tdAddBtn.appendChild(addBtn);

    const tdTaskName = document.createElement('td');
    const inputTaskName = document.createElement('input');
    inputTaskName.classList.add('input');
    inputTaskName.type = 'text';
    inputTaskName.placeholder = 'Go grocery shopping...'
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

function renderTasks() {
    clearTable();
    tasks.forEach(task => {
        
        const tdCheckBtn = document.createElement('td');
        const lblCheckBtn = document.createElement('label');
        lblCheckBtn.classList.add('checkbox');
        const checkBtn = document.createElement('input');
        checkBtn.type = 'checkbox';
        lblCheckBtn.appendChild(checkBtn);
        tdCheckBtn.appendChild(lblCheckBtn);

        const tdTaskName = document.createElement('td');
        tdTaskName.innerText = task.taskDesc;
        
        const tdDueDate = document.createElement('td');
        tdDueDate.innerText = task.dueDate;
        
        const deleteBtn = document.createElement('a');
        deleteBtn.classList.add('tag', 'is-delete');
        const tdDelete = document.createElement('td');
        tdDelete.appendChild(deleteBtn);

        const tr = document.createElement('tr');
        tr.appendChild(tdCheckBtn);
        tr.appendChild(tdTaskName);
        tr.appendChild(tdDueDate);
        tr.appendChild(tdDelete);
        
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdkIrQjs7QUFFaEM7QUFDQTtBQUNBO0FBQ0EscURBQWdCOztBQUVoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsbURBQWM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRThCOzs7Ozs7VUMzRzlCO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOMEM7Ozs7QUFJMUMseURBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvcHVic3ViLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QtcHJvamVjdC8uL3NyYy90YXNrbWFuYWdlci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC1wcm9qZWN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0LXByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIHB1YnN1YiA9IChmdW5jdGlvbiAoKSB7XG4gICAgbGV0IGV2ZW50cyA9IHt9O1xuXG4gICAgZnVuY3Rpb24gc3Vic2NyaWJlIChldmVudE5hbWUsIGZuKSB7XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdID0gZXZlbnRzW2V2ZW50TmFtZV0gfHwgW107XG4gICAgICAgIGV2ZW50c1tldmVudE5hbWVdLnB1c2goZm4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHB1Ymxpc2ggKGV2ZW50TmFtZSwgZGF0YSkge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudE5hbWUsIGRhdGEpO1xuICAgICAgICBpZiAoZXZlbnRzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgIGV2ZW50c1tldmVudE5hbWVdLmZvckVhY2goZnVuY3Rpb24oZm4pIHtcbiAgICAgICAgICAgICAgZm4oZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgICAgICBwdWJsaXNoOiBwdWJsaXNoLFxuICAgIH1cblxuICAgIFxufSkoKTtcblxuZXhwb3J0IHtwdWJzdWJ9OyIsImltcG9ydCB7cHVic3VifSBmcm9tIFwiLi9wdWJzdWJcIjtcblxuY29uc3QgdGFibGVCb2R5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RhYmxlLWJvZHknKTtcbmNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3LXRhc2stYnV0dG9uJyk7XG5uZXdUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbmV3VGFza1JlcXVlc3QpO1xucHVic3ViLnN1YnNjcmliZSgnYWRkLXRhc2snLCBuZXdUYXNrKTtcblxubGV0IHRhc2tzID0gW1xuICAgIHtcbiAgICAgICAgdGFza0Rlc2M6ICdHbyBncm9jZXJ5IHNob3BwaW5nJyxcbiAgICAgICAgZHVlRGF0ZTogJzIwMjItMDctMjcnLFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tEZXNjOiAnUmVhZCBhIGJvb2snLFxuICAgICAgICBkdWVEYXRlOiAnMjAyMi0wNS0zMScsXG4gICAgICAgIGNvbXBsZXRlOiB0cnVlLFxuICAgIH1cbl07XG5cbmZ1bmN0aW9uIG5ld1Rhc2tSZXF1ZXN0KCkge1xuICAgIGNvbnN0IHRkQWRkQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSk9PntcbiAgICAgICAgcHVic3ViLnB1Ymxpc2goJ2FkZC10YXNrJywge1xuICAgICAgICB0YXNrRGVzYzogaW5wdXRUYXNrTmFtZS52YWx1ZSxcbiAgICAgICAgZHVlRGF0ZTogaW5wdXREdWVEYXRlLnZhbHVlLFxuICAgICAgICBjb21wbGV0ZTogZmFsc2UsXG4gICAgICAgIH1cbiAgICApfSlcbiAgICBhZGRCdG4uY2xhc3NMaXN0LmFkZCgnYnV0dG9uJywgJ2lzLXByaW1hcnknLCAnaXMtbGlnaHQnKTtcbiAgICBhZGRCdG4udGV4dENvbnRlbnQgPSAnQWRkJztcbiAgICBcbiAgICB0ZEFkZEJ0bi5hcHBlbmRDaGlsZChhZGRCdG4pO1xuXG4gICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgY29uc3QgaW5wdXRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXRUYXNrTmFtZS5jbGFzc0xpc3QuYWRkKCdpbnB1dCcpO1xuICAgIGlucHV0VGFza05hbWUudHlwZSA9ICd0ZXh0JztcbiAgICBpbnB1dFRhc2tOYW1lLnBsYWNlaG9sZGVyID0gJ0dvIGdyb2Nlcnkgc2hvcHBpbmcuLi4nXG4gICAgdGRUYXNrTmFtZS5hcHBlbmRDaGlsZChpbnB1dFRhc2tOYW1lKTtcbiAgICBcbiAgICBjb25zdCB0ZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgIGNvbnN0IGlucHV0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgaW5wdXREdWVEYXRlLmNsYXNzTGlzdC5hZGQoJ2lucHV0Jyk7XG4gICAgaW5wdXREdWVEYXRlLnR5cGUgPSAnZGF0ZSc7XG4gICAgdGREdWVEYXRlLmFwcGVuZENoaWxkKGlucHV0RHVlRGF0ZSk7XG4gICAgXG4gICAgY29uc3QgZGVsZXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG5cbiAgICBjb25zdCB0ZERlbGV0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgIGNvbnN0IHRyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZEFkZEJ0bik7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGRUYXNrTmFtZSk7XG4gICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICB0ci5hcHBlbmRDaGlsZCh0ZERlbGV0ZSk7XG4gICAgXG4gICAgdGFibGVCb2R5Lmluc2VydEJlZm9yZSh0ciwgdGFibGVCb2R5LmZpcnN0Q2hpbGQpO1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZCgnaXMtbG9hZGluZycpO1xufVxuXG5mdW5jdGlvbiBuZXdUYXNrKHRhc2spIHtcbiAgICB0YXNrcy51bnNoaWZ0KHRhc2spO1xuICAgIG5ld1Rhc2tCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaXMtbG9hZGluZycpO1xuICAgIHJlbmRlclRhc2tzKCk7XG59XG5cbmZ1bmN0aW9uIGNsZWFyVGFibGUoKSB7XG4gICAgdGFibGVCb2R5LmlubmVySFRNTCA9ICcnO1xufVxuXG5mdW5jdGlvbiByZW5kZXJUYXNrcygpIHtcbiAgICBjbGVhclRhYmxlKCk7XG4gICAgdGFza3MuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRkQ2hlY2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0ZCcpO1xuICAgICAgICBjb25zdCBsYmxDaGVja0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgIGxibENoZWNrQnRuLmNsYXNzTGlzdC5hZGQoJ2NoZWNrYm94Jyk7XG4gICAgICAgIGNvbnN0IGNoZWNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgY2hlY2tCdG4udHlwZSA9ICdjaGVja2JveCc7XG4gICAgICAgIGxibENoZWNrQnRuLmFwcGVuZENoaWxkKGNoZWNrQnRuKTtcbiAgICAgICAgdGRDaGVja0J0bi5hcHBlbmRDaGlsZChsYmxDaGVja0J0bik7XG5cbiAgICAgICAgY29uc3QgdGRUYXNrTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHRkVGFza05hbWUuaW5uZXJUZXh0ID0gdGFzay50YXNrRGVzYztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHRkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgIHRkRHVlRGF0ZS5pbm5lclRleHQgPSB0YXNrLmR1ZURhdGU7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWxldGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG4gICAgICAgIGRlbGV0ZUJ0bi5jbGFzc0xpc3QuYWRkKCd0YWcnLCAnaXMtZGVsZXRlJyk7XG4gICAgICAgIGNvbnN0IHRkRGVsZXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKTtcbiAgICAgICAgdGREZWxldGUuYXBwZW5kQ2hpbGQoZGVsZXRlQnRuKTtcblxuICAgICAgICBjb25zdCB0ciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJyk7XG4gICAgICAgIHRyLmFwcGVuZENoaWxkKHRkQ2hlY2tCdG4pO1xuICAgICAgICB0ci5hcHBlbmRDaGlsZCh0ZFRhc2tOYW1lKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREdWVEYXRlKTtcbiAgICAgICAgdHIuYXBwZW5kQ2hpbGQodGREZWxldGUpO1xuICAgICAgICBcbiAgICAgICAgdGFibGVCb2R5LmFwcGVuZENoaWxkKHRyKTtcbiAgICB9KTtcbn1cblxuZXhwb3J0IHtyZW5kZXJUYXNrcywgbmV3VGFza307ICIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtyZW5kZXJUYXNrc30gZnJvbSAnLi90YXNrbWFuYWdlcic7XG5cblxuXG5yZW5kZXJUYXNrcygpO1xuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==