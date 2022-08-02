import { pubsub } from "./pubsub";


let menuController = (function() {
    let menuItems = [...document.getElementsByClassName('menu-item')];
    const projectList = document.getElementById('project-list');
    const dltProjectBtn = document.getElementById('delete-project-button');
    dltProjectBtn.style.display = 'none';
    pubsub.subscribe('new-project-request', newProjectRequest);
    pubsub.subscribe('project-added', newProject);
    pubsub.subscribe('new-project-cancelled', cancelProjectRequest);
    pubsub.subscribe('menu-item-selected', menuItemSelection);

    let projects = ['Default Project'];

    render();

    menuItems.forEach(item => {
        menuItemAddEventListener(item);
    });
    
    function menuItemAddEventListener(item) {
        item.addEventListener('click', function(){
            pubsub.publish('menu-item-selected', item);
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
                pubsub.publish('project-added', inputProjectName.value)
            }
        });
        liProjectName.appendChild(inputProjectName);

        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', function(){
            pubsub.publish('project-added', inputProjectName.value)
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

export {menuController};