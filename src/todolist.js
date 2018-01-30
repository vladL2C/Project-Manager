const createProjectButton = document.querySelector('.button.create.is-primary');
const createProjectModal = document.querySelector('.modal');


function createProject() {
  createProjectModal.classList.add('is-active');
  const modalCard = document.querySelector('.modal-card');
  setTimeout(() => modalCard.style.transform = 'translateY(0px)');
}

createProjectButton.addEventListener('click', createProject);

