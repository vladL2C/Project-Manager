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

function createProjectFactory(projectName) {
  
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
      itemContainer.appendChild(checkbox);

      let pContent = document.createElement('p');
      itemContainer.appendChild(pContent);
      pContent.textContent = todo.todoText;
    });
  }

  function renderTodos() {
    this.createTodos(this.todos);
  }

  return { projectName, todos: [], addTodo, createTodos, renderTodos };
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

const addTodoButton = document.querySelector('.button.add.is-success');
addTodoButton.addEventListener('click',addTodo);


//pre render a project
projectArray.push(createProjectFactory('Astravisual'));
renderProjects(projectArray);


