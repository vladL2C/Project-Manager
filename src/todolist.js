let projectArray = [];

const createProjectButton = document.querySelector('.button.create.is-primary');


const createProjectModal = document.querySelector('.modal');
function createProjectDisplay() {
  createProjectModal.classList.add('is-active');
  const modalCard = document.querySelector('.modal-card');
  setTimeout(() => modalCard.style.transform = 'translateY(0px)');
}

createProjectButton.addEventListener('click', createProjectDisplay);


const projectInput = document.querySelector('.input.project.is-primary');
const modalCard = document.querySelector('.modal-card');
function createProject(e) { 
  if (e.target.textContent === 'Create') {
    if (projectInput.value !== "") {
      projectArray.push(createProjectFactory(projectInput.value));
      renderProjects(projectArray);
      createProjectModal.classList.remove('is-active');
      modalCard.style.transform = 'translateY(-500px)'
    } else {
      alert('Enter a project name or cancel');
    }
  
  } else if (e.target.textContent === 'Cancel') {
    createProjectModal.classList.remove('is-active');
    modalCard.style.transform = 'translateY(-500px)'
  } else if (e.target.className === 'delete') {
    createProjectModal.classList.remove('is-active');
    modalCard.style.transform = 'translateY(-500px)'
  }
  
}

modalCard.addEventListener('click', createProject);

const projectMenuItem = document.querySelector('.menu-items');

const todoInbox = document.querySelector('.inbox');

  function removeTodos(e) {
    if (e.target.type === 'checkbox') return;
    if (e.target.parentNode.id === 'del') {
      project.removeTodo(e.target.parentNode.dataset.idx);
    }
    project.renderTodos();
    
  } 
  todoInbox.addEventListener('click', removeTodos);

  function updateChecked(e) {
    project.updateChecked(parseInt(e.target.dataset.idx));
  }


  todoInbox.addEventListener('change', updateChecked);



function createProjectFactory(projectName, todos = []) {
  
  function addTodo(todoText) {
    this.todos.push({ todoText, checked: false });
  }


  function createTodos(todos) {
    todoInbox.innerHTML = "";
    todos.forEach((todo,index) => {
      const itemContainer = document.createElement('div');
      itemContainer.setAttribute('class','item');
      todoInbox.appendChild(itemContainer);

      const checkbox = document.createElement('input');
      checkbox.type = "checkbox";
      checkbox.dataset.idx = index;
      checkbox.checked = todo.checked;
      itemContainer.appendChild(checkbox);

      let pContent = document.createElement('p');
      itemContainer.appendChild(pContent);
      pContent.textContent = todo.todoText;

      const deleteButton = document.createElement('i');
      deleteButton.dataset.idx = index;
      deleteButton.id = 'del';
      deleteButton.setAttribute('class','fas fa-trash');
      itemContainer.appendChild(deleteButton);
    });
  }

  function renderTodos() {
    this.createTodos(this.todos);
  }

  function removeTodo(position) {
    this.todos.splice(position,1);
  }

  function updateChecked(target) {
   return this.todos[target].checked = !this.todos[target].checked;
  }

  return { projectName, todos, addTodo, createTodos, renderTodos, removeTodo, updateChecked };
}

function renderProjects(projects) {
  projectMenuItem.innerHTML = "";
  projects.forEach((project,index) => {
  const projectButton = document.createElement('a');
  projectButton.setAttribute('class','button project');
  projectButton.textContent = project.projectName;
  projectButton.dataset.projectIndex = index;
  projectMenuItem.appendChild(projectButton);
  });
}

let currentOpenProject = 0;
let project;

//project modal to add todo's

const modalTask = document.querySelector('.modal.task');
const modalCardTask = document.querySelector('.modal-card.task');


function openProjectModal(e) {
  if (e.target.className === 'button project') {
    modalTask.classList.add('is-active');
    currentOpenProject = parseInt(e.target.dataset.projectIndex);
    project = projectArray[currentOpenProject];
    setTimeout(() => modalCardTask.style.transform = 'translateY(0px)');
  }
  project.renderTodos();
}
const projectMenu = document.querySelector('.menu');
projectMenu.addEventListener('click',openProjectModal);

//add todo's
const todoInput = document.querySelector('.input.todo.is-primary');
function addTodo() {
  project.addTodo(todoInput.value);
  todoInput.value = "";
  project.renderTodos();

}

//cancel todo modal
const cancelTodo = document.querySelector('.delete.cancel');
cancelTodo.addEventListener('click', function() {
  modalTask.classList.remove('is-active');
  modalCardTask.style.transform = 'translateY(-800px)';

});

const addTodoButton = document.querySelector('.button.add.is-success');
addTodoButton.addEventListener('click',addTodo);

//localStorage save
const saveButton = document.querySelector('.button.save');
saveButton.addEventListener('click', saveProjects);
function saveProjects() {
  localStorage.clear();
  localStorage.setItem('projects', JSON.stringify(projectArray));
}
//localStorage load
const loadButton = document.querySelector('.button.load');
function loadProjects() {
  const mySavedProjects = JSON.parse(localStorage.getItem('projects'));
  mySavedProjects.forEach((project) => {
    projectArray.push(createProjectFactory(project.projectName, [...project.todos]));

  });
  renderProjects(projectArray);
}

loadButton.addEventListener('click', loadProjects);
//delete project

//pre render a project
//projectArray.push(createProjectFactory('Astravisual'));
//renderProjects(projectArray);


