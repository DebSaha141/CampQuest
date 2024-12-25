// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    "use strict";
    const forms = document.querySelectorAll(".validated-form");
    Array.from(forms).forEach((form) => {
      form.addEventListener(
        "submit",
        (event) => {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add("was-validated");
        },
        false
      );
    });
  })();