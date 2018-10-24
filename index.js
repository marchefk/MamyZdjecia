let landingHeight = $("#landing").outerHeight();
let minWidth = window.matchMedia("(min-width: 991px)");
const url = 'https://res.cloudinary.com/marchefk/image';
const nav = document.getElementById('nav');
let loadedCategories = [];

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

// Get home pictures and make into a carousel
let getHomePictures = (category, containerID) => {
  $.getJSON(`${url}/list/${category}.json`, function(data) {
    for (let i = 0; i < data.resources.length; i++) {
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      if (i === 0) {
        newDiv.setAttribute('class', 'carousel-item active');
      } else {
        newDiv.setAttribute('class', 'carousel-item');
      }
      let newImg = document.createElement('img');
      newImg.setAttribute('src', `${url}/upload/f_auto/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newImg.setAttribute('class', 'd-block');
      document.getElementById(containerID).append(newDiv);
      newDiv.append(newImg);
    }
  })
}

// Get pictures for respective categories
let getPictures = (containerID) => {
  if (loadedCategories.indexOf(containerID) !== -1){
    return;
  }

  loadedCategories.push(containerID);
  let category = containerID.slice(8, containerID.length);
  $.getJSON(`${url}/list/${category}.json`, function(data) {
    for (let i = 0; i < data.resources.length; i++) {
      let imgData = data.resources[i];
      let newDiv = document.createElement('div');
      newDiv.setAttribute('class', 'category-div');

      let newA = document.createElement('a');
      newA.setAttribute('href', `${url}/upload/f_auto/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      newA.setAttribute('data-toggle', 'lightbox');
      newA.setAttribute('data-gallery', `gallery-${category}`);

      let newImg = document.createElement('img');
      newImg.setAttribute('class', 'img-fluid');
      newImg.setAttribute('src', `${url}/upload/f_auto/v${imgData.version}/${imgData.public_id}.${imgData.format}`);
      document.getElementById(containerID).append(newDiv);
      newDiv.append(newA);
      newA.append(newImg);
    }
  })
}

// Smooth scrolling using jQuery easing
$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
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
$('.js-scroll-trigger').click(function() {
  $('.navbar-collapse').collapse('hide');
});

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
$('.trigger-gallery').on('click', function() {
  if($('.category-container').css('height') === 0){
    $('.category-container').css('height', '100%');
  }
  let galleries = document.getElementsByClassName('category-gallery');
  for (let i = 0; i < galleries.length; i++) {
    if (!($(galleries[i]).hasClass('hidden'))) {
      $(galleries[i]).removeClass('full');
      $(galleries[i]).addClass('transfer');
      $(galleries[i]).addClass('hidden');
    }
  }
  let IDtoShow = this.getAttribute('data-toggle');
  getPictures(IDtoShow);
  let selectedCategory = document.getElementById(IDtoShow);
  $(selectedCategory).removeClass('hidden');
  $(selectedCategory).addClass('full');
  setTimeout(() => { $(selectedCategory).removeClass('transfer'); }, 1000);
});

// Show categories in nav after clicking 'gallery'
let toggleHiddenClass = (elements) => {
  return function(e) {
    $(elements).each(function(i) {
      if ($(this).hasClass('hidden')) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    })
  }
}

let navCategories = document.getElementsByClassName('inner-nav');
let categoryGallery = document.getElementById('category_gallery');
for (let i = 0; i < navCategories.length; i++){
  navCategories[i].addEventListener('click', () => {
    categoryGallery.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }, false);
}

getHomePictures('home', 'home_gallery');
// getPictures('gallery_ciazowa');
// getPictures('gallery_rodzinna');

$('#nav_gallery').on('click', toggleHiddenClass('.nav-category'));

$(window).resize(function() {
  landingHeight = $("#landing").height();
});

// 313573526563941
