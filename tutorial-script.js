const { useState } = React;

const ifastnet_images = [
  { src: "Media/ifastnet-img-0.png" },
  { src: "Media/ifastnet-img-1.png" },
  { src: "Media/ifastnet-img-2.png" },
  { src: "Media/ifastnet-img-3.png" },
  { src: "Media/ifastnet-img-4.png" },
  { src: "Media/ifastnet-img-5.png" },
];

function Slideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);

  function goToPrevious() {
    setCurrentIndex((currentIndex) =>
      currentIndex === 0 ? ifastnet_images.length - 1 : currentIndex - 1
    );
  }

  function goToNext() {
    setCurrentIndex((currentIndex) =>
      currentIndex === ifastnet_images.length - 1 ? 0 : currentIndex + 1
    );
  }

  return (
    <div id="ifastnet-slideshow">
      <p id="current-slide-ifastnet">Slide: {currentIndex+1}</p>
      <img src={ifastnet_images[currentIndex].src} id="ifastnet-img" />
      <button onClick={goToPrevious} className="ifastnet-slideshow-buttons" style={{marginLeft: "45%"}}> ◄ </button>
      <button onClick={goToNext} className="ifastnet-slideshow-buttons"> ► </button>
    </div>
  );
}



function TutorialContainer() {
  const [activeTutorial, setActiveTutorial] = useState("ifastnet");

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
          Setup your First Website
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
            activeTutorial === "website-creation" ? "current" : ""
          }`}
          onClick={() => handleTutorialClick("website-creation")}
        >
          Website Development History
        </button>
      </div>
      <div id="tutorial-content">
        {activeTutorial === "ifastnet" && <IfastnetTutorial />}
        {activeTutorial === "python-oop" && <PythonOOPTutorial />}
        {activeTutorial === "website-creation" && <TkinterTutorial />}
      </div>
    </div>
  );
}

function IfastnetTutorial() {
  return (
    <div className="tutorial" id="ifastnet-tutorial">
      <h1>Setup your First Website Tutorial</h1>
      <p>
        The first thing you'll need to do before creating a website is to
        register a domain name. Personally, I think the easiest option is{" "}
        <a href="https://domains.google/intl/en-GB/?gclid=CjwKCAjw8-OhBhB5EiwADyoY1cupb5h2ab9VhaQfhNLmT8iRGg3YhgEMrxebeLMqbMbi9J_uOywZ3xoCdLkQAvD_BwE&gclsrc=aw.ds">
          Google Domains
        </a>
        . A domain name is a big feature of your website and is one of the key
        methods of communicating to your users what your website is about, so
        choose wisely and try to use a recognisable domain (.co.uk or .com).
        <br />
        <br />
        Next, you'll need to find a hosting provider. This is a company that
        takes all of your website files and hosts them on a server. Browsers of
        the web can then access these files, and so the website, anytime. There
        are many different choices for this (a good free one is{" "}
        <a href="https://www.infinityfree.net/">InfinityFree</a>).
        <br />
        <br />
        However, for this tutorial we will be focussing on Ifastnet. Whilst not
        free, it is relatively inexpensive (about £2 per month for the cheapest
        plan) and gives you access to a comprehensive cPanel. cPanel is
        essentially a GUI that makes managing your website easier. You probably
        won't ever use most of its features so don't worry if it looks daunting.
        <br />
        <br />
        Just a side note - I'm not sponsored by Ifastnet at all. It does have
        drawbacks which I will go over but I genuinely think it is a very good
        option to build your first website with.
        <br />
        <br />
        Once you've created an ifastnet account, go to the 'My Account' tab and
        click 'Log in to cPanel' in the 'active products/services section'. Once
        you create your cPanel account and add login details, you'll be taken to
        the cPanel itself.
        <br />
        <br />
        Again, most of this you won't need. To start uploading files to their
        servers and getting your content out to the website, scroll down to the
        'Files' section and click on 'File Manager'. This will take you to a
        page similar to the File Explorer in Windows or whatever OS you're
        using. Again (there's definitely a theme here), most of these
        directories you won't be using. For now, the only one we're interested
        in is the public_html directory. Navigate into it by double clicking and
        the nadd all your website files (iFastnet will automatically display an
        index.html, index.htm or index.php file so make sure you have one).
        <br />
        <br />
        Now we're pretty much done. The last thing we have to do is to change
        the nameservers assigned to our domain. The nameservers control where
        the browser goes to collect the data for the webpage when it is accessed
        by a user. Ifastnet gives your domain a custom set of nameservers which
        are emailed to you when you sign up for an account. You will need to
        access your domain register service and update the nameservers from the
        default to the one you are given.
        <br />
        <br />
        Now your website is up on the web! A final note about updating the
        website - after editing the files on your machine you can upload them to
        the file manager and overwrite the current files (or add new ones).
        These changes can take a while to take effect due to DNS propagation but
        you can speed it up by clearing the cache from your browser and
        reloading the website.
      </p>
      <div id="ifastnet-slideshow">
          <Slideshow />
      </div>
    </div>
  );
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
        This tutorial, although it may be challenging for beginners, is still
        only the tip of the object-oriented iceberg. Inheritance, encapsulation
        and polymorphism are intermediate/advanced features of
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
  return <p>
            Currently under development. Here are some quick facts about the website:
            <ul>
              <li>About 1800 lines of code not including external libraries</li>
              <li>44%</li>
              <li>James is an absolute legend and his youtube channel The Greek Neek</li>
            </ul>
          </p>;
}

const root = ReactDOM.createRoot(document.getElementById("react-container"));
root.render(<TutorialContainer />);
