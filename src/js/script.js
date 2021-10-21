const allNav = document.querySelectorAll('.header__nav_item'),
  completTask = document.querySelectorAll('.tasks__completed'),
  openTask = document.querySelectorAll('.tasks__open'),
  allPhoto = document.querySelectorAll('.taskborder__images_wrapper'),
  buttons = document.querySelectorAll('.button'),
  modal_close = document.querySelectorAll('.modal__close');

// elements to hang on addEventListener
const elForAddListeners = [
  allNav,
  completTask,
  openTask,
  allPhoto,
  buttons,
  modal_close,
];

// add listener on elements
addListener(elForAddListeners);

function handleClick(event) {
  event.stopPropagation();
  choiseAction(event.currentTarget);
}

/**
 * Determine what actions will be performed
 * Parent added in case an active element is needed in another component
 * @param {event.currentTarget} el
 */
function choiseAction(el) {
  let parent = el.parentElement;
  switch (true) {
    // adding an active menu class
    case el.classList.value == 'header__nav_item':
      deleteClasses('header__nav_item_active', parent);
      addClasses('header__nav_item_active', el);
      break;
    //modal window output
    case el.classList.value == 'tasks__completed':
      parent = document.querySelector('.overlay');
      deleteClasses('hidden', parent);
      break;
    // close backdrop and changing the number of tasks
    case el.classList.value == 'modal__close' ||
      el.textContent == 'NO' ||
      el.textContent == 'YES' ||
      el.textContent == 'OK':
      element = document.querySelector('.backdrop');
      addClasses('hidden', element);
      if (el.textContent == 'YES') {
        changeTaskNumber();
      }
      break;
    // output of the picture number
    case el.classList.value == 'taskborder__images_wrapper':
      let atr = 'data-after',
        itm = document.getElementById('notifications'),
        classes = 'menu__item_active';
      changeContent(atr, classes, el, itm);
      break;
  }
}

/**
 *  Change the number of completed tasks and reduce the number of open tasks
 */
function changeTaskNumber() {
  const completedTask = document.querySelector('.tasks__completed'),
    openTask = document.querySelector('.tasks__open');
  if (openTask.firstElementChild.textContent > 0) {
    completedTask.firstElementChild.innerHTML =
      Number(completedTask.firstElementChild.textContent) + 1;
    openTask.firstElementChild.innerHTML =
      Number(openTask.firstElementChild.textContent) - 1;
  }
  // edge case
  if (openTask.firstElementChild.textContent == 0) {
    changeMessage();
  }
}

/**
 * Changing the message box
 * modal__question - hide
 * modal__alert - show
 */
function changeMessage() {
  const modalAlert = document.querySelector('.modal__alert'),
    modalQuestion = document.querySelector('.modal__question');
  modalAlert.style.display = 'flex';
  modalQuestion.style.display = 'none';
}

/**
 * Change pseudo-element content
 * @param {attr} atr
 * @param {menu__item to change} itm
 * @param {itm class} classes
 * @param {event element} el
 * @param {data for array } data
 */
function changeContent(atr, classes, el, itm) {
  const photoArray = createArray(allPhoto);
  addClasses(classes, itm);
  itm.setAttribute(atr, photoArray.indexOf(el));
}

/**
 * Adding classes
 * @param {name active class} nameClass
 * @param {block in which classes are changed } parent
 * @param {event element} el
 */
function addClasses(nameClass, el) {
  el.classList.add(nameClass);
}
/**
 * Delete classes
 * @param {name active class} nameClass
 * @param {block in which classes are changed } parent
 */
function deleteClasses(nameClass, parent) {
  parent.querySelectorAll('.' + nameClass).forEach((itm) => {
    console.log(parent);
    itm.classList.remove(nameClass);
  });
}

/**
 * An array is created based on the data
 * @param {data that can be traversed by the iterator } data
 * @returns array
 */
function createArray(data) {
  const array = [];
  data.forEach((itm) => {
    array.push(itm);
  });
  return array;
}

/**
 * Hang listeners on the necessary elements
 * @param {elements to hang on addEventListener} items
 */
function addListener(items) {
  items.forEach((item) => {
    if (item.length > 1) {
      addListener(item); // recursion
      return;
    } else if (item.length == 1) {
      item = item[0];
    }
    item.addEventListener('click', handleClick);
  });
}
