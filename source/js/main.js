const input = document.querySelector("input[type = 'text']");
const ul = document.querySelector("ul");
const deleteItems = document.getElementsByClassName("deleteItem");
const checkItems = document.getElementsByClassName("checkItem");


//===================== event listener

input.addEventListener("keypress", function (keyPressed) {
    if (keyPressed.which === 13) {
        if (this.value === "") {

        } else {


            const li = document.createElement("li");
            li.setAttribute("draggable", "true")

            const checkItem = document.createElement("img");
            checkItem.className = "checkItem";
            checkItem.src = "./images/check.svg";

            const deleteItem = document.createElement("img");
            deleteItem.className = "deleteItem";
            deleteItem.src = "./images/delete.svg";

            let newTodo = this.value;
            this.value = ""

            console.log(newTodo);
            ul.appendChild(li).append(newTodo, checkItem, deleteItem);

            console.log(checkItems);

            checkToDo();
            deleteToDo();
        }
    }
});

//===================== delete To Do

function deleteToDo() {

    for (let deleteIt of deleteItems) {
        deleteIt.addEventListener("click", function (e) {
            deleteIt.parentElement.remove();
            e.stopPropagation();


        });
    }
}

//===================== event listener for line-through checkItem



function checkToDo() {

    for (let checkIt of checkItems) {
        checkIt.addEventListener("click", function (e) {
            checkIt.parentElement.classList.toggle('lineThroughItem');
            e.stopPropagation();


        });
    }
}

//
//
//let promise = new Promise( (resolve, reject) => {
//    const xhr = new XMLHttpRequest();
//    xhr.open('GET', 'https://uinames.com/api/?ext');
//
//    xhr.onreadystatechange = function() {
//        if (xhr.readyState === 4) {
//            if(xhr.status >= 200 && xhr.status < 300)
//                resolve(this.responseText)
//            else
//                reject(this.statusText);
//        }
//    }
//    xhr.send();
//});
//
//promise
//    .then(
//        (data) => {
//            let parsed = JSON.parse(data);
//            console.log(parsed);
//            
//            let img = document.querySelector("#img");
//            img.src = parsed.photo;
//            img.style.border = "5px dotted #212121";
//            
//            let img2 = document.querySelector("#img2");
//            img2.src = 'https://picsum.photos/200/300/?random';
//            img2.style.border = "5px dotted #212121";
//            
//        },
//        (err) => {
//            console.error('My error', err);
//
// 
//        }
//    );
//        
//