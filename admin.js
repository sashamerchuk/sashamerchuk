
document.getElementById('addImageButton').addEventListener('click',addImage);
document.getElementById('sendNewsButton').addEventListener('click',sendNews);
document.addEventListener("DOMContentLoaded", openIndexedDB, false);
window.addEventListener('online',function(event){
    const allNews = data_context.get_lists();
    sendNewsToServer(allNews);
    if(isOnline()){
    localStorage.removeItem('appeals');
    }
});
const allNews= data_context.get_lists();

function addImage(){
    const input = document.querySelector('input[type=file]');
    const uploadedImage=document.getElementById('uploadedImage');
    if(input.files[0]!=null){
        uploadedImage.setAttribute('src',window.URL.createObjectURL(input.files[0]));
    }
    document.getElementById('addImageButton').blur();
}

function sendNews() {
    let newsImageSrc, newsTitle, newsBody;

    newsImageSrc = document.getElementById("uploadedImage").getAttribute("src");
    newsTitle = document.getElementById("newsTitle").value.trim();
    if (newsTitle === "" || newsTitle == null) {
        alert("News title is incorrect!");
        document.getElementById("sendNewsButton").blur();
        return;
    }
    newsBody = document.getElementById("newsBody").value.trim();
    if (newsBody === "" || newsBody == null) {
        alert("News body is incorrect!");
        document.getElementById("sendNewsButton").blur();
        return;
    }

    if (isOnline()) {
        alert("Successfully send to server");
    } else {
        if(useLocalStorage){
            allNews.push({imgSrc: newsImageSrc, title: newsTitle, body: newsBody});
            data_context.add_list(allNews);
            alert("Saved to local storage");
        }
        else{
            let person = {
                imgSrc:newsImageSrc,
                title:newsTitle,
                body:newsBody
            };
            data_context.add_list(person);
            alert("Saved to indexed db");
        }
    }

    document.getElementById("newsTitle").value = "";
    document.getElementById("newsBody").value = "";
    document.getElementById("sendNewsButton").blur();
}
    function sendNewsToServer(allNews) {
        if (allNews) {
            alert("Successfully sent to server!")
        }
    }

    function saveNewsToLocalStorage(allNews) {
        localStorage.setItem("news", JSON.stringify(allNews));
    }

    function readNewsFromLocalStorage() {
        return JSON.parse(localStorage.getItem("news")) != null
            ? JSON.parse(localStorage.getItem("news")) : [];
    }

    function isOnline() {
        return window.navigator.onLine;
    }
