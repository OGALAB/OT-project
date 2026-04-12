const input = document.getElementById("input");
const btn = document.getElementById("btn");
const ullist = document.getElementById("ullist");

let todos = [];

function addtodo() {
    let text = input.value.trim();
    if (text === "") {
        console.log("入力してください");
        return;
    }
    input.value = "";

    todos.push({
        text: text,
        completed: false
    });
    render();
}

function render() {
    ullist.innerHTML = "";
    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.textContent =todo.text;

        if (todo.completed) {
            span.style.textDecoration = "line-through";
        }

        let checkInput = document.createElement("input");
        checkInput.type = "checkbox";
        checkInput.checked = todo.completed;

        checkInput.addEventListener("change", () => {
            todos[index].completed = checkInput.checked;
            render();
        });

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "削除";

        removeBtn.addEventListener("click", () => {
            todos = todos.filter((_, i) => i !== index);
            render();
        });

        li.appendChild(checkInput);
        li.appendChild(span);
        li.appendChild(removeBtn);

        ullist.appendChild(li);
    });
}

btn.addEventListener("click", addtodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addtodo();
    }
});