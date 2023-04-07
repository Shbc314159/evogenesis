const emailInputRegister = document.getElementById('email-input-register');
const registerButton = document.getElementById('register-button');
const emailInputLogin = document.getElementById('email-input-login');
const loginButton = document.getElementById('login-button');
const todoList = document.getElementById('todos');
const newTodoInput = document.getElementById('new-todo-input');
const addTodoButton = document.getElementById('add-todo-button');
const removeTodoInput = document.getElementById('remove-todo-input');
const removeTodoButton = document.getElementById('remove-todo-button');
const formsdiv = document.getElementById("formsdiv");
const loginform = document.getElementById("login-form");
const registerform = document.getElementById("register-form")
const messages = document.getElementById("messages");
const chatbutton = document.getElementById("chatinputbutton");
const chat = document.getElementById("chatinput");


var currentuseremail; 
var todolistdata;
var signedin = False;

// Register new user and save todo list to database
registerButton.addEventListener('click', function() {
  const email = emailInputRegister.value;
  currentuseremail = email;
  const todoList = [];
  const data = { email: email, todoList: todoList };
  fetch('http://evogenesis.co.uk/example/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  .catch(error => {
      alert("This username has already been taken. Please register with a different username.")
  })

  if (!error) {
    signedin = True;
  }

});


loginButton.addEventListener('click', function() {
    const email = emailInputLogin.value;
    currentuseremail = email;
    const data = { email: email };
    
    fetch('http://evogenesis.co.uk/example/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .catch(error => {
      alert("There is no account with that username")
    })
    .then(response => response.json())
    .then(data => {
        todolistdata = JSON.parse(data.todo_list);
        displayTodoList(todolistdata);
    });

    if (!error) {
      signedin = True;
    }

});


// Display todo list on page
function displayTodoList(todoListData) {
  todoList.innerHTML = '';
  for (const todoItem of todoListData) {
    const listItem = document.createElement('li');
    listItem.innerText = todoItem;
    todoList.appendChild(listItem);
  }
}


// Add new todo item to list and save to database
addTodoButton.addEventListener('click', function() {
  const newTodo = newTodoInput.value;
  const listItem = document.createElement('li');
  listItem.innerText = newTodo;
  todoList.appendChild(listItem);
  const email = currentuseremail;
  
  const todoListData = Array.from(todoList.children).map(function(child) {
    return child.innerText;
  });
  
  const data = { email: email, todoList: todoListData };
  fetch('http://evogenesis.co.uk/example/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  newTodoInput.value = '';
});


removeTodoButton.addEventListener('click', function() {
    const removeTodo = removeTodoInput.value;
    const todoItems = Array.from(todoList.children);
    
    const itemIndex = todoItems.findIndex(function(item) {
        return item.innerText === removeTodo;
     });
     
    if (itemIndex > -1) {
        todoList.removeChild(todoItems[itemIndex]);
        const email = currentuseremail;
        const todoListData = Array.from(todoList.children).map(function(child) {
            return child.innerText;
        });
    
        const data = { email: email, todoList: todoListData };
            fetch('http://evogenesis.co.uk/example/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        removeTodoInput.value = '';
        
    } else {
        alert('That value is not in the current list.');
        removeTodoInput.value = '';
    }
});

registerform.addEventListener('click', function(event) {
    event.stopPropagation();
});

loginform.addEventListener('click', function(event) {
    event.stopPropagation();
});

formsdiv.addEventListener('click', function() {
    formsdiv.style.zIndex = -1;
    formsdiv.style.opacity = 0;
    registerform.style.top = "-180px";
    loginform.style.top = "-180px";
});

chatbutton.addEventListener('click', function() {
    currentchat = chat.value;
    data = { message: currentchat };

    if (signedin == True) {
      fetch('http://evogenesis.co.uk/example/api/addmsg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    chat.value = '';
})


