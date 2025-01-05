const home = document.querySelector('#home')
const camp = document.querySelector('#camp')
const new_camp = document.querySelector('#new_camp')

const currentPath = window.location.pathname;
const navbar = document.querySelector('#mobile-menu-2')
//const home = navbar.childNodes[1].childNodes

function toggleMultipleClasses(element, classes) {
  classes.forEach(className => {
    element.classList.toggle(className);
  });
}

if (currentPath === '/') {
  home.classList.toggle('text-gray-200')
  home.classList.add('underline')
  home.classList.add('font-bold');
}

if (currentPath === '/campgrounds/') {
  camp.classList.toggle('text-gray-200')
  camp.classList.add('underline')
  camp.classList.add('font-bold');
}

if (currentPath === '/campgrounds/new') {
  new_camp.classList.toggle('text-gray-200')
  new_camp.classList.add('underline')
  new_camp.classList.add('font-bold');
}
