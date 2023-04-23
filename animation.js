const button = document.getElementById("taskbarimagebutton");
const formdiv = document.getElementById("formsdiv");
const form = document.getElementById("form");
const signinpointer = document.getElementById("sign-in-pointer");
const emailInput = document.getElementById("email-input");

button.addEventListener("click", () => {
  signinpointer.style.paddingRight = "90px";

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
      duration: 1000,
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
      duration: 1000,
    }
  );

  setTimeout(() => {
    signinpointer.style.paddingRight = "0";
    button.style.position = "relative";
    formdiv.style.opacity = 1;
    formdiv.style.zIndex = 1000;

    form.animate(
      [
        {
          opacity: 0,
          transform: "scale(0)",
        },
        {
          opacity: 1,
          transform: "scale(1)",
        },
      ],
      {
        duration: 750,
      }
    );

    form.style.opacity = 1;
    emailInput.focus()
  }, 1000);
});
