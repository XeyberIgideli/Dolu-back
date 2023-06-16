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


// POPULAR TV SHOWS SECTION
var swiper = new Swiper(".content-1", {
    slidesPerView: 1,
    spaceBetween: 10, 
    // autoplay: {
    //   delay: 5500,
    //   disableOnInteraction: false,
    // },
    grabCursor: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        280: {
            slidesPerView: 1,
            spaceBetween: 10, 
        },
        320: {
            slidesPerView: 1,
            spaceBetween: 10, 
        },
        490: {
            slidesPerView: 2,
            spaceBetween: 10, 
        },
        758: {
            slidesPerView: 3,
            spaceBetween: 15, 
        },
        930: {
            slidesPerView: 4,
            spaceBetween: 20, 
        } 
    }
  }); 

// HOME SWIPER

var swiper = new Swiper(".home", {
  slidesPerView: 1, 
  allowTouchMove: false,
  disableOnInteraction: false,
  autoplay: {
    delay: 10500,
    disableOnInteraction: false,
  },
  // pagination: {
  //   el: ".swiper-pagination",
  //   clickable: true,
  // },
  // navigation: {
  //   nextEl: ".swiper-button-next",
  //   prevEl: ".swiper-button-prev",
  // }
});
 
// LAST THREE SHOW SECTION
var swiper = new Swiper(".wide-card", {
  slidesPerView: 1, 
  autoplay: {
    delay: 15500,
    disableOnInteraction: false,
  },
  grabCursor: false,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
 
});
let loopCheck = true

function checkTrue (cards) { 
  if(cards.length < 4) {
    loopCheck = false
  } 
  return loopCheck
}

const listCards = document.querySelectorAll('.your-list .swiper-slide')
const watchingCards = document.querySelectorAll('.watching-list .swiper-slide')
// CONTINUE WATCHING SECTION
var swiper = new Swiper(".watching-list", {
  slidesPerView: 1,
  spaceBetween: 20,  
  loop:checkTrue(watchingCards),
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    280: {
        slidesPerView: 1,
        spaceBetween: 10, 
    },
    320: {
        slidesPerView: 1,
        spaceBetween: 10, 
    },
    590: {
        slidesPerView: 2,
        spaceBetween: 10, 
    },
    758: {
        slidesPerView: 3,
        spaceBetween: 15, 
    },
    930: {
        slidesPerView: 4,
        spaceBetween: 10, 
    } 
}
});  


var swiper = new Swiper(".your-list", {
      slidesPerView: 1,
      spaceBetween: 20,  
      loop:checkTrue(listCards),
      grabCursor: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        280: {
            slidesPerView: 1,
            spaceBetween: 10, 
        },
        320: {
            slidesPerView: 2,
            spaceBetween: 10, 
        },
        590: {
            slidesPerView: 2,
            spaceBetween: 10, 
        },
        758: {
            slidesPerView: 3,
            spaceBetween: 15, 
        },
        930: {
            slidesPerView: 4,
            spaceBetween: 10, 
        } 
    }
});  

// ACTOR LIST
var swiper = new Swiper("#cast-list", {
  slidesPerView: 4,
  spaceBetween:10,
  // autoplay: {
  //   delay: 5500,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  // breakpoints: {
  //   1024: {
  //       slidesPerView: 5,
  //       spaceBetween: 70, 
  //   } 
  // }
});

// PRODUCER LIST
var swiper = new Swiper("#producer-list", {
  slidesPerView: 4,
  spaceBetween:10,
  // autoplay: {
  //   delay: 5500,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  // breakpoints: {
  //   1024: {
  //       slidesPerView: 5,
  //       spaceBetween: 70, 
  //   } 
  // }
});

// SIMILAR CONTENT
var swiper = new Swiper("#scroll-content", {
  slidesPerView: 5,
  spaceBetween:20,
  // autoplay: {
  //   delay: 5500,
  //   disableOnInteraction: false,
  // },
  grabCursor: true,
  // breakpoints: {
  //   1024: {
  //       slidesPerView: 5,
  //       spaceBetween: 70, 
  //   } 
  // }
}); 
 
 
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
    settingsTab.classList.toggle('hidden-tab')
    e.stopPropagation();
    e.preventDefault();
})

let bookmarksTab = document.querySelector('.bookmarks-tab'); 
let bookmarkBtn = document.querySelector('.bookmark-btn');
let checkboxs = document.querySelectorAll('.bookmarks-tab input');
let checkbox = document.querySelector('.bookmarks-tab input');
let arrayedCheckboxs = Array.from(checkboxs)
// Add Bookmark

checkboxs.forEach(item => {
  item.addEventListener('change', (e) => {
    let checkedlist = arrayedCheckboxs.filter(boxs => boxs.checked === true)
    if(checkedlist.length > 0) {
        bookmarkBtn.classList.add('bookmarked')
      } else {
        bookmarkBtn.classList.remove('bookmarked')
      }
  })
})
 
// BOOKMAR BUTTON CLICK EVENT
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

body.addEventListener("click", tabOutsideClicks.bind(event, streamTab, watchBtn));
body.addEventListener("click", tabOutsideClicks.bind(event, settingsTab, settingsBtn));
body.addEventListener("click", tabOutsideClicks.bind(event, bookmarksTab, bookmarkBtn));

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

  let arrayedSideTabs = Array.from(sideTabs);
  let filtered = arrayedSideTabs.filter(item => !item.classList.contains('hidden-tab'))[0]
  if(filtered) {
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