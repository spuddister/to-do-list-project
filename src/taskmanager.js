import {pubsub} from "./pubsub";
import {dataController} from "./data";
import isThisWeek from 'date-fns/isThisWeek';
import isToday from 'date-fns/isToday';
import { parseISO, toDate } from "date-fns";

let taskManager = (function(){
    const tableBody = document.getElementById('table-body');
    const tableTitle = document.getElementById('table-title');
    let filterValue = '';
    let currentProject = '';
    let filteredTasks = [];
    pubsub.subscribe('new-task-request', newTaskRequest);
    pubsub.subscribe('task-added', newTask);
    pubsub.subscribe('new-task-cancelled', cancelTaskRequest);
    pubsub.subscribe('menu-item-selected', tableTitleUpdate);
    pubsub.subscribe('menu-item-selected', filterTasks);

    // let tasks = [
    //     {
    //         taskDesc: 'Go grocery shopping',
    //         dueDate: '2022-07-27',
    //         complete: false,
    //     },
    //     {
    //         taskDesc: 'Read a book',
    //         dueDate: '2022-05-31',
    //         complete: true,
    //     },
    //     {
    //         taskDesc: 'Test example',
    //         dueDate: '2022-05-31',
    //         complete: false,
    //     }
    // ]

    let tasks = dataController.getTasks();
    console.table(tasks)

    renderTasks(tasks);

    function newTaskRequest() {
        const tdAddBtn = document.createElement('td');
        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', ()=>{
            let projectName ='';
            if(currentProject != ''){
                projectName = currentProject;
            }
            pubsub.publish('task-added', [
            inputTaskName.value,
            projectName,
            inputDueDate.value,
            'false',
            ]);
            console.table(tasks);
        });
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
                let projectName ='';
                if(currentProject != ''){
                    projectName = currentProject;
                }
                pubsub.publish('task-added', [
                inputTaskName.value,
                projectName,
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
            pubsub.publish('new-task-cancelled');
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
        renderTasks(filteredTasks);
    }

    function clearTable() {
        tableBody.innerHTML = '';
    }

    function deleteTask(index) {
        tasks.splice(index,1);
        filterTasks();
        renderTasks(filteredTasks);
    }

    function renderTasks(renderList) {
        clearTable();
        renderList.forEach((task, index) => {
            const tdCheckBtn = document.createElement('td');
            const lblCheckBtn = document.createElement('label');
            lblCheckBtn.classList.add('checkbox');
            const checkBtn = document.createElement('input');
            checkBtn.type = 'checkbox';
            checkBtn.addEventListener('change', function() {
                if (this.checked) {
                    tr.classList.add('complete');
                    task[3] = 'true';
                } else {
                    tr.classList.remove('complete');
                    task[3] = 'false';
                }
            });
            lblCheckBtn.appendChild(checkBtn);
            tdCheckBtn.appendChild(lblCheckBtn);

            const tdTaskName = document.createElement('td');
            tdTaskName.innerText = task[0];
            
            const tdDueDate = document.createElement('td');
            tdDueDate.innerText = task[2];
            
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
            if (task[3] === 'true') {
                tr.classList.add('complete');
                checkBtn.checked = true;
            }            
            tableBody.appendChild(tr);
        });
    }

    function tableTitleUpdate(menuItem){
        tableTitle.textContent = menuItem.textContent;
        filterValue = menuItem.textContent;
    }

    function filterTasks() {
        filteredTasks = [];
        if (filterValue == 'All Tasks') {
            currentProject = '';
            filteredTasks = tasks;
        } else if(filterValue == 'Today'){
            currentProject = '';
            for(let i=0; i<tasks.length; i++){
                if (isToday(parseISO(tasks[i][2]))) {
                    filteredTasks.push(tasks[i]);
                }
            }
            console.table(filteredTasks)
        } else if(filterValue == 'This Week'){
            currentProject = '';
            for(let i=0; i<tasks.length; i++){
                if (isThisWeek(parseISO(tasks[i][2]))) {
                    filteredTasks.push(tasks[i]);
                }
            }
            console.table(filteredTasks)
        } else {
            currentProject = filterValue;
            for(let i=0; i<tasks.length; i++){
                if (tasks[i][1] == currentProject) {
                    filteredTasks.push(tasks[i]);
                }
            }
        }
        renderTasks(filteredTasks);
    }
})();


export {taskManager}; 