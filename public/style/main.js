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
  }, 1600);
}

window.onload = visible;

// Request to TMDB API

const apiKey = 'e8b3201ef028f52f8def6d5e7aeb2636';
const slugUrl = window.location.href.split('/').pop()
const movieName = slugUrl.split('-').join(' ')

async function getMovieData() { 
  const apiUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;
  try {
    const response = await axios.get(apiUrl);
    const media = response.data.results;

    if (media) {
      const mediaData = media[0]; 

      const castUrl = `https://api.themoviedb.org/3/movie/${mediaData.id}/credits?api_key=${apiKey}`;
      const castResponse = await axios.get(castUrl);
      const cast = castResponse.data.cast;

      if (cast) {
        let castWrapper = document.getElementById('cast-wrapper')
        const castList = cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          profileImage: actor.profile_path 
        })).filter(item => item.character.length > 0 && item.profileImage);
        console.log(castList)
        castList.slice(0, 12).forEach(item => {
          castWrapper.insertAdjacentHTML('beforeend', `
            <div class="swiper-slide">
              <div class="list-item">
                <a href=""><img src="https://image.tmdb.org/t/p/w200${item.profileImage}" alt="${item.name}"></a>
                <div class="cast-text">
                  <a href="" class="cast-title">${item.name}</a>
                  <p class="actor-role">${item.character}</p>
                </div>
              </div>
            </div>
          `);
        });
 
      } else {
        console.log('The cast information could not be found.');
      }
    } else {
      console.log('The movie could not be found.');
    }
  } catch (error) {
    console.error('API request is unsuccessful!:', error);
  }
}
if(window.location.href.split('/')[3] === 'watch'){
    getMovieData();
}


// When you have leisure time, make inifinite scroll functionality

var modals = document.querySelectorAll(".modal");
var notificationModal = document.getElementById("notificationModal");
var createBookmarkModal = document.getElementById("createBookmark");
// Get the button that opens the modal
var btn = document.querySelector(".nav-notification"); 
var btnCreate = document.querySelector(".create-bookmark-list"); 

// When the user clicks on the button, open the modal
if(btn) {
  btn.addEventListener('click', () => {
    notificationModal.classList.remove('hidden-modal')
  })
  btnCreate?.addEventListener('click', () => {
    createBookmarkModal.classList.remove('hidden-modal')
  })
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(e) {
  modals.forEach(modal => {
    if (e.target == modal) {
      modal.classList.add('hidden-modal')
    }
  })
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


