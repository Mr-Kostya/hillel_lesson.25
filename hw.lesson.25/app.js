const mainContainer = document.getElementById("users");

fetch("https://jsonplaceholder.typicode.com/albums")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
    });

const appendData = (data) => {
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = data[i].title;
        li.classList.add("item");
        li.dataset.userId = data[i].id;
        li.addEventListener("click", (event) => getPosts(event));
        mainContainer.appendChild(li);
    }
};

function cleanPosts() {
    const users = document.querySelectorAll(".item ul");
    for (let i = 0; i < users.length; i++) {
        if (users[i]) {
            users[i].style.display = "none";
        }
    }
}

function getPosts(event) {
    const userId = event.target.dataset.userId;

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${userId}`)
        .then((response) => response.json())
        .then((json) => {
            renderPosts(json, event.target);
        });
}

function renderPosts(posts, target) {
    const postsList = target.childNodes[1];

    cleanPosts();

    if (postsList) {
        postsList.style.display = "block";
    } else {
        const list = document.createElement("ul");

        for (let i = 0; i < posts.length; i++) {
            let image = document.createElement("img");
            let item = document.createElement("li");
            let liTitle = document.createElement("strong");
            let liBody = document.createElement("p");

            image.src = posts[i].thumbnailUrl;
            liTitle.innerHTML = posts[i].title;

            item.appendChild(liTitle);
            item.appendChild(liBody);
            list.appendChild(item);
            item.appendChild(image);
        }

        target.appendChild(list);
    }
}

