// LOADER
let loaderLogo = document.querySelector('.loader-logo')
let loader = document.querySelector('#loader')
loader.style.visibility = 'visible';
loaderLogo.style.visibility = 'visible';
// document.body = 
function visible () {
  return setTimeout(() => {
    loader.style.display = 'none';
    loader.style.visibility = 'hidden';
    loaderLogo.style.display = 'none';
    document.body.classList.remove('loading')
  }, 2600);
}

window.onload = visible;


// When you have leisure time, make inifinite scroll functionality

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.querySelector(".nav-notification"); 

// When the user clicks on the button, open the modal
if(btn) {
  btn.addEventListener('click', () => {
    modal.classList.remove('hidden-modal')
  })
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  if (e.target == modal) {
    modal.classList.add('hidden-modal')
    // e.preventDefault()
  }
}

// HOME PAGE TAB FORM
function openForm(evt, formName) {
  let i, tabcontent, tablinks;
  
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  
  document.getElementById(formName).style.display = "flex";
  evt.currentTarget.className += " active";
}
 
// PLAY BTN

const playBtn = document.querySelectorAll('.play-btn');

playBtn.forEach(play => { 
  play.parentElement.addEventListener('mouseover', function(e) { 
    play.classList.remove('hidden') 
  });
  play.parentElement.addEventListener('mouseout', function(e) { 
    play.classList.add('hidden');
  });
})
 
// TOGGLE MENUBAR

const toggle = document.querySelector('.toggle');
const user = document.querySelector('.right-user-img');
const dropdownMenu = document.querySelector('.dropdown-menu');
const dropdownUser = document.querySelector('.dropdown-user');
const body = document.body;

toggle?.addEventListener('click', function() {
    dropdownMenu.classList.toggle('hidden-menu')
  })

user?.addEventListener('click', function() {
    dropdownUser.classList.toggle('hidden-menu');  
  });


body.addEventListener('click', function(e) {
  if(!e.target.classList.contains('bx-menu')) {
    dropdownMenu?.classList.add('hidden-menu');  
  }
}) 


