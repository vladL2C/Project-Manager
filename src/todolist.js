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
function createProjectFactory(projectName) {
  //append project
  return { projectName }
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



//project modal to add todo's

const modalTask = document.querySelector('.modal.task');
const modalCardTask = document.querySelector('.modal-card.task');

let currentOpenProject = 0;

function openProjectModal(e) {
  if (e.target.className === 'button project') {
    modalTask.classList.add('is-active');
    currentOpenProject = parseInt(e.target.dataset.projectIndex);
    setTimeout(() => modalCardTask.style.transform = 'translateY(0px)');
  }
}
const projectMenu = document.querySelector('.menu');
projectMenu.addEventListener('click',openProjectModal);


//pre render a project
projectArray.push(createProjectFactory('Astravisual'));
renderProjects(projectArray);