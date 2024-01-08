const images: string[] = [
    'https://images.unsplash.com/photo-1494178270175-e96de2971df9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1560&q=80',
    'https://images.unsplash.com/photo-1507652955-f3dcef5a3be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
    'https://plus.unsplash.com/premium_photo-1683121706204-a51f041b9cb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1502101872923-d48509bff386?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1521833965051-8273d0579115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
]

const img = document.querySelector('img')!
const form = document.querySelector('form')!
const input = document.querySelector('#newTodo') as HTMLInputElement
const button = document.querySelector('.newTodo-btn')!
const ul = document.querySelector('ul')!

const checkboxAtts = {
    class: "form-check-input me-1",
    type: "checkbox",
    id: "firstCheckbox"
}

const labelAtts = {
    class: "form-check-label",
    for: "firstCheckbox"
}

const deleteBtnAtts = {
    type: "button",
    class: "btn-close form-check"
}

function setAttributes(element: HTMLElement, attributes: Record<string, string>) {
    Object.keys(attributes).forEach((att) => {
        element.setAttribute(att, attributes[att])
    })
}

interface Todo {
    id: number | string,
    task: string,
    completed: boolean
}

img.src = images[Math.floor(Math.random() * 5)]

button.addEventListener('click', () => {
    button.classList.add('active')
})

let todos: Todo[] = readLocalStorage()
todos.forEach(createLi)

form.addEventListener('submit', handleSubmit)

function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const newTodo: Todo = {
        id: crypto.randomUUID(),
        task: input.value,
        completed: false
    }
    todos.push(newTodo)
    createLi(newTodo)
    saveToLocalStorage()
    input.value = ''
}

function createLi(newTodo: Todo) {
    const newLi = document.createElement('li')
    newLi.setAttribute('class', 'list-group-item d-flex justify-content-between align-items-center')
    const checkbox = document.createElement('input')
    checkbox.checked = newTodo.completed
    setAttributes(checkbox, checkboxAtts)
    checkbox.addEventListener('change', () => {
        newTodo.completed = checkbox.checked
        saveToLocalStorage()
    })
    const label = document.createElement('label')
    setAttributes(label, labelAtts)
    const deleteBtn = document.createElement('button')
    setAttributes(deleteBtn, deleteBtnAtts)
    deleteBtn.addEventListener('click', () => {
        let newTodos = todos.filter((todo) => todo.id !== newTodo.id)
        todos = newTodos
        saveToLocalStorage()
        location.reload()
    })
    label.append(newTodo.task)
    newLi.append(checkbox, label, deleteBtn)
    ul.append(newLi)
}

function readLocalStorage(): Todo[] {
    const todosJSON = localStorage.getItem('todos')
    if (todosJSON === null) {
        return []
    }
    return JSON.parse(todosJSON)
}

function saveToLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos))
}



















