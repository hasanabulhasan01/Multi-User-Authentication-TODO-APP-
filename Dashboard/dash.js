var getUl = document.getElementById("todo-ul");

var currentUser = JSON.parse(localStorage.getItem("currentUser"));
document.getElementById("loginuser").innerHTML = currentUser.username;

var todos = JSON.parse(localStorage.getItem("todos"));
var currentUserTodos = todos.filter(function (data){
  return data.user_id == currentUser.userId;
});

console.log(currentUserTodos, "currentUserTodos");

getUl.innerHTML =
  currentUserTodos &&
  currentUserTodos
    .map(function (data) {
      console.log(data, "data--");
      return `<li class="list-group-item d-flex justify-content-between align-items-center"
                id="todo-item">${data.todo}<div
                  class="buttons-group d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    class="btn btn-primary edit-btn me-1 mb-2"
                    onclick="edit(${data.todo_id})"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary trash-btn me-1 mb-2"
                    onclick="handledelete(${data.todo_id})"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </li>`;
    })
    .join("");

function addTask() {
  console.log("add task");
  
  var inp = document.getElementById("todoinp");
  var listitem = document.getElementById("todo-item");
  var inpVal = inp.value;

  if (!inpVal) {
    return alert("Please add a task");
  }

  var todos = JSON.parse(localStorage.getItem("todos"));
  var count = 0;
  var lastTodo = todos ? todos[todos.length - 1] : null;
  console.log(todos, "todos");

  var currentDate = new Date();
  // Get the hours and minutes from the date object.

  var todos = JSON.parse(localStorage.getItem("todos"));
  var todo = {
    todo_id: lastTodo ? lastTodo.todo_id + 1 : (count += 1),
    user_id: currentUser.userId,
    todo: inpVal,
    createdat: currentDate.getTime(),
  };

  console.log(todo, "todoItem");

  if (!todos) {
    todos = [todo];
  } else {
    todos.push(todo);
  }

  localStorage.setItem("todos", JSON.stringify(todos));

  getUl.innerHTML += `<li
                class="list-group-item d-flex justify-content-between align-items-center"
                id="todo-item"
              >${inpVal}<div
                  class="buttons-group d-flex justify-content-center align-items-center"
                >
                  <button
                    type="button"
                    class="btn btn-primary edit-btn me-1 mb-2"
                    onclick="edit(this)"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary trash-btn me-1 mb-2"
                    onclick="handledelete(this)"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </button>
                </div>
              </li>`;

  console.log(inpVal, listitem, "inpVal");
  inp.value = "";
}

function edit(e) {
  console.log(e, "edit value");
  var todos = JSON.parse(localStorage.getItem("todos"));
  var currentTodo = todos.filter(function (data) {
    return data.todo_id == e;
  });

  console.log(currentTodo[0].todo, "currentTodo");

  // var value = e.parentNode.parentNode.firstChild.textContent;
  var value = currentTodo[0].todo;
  var newText = prompt("Please enter the new text", value);

  if (newText == null) {
    return (currentTodo[0].todo = value);
  }

  var todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos, "all todos");
  // var currentUserTodos = todos.filter(function (data) {
  //   return data.user_id == currentUser.id;
  // });

  const index = todos.findIndex((obj) => {
    return obj.todo_id === e;
  });
  console.log(index, "index");

  if (index !== -1) {
    todos[index].todo = newText;
  }

  console.log(todos, "after update");

  localStorage.setItem("todos", JSON.stringify(todos));
  location.reload();

  // console.log(currentUserTodos, "currentUserTodos");
  // console.log(newText, "edit");
  // e.parentNode.parentNode.firstChild.textContent = newText;
}

function handledelete(e) {
  // e.parentNode.parentNode.remove();
  console.log(e, "delete value");
  var todos = JSON.parse(localStorage.getItem("todos"));

  var newTodos = todos.filter(function (todo) {
    return todo.todo_id != e;
  });

  console.log(newTodos, "after delete");
  localStorage.setItem("todos", JSON.stringify(newTodos));
  location.reload();
};

function Logout(){
  console.log("Logout function called");
  localStorage.removeItem("currentUser");
  window.location.href = "../index.html";
};