const emailInput = document.getElementById("email-input");
const registerButton = document.getElementById("register-button");
const loginButton = document.getElementById("login-button");
const todoList = document.getElementById("todos");
const newTodoInput = document.getElementById("new-todo-input");
const addTodoButton = document.getElementById("add-todo-button");
const removeTodoInput = document.getElementById("remove-todo-input");
const removeTodoButton = document.getElementById("remove-todo-button");
const formsdiv = document.getElementById("formsdiv");
const loginform = document.getElementById("form");
const chatbutton = document.getElementById("chatinputbutton");
const chat = document.getElementById("chatinput");
const current_uname = document.getElementById("current-username");
const signinpointer = document.getElementById("sign-in-pointer");

var currentuseremail;
var todolistdata = [];
var signedin = false; 
var currentchat;

registerButton.addEventListener("click", function () {
  registerButton.style.borderColor = "rgba(0, 140, 255, 0.7)";
  const email = emailInput.value;
  currentuseremail = email;
  const todoList = todolistdata;
  const data = { email: email, todoList: todoList};
  fetch("./app.php?action=register", {
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        // if no errors occur this bit is executed
        alert(data.message);
        signedin = true;
        current_uname.innerHTML = currentuseremail;
        signinpointer.style.display = "none";
        formsdiv.style.zIndex = -1;
        formsdiv.style.opacity = 0;
        form.style.opacity = 0;
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === JSON.stringify(409)) {
        alert("Error: Username already exists"); //planned error 
      } else {
        alert("Network error. Please try again later.");
      }
    });

    emailInput.value = "";
});


loginButton.addEventListener("click", function () {
  const email = emailInput.value;
  currentuseremail = email;
  const data = { email: email };

  fetch("./app.php?action=login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        alert(data.error);
      } else {
        // if no errors occur this bit is executed
        alert("Log in successful")
        todolistdata = JSON.parse(data.todo_list);
        displayTodoList(todolistdata);
        signedin = true;
        current_uname.innerHTML = currentuseremail;
        signinpointer.style.display = "none";
        formsdiv.style.zIndex = -1;
        formsdiv.style.opacity = 0;
        form.style.opacity = 0;
      }
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === JSON.stringify(404)) {
        alert("Error: Username not found"); //planned error
      } else {
        alert("Network error. Please reload the page or try again later.");
      }
    });
});


function displayTodoList(todoListData) {
  todoList.innerHTML = "";
  for (const todoItem of todoListData) {
    const listItem = document.createElement("li");
    listItem.innerText = todoItem;
    todoList.appendChild(listItem);
  }
}

addTodoButton.addEventListener("click", function () {
  if (!signedin) {
    alert("Warning: To do list will only save when you sign in or register");
  }
  const newTodo = newTodoInput.value;
  const listItem = document.createElement("li");
  listItem.innerText = newTodo;
  todoList.appendChild(listItem);
  const email = currentuseremail;

  const todoListData = Array.from(todoList.children).map(function (child) {
    return child.innerText;
  });

  if (signedin == true) {
    const data = { email: email, todoList: todoListData };
    fetch("./app.php?action=savetodos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
      if (!response.ok) {
        console.log(response);
        throw new Error(response);
      } else {
        console.log(response);
      }
      return response.json();
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
      alert("Network error. To do list could not be saved.");
    });
  }

  newTodoInput.value = "";
});


removeTodoButton.addEventListener("click", function () {
  const removeTodo = removeTodoInput.value;
  const todoItems = Array.from(todoList.children);

  const itemIndex = todoItems.findIndex(function (item) {
    return item.innerText === removeTodo;
  });

  if (itemIndex > -1) {
    todoList.removeChild(todoItems[itemIndex]);
    const email = currentuseremail;
    const todoListData = Array.from(todoList.children).map(function (child) {
      return child.innerText;
    });

    if (signedin == true) {
      const data = { email: email, todoList: todoListData };
      fetch("./app.php?action=savetodos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(response);
          } else {
            console.log(response);
          }
          return response.json();
        })
        .catch((error) => {
          alert("Network error. To do list could not be saved.");
        });
    }

    removeTodoInput.value = "";
  } else {
    alert("That value is not in the current list.");
    removeTodoInput.value = "";
  }
});



form.addEventListener("click", function (event) {
  event.stopPropagation();
});

formsdiv.addEventListener("click", function () {
  formsdiv.style.zIndex = -1;
  formsdiv.style.opacity = 0;
  form.style.opacity = 0;
});



chatbutton.addEventListener("click", function () {
  if (!signedin) {
    alert("Warning: in order to post a chat you must sign in or register.")
  }
  currentchat = chat.value;
  const data = { email: currentuseremail, message: currentchat };

  if (signedin == true) {
    fetch("./app.php?action=addmsg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        } else {
          console.log(response);
        }
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  chat.value = "";
});



window.onload = function () {
  setInterval(function () {
    fetch("./app.php?action=getmsgs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        const messages = data.messages;
        ReactDOM.render(
          <ChatMessages messages={messages} />,
          document.getElementById("messages")
        );
      });
  }, 5000);
};



function ChatMessages(props) {
  const { messages } = props;
  const messagesArr = messages.map(({ username, message }) => [
    username,
    message,
  ]);

  return (
    <ul id="chatlist">
      {messagesArr.map(([username, message], index) => (
        <li key={index}>
          <span id="username-chat">{username} </span>
          <br />
          <span id="message-chat">{message}</span>
          <br />
          <br />
        </li>
      ))}
    </ul>
  );
}
