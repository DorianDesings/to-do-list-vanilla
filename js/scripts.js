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

formElement.addEventListener('submit', event => {
  event.preventDefault();
  saveTask(event.target.task.value);
  formElement.reset();
});
