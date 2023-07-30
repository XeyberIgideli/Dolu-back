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

let settingsTab = document.querySelector('.settings-tab'); 
let settingsBtn = document.querySelector('.settings');

// SETTINGS BUTTON CLICK EVENT
settingsBtn?.addEventListener('click', (e) => { 
    settingsTab.classList.toggle('hidden-tab');
    e.stopPropagation();
    e.preventDefault();
})

let bookmarksTab = document.querySelector('.bookmarks-tab'); 
let bookmarkBtn = document.querySelector('.bookmark-btn');
let checkboxs = document.querySelectorAll('.bookmarks-tab input');
let checkbox = document.querySelector('.bookmarks-tab input');
let arrayedCheckboxs = Array.from(checkboxs)

// Add Bookmark

async function addBookmark(data) {
  try {
    const test = await axios.get(window.location.href)
    console.log(test.data.querySelector('.movie-title')) 
    // const response = await axios.post('../bookmarks/add',data)
  } catch(err) {
    console.log(err)
  }
}
checkboxs.forEach(item => {
  item.addEventListener('change', (e) => {
    let checkedlist = arrayedCheckboxs.filter(box => box.checked === true)
    let bookmarkName = e.target.previousElementSibling.innerText
    let data = {arr: []}
    checkedlist.forEach(item => {
      data.arr.push(item?.previousElementSibling.innerText)
    }) 
    addBookmark(data)

    if(checkedlist.length > 0) {
        bookmarkBtn.classList.add('bookmarked')
      } else {
        bookmarkBtn.classList.remove('bookmarked')
    }
  })
})
 
// BOOKMARK BUTTON CLICK EVENT
bookmarkBtn?.addEventListener('click', (e) => {
    bookmarksTab.classList.toggle('hidden-tab')
    e.stopPropagation();
    e.preventDefault();
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
  }
 
  
  // Navigate tabs
  if(filtered) {
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
            aTags[index].focus();
          }
          break;  
  } 
  }


}

document.addEventListener('keydown', keyNavigateList);