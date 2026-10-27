
const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const count = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("studyTasks") || "[]");

function saveTasks() {
    localStorage.setItem("studyTasks", JSON.stringify(tasks));
}

function renderTasks() {
    list.replaceChildren();

    tasks.forEach((task, index) => {
        const item = document.createElement("li");
        const label = document.createElement("label");
        const checkbox = document.createElement("input");
        const text = document.createElement("span");
        const remove = document.createElement("button");

        checkbox.type = "checkbox";
        checkbox.checked = task.done;
        checkbox.style.width = "auto";
        checkbox.style.marginRight = "10px";

        text.textContent = task.name;
        text.style.textDecoration =
            task.done ? "line-through" : "none";

        checkbox.addEventListener("change", () => {
            tasks[index].done = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        remove.type = "button";
        remove.textContent = "Delete";
        remove.style.marginTop = "8px";

        remove.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        label.append(checkbox, text);
        item.append(label, document.createElement("br"), remove);
        list.appendChild(item);
    });

    count.textContent = `Tasks: ${tasks.length}`;
}

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = input.value.trim();
    if (!name) return;

    tasks.push({ name, done: false });
    saveTasks();
    renderTasks();
    form.reset();
    input.focus();
});

renderTasks();
