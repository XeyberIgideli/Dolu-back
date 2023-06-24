/**
 * Main
 */

'use strict';

const tagContainer = document.querySelector(".tag-container");
const input = document.querySelector(".tag-container input");
const btnRemoveAll = document.querySelector("#removeAll");
const btnSend = document.querySelector("#send");
const btnCopy = document.querySelector("#copy");
const form = document.getElementById('myForm');
form?.addEventListener('keypress', function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  }
});

let tags = []; 

function createTag(tag) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  const span = document.createElement("span");
  span.innerHTML = tag;
  const icon = document.createElement("i");
  icon.setAttribute("class", "bx bx-window-close");
  icon.setAttribute("data-item", tag);
  div.appendChild(span);
  div.appendChild(icon);
  return div;
}

function reset() {
  const tagElements = document.querySelectorAll(".tag");
  tagElements.forEach((tag) => {
    tag.parentElement.removeChild(tag);
  });
}

btnRemoveAll?.addEventListener("click", function () {
  tags = [];
  reset();
});

function addTags() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      tagContainer.prepend(createTag(tag));
    }); 
}

let test;

input?.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    const data = input.value.trim();
    if(!data) return

    if (data.includes(",")) {
      const list_of_tags = data.split(",");
      // list_of_tags.forEach((element) => {
      //   console.log(createTag(element));
      // });
      tags.push(...list_of_tags);
    } else {
      tags.push(data);
    }
    tags = [...new Set(tags)]; 
    input.value = ''  
    addTags(); 
  }
});
 

// Removing tag item
document?.addEventListener("click", function (e) {
  if (e.target.tagName == "I") { 
    const data = e.target.getAttribute("data-item");
    const filterTags = tags.filter((tag) => {
      return tag != data;
    });
    tags = filterTags;
    if(input) {
      input.value = ''
    }
    addTags(); 
  }
});

btnCopy?.addEventListener("click", function () {
  if (tags.length) {
    navigator.clipboard
      .writeText(tags.toString())
      .then(() => {
        alert("Copied!");
      })
      .catch((error) => {
        console.error("Failed to Copy", error);
      });
  }
});

btnSend?.addEventListener('click', () => {
  input.style.display = 'none'
  input.value = tags
})

let menu, animate;

(function () {
  // Initialize menu
  //-----------------

  let layoutMenuEl = document.querySelectorAll('#layout-menu');
  layoutMenuEl.forEach(function (element) {
    menu = new Menu(element, {
      orientation: 'vertical',
      closeChildren: false
    });
    // Change parameter to true if you want scroll animation
    window.Helpers.scrollToActive((animate = false));
    window.Helpers.mainMenu = menu;
  });

  // Initialize menu togglers and bind click on each
  let menuToggler = document.querySelectorAll('.layout-menu-toggle');
  menuToggler.forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault();
      window.Helpers.toggleCollapsed();
    });
  });

  // Display menu toggle (layout-menu-toggle) on hover with delay
  let delay = function (elem, callback) {
    let timeout = null;
    elem.onmouseenter = function () {
      // Set timeout to be a timer which will invoke callback after 300ms (not for small screen)
      if (!Helpers.isSmallScreen()) {
        timeout = setTimeout(callback, 300);
      } else {
        timeout = setTimeout(callback, 0);
      }
    };

    elem.onmouseleave = function () {
      // Clear any timers set to timeout
      document.querySelector('.layout-menu-toggle').classList.remove('d-block');
      clearTimeout(timeout);
    };
  };
  if (document.getElementById('layout-menu')) {
    delay(document.getElementById('layout-menu'), function () {
      // not for small screen
      if (!Helpers.isSmallScreen()) {
        document.querySelector('.layout-menu-toggle').classList.add('d-block');
      }
    });
  }

  // Display in main menu when menu scrolls
  let menuInnerContainer = document.getElementsByClassName('menu-inner'),
    menuInnerShadow = document.getElementsByClassName('menu-inner-shadow')[0];
  if (menuInnerContainer.length > 0 && menuInnerShadow) {
    menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
      if (this.querySelector('.ps__thumb-y').offsetTop) {
        menuInnerShadow.style.display = 'block';
      } else {
        menuInnerShadow.style.display = 'none';
      }
    });
  }

  // Init helpers & misc
  // --------------------

  // Init BS Tooltip
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Accordion active class
  const accordionActiveFunction = function (e) {
    if (e.type == 'show.bs.collapse' || e.type == 'show.bs.collapse') {
      e.target.closest('.accordion-item').classList.add('active');
    } else {
      e.target.closest('.accordion-item').classList.remove('active');
    }
  };

  const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'));
  const accordionList = accordionTriggerList.map(function (accordionTriggerEl) {
    accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction);
    accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction);
  });

  // Auto update layout based on screen size
  window.Helpers.setAutoUpdate(true);

  // Toggle Password Visibility
  window.Helpers.initPasswordToggle();

  // Speech To Text
  window.Helpers.initSpeechToText();

  // Manage menu expanded/collapsed with templateCustomizer & local storage
  //------------------------------------------------------------------

  // If current layout is horizontal OR current window screen is small (overlay menu) than return from here
  if (window.Helpers.isSmallScreen()) {
    return;
  }

  // If current layout is vertical and current window screen is > small

  // Auto update menu collapsed/expanded based on the themeConfig
  window.Helpers.setCollapsed(true, false);
})();
