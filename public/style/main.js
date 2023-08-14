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
const movieName = slugUrl.split('-').slice(-1)[0] === 'show' ? slugUrl.split('-').slice(0,-1).join(' ') : slugUrl; 
const pageName = window.location.href.split('/')[3]
const mediaType = slugUrl.split('-').slice(-1)[0] === 'show' ? 'tv' : 'movie';
let tmdbID;
let trailerList = document.getElementById('trailer-list')
let castWrapper = document.getElementById('cast-wrapper')
let producerWrapper = document.getElementById('producer-wrapper')

async function getMovieData() { 
  const apiUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;
  try {
    const response = await axios.get(apiUrl);
    const media = response.data.results;
    console.log(media)
    tmdbID = media[0].id
    if (media) {
      const mediaData = media[0]; 

      const castUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaData.id}/credits?api_key=${apiKey}`;
      const videoUrl = `https://api.themoviedb.org/3/${mediaType}/${mediaData.id}/videos?api_key=${apiKey}`;

      const castResponse = await axios.get(castUrl);
      const videoResponse = await axios.get(videoUrl);
      const trailerData = videoResponse.data.results;
      const cast = castResponse.data.cast; 
      const crew = castResponse.data.crew;
      const trailer = trailerData.filter(item => item.site === 'YouTube')
      trailer.forEach(item => {
        trailerList.insertAdjacentHTML('beforeend', `
        <li>
        <a href="" tabindex='0'>
                 <img src="https://img.youtube.com/vi/${item.key}/hqdefault.jpg" class="side-tab-img" alt=""> 
             <div class="trailer-text">
                 <span>${item.name}</span>
                 <span>${item.published_at.split('T')[0]}</span>
             </div>
         </a>
     </li>`)
      });
      if (cast) {

        const castList = cast.map(actor => ({
          name: actor.name,
          character: actor.character,
          profileImage: actor.profile_path 
        })).filter(item => item.character.length > 0 && item.profileImage);

        // Showing producers
        const crewData = crew.filter(person => person.known_for_department === 'Production' && person.profile_path).slice(0,3)
        crewData.forEach(item => {
          producerWrapper.insertAdjacentHTML('beforeend', `
          <div class="swiper-slide">
              <div class="list-item"> 
                      <a href=""><img src="https://image.tmdb.org/t/p/w200${item.profile_path}" alt="${item.name}"></a>
                      <a href="" class="cast-title">${item.name}</a>
              </div>
          </div>`)
        });

        // Showing actors
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
if(pageName === 'watch'){
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


const seasonList = document.querySelector('.season-list')
const showEpisodes = document.querySelector('#show-episodes')

seasonList?.addEventListener('change', (e) => {
  let season = Number(seasonList.options[seasonList.selectedIndex].text)
  getEpisodes(season)

})
async function getEpisodes (seasonIn) {
  const inserted = document.querySelectorAll('.inserted')
  
  const response = await axios.get(`../watch/getEpisodes/${slugUrl}`, {
    headers: {
      'Accept': 'application/json'
    }
  })
  const data = response.data
  if(!seasonIn){
    data.filter(item => {
      if(item.season === 1) {
        showEpisodes.insertAdjacentHTML('beforeend', ` 
        <li class="inserted" tabindex="1" ><a data-episode="${item.episode}" class="playEpisode" tabindex='0' href="javascript:void(0)"><i class="bx bx-play-circle"></i><span>${item.title} / ${item.episode}</span></a></li>
        `)
      }
    })
  }
  data.forEach(item => {
    if(seasonIn === item.season) {
      showEpisodes.insertAdjacentHTML('beforeend', ` 
      <li class="inserted" tabindex="1" ><a class="playEpisode" data-episode="${item.episode}" tabindex='0' href="javascript:void(0)"><i class="bx bx-play-circle"></i><span>${item.title} / ${item.episode}</span></a></li>
      `)
    } else {
      inserted.forEach(item => {
        item.remove()
      })
    }

  })
  const playEpisodes = document.querySelectorAll('.playEpisode')
  const tvPlayer = document.querySelector('.tvPlayer')


  let embedLinks;
  playEpisodes.forEach(item => {
    item.addEventListener('click', (e) => {
      embedLinks = {
        spembed: `https://multiembed.mov/directstream.php?video_id=${tmdbID}&tmdb=1&s=${seasonIn || 1}&e=${item.dataset.episode}`,
        mapi: `https://moviesapi.club/tv/${tmdbID}-${seasonIn || 1}-${item.dataset.episode}`,
        aembed: `https://autoembed.to/tv/tmdb/${tmdbID}-${seasonIn || 1}-${item.dataset.episode}`,
        vdsrc: `https://vidsrc.to/embed/tv/${tmdbID}/${seasonIn || 1}/${item.dataset.episode}`
      }

      tvPlayer.insertAdjacentHTML('beforeend', `<iframe gesture="media" allow="encrypted-media"  scrolling="no" id="iframe" src="https://multiembed.mov/directstream.php?video_id=${tmdbID}&tmdb=1&s=${seasonIn || 1}&e=${item.dataset.episode}" 
      width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`)
      tvPlayer.classList.remove('player-hidden')

      const iframe = document.querySelector('#iframe')
      

      document.querySelector('.movie-detail').style.display = 'none'
      document.querySelector('.sidebar').style.display = 'none'
      document.querySelector('.header').style.display = 'none' 

      const embedOptions = document.querySelectorAll('.embed-options button')

      embedOptions.forEach(item => {
        item.addEventListener('click', (e) => {
          const embedName = e.target.classList[0]
          if(Object.keys(embedLinks).includes(embedName)) {
             iframe.src = embedLinks[embedName]
             console.log(iframe)
             iframe.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms");
          }
        })
      })
    })
  })


}
if(pageName === 'watch') {
    getEpisodes()
}
