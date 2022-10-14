// Globale Variablen
const addBut = document.querySelector("#button-add");
const writeToDo = document.querySelector("#write-to-do"); //Eingabefeld
const doList = document.querySelector(".to-do-list");
const radioContainer = document.querySelector(".radio-container");
let currentFilter = "all";
const removeBut = document.querySelector("#button-remove");
const apiUrl = "http://localhost:4730/todos/";

//Start Applikation:
let arrayToDo = [];
getApiData();

//Eventlistener und Funktionen
addBut.addEventListener("click", addToDo);
radioContainer.addEventListener("change", showSelection);
removeBut.addEventListener("click", removeToDoDone);

/* ************************************************************************************* */

//FunKtion:eingegebene Daten in API laden
async function addToDo() {
  if (writeToDo.value === "") {
    return;
  }
  const newToDo = { description: writeToDo.value, done: false };
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newToDo),
  });
  const data = await response.json();
  arrayToDo.push(data);
  showToDo(arrayToDo);
}
/* *************************************************************************************** */

//Daten von der API ziehen
async function getApiData() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  for (let element of data) {
    arrayToDo.push(element);
  }
  showToDo(arrayToDo);
}
//kürzer: todos.push(...data);
/* *************************************************************************************** */

function showToDo(array) {
  doList.innerText = "";
  doList.classList.remove("empty-style");
  for (let todo of array) {
    const doItem = document.createElement("li");
    const checkItem = document.createElement("input");
    const label = document.createElement("label");
    if (currentFilter === "all" && todo.done === true) {
      label.classList.add("checked");
    }
    checkItem.setAttribute("type", "checkbox");
    checkItem.checked = todo.done;

    checkItem.id = todo.id;
    label.innerText = todo.description;
    doItem.prepend(label);
    label.prepend(checkItem);

    doList.appendChild(doItem);
    writeToDo.value = "";
    writeToDo.focus();

    checkItem.addEventListener("change", function () {
      todo.done = !todo.done;
      updateToDo(todo.id, todo);

      if (checkItem.checked === true) {
        if (currentFilter === "all") {
          label.classList.add("checked");
        }
      } else {
        label.classList.remove("checked");
      }
    });
  }
}
/* *********************************************************** */

async function updateToDo(id, todo) {
  const response = await fetch(apiUrl + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(todo),
  });
  const data = response.json();
  console.log(data);
}
/* *********************************************************** */

function showSelection(event) {
  if (event.target.value === "done") {
    const arrayDone = arrayToDo.filter(function (element) {
      return element.done === true;
    });
    currentFilter = "done";
    showToDo(arrayDone);
  } else if (event.target.value === "open") {
    const arrayOpen = arrayToDo.filter(function (element) {
      return element.done === false;
    });
    currentFilter = "open";
    showToDo(arrayOpen);
  } else {
    currentFilter = "all";
    showToDo(arrayToDo);
  }
}
/* ********************************************************** */

function removeToDoDone() {
  let arrayDelete = arrayToDo.filter(function (element) {
    return element.done === true;
  });
  for (let todo of arrayDelete) {
    let id = todo.id;
    deleteApiToDo(id);
  }
  let arrayRest = arrayToDo.filter(function (element) {
    return element.done === false;
  });
  arrayToDo = arrayRest;

  if (arrayToDo.length < 1) {
    doList.innerText = "All things done :-) Chill now and have a nice day!";
    doList.classList.add("empty-style");
  } else {
    showToDo(arrayToDo);
  }
}

/* ******************************************************* */

async function deleteApiToDo(id) {
  const response = await fetch(apiUrl + id, {
    method: "DELETE",
  });
  const data = response.json();
  console.log(data);
}
