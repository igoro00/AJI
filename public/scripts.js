"use strict";

let todoList = [];

function initList() {
	const savedList = window.localStorage.getItem("todos");
	if (savedList != null) {
		todoList = JSON.parse(savedList);
	}
}

initList();

const JSONBinHeaders = {
	"X-Master-Key":
		"$2a$10$btqMnBgyEvcZONscrcfMBuberiLN3dgTY3M1.HNfTU7GURjbpbwhW",
	"X-Access-Key":
		"$2a$10$pi6t31rrcOPsxx.2E5R2C.5kVmhr7qlnzVX7E3b9jWQQVHCFZ6IeW",
};

(async () => {
	const res = await fetch(
		"https://api.jsonbin.io/v3/b/68f91e2dd0ea881f40b3d201",
		{
			headers: JSONBinHeaders,
		},
	);
	todoList = (await res.json()).record;
	updateTodoList();
})();

async function updateJSONbin() {
	window.localStorage.setItem("todos", JSON.stringify(todoList));
	await fetch("https://api.jsonbin.io/v3/b/68f91e2dd0ea881f40b3d201", {
		method: "PUT",
		headers: { ...JSONBinHeaders, "Content-Type": "application/json" },
		body: JSON.stringify(todoList),
	});
}

function updateTodoList() {
	const todoListDiv = document.getElementById("todoListView");

	//remove all elements
	while (todoListDiv.firstChild) {
		todoListDiv.removeChild(todoListDiv.firstChild);
	}

	todoList
	.filter((todo) => {
		const filter = document.getElementById("inputSearch").value.toLocaleLowerCase();
		return filter === "" || JSON.stringify(todo).toLocaleLowerCase().includes(filter)
	})
	.filter((todo) => {
		const dateFromInput = document.getElementById("inputDateFromSearch").value;
		if (dateFromInput === "") return true;
		const dateFrom = new Date(dateFromInput);
		const dueDate = new Date(todo.dueDate);
		return dueDate >= dateFrom;
	})
	.filter((todo) => {
		const dateToInput = document.getElementById("inputDateToSearch").value;
		if (dateToInput === "") return true;
		const dateTo = new Date(dateToInput);
		const dueDate = new Date(todo.dueDate);
		return dueDate <= dateTo;
	})
	.forEach((todo, i) => {
		const row = document.createElement("tr");
		
		const titleCell = document.createElement("td");
		titleCell.textContent = todo.title;
		row.appendChild(titleCell);

		const descriptionCell = document.createElement("td");
		descriptionCell.textContent = todo.description;
		row.appendChild(descriptionCell);

		const placeCell = document.createElement("td");
		placeCell.textContent = todo.place;
		row.appendChild(placeCell);

		const categoryCell = document.createElement("td");
		categoryCell.textContent = todo.category;
		row.appendChild(categoryCell);

		const dueDateCell = document.createElement("td");
		const dueDate = new Date(todo.dueDate);
		dueDateCell.textContent = dueDate.toLocaleDateString();
		row.appendChild(dueDateCell);

		const deleteButtonCelle = document.createElement("td");
		const deleteButton = document.createElement("input");
		deleteButton.type = "button";
		deleteButton.value = "Delete";
		deleteButton.className = "btn btn-danger removeItem";
		deleteButton.addEventListener("click", () => {
			deleteTodo(i);
		});
		deleteButtonCelle.appendChild(deleteButton);
		row.appendChild(deleteButtonCelle);

		todoListDiv.appendChild(row);
	});
}

document.getElementById("inputSearch").addEventListener("input", updateTodoList);
document.getElementById("inputDateFromSearch").addEventListener("input", updateTodoList);
document.getElementById("inputDateToSearch").addEventListener("input", updateTodoList);
setInterval(updateTodoList, 1000);


function deleteTodo(index) {
	todoList.splice(index, 1);
	updateJSONbin();
}


async function addTodo() {
	//get the elements in the form
	const inputTitle = document.getElementById("inputTitle");
	const inputDescription = document.getElementById("inputDescription");
	const inputPlace = document.getElementById("inputPlace");
	const inputDate = document.getElementById("inputDate");
	//get the values from the form
	const newTitle = inputTitle.value;
	const newDescription = inputDescription.value;
	const newPlace = inputPlace.value;
	const newDate = new Date(inputDate.value);
	//create new item
	const newTodo = {
		title: newTitle,
		description: newDescription,
		place: newPlace,
		category: "",
		dueDate: newDate,
	};
	//add item to the list
	const res = await fetch("/ai", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newTodo),
	});
	newTodo.category = (await res.json());
	todoList.push(newTodo);
	updateJSONbin();
}
