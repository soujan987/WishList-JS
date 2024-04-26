let todoInput=document.querySelector(".input");
let addTodoButton=document.querySelector(".button")
let showTodos=document.querySelector(".todos-container")
let todo;
let localData=JSON.parse(localStorage.getItem("todo"))
// console.log(localData)
let todoList= localData || []
renderTodoList(todoList)

function generateUniqueId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
// Add Button Functionality
addTodoButton.addEventListener("click",(e)=>{
    e.preventDefault();
    todo=todoInput.value;
    if(todo.length>0)
    {
        todoList.push({id:generateUniqueId(),todo,isCompleted:false})
    }
    localStorage.setItem("todo",JSON.stringify(todoList))
    renderTodoList(todoList)
    todoInput.value="";
})
showTodos.addEventListener("click",(e)=>{
  let key=e.target.dataset.key;
  let del=e.target.dataset.todokey;
  // console.log(key);
  // console.log(todoList.id)
  for(let k of todoList)
  {
    if(k.id===key)
    {
      k.isCompleted=!k.isCompleted;
    }
  }
  todoList=todoList.filter(todo=>todo.id!==del)
  localStorage.setItem("todo",JSON.stringify(todoList))
  renderTodoList(todoList)
  // todoList=todoList.map(todo=> todo.id===key ? {...todo,isCompleted: !todo.isCompleted }:todo)
  // console.log(todoList)
})
function renderTodoList(todoList){
  // console.log(todoList);
  showTodos.innerHTML=todoList.map(({id,todo,isCompleted})=>`
  <div class="relative">
  <input class="t-checkbox t-pointer" type="checkbox" id="item-${id}" data-key=${id} ${isCompleted ? "checked":""}>
  <label for="item-${id}"class="todo todo-text t-pointer ${isCompleted ? "checked-todo":""}" data-key=${id}>${todo}</label>
  <button class="absolute right-0 button cursor">
  <span data-todokey=${id} class="material-symbols-outlined del-btn">
  delete
  </span>
  </button>
  </div>`)
}
