import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA4KJKI90RATHhvejl2pgZVATO6YbrZ9oA",
    authDomain: "randomauth-f3e17.firebaseapp.com",
    databaseURL: "https://randomauth-f3e17-default-rtdb.firebaseio.com",
    projectId: "randomauth-f3e17",
    storageBucket: "randomauth-f3e17.firebasestorage.app",
    messagingSenderId: "920531027236",
    appId: "1:920531027236:web:c0edad12a8650834a69fb1"
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);


const todoInput = document.getElementById('todoInput');
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');

const todosRef = ref(db, 'todos/');

addTodoButton.addEventListener('click', () => {
  const task = todoInput.value.trim();
  if (task) {
    push(todosRef, { task });
    todoInput.value = '';
  }
});

onValue(todosRef, (snapshot) => {
  todoList.innerHTML = '';
  snapshot.forEach((childSnapshot) => {
    const key = childSnapshot.key;
    const data = childSnapshot.val();
    const listItem = document.createElement('li');
    listItem.textContent = data.task;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      remove(ref(db, `todos/${key}`));
    });

    listItem.appendChild(deleteButton);
    todoList.appendChild(listItem);
  });
});
