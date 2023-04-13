const { useState } = React;

function TutorialContainer() {
  const [activeTutorial, setActiveTutorial] = useState("python-oop");

  const handleTutorialClick = (tutorial) => {
    setActiveTutorial(tutorial);
  };

  return (
    <div id="tutorial-container-div">
      <div id="tutorial-navbar">
        <button
          id="top-left-curved"
          className={`tutorial-navbar-element ${
            activeTutorial === "ifastnet" ? "current" : ""
          }`}
          onClick={() => handleTutorialClick("ifastnet")}
        >
          iFastnet Web App Setup
        </button>
        <button
          className={`tutorial-navbar-element ${
            activeTutorial === "python-oop" ? "current" : ""
          }`}
          onClick={() => handleTutorialClick("python-oop")}
        >
          Object Oriented Programming in Python
        </button>
        <button
          className={`tutorial-navbar-element ${
            activeTutorial === "python-tkinter" ? "current" : ""
          }`}
          onClick={() => handleTutorialClick("python-tkinter")}
        >
          Tkinter with Python
        </button>
      </div>
      <div id="tutorial-content">
        {activeTutorial === "ifastnet" && <IfastnetTutorial />}
        {activeTutorial === "python-oop" && <PythonOOPTutorial />}
        {activeTutorial === "python-tkinter" && <TkinterTutorial />}
      </div>
    </div>
  );
}

function IfastnetTutorial() {
  return <p>My ifastnet tutorial</p>;
}

function PythonOOPTutorial() {
  return (
    <div className="tutorial" id="oop-tutorial">
      <h1>Object Orient Programming</h1>
      <p>
        Object oriented programming is what's known as a programming paradigm.
        That is to say, it's a way of setting out programs. If you're fairly new
        to programming, odds are you've been doing is procedural programming.
        Programs are sequenced of instructions that are followed in a set order,
        using loops and functions.
        <br />
        <br />
        In object oriented programming, we use 'objects' which are ways of
        collecting different variables and functions together. Take a look at
        this simple Python program:
      </p>
      <pre>
        <code className="hljs python" style={{ whiteSpace: "pre-wrap" }}>
          class Person: <br />
          {"    "}def __init__(self, name, age): <br />
          {"        "}self.name = name <br />
          {"        "}self.age = age <br />
          <br />
          {"    "}def greet(self): <br />
          {"         "}print("Hello, my name is ", self.name, " and I am ",
          self.age years old.") <br />
          <br />
          person1 = Person("Alice", 30) <br />
          person1.greet() <br />
        </code>
      </pre>
      <pre>
        <code className="hljs python" style={{ whiteSpace: "pre-wrap" }}>
          Output: <br />
          {"    "}Hello, my name is Alice and I am 30 years old.
        </code>
      </pre>
      <p>
        In this code we create an object, person1. We do this by using a class,
        which is essentially a blueprint for a function. The class takes a
        'name' and 'age' as parameters in its __init__ function. This function
        essentially sets up attributes for any object created by the class.
        <br />
        <br />
        An object is what is known as an instance of the class. It is declared
        similarly to a variable, setting an identifier equal to the class name
        with the arguments needed for the __init__ function inside.
        <br />
        <br />
        But what about the 'self' parameter in both functions? This is how an
        attribute is created, linking the value (name) to the object. In this
        way, we can access the object's attributes in other methods of that
        object by simply passing the object as an argument. Furthermore, we can
        access attributes elsewhere in the program by using the object's name
        then the attribute e.g. 'person1.name'.
        <br />
        <br />
        <i>N.B.</i> when calling a function method, the self parameter is passed
        in by default so we don't need to put it in
        <br />
        <br />
        <br />
        But why is this so powerful? Although this does make for a more
        readable, easy to understand structure it also becomes very useful when
        creating multiple objects.
        <br />
        <br />
        Take a look at this example involving enemy sprites from a game:
      </p>
      <pre>
        <code className="hljs python" style={{ whiteSpace: "pre-wrap" }}>
          import random <br />
          <br />
          class Enemy: <br />
          {"    "}def __init__(self, name, hp): <br />
          {"        "}self.name = name <br />
          {"        "}self.hp = hp <br />
          <br />
          {"    "}def attack(self, other_enemy): <br />
          {"        "}damage = random.randint(1, 10) <br />
          {"        "}print(self.name, " attacks ", other_enemy.name, " for ",
          damage, " damage!") <br />
          {"        "}other_enemy.hp -= damage <br />
          {"        "}if other_enemy.hp &lt;= 0: <br />
          {"            "}print(other_enemy.name, " has been defeated!") <br />
          <br />
          enemies = [] <br />
          for i in range(10): <br />
          {"    "}enemy = Enemy("Enemy" + str(i+1), 50) <br />
          {"    "}enemies.append(enemy) <br />
          <br />
          while enemies: <br />
          {"    "}for enemy in enemies: <br />
          {"        "}target_enemy = random.choice(enemies) <br />
          {"        "}enemy.attack(target_enemy) <br />
          {"        "}print(enemy.name, " has ", enemy.hp, " hp remaining."){" "}
          <br />
          {"        "}if target_enemy.hp &lt;= 0: <br />
          {"            "}enemies.remove(target_enemy) <br />
          {"            "}if not enemies: <br />
          {"                "}print("All enemies have been defeated!") <br />
          {"                "}break <br />
        </code>
      </pre>
      <p>
        In this code we create a class called Enemy, give it some basic
        attributes like name and health points. It has an attack method which
        takes another enemy as an argument and takes a random amount of damage
        off them.
        <br />
        <br />
        We create 10 different enemies and give each one a unique name (this can
        be more elegantly done with an{" "}
        <a href="https://www.w3schools.com/python/python_iterators.asp">
          Iterator
        </a>{" "}
        but our method works). Each one is added to a list of enemies. Next we
        have the main game loop, which runs as long as there are still enemies
        in the group. In it every enemy selects are target enemy and attacks it.
        Unfortunately in some cases the enemy will attack itself but this can be
        fixed with a simple if statement.
        <br />
        <br />
        <br />
        <br />
        So by using object-oriented programming we can effectively simulate
        interaction between enemy sprites in just 30 lines of code. Whilst the
        same program written procedurally is around the same length, this
        approach is much more scaleable and easier to understand. Since much of
        programming involves creating things that simulate the behavior of
        real-world objects object-oriented programming lends itself naturally to
        this.
        <br />
        <br />
        <br />
        <br />
        This tutorial, although it may be challenging for beginners, is still only the tip
        of the object-oriented iceberg. Inheritance, encapsulation and
        polymorphism are intermediate/advanced features of
        object-oriented-programming and are part of its power. If you have any
        questions about this tutorial, please send me a message on one of the
        communications media on the main page or in the chat. I don't really
        understand enough about polymorphism or encapsulation to write tutorials
        on them but if enough requests for it are recieved I could create a
        tutorial for inheritance.
      </p>
    </div>
  );
}

function TkinterTutorial() {
  return <p>My python tkinter tutorial</p>;
}

const root = ReactDOM.createRoot(document.getElementById("react-container"));
root.render(<TutorialContainer />);
