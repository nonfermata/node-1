const buttonsRemove = document.querySelectorAll('button[data-type="remove"]');
const buttonsEdit = document.querySelectorAll('button[data-type="edit"]');

buttonsRemove.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
        const id = target.dataset.id;
        remove(id);
        target.closest('li').remove();
    });
});

buttonsEdit.forEach((button) => {
    button.addEventListener('click', ({ target }) => {
        const id = target.dataset.id;
        const titleSpan = target
            .closest('li')
            .querySelector('span[data-role="title"]');
        const oldTitle = titleSpan.textContent;
        let newTitle = prompt('Введите новое название:', oldTitle);
        while (newTitle !== null && newTitle.trim() === '') {
            newTitle = prompt('Название не должно быть пустым!');
        }
        if (newTitle) {
            update(id, newTitle);
            titleSpan.textContent = newTitle;
        }
    });
});

async function update(id, title) {
    await fetch(`/${id}/${title}`, {
        method: 'put'
    });
}

async function remove(id) {
    await fetch(`/${id}`, {
        method: 'delete'
    });
}
