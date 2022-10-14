// EventListener: Add-Button, Checkbox +Label, selection Radiobuttons, remove-Button

// Globale Variablen
let addBut = document.querySelector("#button-add");
let writeToDo = document.querySelector("#write-to-do"); //Eingabefeld
const arrayToDo = []; //leeres array für toDos
let doList = document.querySelector("#to-do-list");

//Eventlistener
addBut.addEventListener("click", addToDo);
//doItem.add.addEventListener("click", checkToDo);

//Functions:
function addToDo() {
  if (writeToDo.value === "") {
    return;
  }
  arrayToDo.push({
    description: writeToDo.value,
    done: false,
    id: createId(writeToDo.value),
  });
  console.log(arrayToDo);
  showToDo();
  // ToDo anzeigen
}
function showToDo() {
  doList.innerText = "";
  for (let todo of arrayToDo) {
    const doItem = document.createElement("li");
    const checkItem = document.createElement("input");
    const label = document.createElement("label");
    checkItem.setAttribute("type", "checkbox");
    checkItem.setAttribute("unchecked", "");

    label.innerText = todo.description;
    doItem.prepend(label);
    label.prepend(checkItem);

    doList.appendChild(doItem);
    writeToDo.value = "";
    writeToDo.focus();

    checkItem.addEventListener("change", function () {
      if (checkItem.checked === true) {
        checkItem.classList.add("checked");
      }
    });
  }
}
function createId(text) {
  return (
    text.replaceAll(" ", "").toLowerCase() + Math.floor(Math.random() * 10000)
  );
}
/*function checkToDo(doItem) {
  doItem;
  console.log(doItem);
}
function showSelection();
function deleteToDoDone()*/
