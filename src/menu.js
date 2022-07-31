import { pubsub } from "./pubsub";


let menuController = (function() {
    let menuItems = [...document.getElementsByClassName('menu-item')];
    const projectList = document.getElementById('project-list');
    pubsub.subscribe('new-project-request', newProjectRequest);
    pubsub.subscribe('new-project-cancelled', cancelProjectRequest);
    
    menuItems.forEach(item => {
        menuItemAddEventListener(item);
    });
    
    function menuItemAddEventListener(item) {
        item.addEventListener('click', function(){
            menuItems.forEach(item => {
                item.classList.remove('is-active');
            });
            item.classList.add('is-active');
        })
    }

    function newProjectRequest() {
        const liProjectName = document.createElement('li');
        const inputProjectName = document.createElement('input');
        inputProjectName.classList.add('input');
        inputProjectName.type = 'text';
        inputProjectName.placeholder = 'Project name'
        inputProjectName.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') {
                pubsub.publish('project-added', inputProjectName.value)
                console.log(inputProjectName.value);
            }
        });
        liProjectName.appendChild(inputProjectName);

        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', (e)=>{
            pubsub.publish('project-added', inputProjectName.value)
            console.log(inputProjectName.value);
        });
        addBtn.classList.add('button', 'is-primary', 'is-light', 'new-project-button');
        addBtn.textContent = 'Add';
        
        const cancelBtn = document.createElement('button');
        cancelBtn.addEventListener('click', function(){
            pubsub.publish('new-project-cancelled');
        })
        cancelBtn.classList.add('button', 'is-danger', 'is-light', 'new-project-button');
        cancelBtn.textContent = 'Cancel';

        const btnDiv = document.createElement('div');
        btnDiv.appendChild(addBtn);
        btnDiv.appendChild(cancelBtn);
        liProjectName.appendChild(btnDiv);
        projectList.appendChild(liProjectName);
    }

    function cancelProjectRequest() {
        projectList.lastChild.remove();
    }
})()

export {menuController};