document.addEventListener("DOMContentLoaded",function() {
    let allNews = [];
    window.addEventListener("online", function (event) {
        provider.get("news", (news) => {
            if (news) {
                allNews = news;
            }
            sendAllNewsToServer(allNews);
            showAllNews(allNews);
            provider.remove("news");
            allNews = [];
        });
    });
    provider.get("news", (news) => {
        if (news) {
            allNews = news;
        }
    });
    if (isOnline()) {
        sendAllNewsToServer(allNews);
        provider.remove("news");
        allNews = [];

        let req = new XMLHttpRequest();
        req.open("GET", "/all_news", true);
        req.send();
        req.onreadystatechange = function() {
            if (req.readyState === XMLHttpRequest.DONE) {
                if (req.status != 200) {
                    console.log("Something goes wrong!");
                }
                else {
                    let data = JSON.parse(req.responseText);
                    showAllNews(data);
                }
            }
        };
    }

    function addNews(imgSrc, title, body) {

        const newsBlock = document.createElement("div");
        newsBlock.className = "childFlex";
        const img = document.createElement("img");
        img.className = 'critica';
        img.src = imgSrc;
        img.alt = 'News Image';
        const pH = document.createElement('p');
        pH.className = 'headNew';
        pH.innerHTML = title;
        const pBody = document.createElement('p');
        pBody.innerHTML = body;
        newsBlock.append(img);
        newsBlock.append(pH);
        newsBlock.append(pBody);
        document.getElementsByClassName('news')[0].appendChild(newsBlock);
    }

    function showAllNews(allNews) {
        for (let i = 0; i < allNews.length; i++) {
            addNews(allNews[i].imgSrc, allNews[i].title, allNews[i].body);
        }
    }

    function sendNewsToServer(imgSrc, title, body) {
        fetch("/all_news", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({imgSrc: imgSrc, title: title, body: body}),
        })
            .catch(error => console.error("Cannot fetch data:", error));
    }

    function sendAllNewsToServer(allNews) {
        for (let i = 0; i < allNews.length; i++) {
            sendNewsToServer(allNews[i].imgSrc, allNews[i].title, allNews[i].body)
        }
    }
});