const refs = {
    closeBtn: document.querySelector('.close-btn'),
    modal: document.querySelector('.backdrop'),
}

refs.closeBtn.addEventListener('click', closeModal);

function closeModal() {
    refs.modal.classList.toggle('is-hidden');
}