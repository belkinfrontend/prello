import Sortable from 'sortablejs';

Sortable.create(todo, {
    animation: 200,
    group: {
        name: "shared",
        //pull: "clone",
        revertClone: true,
    },
    sort: true
});

Sortable.create(completed, {
    group: "shared",
    sort: false
});


// Remove and complete icons in SVG format
const changeSVG = '<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 64 64" style="enable-background:new 0 0 64 64;" xml:space="preserve"><g><g><path d="M33,2c7.746,0,15.028,3.017,20.505,8.494c10.138,10.137,11.31,26.396,2.74,37.849L52,52.589V44h-2v11l1,1h11v-2h-8.582l4.292-4.293l0.092-0.106c9.211-12.247,7.972-29.667-2.883-40.521C49.064,3.225,41.28,0,33,0V2z"/><path d="M7.755,15.657L12,11.411V20h2V9l-1-1H2v2h8.582L6.29,14.293l-0.092,0.106C-3.013,26.646-1.773,44.066,9.081,54.92C14.936,60.775,22.72,64,31,64v-2c-7.746,0-15.028-3.017-20.505-8.494C0.357,43.369-0.814,27.11,7.755,15.657z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>';
const removeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><g><g><path class="fill" d="M16.1,3.6h-1.9V3.3c0-1.3-1-2.3-2.3-2.3h-1.7C8.9,1,7.8,2,7.8,3.3v0.2H5.9c-1.3,0-2.3,1-2.3,2.3v1.3c0,0.5,0.4,0.9,0.9,1v10.5c0,1.3,1,2.3,2.3,2.3h8.5c1.3,0,2.3-1,2.3-2.3V8.2c0.5-0.1,0.9-0.5,0.9-1V5.9C18.4,4.6,17.4,3.6,16.1,3.6z M9.1,3.3c0-0.6,0.5-1.1,1.1-1.1h1.7c0.6,0,1.1,0.5,1.1,1.1v0.2H9.1V3.3z M16.3,18.7c0,0.6-0.5,1.1-1.1,1.1H6.7c-0.6,0-1.1-0.5-1.1-1.1V8.2h10.6L16.3,18.7L16.3,18.7z M17.2,7H4.8V5.9c0-0.6,0.5-1.1,1.1-1.1h10.2c0.6,0,1.1,0.5,1.1,1.1V7z"/></g><g><g><path class="fill" d="M11,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6s0.6,0.3,0.6,0.6v6.8C11.6,17.7,11.4,18,11,18z"/></g><g><path class="fill" d="M8,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8C7.4,10.2,7.7,10,8,10c0.4,0,0.6,0.3,0.6,0.6v6.8C8.7,17.7,8.4,18,8,18z"/></g><g><path class="fill" d="M14,18c-0.4,0-0.6-0.3-0.6-0.6v-6.8c0-0.4,0.3-0.6,0.6-0.6c0.4,0,0.6,0.3,0.6,0.6v6.8C14.6,17.7,14.3,18,14,18z"/></g></g></g></svg>';
const completeSVG = '<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22 22" style="enable-background:new 0 0 22 22;" xml:space="preserve"><rect y="0" class="noFill" width="22" height="22"/><g><path class="fill" d="M9.7,14.4L9.7,14.4c-0.2,0-0.4-0.1-0.5-0.2l-2.7-2.7c-0.3-0.3-0.3-0.8,0-1.1s0.8-0.3,1.1,0l2.1,2.1l4.8-4.8c0.3-0.3,0.8-0.3,1.1,0s0.3,0.8,0,1.1l-5.3,5.3C10.1,14.3,9.9,14.4,9.7,14.4z"/></g></svg>';


// User clicked on the add button
// If there is any text inside the item field, add that text to the todo list
document.getElementById('add').addEventListener('click', function() {
    let value = document.getElementById('item').value;
    if (value) {
        addItemTodo(value);
        document.getElementById('item').value = '';
    }
});

document.getElementById('item').addEventListener('keydown', function(event) {
    let value = event.currentTarget.value;

    if ((event.code === 'Enter' || event.code === 'NumpadEnter') && value) {
        addItemTodo(value);
        document.getElementById('item').value = '';
    }
});




const changeItem = (event) => {
    let item = event.currentTarget.parentNode.parentNode.childNodes[0];
    let itemChange = event.currentTarget;
    console.log(item);

    if (item.disabled == true) {
        item.removeAttribute('disabled');
        item.style.cursor = 'text';
        item.style.border = '1px solid #25b99a';
        item.focus();

    } else {
        item.setAttribute('disabled', true);
        item.style.cursor = 'move';
        item.style.border = '1px solid #838485';
    }
}

const removeItem = (event) => {
    let item = event.currentTarget.parentNode.parentNode;
    let parent = item.parentNode;

    parent.removeChild(item);
}

const completeItem = (event) => {
    let item = event.currentTarget.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;
    let value = item.innerText;

    //===== Check if the item should be added to the completed list or to re-added to the todo list
    let target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);
}

//===== Adds a new item to the to do list

const addItemTodo = (text) => {
    let list = document.getElementById('todo');
    let item = document.createElement('li');
    item.setAttribute("draggable", true);

    let itemInput = document.createElement('input');
    itemInput.setAttribute("disabled", "true");
    itemInput.style.cursor = 'move';
    itemInput.style.border = '1px solid #838485';
    itemInput.value = text;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let change = document.createElement('button');
    change.classList.add('change');
    change.innerHTML = changeSVG;

    let remove = document.createElement('button');
    remove.classList.add('remove');
    remove.innerHTML = removeSVG;

    let complete = document.createElement('button');
    complete.classList.add('complete');
    complete.innerHTML = completeSVG;

    //===== Add click event for changing & removing & compliting items
    change.addEventListener('click', changeItem);
    remove.addEventListener('click', removeItem);
    complete.addEventListener('click', completeItem);

    //===== appendChild

    buttons.appendChild(change);
    buttons.appendChild(remove);
    buttons.appendChild(complete);
    item.appendChild(itemInput);
    item.appendChild(buttons);
    list.insertBefore(item, list.childNodes[0]);
}