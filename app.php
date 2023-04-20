<?php

$servername = "localhost";
$username = "root";
$database = "mydb";
$password = "";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function register() {
    global $conn;
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = $data['email'];
    $todos = json_encode($data['todoList']);

    $query = "SELECT * FROM users WHERE username = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
      http_response_code(409); // Conflict
      echo json_encode(array("error" => "Username already exists"));
      return;
    }


    $query = "INSERT INTO users (username, todo_list) VALUES (?, ?)";
    $stmt = $conn->prepare($query);

    $stmt->bind_param("ss", $email, $todos);
    $stmt->execute();

    echo json_encode(array("message" => "Registration successful"));
}

function login() {
    global $conn;
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    $email = $data['email'];
    $query = "SELECT todo_list FROM users WHERE username=?";
    $stmt = $conn->prepare($query);

    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $todo_list = $row['todo_list'];
        http_response_code(200);
        echo json_encode(array("todo_list" => $todo_list));
    } else {
        http_response_code(404);
        echo json_encode(array("error" => "No accounts exist with that username"));
    }
}

function savetodos() {
  global $conn;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  $email = $data['email'];
  $todos = json_encode($data['todoList']);
  $query = "UPDATE users SET todo_list = (?) WHERE username = (?)";
  $stmt = $conn->prepare($query);
  
  $stmt->bind_param("ss", $todos, $email);
  $stmt->execute();

  http_response_code(200);
  echo json_encode(array("message" => "Saved to do list"));
}

function addmessage() {
  global $conn;
  $json = file_get_contents('php://input');
  $data = json_decode($json, true);

  $message = $data['message'];
  $username = $data['email'];
  $query = "INSERT INTO messages (username, message) VALUES (?, ?)";
  $stmt = $conn->prepare($query);

  $stmt->bind_param("ss", $username, $message);
  $stmt->execute();

  http_response_code(200);
  echo json_encode(array("message" => "Saved chat message"));
}

function getmessages() {
  global $conn;
  $query = "SELECT * FROM messages";
  $stmt = $conn->prepare($query);
  $stmt->execute();
  $result = $stmt->get_result();

  $messages = array();
  while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
  }

  $response = array(
    'messages' => $messages
  );

  http_response_code(200);
  echo json_encode($response);
}
 

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $action = $_GET['action'];

  if ($action === 'login') {
    login();
  } elseif ($action === 'register') {
    register();
  } elseif ($action === 'savetodos') {
    savetodos();
  } elseif ($action === 'addmsg') {
    addmessage();
  } elseif ($action === 'getmsgs') {
    getmessages();
  } else {
    http_response_code(400);
    echo json_encode(array("error" => "Invalid action"));
  }
}

?>


