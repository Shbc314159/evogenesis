const { useState } = React;

function TutorialContainer() {
    const [activeTutorial, setActiveTutorial] = useState('ifastnet');

    const handleTutorialClick = (tutorial) => {
        setActiveTutorial(tutorial);
    };
    
    return (
        <div id="tutorial-container-div">
            <div id="tutorial-navbar">
                <button id="top-left-curved" className={`tutorial-navbar-element ${activeTutorial === 'ifastnet' ? 'current' : ''}`} onClick={() => handleTutorialClick('ifastnet')}>iFastnet Web App Setup</button>
                <button className={`tutorial-navbar-element ${activeTutorial === 'python-oop' ? 'current' : ''}`} onClick={() => handleTutorialClick('python-oop')}>Python Object Oriented Programming</button>
                <button className={`tutorial-navbar-element ${activeTutorial === 'python-tkinter' ? 'current' : ''}`} onClick={() => handleTutorialClick('python-tkinter')}>Python Tkinter</button>
            </div>
            <div id="tutorial-content">
                {activeTutorial === 'ifastnet' && <IfastnetTutorial />}
                {activeTutorial === 'python-oop' && <PythonOOPTutorial />}
                {activeTutorial === 'python-tkinter' && <TkinterTutorial />}
            </div>
        </div>
    );
 }

function IfastnetTutorial() {
    return (
        <p>My ifastnet tutorial</p>
    );
}

function PythonOOPTutorial() {
    return (
        <p>My python OOP Tutorial</p>
    );
}

function TkinterTutorial() {
    return (
        <p>My python tkinter tutorial</p>
    );
}

 const root = ReactDOM.createRoot(document.getElementById("react-container"));
 root.render(<TutorialContainer />)
