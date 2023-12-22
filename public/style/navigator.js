// HIDDEN TAB //

let watchBtn = document.querySelector('.watch');
let tabInside = document.querySelectorAll('.tab-inside');
let streamTab = document.querySelector('.streamTab'); 
let sideTabs = document.querySelectorAll('.side-tab'); 
let index = -1;

// WATCH BUTTON CLICK EVENT
watchBtn?.addEventListener('click', (e) => {
    setTabFocusing(streamTab)
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
    const tab = Array.from(document.querySelectorAll('.settings-tab .tab-list')).filter(item => item.style.display !== 'none')
    setTabFocusing(tab[0])
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

const checkBackBtn = document.querySelector('.backBtn')

//  Set focus on tab links

function setTabFocusing (tab,el = 'a') {
  setTimeout(() => {
    tab.focus() 
    tab.querySelector(el).focus() 
    index++
    // index = tab.querySelectorAll(el).length -1
  }, 40);
} 

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
    setTabFocusing(bookmarksTab,'label')
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
    if (checkBackBtn.style.display  === 'flex') {
      checkBackBtn.click()
      index = -1
    } else if(this.target !== tabBtn) {
      index = -1
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
 
// Settings TAB

const allTabLi = document.querySelectorAll('.tab-li')
const mainTab = document.querySelector('[data-tab-type="Main"]')
const mainLinks = mainTab.querySelectorAll('a')
const backBtn = document.querySelector('.backBtn')
let activeSubTab
let currentTab = null 
let history = []
let currentLi = null 

function tabList (event) { 
  const dataSubName = this.dataset.subName
  currentLi = this
  tabParent = this.parentNode 
  currentTab = tabParent 
  // settingsTab.focus() 
  const subTab = document.querySelector(`[data-tab-name="${dataSubName}"]`)
  if(subTab) {
    index = -1
    const alinks = subTab.querySelectorAll('a') 
    Array.from(mainLinks).map(item => item.classList.add('subTabLink'))
    Array.from(alinks).map(item => item.classList.remove('subTabLink'))
    tabParent.style.display = 'none'
    subTab.style.display = 'flex'  
    currentTab = subTab
    backBtn.style.display = 'flex'
    history.push(tabParent)
    setTabFocusing(subTab) 
  }

  // Account sub tab
  if(currentTab.dataset.tabName === 'Account') {
    showInput(currentTab) 
  } 
  activeSubTab = Array.from(document.querySelectorAll('.settings-tab .tab-list'))
  .filter(item => item.style.display !== 'none')

 
  event.stopPropagation()
  event.preventDefault()
}
 

Array.from(allTabLi).forEach(item => {
  item.addEventListener('click', tabList);
});

// Showing inputs for Account sub tab in Settings

function showInput() { 
  const selectedLi = currentTab.querySelector(`[data-sub-name="${currentLi.dataset.subName}"]`)
  let saveTabBtn
  if(selectedLi) {
    let limit = 1
    const selectedA = selectedLi.querySelector('a')

    selectedLi.insertAdjacentHTML('afterbegin', `<div class="tabChange"><input type="text" class="tabInput subTabLink"><button class="tabSaveBtn"><i aria-colspan="" class="bx bx-check"></i></button></div>`)
    saveTabBtn = selectedLi.querySelector('.tabSaveBtn')
    selectedA.style.display = 'none'
    selectedA.removeAttribute('class')

    // Checking li element for not having more input
    if(selectedLi.querySelectorAll('input').length > limit) {
      selectedLi.querySelector('div').remove()
    }  

    // Save and close button
    if(selectedA) {
      saveTabBtn.addEventListener('click', (e) => { 
        selectedA.classList.add('testHidden')
        selectedLi.querySelector('div').remove()
        limit = 0
        e.preventDefault()
        e.stopPropagation()
      })
    }

    document.querySelector('tabInput')

  }
}

// Handling back to previous tab

function handleBackBtnClick(event) {
  if(currentTab) {
    const previousTab = history.pop();  
    
    if(previousTab) {
      index = -1
      setTabFocusing(previousTab)
      previousTab.style.display = 'flex';
      currentTab.style.display = 'none' 
      currentTab = previousTab
      const tabInputs = document.querySelectorAll('.tabChange')
      if(tabInputs.length > 0) {
        tabInputs.forEach (item => {
          item.nextSibling.style.display = 'flex'
          item.remove()
        })
      }
      if(currentTab.dataset.tabType) {   
        const subTabs = Array.from(allTabLi)
        .filter(item => item.parentNode.dataset.tabName)
        .flatMap(item => Array.from(item.querySelectorAll('a')))
        .filter(item => !item.classList.contains('subTabLink'))
        .map(item => item.classList.add('subTabLink'))
        Array.from(mainLinks).map(item => item.classList.remove('subTabLink'))
        backBtn.style.display = 'none'
      }
    }
    
  }
}

backBtn.addEventListener('click', handleBackBtnClick); 

settingsTab.addEventListener('keydown', (e) => {  
  if(checkBackBtn.style.display === 'flex') {
    let check = activeSubTab[0].querySelector('input') 
    if(!check && e.key === 'Backspace') {
        backBtn.click() 
    }  
  }  
})
 

// Language selecting setting

const languageAElement = document.querySelector('#languageLi');
const languageList = document.querySelector('.languageList') 
const defaultLanguage = languageList.querySelector('[data-lang="English"]')

let clickedIndex = 0
let selectedLanguageIndex

const selectedStorage = document.querySelector(`[data-lang="${localStorage.getItem('Language')}"]`)

if(selectedStorage) {
  defaultLanguage.style.display = 'none'
  selectedStorage.style.display = 'block'
  selectedStorage.classList.add('selected')
} else {
  localStorage.setItem('Language', defaultLanguage.innerText)
} 

languageAElement.addEventListener('click', function(event) { 
      // Selecting ul and li elements 
      const ulElement = languageAElement.parentNode.querySelector('ul') || languageAElement.parentNode
      const liElements = ulElement?.querySelectorAll('li'); 

      if(liElements) {
        Array.from(liElements).map(item => {
          if(item.classList.contains('selected')) {
            item.classList.remove('selected')
          }
        }) 

        clickedIndex++
        clickedIndex = clickedIndex === liElements?.length ? clickedIndex = 0 : clickedIndex++
         
        liElements[clickedIndex].style.display = 'block'
        liElements[clickedIndex].classList.add('selected')
        selectedLanguageIndex = clickedIndex
  
        localStorage.setItem('Language', liElements[clickedIndex].innerText)
  
        const selectedLanguage = Array.from(liElements).map(item => item.style.display) 
        const siblings = Array.from(liElements).filter(item => item !== liElements[clickedIndex]).map(item => item.style.display = 'none')
      }
      event.preventDefault();   
});

// HIDDEN TAB, KEY NAVIGATION

function keyNavigateList(e) {    
  const allInputs = currentTab?.querySelectorAll('.tabChange')
  if(allInputs?.length > 0) { 
    Array.from(allInputs)?.forEach(item => {
      item.focus()  
    }) 
  } else {
  // all a tag in tabInside
  // let sideTabs = document.querySelectorAll('.side-tab') 
  let insideTabs = document.querySelectorAll('.tab-inside')
  let key = e.key; 
 
  /* Bunu ona gore edirem ki, tab acilib,scroll edende body 
  hereket etmesin,amma tab bagli olanda body scroll aktiv olsun */
  if(e.target !== body) {
    e.preventDefault();
  } 
  // Open and close tabs
  for(let i =0; i < insideTabs.length; i++) {
      switch (key) {
        case "ArrowLeft":
            // Left pressed
            index = -1
            if(checkBackBtn.style.display  === 'flex') {
              checkBackBtn.click()
            } else if(!sideTabs[i].classList.contains('hidden-tab')) {
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

  let arrayedSideTabs = Array.from(sideTabs);
  let filtered = arrayedSideTabs.filter(item => !item.classList.contains('hidden-tab'))[0]
  if(filtered) {
    var aTags = filtered.querySelectorAll('a') 
    aTags = Array.from(aTags).filter(item => item.classList.length < 1)
    if(aTags.length < 1) {
      aTags = filtered.querySelectorAll('label')
    }
  }
  
  // Navigate tabs
  if(filtered) {
    switch (key) {
      case "ArrowUp":
          // Up pressed
          if(index > 0) {
            index--;
            console.log(index)
          }
          aTags[index]?.focus();
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
            aTags[index].click();
            aTags[index]?.focus();
          }
          break;  
  } 
  }


  }

}


sideTabs.forEach(item => {
  item.addEventListener('keydown', keyNavigateList)
})



