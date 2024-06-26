// LOADER
let loaderLogo = document.querySelector('.loader-logo');
    loaderWrapper = document.querySelector('.loaderWrapper')
    loader = document.querySelector('#loader');
    loaderPlayerText = document.querySelector('.loader-player-text')

loader.style.visibility = 'visible';
loaderLogo.style.visibility = 'visible';

function hideLoader() { 
  loaderWrapper.remove()
  document.querySelector('.playerLoader')?.remove()
  document.body.classList.remove('loaded');
}

function hidePlayerLoader() { 
  document.querySelector('.playerLoaderWrapper').remove() 
  document.body.classList.remove('loaded');
}

window.onload = function() {
  setTimeout(hideLoader, 1600);
};

// Getting media data

const slugUrl = window.location.href.split('/').pop()
      mediaName = slugUrl.split('-').slice(-1)[0] === 'show' ? slugUrl.split('-').slice(0,-1).join(' ') : slugUrl; 
      pageName = window.location.href.split('/')[3]
      showName = slugUrl.split('-').slice(0,-1).join('-')
      mediaType = slugUrl.split('-').slice(-1)[0] === 'show' ? 'tv' : 'movie';
      usID = document.querySelector('.uid') 
      allowedLangs = ['eng','tur','ara','rus']
      siteUrl = window.location.hostname + ':' + window.location.port + '/watch/' + slugUrl 
let tmdbID;
    trailerList = document.getElementById('trailer-list')
    castWrapper = document.getElementById('cast-wrapper')
    producerWrapper = document.getElementById('producer-wrapper')
 


async function setRememberedTime() {
  const response = await fetch('../user/userData',{headers: {"Referrer-Policy": 'no-referrer'}})
  const userData = await response.json()   
  userData.continueList.forEach(item => {
    if(item.mediaTitle === mediaName) {
      const mediaKey = 'pljsplayfrom_' + `${usID.value}-${item.mediaTitle + siteUrl}`
      const getItem = localStorage.getItem(mediaKey) 
      localStorage.setItem(mediaKey, `${item.timeSeconds}--${getItem.split('--')[1]}--${getItem.split('--')[2]}`)
    }
  })
}


