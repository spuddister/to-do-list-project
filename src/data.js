


let dataController = (function() {
    let projects = [];
    let tasks = [];

    let defaultProjects = ['Default Project', 'Work'];
    let defaultTasks = [
        [   
            'Go grocery shopping',
            'Default Project',
            '2022-07-27',
            'false',
        ],
        [
            'Read The Foundation by Isaac Asimov',
            'Default Project',
            '2022-05-31',
            'false',
        ],
        [
            'Learn how to use localStorage',
            'Work',
            '2022-05-31',
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
            'Send Jan an email about our trip to Jamaica',
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
    
    if (storageAvailable('localStorage')) {
        if (localStorage.getItem('tasks') != null) {
            tasks = convertStorageData(localStorage.getItem('tasks'));
        } else {
            tasks = defaultTasks;
        }
        if (localStorage.getItem('projects') != null) {
            projects = localStorage.getItem('projects').split(',');
        } else {
            projects = defaultProjects;
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
    
    // localStorage.clear();
    // localStorage.setItem("tasks", tasks);
    // localStorage.setItem("projects", projects);
    // console.log(localStorage.getItem('projects'))


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

    function updateLocalStorage(){ //possibly not needed
        localStorage.clear();
        localStorage.setItem('tasks', tasks);
        localStorage.setItem('projects', projects);
    }

    function setTask(task){
        tasks.push(task);
        localStorage.setItem('tasks', tasks);
    }

    function deleteTask(task){
        // let index = tasks.findIndex()
        //instead of finding the specific task, this function should except a new list of tasks and update the storage with that instead
    }

    function getTasks(){
        return tasks;
    }

    return {
        setTask: setTask,
        getTasks: getTasks,
        deleteTask: deleteTask,

    }

})();



export {dataController};