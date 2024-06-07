const buttons = {
  "myBtn": "myModal",
  "myBtn-1": "myModal-1",
  "myBtn-2": "myModal-2",
  "myBtn-3": "myModal-3",
  "myBtn-4": "myModal-4"
};

for (let btnId in buttons) {
  let btn = document.getElementById(btnId);
  let modalId = buttons[btnId];
  let modal = document.getElementById(modalId);

  btn.onclick = function() {
    modal.style.display = "block";
  };

  modal.style.display = "none"; 
  modal.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
}

let closeElements = document.getElementsByClassName("close");

for (let i = 0; i < closeElements.length; i++) {
  closeElements[i].onclick = function() {
    let modal = closeElements[i].closest(".modal");
    modal.style.display = "none";
  };
}