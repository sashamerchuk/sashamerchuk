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

};
function addPerson() {
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

    var customers = [];
    store.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            customers.push(cursor.value.comment);
            cursor.continue();
        }
        else {
            console.log("Got all customers: " + customers[0]);
        }
    };
}