async function getMediaData() { 
  const request = await fetch(`../data/getMediaData/${mediaType}/${mediaName}`, {method: 'get'})
  const response = await request.json() 
  tmdbID = response.id 
   try {  
    if (request.ok) { 
      const trailerData = response.trailerData;
      const cast = response.cast; 
      const crew = response.crew; 
      
      const trailerFiltered = trailerData.filter(item => item.site === 'YouTube')

      trailerFiltered.forEach(item => {
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
    getMediaData()
    setRememberedTime()
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
  const inserted = document.querySelectorAll('inserted')
  
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
        <li class="inserted" tabindex="1" ><a data-episode="${item.episode}" id="playEpisode" tabindex='0' href="javascript:void(0)"><i class="bx bx-play-circle"></i><span>${item.title} / ${item.episode}</span></a></li>
        `)
      }
    })
  }

  data.forEach(item => {
    if(seasonIn === item.season) {
      showEpisodes.insertAdjacentHTML('beforeend', ` 
      <li class="inserted" tabindex="1" ><a id="playEpisode" data-episode="${item.episode}" tabindex='0' href="javascript:void(0)"><i class="bx bx-play-circle"></i><span>${item.title} / ${item.episode}</span></a></li>
      `)
    } else {
      inserted.forEach(item => {
        item.remove()
      })
    }

  })

  const playEpisodes = document.querySelectorAll('#playEpisode')
  const tvPlayer = document.querySelector('.tvPlayer')

  let embedLinks;

  // Opening player for watching the show
  playEpisodes.forEach(item => {
    item.addEventListener('click', async (event) => { 

      embedLinks = { 
        spembed: `https://multiembed.mov/?video_id=${tmdbID}&tmdb=1&s=${seasonIn || 1}&e=${item.dataset.episode}`,
        gomo: `https://user.gomo.to/show/${showName}/0${seasonIn || 1}-0${item.dataset.episode}`,
        aembed: `https://autoembed.to/tv/tmdb/${tmdbID}-${seasonIn || 1}-${item.dataset.episode}`,
        vdsrc: `https://vidsrc.to/embed/tv/${tmdbID}/${seasonIn || 1}/${item.dataset.episode}`
      }

      // Load player
      
      loadPlayer()

      tvPlayer.classList.remove('player-hidden') 
      document.querySelector('.movie-detail').style.display = 'none'
      document.querySelector('.sidebar').style.display = 'none'
      document.querySelector('.header').style.display = 'none'

      const iframe = document.querySelector('#iframe') 

      const response = await axios.get(`../api/${showName}/${seasonIn ? seasonIn : 1}/${Number(item.dataset.episode)}/${allowedLangs.join(',')}/8/0/readShowSubtitle?listData=6`, {
        headers: {
          'Accept': 'application/json'
        }
      }) 

      const downloadLinks = response.data
      
      let linkArr = [] 

      downloadLinks.forEach((link,index) => {
        linkArr.push(`[${link.downloadLink.split('-')[0].toUpperCase()}]../api/${showName}/${seasonIn ? seasonIn : 1}/${Number(item.dataset.episode)}/${link.downloadLink.split('-')[0]}/${downloadLinks.length}/${index}/readShowSubtitle?subtitle.srt`)
      })

      const subtitles = linkArr.join(',') 
      
      tvPlayer.insertAdjacentHTML('afterbegin', `<div style="width:100%;height:100%;" id="${usID.value}-${showName}&${seasonIn ? seasonIn : 1}/${Number(item.dataset.episode)}"></div>`)
      
      let player = new Playerjs({id:`${usID.value}-${showName}&${seasonIn ? seasonIn : 1}/${Number(item.dataset.episode)}`, file:`[720p]../stream/${showName}-S0${seasonIn ? seasonIn : 1}E0${Number(item.dataset.episode)}`,autoplay:1,default_quality:'720p',subtitle:subtitles})
      
      const season = seasonIn ? seasonIn : 1

      await addContinueList(showName + "&" + season + '/' + item.dataset.episode)
 
      // Third-party links tab

      const embedOptions = document.querySelectorAll('.embed-options button')

      embedOptions.forEach(data => {
        data.addEventListener('click', async (e) => {
          const embedName = e.target.id || e.target.parentElement.id
          if(embedName === 'dolusrc') {
            
            tvPlayer.insertAdjacentHTML('afterbegin', `<div style="width:100%;height:100%;" id="${usID.value}-${showName}"></div>`)
            let player = new Playerjs({id:`${usID.value}-${showName}`, file:`[720p]../stream/${showName}-S0${seasonIn ? seasonIn : 1}E0${Number(item.dataset.episode)}`,autoplay:1,default_quality:'720p',subtitle: subtitles})
            if(iframe) {
              iframe.remove()
            }
          } else {
          if(Object.keys(embedLinks).includes(embedName)) {  
              tvPlayer.appendChild(iframe)
              iframe.src = embedLinks[embedName]
              if(iframe.src) {
                iframe.setAttribute("sandbox", "allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-scripts allow-top-navigation allow-forms");
              }
              document.querySelector(`#${showName}`)?.remove()
          }
        }
        })
      }) 

      // Hide player loader

      hidePlayerLoader()
      
    })
  })
}

function loadPlayer () { 
  document.body.classList.add('loaded')
  const playerLoaderWrapper = document.createElement('div')
  const playerLoaderText = document.createElement('p')
  const loader = document.createElement('div')

  playerLoaderWrapper.classList.add('playerLoaderWrapper')

  loader.id = 'loader'
  loader.classList.add('center')
  loader.classList.add('playerLoader')
  loader.style.visibility = 'visible'
  
  playerLoaderText.innerText = 'Preparing the video and subtitles...'
  playerLoaderText.classList.add('loader-player-text')
  playerLoaderText.classList.add('center')

  playerLoaderWrapper.appendChild(loader)
  playerLoaderWrapper.appendChild(playerLoaderText)
  document.body.appendChild(playerLoaderWrapper)

  streamTab.classList.add('hidden-tab')  
}

