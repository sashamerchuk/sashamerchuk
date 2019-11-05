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

var IndexedDBDataProvider = function(){
    this.ready = new Promise((resolve,reject)=>{
        var request = window.indexedDB.open("Fans Appeal",4);
        request.onupgradeneeded= e =>{
            this.db = e.target.result;
            this.db.createObjectStore('Fans Appeal');
        };
        request.onsuccess=(e)=>{
            this.db = e.target.result;
            resolve();
        };
        request.onerror= e =>{
            this.db = e.target.result;
            reject(e);
        }
    });
};

IndexedDBDataProvider.prototype.add_key = function(key,value){
    return this.ready.then(()=>{
        return new Promise((resolve,reject)=>{
            var request =this.getStore().put(value,key);
            request.onsuccess=resolve;
            request.onerror=reject;
        })
    })
};
IndexedDBDataProvider.prototype.get_lists = function(key) {
    return this.ready.then(()=>{
        return new Promise((resolve,reject)=>{
            var request = this.getStore().get(key);
            request.onsuccess = resolve;
            request.onerror = reject;
        })
    })
};
IndexedDBDataProvider.prototype.getStore = function(){
    return this.db
        .transaction(['Fans Appeal'],'readwrite')
        .objectStore('Fans Appeal')
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