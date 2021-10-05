const allNav = document.querySelectorAll('.header__nav_item');

allNav.forEach((navItem) => {
  navItem.addEventListener('click', handleClick);
});

function handleClick(event) {
  event.stopPropagation();
  choiseAction(event.currentTarget);
}

function choiseAction(el) {
  const currentActive = document.querySelector('.active');
  deleteActive(currentActive);
  addActive(el);
}

function addActive(el) {
  el.classList.add('active');
}

function deleteActive(el) {
  el.classList.remove('active');
}
