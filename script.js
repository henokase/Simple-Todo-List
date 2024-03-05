const input = document.querySelector('input');
const addBtn = document.querySelector('.input-btn');
const listContainer = document.querySelector('.list-container');
const loader = document.getElementById('page-loader')

function addTask(textDesc) {
    const div = document.createElement('DIV');
    const img = document.createElement('IMG');
    const p = document.createElement('P');
    const btn = document.createElement('BUTTON');

    listContainer.insertBefore(div, listContainer.childNodes[0]);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);

    img.src = './images/unchecked.png';
    p.textContent = textDesc;
    btn.textContent = '\u00d7';

    save();
}

function check_or_remove(event) {
    const element = event.target;
    
    if (element.tagName === 'IMG') {
        const nextSibling = element.nextElementSibling;
        const referencedNode = listContainer.children[0];

        element.src = element.src.endsWith('unchecked.png') ? './images/checked.png' : './images/unchecked.png';
        nextSibling.classList.toggle('checked');
        element.parentNode.remove();

        nextSibling.classList.contains('checked') ?
        listContainer.appendChild(element.parentNode) : 
        listContainer.insertBefore(element.parentNode, referencedNode); 
        
    } else if(element.tagName === 'BUTTON') element.parentNode.remove();

    save();
}

function save() {
    localStorage.setItem("list", listContainer.innerHTML);
}


function load() {
    listContainer.innerHTML = localStorage.getItem("list");
}

addBtn.addEventListener('click', () => {
    if(input.value === '') return;
    addTask(input.value);
    input.value = '';
});

input.addEventListener('keydown', (event) => {
    if(event.key == 'Enter') {
        if(input.value === '') return;
        addTask(input.value);
        input.value = '';
    }
})

listContainer.addEventListener('click', check_or_remove);

window.addEventListener('load', () => {
    load();
    loader.style.display = 'none';
});