$(document).ready(onReady);

function onReady() {
   console.log("Client side javascript works!");
}
//set up click listeners
setupClickListeners()
//load to do list on the application to load


function setupClickListeners() {
    $('#addSubmitButton').on('click', addTask);
    $('#viewToDoList').on('click', 'markCompleteButton', putTask);
    $('#viewToDoList').on('click', '.deleteButton', deleteTask);

}
// set up function to and create input values
function addTask (){
    console.log('addSubmitButton on click');

    let newName = $('#nameIn').val();
    let newPriority = $('#priorityIn').val();
    let newStatus =  $('#statusyIn').val();
    let newNote = $('#NoteIn').val();
    
    //make new object to send to the server
    let taskToSend = {
        name: newName, 
        priority: newPriority,
        status: newStatus, // must be true or false
        note: newNote

    }};
    //call saveTask with new object
    postTask(taskToSend);
//function will send input vlaues to server, tasks will be added into the database.
    function postTask(newTask) {
        console.log('in POST/task', newTask)

        
    //ajax call to the server to get tasks
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
      }).then((res) => {
        console.log('Client: new task submitted successfully')
        getTask();
      }).catch((err) => {
        console.log("Client post, err: ", err);
      })
    }//end postTask
    //empty input values after hitting submit button
    $('#nameInput').val('');
    $('#priorityIn').val('');
    $('#statusyIn').val();
    $('#NoteIn').val();
    


    function getTask() {
            // ajax call to server to get koalas
            $.ajax({
              method: 'GET',
              url: '/tasks'
            }).then((res) => {
              console.log('GET, data received');

              for (let task of tasks) {
                $('#viewTask').append(`
                <tr class=${task.isComplete===true ?'done':''} id=${task.id} data-id=${task.id}>
                <td>${task.name}</td>
                <td>${task.priority}</td>
                <td>${task.status}</td>
                <td>${task.notes}</td>
                <td>${task.isComplete === true ?'Yes': 'No'} <td>
                <td><button> class ='markAsCompleteButton'>Complete<button></td>
                <td><button> class = "delete-button"<Delete>❌</button></td>
                </tr>
                `);
            }
            }).catch((err) => {
              console.log('GET data err returned: ', err);
            })
          
          } // end getTasks

          function putTask() {
        console.log('task is completed');
        let idToUpdate = $(this).data().id;
    console.log(idToUpdate);
    //PUT request to update database
    $.ajax({
        method: 'PUT',
        url: `/tasks/${idToUpdate}`,
      }).then((res) => {
        console.log('Update was successful', )
          getTask();
          $(this).prop('disabled', true);
        }).catch((err) => {
            console.log('err in PUT /tasks', err);
        });
}

function deleteTask() {
    console.log ('task is successfully deleted');
    let idToDelete = $(this).parent().parent().data('id');
    console.log(idToDelete);

    $ajax({
        
            method: 'DELETE',
            url: `/tasks/${idToDelete}`
            }).then ((res) => {
                console.log('Delete was successful, tesk is not there anymore');
            getTask();
            }).catch((err) => {
            console.log('error in delete', err);
            })
    }



