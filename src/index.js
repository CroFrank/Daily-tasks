"use strict";
var images = [
    'https://images.unsplash.com/photo-1494178270175-e96de2971df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1560&q=80',
    'https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    'https://plus.unsplash.com/premium_photo-1683121706204-a51f041b9cb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1521833965051-8273d0579115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
];
var img = document.querySelector('img');
var form = document.querySelector('form');
var input = document.querySelector('#newTodo');
var button = document.querySelector('.newTodo-btn');
var ul = document.querySelector('ul');
var checkboxAtts = {
    class: "form-check-input me-1",
    type: "checkbox",
    id: "firstCheckbox"
};
var labelAtts = {
    class: "form-check-label",
    for: "firstCheckbox"
};
var deleteBtnAtts = {
    type: "button",
    class: "btn-close form-check"
};
function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (att) {
        element.setAttribute(att, attributes[att]);
    });
}
img.src = images[Math.floor(Math.random() * 5)];
button.addEventListener('click', function () {
    button.classList.add('active');
});
var todos = readLocalStorage();
todos.forEach(createLi);
form.addEventListener('submit', handleSubmit);
function handleSubmit(e) {
    e.preventDefault();
    var newTodo = {
        id: crypto.randomUUID(),
        task: input.value,
        completed: false
    };
    todos.push(newTodo);
    createLi(newTodo);
    saveToLocalStorage();
    input.value = '';
}
function createLi(newTodo) {
    var newLi = document.createElement('li');
    newLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center');
    var checkbox = document.createElement('input');
    checkbox.checked = newTodo.completed;
    setAttributes(checkbox, checkboxAtts);
    checkbox.addEventListener('change', function () {
        newTodo.completed = checkbox.checked;
        saveToLocalStorage();
    });
    var label = document.createElement('label');
    setAttributes(label, labelAtts);
    var deleteBtn = document.createElement('button');
    setAttributes(deleteBtn, deleteBtnAtts);
    deleteBtn.addEventListener('click', function () {
        var newTodos = todos.filter(function (todo) { return todo.id !== newTodo.id; });
        todos = newTodos;
        saveToLocalStorage();
        location.reload();
    });
    label.append(newTodo.task);
    newLi.append(checkbox, label, deleteBtn);
    ul.append(newLi);
}
function readLocalStorage() {
    var todosJSON = localStorage.getItem('todos');
    if (todosJSON === null) {
        return [];
    }
    return JSON.parse(todosJSON);
}
function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
