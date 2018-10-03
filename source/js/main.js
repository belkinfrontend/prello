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
            li.setAttribute("draggable", "true");
            

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


//===================== Drag & Drop

const dragStart = (event) => {
  event.dataTransfer.setData("text/plain", event.target.id);
}

const allowDrop = (event) => {
  event.preventDefault();
  //event.currentTarget.style.background = '#7f8082';
}

const drop = (event) => {
  event.preventDefault();
  const data = event.dataTransfer.getData("text/plain");
  const element = document.querySelector('li');
  //event.currentTarget.style.background = 'white'
  try {
    event.target.appendChild(element);
  } catch (error) {
    console.warn("you can't move the item to the same place")
  }
}