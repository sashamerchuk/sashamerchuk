let listsArr=[];
document.getElementById("sendButton").addEventListener("click", openIndexedDB);
window.addEventListener("online", function (event) {
    const allAppeals = readAppealsFromLocalStorage();
    sendAppealsToServer(allAppeals);
    showAllAppeals(allAppeals);
    localStorage.removeItem("appeals");
});

function init(){
    data_context.get_lists((result)=>{
        listsArr=result;
        createDiv(listsArr);
    });
}
function createDiv(listsArr){
    const commentText = document.getElementById("commentSection").value.trim();
    if (commentText === "") {
        alert("Enter text in comment section!");
        document.getElementById("sendButton").blur();
        return;
    }
    const nickname = prompt("Enter your nickname: ", "User").trim();
    if (nickname === "" || nickname == null) {
        alert("Nickname is incorrect!");
        document.getElementById("sendButton").blur();
        return;
    }
    const time = new Date();

    if (isOnline()) {
        showAppeal(nickname, time, commentText);
        alert("Successfully sent to server");
    } else {
        allAppeals.push({name: nickname, time: time, text: commentText});
        console.log(allAppeals);
        data_context.add_list(allAppeals);
        alert("Saved to local storage");
    }

    document.getElementById("sendButton").blur();
    document.getElementById("commentSection").value = "";
}
function showAppeal(name, time, text) {
    const commentBlock = document.createElement("div");
    commentBlock.className = "col-sm-3";
    const userInfo = document.createElement("div");
    userInfo.className = "container1";
    const img = document.createElement('img');
    const comment = document.createElement("div");
    comment.className = "col-sm-9 ";
    const hr = document.createElement('div');
    hr.className='container-fluid hr1';

    userInfo.innerHTML = "<p>" + name + "</p>" + "<p>" + time.getHours() + ":"
        + (time.getMinutes() < 10 ? "0" : "") + time.getMinutes()
        + "</p>" + "<p>" + time.getDate() + "." + (time.getMonth() + 1) + "." + time.getFullYear() + "</p>";
    comment.innerHTML = "<p>" + text + "</p>";
    let insert = document.getElementsByClassName('insert');
    commentBlock.appendChild(userInfo);
    const parent = document.getElementById('row');
    parent.insertBefore(commentBlock,insert[0]);
    parent.insertBefore(comment,insert[0]);
}


function showAllAppeals(allAppeals) {
    data_context.get_lists()
    allAppeals.forEach(function (appeal) {
        showAppeal(appeal.name, new Date(appeal.time), appeal.text)
    });
}
const allAppeals = readAppealsFromLocalStorage();
function readAppealsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("appeals")) != null
        ? JSON.parse(localStorage.getItem("appeals")) : [];
}


function openIndexedDB(){

    //open a connection to the datastore
    var openRequest = indexedDB.open('todoDatabase', 4);
    // handle datastore upgrades.
    openRequest.onupgradeneeded = function(event) {
        console.log("Upgrading...");
        var db = event.target.result;
        var objectStore = db.createObjectStore("todo", {keyPath: "title"});
        console.log(db);

    }

    // handle successful datastore access.
    openRequest.onsuccess = function(event) {
        console.log("Success!");
        db = event.target.result;
        init();
    }

    openRequest.onerror = function(event) {
        console.log("Error");
    }

}
