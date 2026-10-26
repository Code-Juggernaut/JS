const params = new URLSearchParams({
    user_id:"1"
});

const url = `http://myawesomesite?${params}`;
console.log(url);

const responce = await fetch(url);

//https://jsonplaceholder.typicode.com/users/1


const xhr = new XMLHttpRequest();

xhr.open(
    "GET",
    "https://jsonplaceholder.typicode.com/users/1"
);

xhr.addEventListener("load", () => {
    console.log("Статус:", xhr.status);
    console.log("Відповідь:", xhr.responseText);
});

xhr.addEventListener("error", () => {
    console.log("Не вдалося отримати відповідь.");
});

xhr.send();






const post = {
    title: "Моя перша публікація",
    body: "Вивчаю взаємодію із сервером.",
    userId: 1
};

const xhr = new XMLHttpRequest();

xhr.open(
    "POST",
    "https://jsonplaceholder.typicode.com/posts"
);

xhr.setRequestHeader(
    "Content-Type",
    "application/json"
);

xhr.responseType = "json";

xhr.addEventListener("load", () => {
    if (xhr.status < 200 || xhr.status >= 300) {
        console.log(`HTTP-помилка: ${xhr.status}`);
        return;
    }
    console.log("Відповідь:", xhr.response);
});

xhr.addEventListener("error", () => {
    console.log("Не вдалося надіслати запит.");
});

xhr.send(JSON.stringify(post));