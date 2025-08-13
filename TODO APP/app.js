const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const progressLabel = document.getElementById('progress-label');
const progressCircle = document.querySelector('.progress-ring-circle');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

const RADIUS = 30;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
progressCircle.style.strokeDasharray = CIRCUMFERENCE;

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateProgress() {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  const percent = total ? (completed / total) * 100 : 0;
  const offset = CIRCUMFERENCE - (percent / 100) * CIRCUMFERENCE;
  progressCircle.style.strokeDashoffset = offset;
  progressLabel.textContent = `${completed} / ${total}`;
}

function renderTasks() {
  list.innerHTML = '';

  // Filter tasks based on currentFilter
  let filteredTasks = tasks;
  if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  }

  if (filteredTasks.length === 0) {
    list.innerHTML = `
      <div class="empty-state">
        <h3>No Tasks Yet</h3>
        <p>Add a task to get started</p>
      </div>
    `;
    updateProgress();
    return;
  }

  filteredTasks.forEach((task) => {
    // Find the real index in the tasks array for delete/checkbox
    const index = tasks.indexOf(task);

    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      tasks[index].completed = checkbox.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.textContent = task.text;

    // Add delete button (no emoji)
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });

  updateProgress();
}
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.getAttribute('data-filter');
    renderTasks();
  });
});
form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    input.value = '';
    saveTasks();
    renderTasks();
  }
});

const deleteAllBtn = document.getElementById('delete-all-btn');
deleteAllBtn.addEventListener('click', () => {
  tasks = [];
  saveTasks();
  renderTasks();
});