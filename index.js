"use strict";

let landingHeight = $("#landing").outerHeight();
const minWidth = window.matchMedia("(min-width: 991px)");
const nav = document.getElementById('nav');
const urlJSON = 'https://res.cloudinary.com/marchefk/image';
const urlPicture = `${urlJSON}/upload/f_auto/v`;

// Get home pictures and make into a carousel
let getHomePictures = (category, containerID) => {
  $.getJSON(`${urlJSON}/list/${category}.json`, data => {
    for (let i = 0; i < data.resources.length; i++) {
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');

      if (i === 0) {
        newDiv.setAttribute('class', 'carousel-item active');
      } else {
        newDiv.setAttribute('class', 'carousel-item');
      }

      let newImg = document.createElement('img');
      newImg.setAttribute('src',
        `${urlPicture}${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newImg.setAttribute('class', 'd-block');
      document.getElementById(containerID).append(newDiv);
      newDiv.append(newImg);
    }
  })
}

// Get pictures for respective categories
let loadedCategories = [];

function Column() {
  this.height = 0;
}

let getPictures = (containerID) => {
  if (loadedCategories.indexOf(containerID) !== -1){
    return;
  }
  loadedCategories.push(containerID);

  let currentColumn = 0, nextColumn = 1;
  let columns = [];
  let category = containerID.slice(8, containerID.length);

  for (let i = 0; i < 3; i++){
    columns[i] = new Column();
    let newColumn = document.createElement('div');
    newColumn.setAttribute('class', 'column');
    newColumn.setAttribute('id', `${category}-column-${i}`);
    document.getElementById(containerID).append(newColumn);
  }

  $.getJSON(`${urlJSON}/list/${category}.json`, function(data) {
    for (let i = 0; i < data.resources.length; i++) {
      if (nextColumn === 3){
        nextColumn = 0;
        currentColumn = 2;
      }

      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'category-div');

      let newA = document.createElement('a');
      newA.setAttribute('href',
        `${urlPicture}${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newA.setAttribute('data-toggle', 'lightbox');
      newA.setAttribute('data-gallery', `gallery-${category}`);

      let newImg = document.createElement('img');
      newImg.setAttribute('class', 'img-fluid');
      newImg.setAttribute('src',
        `${urlPicture}${imgData.version}/${imgData.public_id}.${imgData.format}`);

      newDiv.append(newA);
      newA.append(newImg);

      if (columns[currentColumn].height > columns[nextColumn].height){
        columns[nextColumn].height = columns[nextColumn].height + imgData.height;
        document.getElementById(`${category}-column-${nextColumn}`).append(newDiv);
      } else {
        columns[currentColumn].height = columns[currentColumn].height + imgData.height;
        document.getElementById(`${category}-column-${currentColumn}`).append(newDiv);
        currentColumn = nextColumn;
        nextColumn += 1;
      }
    }
  })
}

// Show categories in nav after clicking 'gallery'
let toggleHiddenClass = (elements) => {
  return function() {
    $(elements).each(function() {
      if ($(this).hasClass('hidden')) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    })
  }
}

// Fixed sidebar on big screen
window.addEventListener('scroll', () => {
  if (minWidth.matches) {
    let scroll = window.scrollY;
    if (scroll >= landingHeight) {
      nav.classList.add('fixed');
    } else {
      nav.classList.remove('fixed');
    }
  }
});

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: (target.offset().top)
      }, 1000, "easeInOutExpo");
      return false;
    }
  }
});

// Closes responsive menu when a scroll trigger link is clicked
let scrollTriggers = document.getElementsByClassName('js-scroll-trigger');
for (let elem of scrollTriggers){
  elem.addEventListener('click', () => {
    $('.navbar-collapse').collapse('hide');
  });
}

// Activate scrollspy to add active class to navbar items on scroll
$('body').scrollspy({
  target: '#nav'
});

// Bootstrap lightbox plugin
$(document).on('click', '[data-toggle="lightbox"]', function(event) {
  event.preventDefault();
  $(this).ekkoLightbox();
});

// Show category galleries on clicked navbar or pictures in main gallery
let triggerGallery = document.getElementsByClassName('trigger-gallery');
let categoryCont = document.getElementById('category_container');

for (let elem of triggerGallery) {
  elem.addEventListener('click', function() {
    if(categoryCont.style.height === '0'){
      categoryCont.style.height = '100%';
    }

    let galleries = document.getElementsByClassName('category-gallery');
    for (let gallery of galleries){
      if (!gallery.classList.contains('hidden')) {
        gallery.classList.remove('full');
        gallery.classList.add('transfer');
        gallery.classList.add('hidden');
        //multiple args not supported in all modern browsers
      }
    }

    let IDtoShow = this.getAttribute('data-toggle');
    getPictures(IDtoShow);
    let selectedCategory = document.getElementById(IDtoShow);
    selectedCategory.classList.remove('hidden');
    selectedCategory.classList.add('full');
    setTimeout(() => { selectedCategory.classList.remove('transfer'); }, 1000);
    categoryCont.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest'
    });
  })
}


getHomePictures('home', 'home_gallery');
$('#nav_gallery').on('click', toggleHiddenClass('.nav-category'));

$(window).resize(() => {
  landingHeight = $("#landing").height();
});

// 313573526563941
