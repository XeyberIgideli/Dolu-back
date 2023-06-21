
// CONTENT-1 SWIPER JS
var swiper = new Swiper(".content-1", {
    slidesPerView: 1,
    spaceBetween: 10, 
    // autoplay: {
    //   delay: 5500,
    //   disableOnInteraction: false,
    // },
    grabCursor: true, 
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
 