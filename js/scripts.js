/*
 <div class="task">
        <input type="checkbox" />
        <p>Tarea de ejemplo</p>
        <button>X</button>
      </div>
*/

const tasksElement = document.getElementById('tasks');
const formElement = document.getElementById('form');

const deleteTask = event => {
  event.target.parentElement.remove();
};

const createTask = task => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');

  const newInput = document.createElement('input');
  newInput.type = 'checkbox';

  const newText = document.createElement('p');
  newText.textContent = task;

  const newButton = document.createElement('button');
  newButton.textContent = 'X';

  newButton.addEventListener('click', deleteTask);

  newDiv.append(newInput, newText, newButton);

  tasksElement.append(newDiv);
};

formElement.addEventListener('submit', event => {
  event.preventDefault();
  createTask(event.target.task.value);
  formElement.reset();
});
