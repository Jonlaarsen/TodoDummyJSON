let list = document.querySelector(".list-todos-ul");
let addBtn = document.querySelector("#add-btn");
let addInput = document.querySelector("#add-input");
let addHeader = document.querySelector("#add-header");
let todoContent = document.querySelector(".content");


// show all todos
fetch("https://dummyjson.com/todos")
  .then((res) => res.json())
  .then((data) => {
    let mytodos = data.todos;
    let item = "";
    for (let i = 0; i < mytodos.length; i++) {
      
      let date = new Date();   
        newDate = date.toLocaleString();   
        
        
        item += `
        <li class="todo-li" ${data.completed = false} id="${mytodos[i].id}">
                  <p class="header">RANDOM</p>
                  <p class="content">${mytodos[i].todo}</p>
                  <div class="buttons">
                    <p class="createdDate">${newDate}</p>
                    <button class="finished">Finished</button>
                    <button class="delete">Delete</button>
                    
                  </div>
                </li> 
                `;
    }
    return item;
  })
  .then((item) => {
    list.innerHTML += item;
  })
  .then(() => {
    deleteTodos();
    finishedEvent();
  })
  .catch((err) => {
    console.error("Error", err);
  });

   

 
//a warning sign to put in  both a task and title.

addBtn.addEventListener("click", () => {
    if(addInput.value == "" || addHeader.value == ""){
        alert("add title or task!"); 
        return;
      };
   
    addTodo(addInput.value);
  });

//function to add a todo from the title and task input field.

function addTodo() {
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: addInput.value,
        completed: false,
        userId: 5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {

        let addDate = new Date();   
        newAddDate = addDate.toLocaleString();   
        
        let item = "";
        item += `
        <li class="todo-li" ${data.completed = false} id="${data.id=1}">
                  <p class="header">${addHeader.value}</p>
                  <p class="content">${data.todo}</p>
                  <div class="buttons">
                    <p class="createdDate">${newAddDate}</p>
                    <button class="finished">Finished</button>
                    <button class="delete">Delete</button>
                    
                  </div>
                </li> 
                `;
                console.log(data);
                return item;
              })
              .then((item) => {
                list.innerHTML += item;
              })
              .then(() => {
                finishedEvent();
                deleteTodos();
                
              })
              
          };

 // function that changes tasks class, completed status to current time.         

function finishedEvent() {
  let finishedplural = document.querySelectorAll(".finished");
  

  finishedplural.forEach((finished) => {
    finished.addEventListener("click", () => {
      if (finished.classList[0] === "finishedPressed") {
        finished.classList.remove("finishedPressed");
        finished.classList.add("finished");
        finished.innerHTML =  "FINISHED";
        fetch(`https://dummyjson.com/todos/${finished.parentElement.parentElement.id}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: false,
            todo: todoContent.value,
            userId: 5
          }),
        })
          .then((res) => res.json())
          .then(console.log);
      } else if (finished.classList[0] === "finished") {
        finished.classList.add("finishedPressed");
        finished.classList.remove("finished");
        let finishedDate =  new Date();
        let newFinishedDate = finishedDate.toLocaleString();
        finished.innerHTML = newFinishedDate; 

        fetch(`https://dummyjson.com/todos/${finished.parentElement.parentElement.id}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: true,
            todo: todoContent.value,
            userId: 5
          }),
          
        })       
          .then((res) => res.json())
          .then(console.log);
          
      }
      
    });
    
  });
  
} 

//function that deletes todos.
          
  function deleteTodos() {
    let dels = document.querySelectorAll(".delete");
    dels.forEach((del) => {
      let delNum;
      del.addEventListener("click", () => {
        del.parentElement.parentElement.replaceWith("");
        delNum = del.parentElement.parentElement.id;
        fetch(`https://dummyjson.com/todos/${delNum}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      });
    });
  };
  

  



  