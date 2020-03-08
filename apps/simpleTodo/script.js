const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')
const newTask = document.getElementById('new-task')
const taskName = document.getElementById('task-name')
const dueDate = document.getElementById('due-date')

let tasks = [];
let counter = 0; // to count the number of the tasks.
let uncheckedCount = 0; // to count the number of the unchecked tasks.

function newTodo() {
  displayNewTaskBlock();
}

function resetNewTaskInput() {
  taskName.value = '';
  dueDate.value = '';
}

function addNewTask() {
  counter++;
  itemCountSpan.innerHTML = counter;
  createNewTask(taskName.value, dueDate.value);
  addTaskToListHtml(taskName.value, dueDate.value);
  updateHtmlValue();
  hideAddingTask();
}

function createNewTask(name, duedate) {
  let task = { taskName: name, dueDate: duedate };
  tasks.push(task);
}

function addTaskToListHtml(name, duedate) {
  let li = document.createElement("li");
  let label = document.createElement("Label");
  let checkbox = document.createElement('input');

  checkbox.setAttribute("type", "checkbox");
  checkbox.onclick = function () { handleCheckBox(checkbox.checked) };

  let delBtn = document.createElement("button");
  delBtn.onclick = function (event) {
    deleteTask(event);
  };
  delBtn.innerHTML = 'Delete task';

  label.innerHTML = name + " - " + duedate;
  label.appendChild(checkbox);
  label.append(delBtn);

  li.appendChild(label);
  list.appendChild(li);

  uncheckedCount++;
}

function updateHtmlValue() {
  uncheckedCountSpan.innerHTML = uncheckedCount;
  itemCountSpan.innerHTML = counter;
}

function displayNewTaskBlock() {
  if (newTask.style.display === "none" || newTask.style.display === "") {
    newTask.style.display = "block";
  }
}

function hideAddingTask() {
  if (newTask.style.display === "block") {
    newTask.style.display = "none";
  }
  resetNewTaskInput();
}

function handleCheckBox(checkboxValue) {
  if (checkboxValue == true) {
    uncheckedCount--;
  } else {
    uncheckedCount++;
  }
  updateHtmlValue();
}

function deleteTask(event) {
  let target = getEventTarget(event);
  let li = target.closest('li'); // get reference
  let nodes = Array.from(li.closest('ul').children); // get array
  let index = nodes.indexOf(li);
  let isChecked = list.children[index].childNodes[0].childNodes[1].checked;
  if (isChecked == false) {
    uncheckedCount--;
  }

  // remove the element at index
  tasks.splice(index, 1);
  counter--;
  if (tasks.length > 0) {
    list.removeChild(list.childNodes[index]); // have to update the index
  } else {
    list.innerHTML = '';
  }
  updateHtmlValue();
}

function getEventTarget(e) {
  e = e || window.event;
  return e.target || e.srcElement;
}
