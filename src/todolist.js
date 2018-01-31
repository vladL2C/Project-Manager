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
  const projectButton = document.createElement('a');
  projectButton.setAttribute('class','button project');
  projectButton.textContent = projectName;
  projectMenuItem.appendChild(projectButton);


  return { projectName }
}



let projectArray = [];
projectArray.push(createProjectFactory('Astravisual'));

const projectMenu = document.querySelector('.menu');
const modalTask = document.querySelector('.modal.task');
const modalCardTask = document.querySelector('.modal-card.task');
console.log(modalTask);

function openProjectModal(e) {
  if (e.target.className === 'button project') {
    modalTask.classList.add('is-active');
    setTimeout(() => modalCardTask.style.transform = 'translateY(0px)');
  }
}
projectMenu.addEventListener('click',openProjectModal);