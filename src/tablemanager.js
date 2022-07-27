
//import pubsub from "./pubsub";

var tableManager = (function() {
    console.log('task manager');
    tasks = [
        {
            task: 'Go grocery shopping',
            dueDate: '2022-07-27',
            complete: false,
        },
        {
            task: 'Read a book',
            dueDate: '2022-05-31',
            complete: true,
        }
    ];
    
    // const newTaskBtn = document.getElementById('new-task-button');
    const tableBody = document.getElementById('table-body');
    

    function buildTasks() {
        tasks.forEach(task => {
            
            const tdCheckBtn = document.createElement('td');
            const lblCheckBtn = document.createElement('label');
            lblCheckBtn.classList.add('checkbox');
            const checkBtn = document.createElement('input');
            checkBtn.type = 'checkbox';
            lblCheckBtn.appendChild(checkBtn);
            tdCheckBtn.appendChild(lblCheckBtn);

            const tdTaskName = document.createElement('td');
            tdTaskName.innerText = task.task;
            
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
            
            console.log('bye');
            tableBody.appendChild(tr);
        });
    }

    return {
        buildTasks: buildTasks,
    }
    
})();

export let tableManager;