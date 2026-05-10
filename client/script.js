const API = "https://task-flow-79qo.onrender.com/";

const form = document.getElementById("todoForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("list");
const emptyMessage = document.getElementById("emptyMessage");

const deleteModal = document.getElementById("deleteModal");

const confirmDeleteBtn =
  document.getElementById("confirmDelete");

const cancelDeleteBtn =
  document.getElementById("cancelDelete");

let todoToDelete = null;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  await addTodo();
});

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);

    console.log("STATUS:", response.status);

    if (!response.ok) {
      throw new Error(
        `HTTP Error ${response.status}`
      );
    }

    return await response.json();

  } catch (error) {
    console.error(error);
    alert(error.message);
  }
}

async function addTodo() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    return;
  }
  await request(`${API}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });
  input.value = "";
  input.focus();

  loadTodos();
}

async function loadTodos() {
  const response = await request(`${API}/todos`);
  if (!response) return;
  const data = response.data;
  list.innerHTML = "";

  emptyMessage.style.display =
    data.length ? "none" : "block";

  data.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item";

    const content = document.createElement("div");
    content.className = "todo-content";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    checkbox.addEventListener("change", () => {
      toggleTodo(todo._id, todo.completed);
    });

    const span = document.createElement("span");
    span.className = "todo-text";

    if (todo.completed) {
      span.classList.add("completed");
    }

    span.textContent = todo.text;

    content.appendChild(checkbox);
    content.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML ='<img src="../assets/icons/delete.png" alt="Delete" class="delete-icon">';

    deleteBtn.addEventListener("click", () => {
      deleteTodo(todo._id);
    });

    li.appendChild(content);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

async function toggleTodo(id, completed) {
  await request(`${API}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      completed: !completed
    })
  });

  loadTodos();
}

function deleteTodo(id) {
  todoToDelete = id;

  deleteModal.classList.remove("hidden");
}

confirmDeleteBtn.addEventListener(
  "click",
  async () => {

    if (!todoToDelete) return;

    await request(`${API}/delete/${todoToDelete}`, {
      method: "DELETE"
    });

    todoToDelete = null;

    deleteModal.classList.add("hidden");

    loadTodos();
  }
);

cancelDeleteBtn.addEventListener(
  "click",
  () => {
    todoToDelete = null;

    deleteModal.classList.add("hidden");
  }
);

loadTodos();
