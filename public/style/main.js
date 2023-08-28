// LOADER
let loaderLogo = document.querySelector('.loader-logo');
let loader = document.querySelector('#loader');
loader.style.visibility = 'visible';
loaderLogo.style.visibility = 'visible';

function hideLoader() {
  loader.style.display = 'none';
  loader.style.visibility = 'hidden';
  loaderLogo.style.display = 'none';
  document.body.classList.remove('loading');
}

window.onload = function() {
  setTimeout(hideLoader, 1600);
};

// Request to TMDB API

const apiKey = 'e8b3201ef028f52f8def6d5e7aeb2636';
const slugUrl = window.location.href.split('/').pop()
const movieName = slugUrl.split('-').slice(-1)[0] === 'show' ? slugUrl.split('-').slice(0,-1).join(' ') : slugUrl; 
const pageName = window.location.href.split('/')[3]
const showName = slugUrl.split('-').slice(0,-1).join('-')
const mediaType = slugUrl.split('-').slice(-1)[0] === 'show' ? 'tv' : 'movie';
let tmdbID;
let trailerList = document.getElementById('trailer-list')
let castWrapper = document.getElementById('cast-wrapper')
let producerWrapper = document.getElementById('producer-wrapper')

async function getMediaData() { 
  const apiUrl = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${apiKey}&query=${encodeURIComponent(movieName)}`;
  try {
    const response = await axios.get(apiUrl);
    const media = response.data.results;
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
    getMediaData();
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
  // Opening player for watching the show
  playEpisodes.forEach(item => {
    item.addEventListener('click', (e) => {
      embedLinks = {
        spembed: `https://multiembed.mov/?video_id=${tmdbID}&tmdb=1&s=${seasonIn || 1}&e=${item.dataset.episode}`,
        gomo: `https://user.gomo.to/show/${showName}/0${seasonIn || 1}-0${item.dataset.episode}`,
        aembed: `https://autoembed.to/tv/tmdb/${tmdbID}-${seasonIn || 1}-${item.dataset.episode}`,
        vdsrc: `https://vidsrc.to/embed/tv/${tmdbID}/${seasonIn || 1}/${item.dataset.episode}`
      }
      const iframe = document.querySelector('#iframe') 
      iframe.src = embedLinks.vdsrc
      tvPlayer.classList.remove('player-hidden')
      
      document.querySelector('.movie-detail').style.display = 'none'
      document.querySelector('.sidebar').style.display = 'none'
      document.querySelector('.header').style.display = 'none' 


      const embedOptions = document.querySelectorAll('.embed-options button')

      embedOptions.forEach(item => {
        item.addEventListener('click', (e) => {
          const embedName = e.target.classList[0] || e.target.parentElement.classList[0]
          if(Object.keys(embedLinks).includes(embedName)) {
             iframe.src = embedLinks[embedName]
             if(iframe.src) {
              iframe.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms");
             }
          }
        })
      })
      streamTab.classList.add('hidden-tab')
    })
  })
}

function getMoviePlay() {
  const movieServerLinks = document.querySelectorAll('.movie-tab-list li a')
  const moviePlayer = document.querySelector('.moviePlayer')

movieServerLinks.forEach(item => {
  item.addEventListener('click', (e) => {   
    const movieServers = {
      spembed: `https://multiembed.mov/?video_id=${tmdbID}&tmdb=1`,
      gomo: `https://gomo.to/movie/${movieName}`,
      aembed: `https://autoembed.to/movie/tmdb/${tmdbID}`,
      vdsrc: `https://vidsrc.to/embed/movie/${tmdbID}`
    } 
 
    moviePlayer.classList.remove('player-hidden')
    document.querySelector('.movie-detail').style.display = 'none'
    document.querySelector('.sidebar').style.display = 'none'
    document.querySelector('.header').style.display = 'none' 
    const serverName = e.target.classList[0] || e.target.parentElement.classList[0]
    let player
    let iframe
    if(serverName === 'dolusrc') {
      moviePlayer.insertAdjacentHTML('afterbegin', `<div style="width:100%;height:100%;" id="${slugUrl}Player"></div>`)
      player = new Playerjs({id:`${slugUrl}Player`, file:`[720p]../stream/${slugUrl}`,autoplay:1,default_quality:'720p'})
      if(iframe) {
        document.querySelector('#iframe').remove()
      }
    } else {
      document.querySelector(`#${slugUrl}Player`).remove()
      moviePlayer.insertAdjacentHTML('beforeend', `<iframe allow="encrypted-media" scrolling="no" id="iframe" src="" 
      width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`)
      iframe = document.querySelector('#iframe')
    }

    if(Object.keys(movieServers).includes(serverName)) { 
      iframe.src = movieServers[serverName] 
      iframe.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");
     }  

     streamTab.classList.add('hidden-tab')
  }, true)
})
}

if(pageName === 'watch' && slugUrl.split('-').slice(-1)[0] === 'show') {
    getEpisodes()
} else {
   getMoviePlay()
}
// Bookmark icon selecting 
const icons = document.querySelectorAll('.icon-bookmark')
const iconBtn = document.querySelector('.iconBookmark')

icons.forEach(item => { 
  item.addEventListener('click', (e) => { 
    iconBtn.value = e.target.classList[0] + ' ' + e.target.classList[1]  
    const selectedIcon = item.parentElement.querySelector('.selected')

    if (selectedIcon) {
      selectedIcon.classList.remove('selected')
    }
     e.target.classList.toggle('selected')
  })
})
 