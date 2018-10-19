//===================== Drag & Drop
export const dragStart = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
}
export const allowDrop = (event) => {
    event.preventDefault();
    alert(222);
    //event.currentTarget.style.background = '#7f8082';
}
export const drop = (event) => {
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