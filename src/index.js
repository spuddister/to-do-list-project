import {taskManager} from './taskmanager';
import {menuController} from './menu'
import { pubsub } from './pubsub';

const newTaskBtn = document.getElementById('new-task-button');
newTaskBtn.addEventListener('click', function(){
    pubsub.publish('new-task-request');
    taskBtnToggle();    
});
pubsub.subscribe('task-added', taskBtnToggle)
function taskBtnToggle() {
    newTaskBtn.classList.toggle('is-loading');
}

const newProjectBtn = document.getElementById('new-project-button');
newProjectBtn.addEventListener('click', function(){
    pubsub.publish('new-project-request');
    projectBtnToggle();    
});
pubsub.subscribe('project-added', projectBtnToggle)
function projectBtnToggle() {
    newProjectBtn.classList.toggle('is-loading');
}

