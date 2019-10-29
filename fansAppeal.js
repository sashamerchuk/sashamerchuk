document.getElementById("sendButton").addEventListener("click", addAppeal);
window.addEventListener("online", function (event) {
    const allAppeals = readAppealsFromLocalStorage();
    sendAppealsToServer(allAppeals);
    showAllAppeals(allAppeals);
    localStorage.removeItem("appeals");
});

const allAppeals = readAppealsFromLocalStorage();
if (isOnline()) {
    sendAppealsToServer(allAppeals);
    showAllAppeals(allAppeals);
    localStorage.removeItem("appeals");
}

function addAppeal() {
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
        saveAppealsToLocalStorage(allAppeals);
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
    allAppeals.forEach(function (appeal) {
        showAppeal(appeal.name, new Date(appeal.time), appeal.text)
    });
}

function sendAppealsToServer(allAppeals) {
    if (allAppeals.length) {
        alert("Successfully sent to server!")
    }
}

function saveAppealsToLocalStorage(allAppeals) {
    localStorage.setItem("appeals", JSON.stringify(allAppeals));
}

function readAppealsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("appeals")) != null
        ? JSON.parse(localStorage.getItem("appeals")) : [];
}

String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, "");
};

function isOnline() {
    return window.navigator.onLine;
}