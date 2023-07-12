const tasksElement = document.getElementById('tasks');
const filtersElement = document.getElementById('filters');
const formElement = document.getElementById('form');

let allTasks = [];

const deleteTask = id => {
  const updatedTasks = allTasks.filter(task => task.id !== id);
  allTasks = updatedTasks;
  printTasks(allTasks);

  console.log('DELETE', allTasks);
};

const saveTask = task => {
  const newTask = {
    id: Date.now(),
    task,
    completed: false
  };
  allTasks.push(newTask);
  printTasks(allTasks);

  console.log('CREATE', allTasks);
};

const updateTask = id => {
  const updatedTasks = allTasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });
  allTasks = updatedTasks;
  printTasks(allTasks);

  console.log('UPDATE', allTasks);
};

const generateHtmlTask = task => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');

  const newInput = document.createElement('input');
  newInput.type = 'checkbox';
  newInput.checked = task.completed;

  newInput.addEventListener('change', () => updateTask(task.id));

  const newText = document.createElement('p');
  newText.textContent = task.task;

  const newButton = document.createElement('button');
  newButton.textContent = 'X';

  newButton.addEventListener('click', () => deleteTask(task.id));

  newDiv.append(newInput, newText, newButton);

  return newDiv;
};

const printTasks = tasks => {
  tasksElement.innerHTML = '';
  const fragment = document.createDocumentFragment();
  tasks.forEach(task => {
    const newTask = generateHtmlTask(task);
    fragment.append(newTask);
  });
  tasksElement.append(fragment);
};

const filterTasks = filter => {
  const parsedFilter = Number(filter);
  let tasksToRender = [...allTasks];
  if (parsedFilter === 1) {
    tasksToRender = allTasks.filter(task => !task.completed);
    console.log('UNCOMPLETED', tasksToRender);
  } else if (parsedFilter === 2) {
    tasksToRender = allTasks.filter(task => task.completed);
    console.log('COMPLETED', tasksToRender);
  } else {
    console.log('ALL', tasksToRender);
  }
  printTasks(tasksToRender);
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  const task = event.target.task.value;
  if (!task) return;
  saveTask(task);
  formElement.reset();
});

filtersElement.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON') return;
  filterTasks(e.target.dataset.filter);
});