// Movie player
function getMoviePlay() {
  const movieServerLinks = document.querySelectorAll('.movie-tab-list li a')
  const moviePlayer = document.querySelector('.moviePlayer')

movieServerLinks.forEach(item => {
  item.addEventListener('click', async (e) => {   
    const movieServers = {
      spembed: `https://multiembed.mov/?video_id=${tmdbID}&tmdb=1`,
      gomo: `https://gomo.to/movie/${mediaName}`,
      aembed: `https://autoembed.to/movie/tmdb/${tmdbID}`,
      vdsrc: `https://vidsrc.to/embed/movie/${tmdbID}`,
      smash: `https://embed.smashystream.com/playere.php?tmdb=${tmdbID}`
    }   
    
    loadPlayer()

    moviePlayer.classList.remove('player-hidden')
    document.querySelector('.movie-detail').style.display = 'none'
    document.querySelector('.sidebar').style.display = 'none'
    document.querySelector('.header').style.display = 'none' 
    
    const serverName = e.target.id || e.target.parentElement.id 
    let iframe
    let player

    if(serverName === 'dolusrc') {

      const response = await axios.get(`../api/search/movie/${allowedLangs.join(',')}/${mediaName}?totalLink=6`, {
        headers: {
          'Accept': 'application/json'
        }
      })

      let subtitles 
      if(response.status === 200) {
        const downloadLinks = response.data.links
        let linkArr = []
        
        Array.from(downloadLinks).forEach((link,index) => {
          linkArr.push(`[${link.downloadLink.split('-')[0].toUpperCase()}]../api/${slugUrl}/${link.downloadLink.split('-')[0]}/${downloadLinks.length}/${index}/readMovieSubtitle?subtitle.srt`)
        })
  
        subtitles = linkArr.join(',')
      } else {
        subtitles = null
      }
      
      moviePlayer.insertAdjacentHTML('afterbegin', `<div style="width:100%;height:100%;" id="${usID.value}-${slugUrl}"></div>`)
      
      player = new Playerjs({id:`${usID.value}-${slugUrl}`, file:`[720p]../stream/${slugUrl}`, autoplay:1,default_quality:'720p', subtitle:subtitles}) 

      await addContinueList(mediaName)

      if(iframe) {
          document.querySelector('#iframe').remove()
      }

    } else {

      if(player) {
        player.remove()
      }

      moviePlayer.insertAdjacentHTML('beforeend', `<iframe allow="encrypted-media" scrolling="no" id="iframe" src="" 
      width="100%" height="100%" frameborder="0" allowfullscreen></iframe>`)
      iframe = document.querySelector('#iframe')

    }

    if(Object.keys(movieServers).includes(serverName)) { 
      iframe.src = movieServers[serverName] 
      iframe.setAttribute("sandbox", "allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation");
     }  
 
     hidePlayerLoader()

  }, true)
})
}

// Adding media's time and screenshot data to database

async function addContinueList (title) { 
  const video = document.querySelector('video')

  window.onbeforeunload = function () { 
      const durationInSeconds = localStorage.getItem('pljsplayfrom_' + `${usID.value}-${title + siteUrl}`).split('--')[1]
      const watchedTimeInSeconds = localStorage.getItem('pljsplayfrom_' + `${usID.value}-${title + siteUrl}`).split('--')[0]
      const timeMin = Math.floor(watchedTimeInSeconds / 60);
      const watchedTime = timeMin > 59 ? Number(Math.floor(timeMin / 60) + '.' + (timeMin % 60).toString()) : timeMin
      const duration = Math.floor(durationInSeconds / 60) 

      const canvas = document.createElement("canvas")
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d')

      function captureScreenshot() {
        context.drawImage(video,0,0,canvas.width,canvas.height)

        const imageDataUrl = canvas.toDataURL("image/jpeg")

        return imageDataUrl
      }

       const screenshot = captureScreenshot() 

       if(watchedTime > 3) {
         axios.post('../watch/addContinueList', {time: watchedTime,duration, mediaTitle: title, image: screenshot, timeSeconds: watchedTimeInSeconds})
       }

}; 
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
 