let useLocalStorage = false;
var db;
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

function openIndexedDB(){
    let  openRequest= indexedDB.open('Fans Appeal',1);
    openRequest.onupgradeneeded=function(e){
        console.log("Upgradding ...");
        let thisDB= e.target.result;
        if(!thisDB.objectStoreNames.contains('people')){
            thisDB.createObjectStore('people',{autoIncrement:true});
        }
    };
    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
        console.log("d is ",db);
    }
}
IndexedDBDataProvider.prototype.add_key = function(allAppeal){
    let transaction = db.transaction(['people'],'readwrite');
    let store = transaction.objectStore('people');
    let request = store.add(allAppeal);
    request.onerror=function(e){
        console.log('Eror',e.target.error.name)
    };
    request.onsuccess=function (e) {
        console.log("You did it");
    }
};
IndexedDBDataProvider.prototype.get_lists = function() {
    let db,openRequest = indexedDB.open('Fans Appeal',1);
    let customers = [];
    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
        console.log("khgdjskjf",db);
        let transaction = db.transaction('people','readonly');
        let objectStore = transaction.objectStore('people');
       objectStore.openCursor().onsuccess=function(event){
           let cursor = event.target.result;
           if(cursor){
               customers.push(cursor.value);
               cursor.continue();
           }else{
               console.log("Got all customers " , customers);
           }
       }
    }
    console.log('customers',customers);
    return customers;

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