import {pubsub} from "./pubsub";

const tableBody = document.getElementById('table-body');
const newTaskBtn = document.getElementById('new-task-button');
newTaskBtn.addEventListener('click', newTaskRequest);
pubsub.subscribe('add-task', newTask);

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
        pubsub.publish('add-task', {
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
            pubsub.publish('add-task', {
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

export {renderTasks}; 