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

    todos.push(text);
    render();
}

function render() {
    ullist.innerHTML = "";

    todos.forEach((todo, index) => {
        let li = document.createElement("li");
        li.textContent = todo;

        let removeBtn = document.createElement("button");
        removeBtn.textContent = "削除";

        let label = document.createElement("label");
        let checkinput = document.createElement("input");
        checkinput.type = "checkbox";
        checkinput.value.trim();

        removeBtn.addEventListener("click", () => {
        todos = todos.filter((_, i) => i !== index);
        render();    
        });

        ullist.appendChild(li);
        li.appendChild(label);
        label.appendChild(checkinput);
        li.appendChild(removeBtn);
    });
}

btn.addEventListener("click", addtodo);

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addtodo();
    }
})