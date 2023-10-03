// HIDDEN TAB //

let watchBtn = document.querySelector('.watch');
let tabInside = document.querySelectorAll('.tab-inside');
let streamTab = document.querySelector('.streamTab'); 
let sideTabs = document.querySelectorAll('.side-tab'); 

// WATCH BUTTON CLICK EVENT
watchBtn?.addEventListener('click', (e) => {
    streamTab.classList.toggle('hidden-tab')
    e.stopPropagation();
    e.preventDefault();
})

const backServers = document.querySelector('.backServers')

backServers?.addEventListener('click', (e) => {
    streamTab.classList.toggle('hidden-tab')
    e.stopPropagation();
    e.preventDefault();
})  

let settingsTab = document.querySelector('.settings-tab'); 
let settingsBtn = document.querySelector('.settings');

// SETTINGS BUTTON CLICK EVENT
settingsBtn?.addEventListener('click', (e) => { 
    settingsTab.classList.toggle('hidden-tab');
    e.stopPropagation();
    e.preventDefault();
})

let bookmarksTab = document.querySelector('.bookmarks-tab'); 
let bookmarkBtns = document.querySelectorAll('.bookmark-btn');
let bookmarkBtn = document.querySelector('.bookmark-btn');
let checkboxs = document.querySelectorAll('.bookmarks-tab input');
let checkbox = document.querySelector('.bookmarks-tab input');
let arrayedCheckboxs = Array.from(checkboxs)

// Add Bookmark functionality

const slug = slugUrl;
let data = {} ;

async function addBookmark(data) { 
  const mediaData = await axios.get(window.location.href)
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(mediaData.data, 'text/html'); 
  const mediaTitle = htmlDocument.querySelector('.movie-title')?.innerText; 
  if(mediaTitle) {
    data.title = mediaTitle
  } 
    await axios.post('../bookmarks/add',data, {headers: {
      "Content-Type": "application/json",

    }})
    .then(res => res.data) 
    .catch(err => console.log(err))  

  }
checkboxs.forEach(item => {
  item.addEventListener('change', async (e) => {
    let checkedlist = arrayedCheckboxs.filter(box => box.checked === true)
    let bookmarkName = e.target.previousElementSibling.id
    data.info = bookmarkName
    addBookmark(data) 
  })
})

 
// BOOKMARK BUTTON CLICK EVENT
bookmarkBtns?.forEach(item => {
  item.addEventListener('click', (e) => {
    bookmarksTab.classList.toggle('hidden-tab')
    let homeTitle = e.target.parentNode.parentNode.parentNode.querySelectorAll('.home-title')[0]
    if(e.target.tagName === "I") {
      homeTitle = e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll('.home-title')[0]
    }
    if(homeTitle) {
      data.title = homeTitle.innerText
    }
    e.stopPropagation();
    e.preventDefault();
})
})

// AVODING CLICKS OUTSIDE TABS
function tabOutsideClicks(tabname,tabBtn) {   
  if(tabname && !tabname.classList.contains('hidden-tab')) {
    if(this.target !== tabBtn) {
      tabname.classList.add('hidden-tab')
    }
    return;
  } 
}
document.body.addEventListener("click", tabOutsideClicks.bind(event, streamTab, watchBtn));
document.body.addEventListener("click", tabOutsideClicks.bind(event, settingsTab, settingsBtn));
document.body.addEventListener("click", tabOutsideClicks.bind(event, bookmarksTab, bookmarkBtn));

// Tab inside stop propagation
sideTabs.forEach(item => {
  item.addEventListener("click", (e) => { 
    e.stopPropagation();
  })
})
 

// HIDDEN TAB, KEY NAVIGATION

let index = -1;

function keyNavigateList(e) {

  // all a tag in tabInside
  // let sideTabs = document.querySelectorAll('.side-tab') 
  let insideTabs = document.querySelectorAll('.tab-inside')
  let key = e.key; 
  let arrayedSideTabs = Array.from(sideTabs);
  let filtered = arrayedSideTabs.filter(item => !item.classList.contains('hidden-tab'))[0]
  

  // Open and close tabs
  for(let i =0; i < insideTabs.length; i++) {
      switch (key) {
        case "ArrowLeft":
          // Left pressed
          if(!sideTabs[i].classList.contains('hidden-tab')) {
            sideTabs[i].classList.add('hidden-tab')
            }
            break;
        case "ArrowRight":
            // Right pressed 
            if(sideTabs[i].classList.contains('hidden-tab') && sideTabs[i].classList.contains('streamTab')) {
              sideTabs[i].classList.remove('hidden-tab')
          }
            break;
    }
  } 

  if(filtered) {
      /* Bunu ona gore edirem ki, tab acilib,scroll edende body 
         hereket etmesin,amma tab bagli olanda body scroll aktiv olsun */
    if(e.target !== body) {
      e.preventDefault();
    }

    var aTags = filtered.querySelectorAll('a')
    if(aTags.length < 1) {
      aTags = filtered.querySelectorAll('label')
    } 
  
  // Navigate tabs
    switch (key) {
      case "ArrowUp":
          // Up pressed
          if(index > 0) {
            index--;
          }
          aTags[index].focus();
          break;
      case "ArrowDown":
          // Down pressed
          if (index < aTags.length -1) {
            index++;
          } else {
            index = 0;
          }
          aTags[index].focus();
          break;
      case "Enter": 
          if(aTags[index]) {
            aTags[index].click()
            streamTab.classList.add('hidden-tab')
            aTags[index].focus();
          }
          break;  
  } 
  }


}

document.addEventListener('keydown', keyNavigateList);