// Selecionando elementos no DOM
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Array para armazenar as tarefas
let tasks = [];

// Função para carregar tarefas do LocalStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

// Função para salvar tarefas no LocalStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para adicionar nova tarefa
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Por favor, digite uma tarefa!');
        return; 
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
    taskInput.focus();
}

// Função para deletar tarefa
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Função para marcar tarefa como concluída
function toggleTask(id) {
    const task = tasks.find(task => task.id === id);  // ← CORREÇÃO AQUI!
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

// Função para mostrar na tela
function renderTasks() {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">Nenhuma tarefa adicionada ainda. Comece agora! 🚀</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;

        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Deletar</button>
        `;

        li.querySelector('.task-text').addEventListener('click', () => {
            toggleTask(task.id);
        });

        taskList.appendChild(li);
    });
}

// Escutadores de eventos
addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Carregar tarefas ao iniciar a página
loadTasks();