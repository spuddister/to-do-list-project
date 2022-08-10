import { dataController } from "./datamanager";
import { pubsub } from "./pubsub";


let projectController = (function() {
    let projects = dataController.getProjects();
    let menuItems = [...document.getElementsByClassName('menu-item')];
    let selectedMenuItem = menuItems[0];
    const projectList = document.getElementById('project-list');
    const dltProjectBtn = document.getElementById('delete-project-button');
    dltProjectBtn.style.display = 'none';
    pubsub.subscribe('new-project-request', newProjectRequest);
    pubsub.subscribe('project-added', newProject);
    pubsub.subscribe('new-project-cancelled', cancelProjectRequest);
    pubsub.subscribe('menu-item-selected', menuItemSelection);
    pubsub.subscribe('project-selected', function(){
        dltProjectBtn.style.display = 'flex';
    })
    pubsub.subscribe('delete-project', deleteProject);
    
    for(let i=0; i<=2; i++){
        menuItems[i].addEventListener('click', function(){
            pubsub.publish('menu-item-selected', menuItems[i]);
        })
    }
    
    render();
    menuItemSelection(menuItems[0]);

    function menuItemSelection(selectedItem) {
        menuItems.forEach(item => {
            item.classList.remove('is-active');
        });
        selectedItem.classList.add('is-active');
        selectedMenuItem = selectedItem;
        if(selectedItem.textContent != 'All Tasks' && selectedItem.textContent != 'Today' && selectedItem.textContent != 'This Week') {
            pubsub.publish('project-selected', selectedItem);
        } else {
            dltProjectBtn.style.display = 'none';
        }
    }

    function newProjectRequest() {
        const liProjectName = document.createElement('li');
        const inputProjectName = document.createElement('input');
        inputProjectName.classList.add('input');
        inputProjectName.type = 'text';
        inputProjectName.placeholder = 'Project name';
        inputProjectName.addEventListener('keypress', (e)=>{
            if(e.key === 'Enter') {
                pubsub.publish('project-added', inputProjectName.value);
            }
        });
        liProjectName.appendChild(inputProjectName);

        const addBtn = document.createElement('button');
        addBtn.addEventListener('click', function(){
            pubsub.publish('project-added', inputProjectName.value);
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
        pubsub.publish('project-saved', projects);
        projectList.lastChild.remove();
        projectList.appendChild(buildProjectListItem(projectName));
    }

    function buildProjectListItem(projectName){
        const listElement = document.createElement('li');
        const anchorElement = document.createElement('a');
        anchorElement.innerText = projectName;
        anchorElement.addEventListener('click', function(){
            pubsub.publish('menu-item-selected', anchorElement);
        });
        anchorElement.classList.add('menu-item');
        menuItems.push(anchorElement);
        listElement.appendChild(anchorElement);
        return listElement;
    }

    function cancelProjectRequest() {
        projectList.lastChild.remove();
    }

    function deleteProject() {
        projects.splice(projects.findIndex((project)=>project == selectedMenuItem.textContent),1);
        pubsub.publish('project-deleted', selectedMenuItem.textContent);
        dataController.setProjects(projects);
        projectList.innerHTML ='';
        pubsub.publish('menu-item-selected', menuItems[0]);
        render();
    }

    function render() {
        projects.forEach(project => {
            projectList.appendChild(buildProjectListItem(project));
        });
    }
})()

export {projectController};