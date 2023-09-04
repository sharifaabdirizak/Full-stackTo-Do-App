$(document).ready(onReady);

function onReady() {
  console.log("Client side javascript works!");
  getTask();

  //set up click listeners
  setupClickListeners();
  //load to do list on the application to load
}
function setupClickListeners() {
  $("#addSubmitButton").on("click", addTask);
  $("#viewToDoList").on("click", ".markCompleteButton", putTask);
  $("#viewToDoList").on("click", ".deleteButton", deleteTask);
}
// set up function to and create input values
function addTask() {
  console.log("addSubmitButton on click");

  let newName = $("#nameIn").val();
  let newPriority = $("#priorityIn").val();
  let newStatus = $("#statusyIn").val();
  let newNote = $("#noteIn").val();

  //make new object to send to the server
  let taskToSend = {
    name: newName,
    priority: newPriority,
    status: false, // must be false
    note: newNote,
  };
  postTask(taskToSend);
}
//call saveTask with new object

//function will send input vlaues to server, tasks will be added into the database.
function postTask(newTask) {
  console.log("in POST/task", newTask);

  //ajax call to the server to get tasks
  $.ajax({
    method: "POST",
    url: "/tasks",
    data: newTask,
  })
    .then((res) => {
      console.log("Client: new task submitted successfully");
      getTask();
    })
    .catch((err) => {
      console.log("Client post, err: ", err);
    });
  //end postTask
  //empty input values after hitting submit button
  $("#nameInput").val("");
  $("#priorityIn").val("");
  $("#statusyIn").val();
  $("#NoteIn").val();

  //call get function to update DOM
  getTask();
}

function getTask() {
  // ajax call to server to get koalas
  $.ajax({
    method: "GET",
    url: "/tasks",
  })
    .then((res) => {
      console.log("GET, data received");

      $("#viewToDoList").empty();

      for (let task of res) {
        if (!task.status) {
          $("#viewToDoList").append(`
                    <tr class="notCompleted">
                        <td>${task.task}</td>
                        <td>${task.priority}</td>
                        <td>${task.notes}</td>
                        <td>
                        <button data-id="${task.id}" class="markCompleteButton">Complete</button>
                        </td>
                        <td>
                            <button data-id="${task.id}" class="deleteButton">❌</button>
                        </td>
                    <tr>
                    `);
        } else if (task.status) {
          $("#viewToDoList").append(`
                    <tr ${markComplete(task)}>
                        <td>${task.task}</td>
                        <td>${task.priority}</td>
                        <td> ${task.notes}</td>
                        <td>Completed</td>
                        <td>
                        <button data-id="${
                          task.id
                        }" class= "deleteButton">❌</button>
                        </td>
                    </tr>
                    `);
        }
      }
    })
    .catch((err) => {
      console.log("GET data err returned: ", err);
    });
} // end getTasks


//requesting to add tasks to the database
function putTask() {
  console.log("task is completed");
  let idToUpdate = $(this).data().id;
  console.log(idToUpdate);
  //PUT request to update database
  $.ajax({
    method: "PUT",
    url: `/tasks/${idToUpdate}`,
  })
    .then((res) => {
      console.log("Update was successful");
      getTask();
      $(this).prop("disabled", true);
    })
    .catch((err) => {
      console.log("err in PUT /tasks", err);
    });
}
//requesting to delete tasks from the database
function deleteTask() {
  console.log("task is successfully deleted");
  let idToDelete = $(this).data("id");
  console.log(idToDelete);

  $.ajax({
    method: "DELETE",
    url: `/tasks/${idToDelete}`,
  })
    .then((res) => {
      console.log("Delete was successful, task is not there anymore");
      getTask();
    })
    .catch((err) => {
      console.log("error in delete", err);
    });
}
//conditionally rendered completed tasks to turn green
function markComplete(task) {
  if (task.status === true) {
    return 'class="completed"';
  } else return "";
}
