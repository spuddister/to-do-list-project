import { pubsub } from "./pubsub";


let menuController = (function() {
    let menuItems = [...document.getElementsByClassName('menu-item')];
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(){
            menuItems.forEach(item => {
                item.classList.remove('is-active');
            });
            item.classList.add('is-active');
        })
    });
    const projectList = document.getElementById('project-list');
    

    function newProject() {
        
    }
})()

export {menuController};
