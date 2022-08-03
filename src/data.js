


let dataController = (function() {
    // if (storageAvailable('localStorage')) {
    //     console.log('local storage available');
    // } else {
        let projects = ['Default Project', 'Work']
        let tasks = [
            [   
                'Go grocery shopping',
                'Default Project',
                '2022-07-27',
                false,
            ],
            [
                'Read The Foundation by Isaac Asimov',
                'Default Project',
                '2022-05-31',
                false,
            ],
            [
                'Learn how to use localStorage',
                'Work',
                '2022-05-31',
                true,
            ]
            ,
            [
                'Sweep and mop the floors',
                'Default Project',
                '2022-05-31',
                false,
            ]
            ,
            [
                'Send Jan an email about our trip to Jamaica',
                'Work',
                '2022-08-11',
                false,
            ]
            ,
            [
                'Replace Google Chrome with Firefox',
                'Work',
                '2022-04-06',
                true,
            ]
        ];
    // }

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
    
    localStorage.clear();
    localStorage.setItem("tasks", tasks);
    localStorage.setItem("projects", projects);
    let task1 = convertStorageData(localStorage.getItem('tasks'))
    // console.table(tasks);
    // console.table(localStorage);
    console.table(task1)

})();

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

export {dataController};