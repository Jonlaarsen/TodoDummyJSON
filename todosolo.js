let list = document.querySelector(".list-todos-ul");
let addBtn = document.querySelector("#add-btn");
let addInput = document.querySelector("#add-input");
let addHeader = document.querySelector("#add-header");
let finishedDate = document.querySelector("createdDate");

 //function date(){
        let date = new Date();   
        newDate = date.toLocaleString();      
 //};
 
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
        
        let item = "";
        item += `
        <li class="todo-li" ${data.completed = 'false'} id="${data.id=1}">
                  <p class="header">${addHeader.value}</p>
                  <p class="content">${data.todo}</p>
                  <div class="buttons">
                    <p class="createdDate">${newDate}</p>
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

 // function that changes tasks class and completed status.         

function finishedEvent() {
  let finishedplural = document.querySelectorAll(".finished");

  finishedplural.forEach((finished) => {
    finished.addEventListener("click", () => {
      if (finished.classList[0] === "finishedPressed") {
        finished.classList.remove("finishedPressed");
        finished.classList.add("finished");
        fetch(`https://dummyjson.com/todos/${finished.parentElement.parentElement.id}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: false,
            todo: addInput.value,
            userId: 5
          }),
        })
          .then((res) => res.json())
          .then(console.log);
      } else if (finished.classList[0] === "finished") {
        finished.classList.add("finishedPressed");
        finished.classList.remove("finished");
        
        let finishedDate = document.querySelectorAll(".createdDate");
        finishedDate.forEach((finishedD) => {
        let date = new Date();
        newDate = date.toLocaleString();
        finishedD.innerHTML = newDate;
        }) 

        console.log(newDate)
        fetch(`https://dummyjson.com/todos/${finished.parentElement.parentElement.id}`, {
          method: "PUT" /* or PATCH */,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            completed: true,
            todo: addInput.value,
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
    setInterval = 100;
  
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
  

  



  