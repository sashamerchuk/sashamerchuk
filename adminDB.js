let useLocalStorage = false;

var LocalStorageDataProvider = function(){};

//Save TODO Lists in the Localstorage by reading values entered in the UI
LocalStorageDataProvider.prototype.add_key = function(key) {
    localStorage.setItem("appeals",JSON.stringify(key));
};

//Read TODO Lists from the Localstorage ця функція повертає значення які ми записали  в select list
LocalStorageDataProvider.prototype.get_lists = function(callback) {
    return JSON.parse(localStorage.getItem("appeals")) != null
        ? JSON.parse(localStorage.getItem("appeals")) : [];
};

var IndexedDBDataProvider = function(){};
IndexedDBDataProvider.prototype.add_key = function(){
    let db, openRequest= indexedDB.open('Fans Appeal',1);
    openRequest.onupgradeneeded=function(e){
        console.log("Upgradding ...");
        let thisDB= e.target.result;
        if(!thisDB.objectStoreNames.contains('people')){
            thisDB.createObjectStore('people',{autoIncrement:true});
        }
    };
    openRequest.onsuccess=function(e){
        console.log("OK!");
        db=e.target.result;
        let transaction= db.transaction(['people'],'readwrite');
        let store =transaction.objectStore('people');
        let commentSection = document.getElementById('commentSection').value;
        let person = {
            comment:commentSection,
            date: new Date()
        };
        let request = store.add(person);
        request.onerror = function(e){
            console.log('erroe')
        };
        request.onsuccess=function (e) {
            console.log("Ycpex");
        };

    };
};
IndexedDBDataProvider.prototype.get_lists = function() {
    let db, openRequest = indexedDB.open('Fans Appeal', 1);
    openRequest.onsuccess = function (e) {
        console.log("OK!");
        db = e.target.result;
        let transaction = db.transaction(['people'], 'readwrite');
        let store = transaction.objectStore('people');
        var customers = [];
        store.openCursor().onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                customers.push(cursor.value.comment);
                cursor.continue();
            } else {
                console.log("Got all customers: " + customers[0]);
            }
        };
    };
};

var DAL = function(){
    //var useLocalStorage = false;
    !window.indexedDB
    if (useLocalStorage) {
        this.data_provider = new LocalStorageDataProvider();
    } else {
        this.data_provider = new IndexedDBDataProvider();
    }
};

DAL.prototype.add_list = function(key) {
    this.data_provider.add_key(key);
};
DAL.prototype.get_lists = function() {
    return this.data_provider.get_lists();
};

var data_context = new DAL();