// console.log("Hello");
// alert("Hello, welcome to the page!");

//retrieved the items from local-storage or initialize the todo;
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.querySelector(".input-field");
console.log(todoInput);

const button = document.querySelector(".btn");
const todoList = document.querySelector("#todoList");
const itemCount = document.querySelector(".todoCount");

const deleteButton = document.querySelector("#deleteAll");

// console.log(todoInput.value);
// console.log(button);

//Initialization

document.addEventListener("DOMContentLoaded", () => {
  // console.log('clicked');
  button.addEventListener("click", addTodo);
  todoInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTodo();
    }
  });
  deleteButton.addEventListener("click", deleteAllItems);
  displayItems();
});

function addTodo() {
  // console.log("click");
  console.log(todoInput.value);
  const newItem = todoInput.value.trim();
  if (newItem !== "") {
    todo.push({ text: newItem, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayItems();
  }
}

function deleteAllItems() {
  console.log("deleted");
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function displayItems() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
    <div class="todo-container">
      <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }/>
      <p id="todo-${index}" class=${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})" >${item.text}</p>
    </div>`;
    p.querySelector(".todo-checkbox").addEventListener("change", () => {
      toggleTask(index);
    });
    todoList.appendChild(p);
  });
}
