const tasksElement = document.getElementById('tasks');
const filtersElement = document.getElementById('filters');
const formElement = document.getElementById('form');

const filters = {
  all: 0,
  uncomplete: 1,
  complete: 2
};

let allTasks = [];

// Escuchar el evento de envío del formulario ✅
// Obtener el valor de lo que hay escrito ✅
// Meter tarea en el objeto de tareas ✅
// Generar el HTML de cada tarea ✅
// Meter el HTML en el contenedor de tareas ✅
// Borrar tarea ✅
// Actualizar tarea ✅

const generateHtmlForTask = task => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');
  const newCheckbox = document.createElement('input');
  newCheckbox.type = 'checkbox';
  newCheckbox.checked = task.completed;
  const newTask = document.createElement('p');
  newTask.textContent = task.task;
  const newButton = document.createElement('button');
  newButton.textContent = 'X';

  newButton.addEventListener('click', () => deleteTask(task.id));
  newCheckbox.addEventListener('change', () => completeTask(task.id));

  newDiv.append(newCheckbox, newTask, newButton);

  return newDiv;
};

const insertTasks = () => {
  tasksElement.textContent = '';
  const fragment = document.createDocumentFragment();
  allTasks.forEach(task => {
    const newTask = generateHtmlForTask(task);
    fragment.append(newTask);
  });

  tasksElement.append(fragment);
};

const saveTask = task => {
  allTasks.push(task);
  insertTasks();
};

const deleteTask = id => {
  allTasks = allTasks.filter(task => task.id !== id);

  insertTasks();
  // All tasks menos la que coincida con el id
};

const completeTask = id => {
  allTasks = allTasks.map(task => {
    if (task.id === id) {
      task.completed = !task.completed;
    }
    return task;
  });

  console.log(allTasks);

  insertTasks();
};

const createTask = task => {
  const newTask = {
    id: Date.now(),
    task: task,
    completed: false
  };

  saveTask(newTask);
};

const filterTasks = filter => {
  console.log(filter);
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.task.value === '') return;
  createTask(event.target.task.value);
  event.target.reset();
});

filtersElement.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return;
  filterTasks(event.target.dataset.filter);
});
