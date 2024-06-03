// const toggleButton = document.querySelector('.navbar-toggle');
//     const navbarMenu = document.querySelector('.navbar-menu');

//     toggleButton.addEventListener('click', () => {
//         navbarMenu.classList.toggle('active');
//     });

//

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
}

let closeElements = document.getElementsByClassName("close");

for (let i = 0; i < closeElements.length; i++) {
  closeElements[i].onclick = function() {
      let modal = closeElements[i].closest(".modal");
      modal.style.display = "none";
  };
}

window.onclick = function(event) {
  for (let modalId in buttons) {
      let modal = document.getElementById(modalId);
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
};

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

const modals = {
  "myBtn": "myModal",
  "myBtn-1": "myModal-1",
  "myBtn-2": "myModal-2",
  "myBtn-3": "myModal-3",
  "myBtn-4": "myModal-4"
};

function openModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "block";
}

function closeModal(modalId) {
  var modal = document.getElementById(modalId);
  modal.style.display = "none";
}

Object.keys(modals).forEach(btnId => {
  const button = document.getElementById(btnId);
  button.onclick = function() {
      openModal(modals[btnId]);
  };
});

window.onclick = function(event) {
  Object.values(modals).forEach(modalId => {
      var modal = document.getElementById(modalId);
      if (event.target === modal) {
          closeModal(modalId);
      }
  });
}

