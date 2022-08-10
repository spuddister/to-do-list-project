import {pubsub} from './pubsub';


let dataController = (function() {
    let projects = [];
    let tasks = [];

    let defaultProjects = ['Default Project', 'Work'];
    let defaultTasks = [
        [   
            'Go grocery shopping',
            'Default Project',
            '2022-08-08',
            'false',
        ],
        [
            'Read The Foundation by Isaac Asimov',
            'Default Project',
            '2022-08-10',
            'false',
        ],
        [
            'Learn how to use localStorage',
            'Work',
            '2022-08-08',
            'true',
        ]
        ,
        [
            'Sweep and mop the floors',
            'Default Project',
            '2022-05-31',
            'false',
        ]
        ,
        [
            'Send Jan an email about Jamaica trip',
            'Work',
            '2022-08-11',
            'false',
        ]
        ,
        [
            'Replace Google Chrome with Firefox',
            'Work',
            '2022-04-06',
            'true',
        ]
    ];

    pubsub.subscribe('task-deleted', setTasks);
    pubsub.subscribe('task-info-change', setTasks);
    pubsub.subscribe('task-saved', setTasks);
    pubsub.subscribe('project-saved', setProjects);
    
    if (storageAvailable('localStorage')) {
        if (localStorage.getItem('tasks') != null) {
            tasks = convertStorageData(localStorage.getItem('tasks'));
            // tasks=defaultTasks;
            // localStorage.setItem('tasks', tasks); //2 lines to be removed for prod
        } else {
            tasks = defaultTasks;
            localStorage.setItem('tasks', tasks);
        }
        if (localStorage.getItem('projects') != null) {
            projects = localStorage.getItem('projects').split(',');
            // projects = defaultProjects;
            // localStorage.setItem('projects', projects); //2 lines to be removed for prod
        } else {
            projects = defaultProjects;
            localStorage.setItem('projects', projects);
        }
            
    } else {
        projects = defaultProjects;
        tasks = defaultTasks;
    }


    function convertStorageData(data) {
        let tempArray = data.split(',')
        let convertedData = Array.from(Array(tempArray.length/4), () => new Array(4));
        let k = 0;
        let j = 0;
        for(let i=0; i< tempArray.length; i++){
            k=Math.floor(i/4);
            j = i%4;
            convertedData[k][j] = tempArray[i];
        }
        return convertedData;
    }


    function storageAvailable(type) {
        let storage;
        try {
            storage = window[type];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    function setTasks(newTasks){
        tasks = newTasks;
        localStorage.setItem('tasks', tasks);
    }
    function setProjects(newProjects){
        projects = newProjects;
        localStorage.setItem('projects', projects);
    }

    function getTasks(){
        return tasks;
    }

    function getProjects(){
        return projects;
    }

    return {
        setTasks: setTasks,
        getTasks: getTasks,
        setProjects: setProjects,
        getProjects: getProjects,
    }

})();



export {dataController};