const tasksElement = document.getElementById('tasks');
const filtersElement = document.getElementById('filters');
const formElement = document.getElementById('form');
const itemsLeftElement = document.getElementById('items-left');
const deleteCompleteElement = document.getElementById('delete-completed');
const switchElement = document.getElementById('switch');
const allFilters = document.querySelectorAll('.filter');

let darkMode = false;

let allTasks = [
  {
    id: Date.now(),
    task: 'Make a todo app',
    completed: false
  }
];

const changeTheme = () => {
  darkMode = !darkMode;

  if (darkMode) {
    document.body.classList.add('dark');
    switchElement.src = './assets/images/icon-sun.svg';
  } else {
    document.body.classList.remove('dark');
    switchElement.src = './assets/images/icon-moon.svg';
  }
};

const getFilteredTasks = () => {
  const currentFilter = document.querySelector('.filter--active').dataset.filter;
  let filteredTasks = allTasks;

  if (currentFilter === 'active') {
    filteredTasks = allTasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = allTasks.filter(task => task.completed);
  }

  return filteredTasks;
};

const countItemsLeft = () => {
  const itemsLeft = allTasks.filter(task => !task.completed).length;
  if (allTasks.length === 0) {
    itemsLeftElement.textContent = 'No tasks';
  } else if (itemsLeft === 0) {
    itemsLeftElement.textContent = 'All tasks completed!';
  } else {
    itemsLeftElement.textContent = `${itemsLeft} items left`;
  }
};

const insertTasks = tasks => {
  const fragment = document.createDocumentFragment();

  tasks.forEach(task => {
    const newTaskContainer = document.createElement('div');
    newTaskContainer.classList.add('task-container');

    const newTaskCheck = document.createElement('input');
    newTaskCheck.classList.add('task-check');
    newTaskCheck.type = 'checkbox';
    newTaskCheck.checked = task.completed;
    newTaskCheck.id = task.id;

    const newTaskText = document.createElement('label');
    newTaskText.classList.add('task-text');
    newTaskText.textContent = task.task;
    newTaskText.htmlFor = task.id;

    const newTaskDelete = document.createElement('img');
    newTaskDelete.classList.add('task-delete');
    newTaskDelete.src = 'assets/images/icon-cross.svg';

    newTaskDelete.addEventListener('click', () => deleteTask(task.id));

    newTaskCheck.addEventListener('change', () => completeTask(task.id));

    newTaskContainer.append(newTaskCheck, newTaskText, newTaskDelete);

    fragment.append(newTaskContainer);
  });

  tasksElement.textContent = '';
  tasksElement.append(fragment);
  countItemsLeft();
};

const saveTask = task => {
  allTasks.push(task);
  const tasksToRender = getFilteredTasks();
  insertTasks(tasksToRender);
};

const deleteTask = id => {
  allTasks = allTasks.filter(task => task.id !== id);
  console.log(allTasks);
  insertTasks(allTasks);
};

const completeTask = id => {
  allTasks = allTasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  const filteredTasks = getFilteredTasks();
  insertTasks(filteredTasks);
};

const createTask = task => {
  const newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };

  saveTask(newTask);
};

const changeFilter = filterTarget => {
  [...allFilters].forEach(filter => {
    filter.classList.remove('filter--active');
  });

  filterTarget.classList.add('filter--active');
};

const filterTasks = filterTarget => {
  changeFilter(filterTarget);
  const filteredTasks = getFilteredTasks(filterTarget);
  insertTasks(filteredTasks);
};

const deleteAllCompleteTasks = () => {
  allTasks = allTasks.filter(task => !task.completed);
  insertTasks(allTasks);
};

insertTasks(allTasks);

switchElement.addEventListener('click', changeTheme);

formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.task.value === '') return;
  createTask(event.target.task.value);
  event.target.reset();
});

deleteCompleteElement.addEventListener('click', deleteAllCompleteTasks);

filtersElement.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;
  filterTasks(event.target);
});
