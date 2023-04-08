const button = document.getElementById("taskbarimagebutton");
const formdiv = document.getElementById("formsdiv");
const registerform = document.getElementById("register-form");
const loginform = document.getElementById("login-form");

button.addEventListener("click", () => {
    button.style.position = "fixed";
   
    button.animate(
      [
   
        {
          transform: "translate(0px, 0px) scale(1) rotate(0deg)",
          left: "100%",
          top: "0%",
        },
     
        {
          transform: "translate(0px, 0px) scale(35) rotate(1440deg)",
          left: "50%",
          top: "50%",
        },

        {
          opacity: 0,
          transform: "translate(0px, 0px) scale(35) rotate(1440deg)",
          left: "50%",
          top: "50%",
        },
      ],
      {
        duration: 3000,
      }
    );
  
    formdiv.animate(
        [
            {
                opacity: 0,
                zIndex: 1000,
            },
             
            {
                opacity: 1,
            },
        ],
        {
            duration: 3000,
        }
    );

    setTimeout(() => {
        button.style.position = 'relative';
        formdiv.style.opacity = 1;
        formdiv.style.zIndex = 1000;

        registerform.animate (
            [
                {
                    opacity: 0,
                },

                {
                    opacity: 1,
                }
            ],
            {
                duration: 1500,
            }
        );

        loginform.animate (
            [
                {
                    opacity: 0,
                },

                {
                    opacity: 1,
                }
            ],
            {
                duration: 1500,
            }
        );

        registerform.style.opacity = 1;
        loginform.style.opacity = 1;

    }, 2500);
});
