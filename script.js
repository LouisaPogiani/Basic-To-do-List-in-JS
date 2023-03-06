"use strict";

let formValues = {
    title: "",
    description: "",
    dueDate: "",
    category:  "",
}

let importantList =   JSON.parse(localStorage.getItem("importantList")) || [];
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

let addTodoButton = document.getElementById("submitButton");
let todoItems = document.getElementById("todoList");
let importantItems = document.getElementById("importantList");
let addTaskName = document.getElementById("task");
let newFormDiv = document.getElementById("new-form");

let taskName ='';
let taskDescription= '';
let str= '';

function createTask(obj){
    addTodoButton.addEventListener('click',function(event){
        event.preventDefault();
        createTaskObject(obj);
        taskName = document.createElement('li');
        taskName.innerText = obj.title;
    
        if(obj.id=="todoList"){
    
            todoItems.appendChild(taskName);
        }
        else{
            importantItems.appendChild(taskName);
        }
    
        taskName.appendChild(document.createElement('br'));
    
        taskDescription = document.createElement('span');
        taskDescription.innerText= obj.description;
        taskName.appendChild(taskDescription);
    
        taskName.appendChild(document.createElement('br'));
    
        let taskDate = document.createElement('span');
        taskDate.innerText = 'Due Date: ' +obj.dueDate;
        taskName.appendChild(taskDate);
    
        taskName.appendChild(document.createElement('br'));
    
        let taskCategory = document.createElement('span');
        taskCategory.innerText = 'Category: ' +obj.category;
        taskName.appendChild(taskCategory);
    
        taskName.appendChild(document.createElement('br'));
    
        createButtons();
    
    })

}
createTask(formValues);



function createTaskObject(obj){  
    obj.title =  document.getElementById("task").value;
    obj.description = document.getElementById("description").value;
    obj.dueDate = document.getElementById("date").value;
    obj.category= document.getElementById("taskCategory").value;
    let importance = document.getElementById("taskIimportance").value;
    
    if(importance=="Important Task"){
        obj.id="importantList";
        importantList.push(obj);
        localStorage.setItem("importantList", JSON.stringify(importantList));
        let item = JSON.parse(localStorage.getItem("importantList"));
        console.log(item); 
    }
    else{
        obj.id="todoList"
        todoList.push(obj);
        localStorage.setItem("todoList", JSON.stringify(todoList));
        let item = JSON.parse(localStorage.getItem("todoList"));
        console.log(item);
    }

}

function createButtons( ){
    let editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    taskName.appendChild(editButton);
    editButton.addEventListener("click",function(){
        editTask(formValues);
    })

    let deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    taskName.appendChild(deleteButton);

    let duplicateButton = document.createElement('button');
    duplicateButton.innerText = 'Duplicate';
    taskName.appendChild(duplicateButton);

    if(formValues.id=="todoList"){
        let importantButton = document.createElement('button');
        importantButton.innerText= 'Mark as Important';
        taskName.appendChild(importantButton);
    }
    else{
        let todoButton = document.createElement('button');
        todoButton.innerText= "Mark as ToDo";
        taskName.appendChild(todoButton);
    }

}


//TODO add delete function
//TODO add edit function
//TODO add changeImportance function
//TODO add duplicate function

function editTask(obj){
    if(obj.id=="todoList"){
    let nameIdx = todoList.indexOf(obj.title);
    let newTitle = prompt("Edit your task's title: ", [str]);
    todoList.splice(nameIdx, 1, newTitle);
    obj.title = newTitle;
    taskName.innerHTML = obj.title;

    let descIdx = todoList.indexOf(obj.description);
    let newDescription = prompt("Edit your task's description: ", [str]);
    todoList.splice(descIdx, 1, newDescription);
    obj.description = newDescription;
    taskDescription.innerText= obj.description;
  
  }
  else{
    let nameIdx = importantList.indexOf(obj.title);
    let newTitle = prompt("Edit your task's title: ", [str]);
    importantList.splice(nameIdx, 1, newTitle);
    obj.title = newTitle;
    taskName.innerHTML = obj.title;

    let descIdx = importantList.indexOf(obj.description);
    let newDescription = prompt("Edit your task's description: ", [str]);
    importantList.splice(descIdx, 1, newDescription);
    obj.description = newDescription;
    taskDescription.innerText= obj.description;
  }

  //add the other elements to the edited task
  taskName.appendChild(document.createElement('br'));

  let taskDate = document.createElement('span');
  taskDate.innerText = 'Due Date: ' +obj.dueDate;
  taskName.appendChild(taskDate);
    
  taskName.appendChild(document.createElement('br'));
    
  let taskCategory = document.createElement('span');
  taskCategory.innerText = 'Category: ' +obj.category;
  taskName.appendChild(taskCategory);
    
  taskName.appendChild(document.createElement('br'));
  createButtons(); 
}