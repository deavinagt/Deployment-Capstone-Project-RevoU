// const toggleButton = document.querySelector('.navbar-toggle');
//     const navbarMenu = document.querySelector('.navbar-menu');

//     toggleButton.addEventListener('click', () => {
//         navbarMenu.classList.toggle('active');
//     });

// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

const closeButton = document.getElementById("btn-close");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeButton.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

function openModal() {
  var modal = document.getElementById("myModal");
   modal.style.display = "block";
}

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

// function openModal() {
//   var modal = document.getElementById("myModal-1");
//    modal.style.display = "block";
// }

// function closeModal() {
//   var modal = document.getElementById("myModal-1");
//   modal.style.display = "none";
// }