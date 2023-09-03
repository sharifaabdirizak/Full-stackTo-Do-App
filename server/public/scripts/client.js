$(document).ready(onReady);

function onReady() {
   console.log("Client side javascript works!");
}
//set up click listeners
setupClickListeners()
//load to do list on the application to load


function setupClickListeners() {
    $('#addSubmitButton').on('click', addTask);
    $('#viewToDoList').on('click', 'markAsCompleteButton', putTask);

}
// set up function to and create input values
function addTask (){
    console.log('addSubmitButton on click');

    let newTask = $('#taskIn').val();
    let newPriority = $('#priorityIn').val();
    let newStatus =  $('#statusyIn').val();
    let newNotes = $('#NotesIn').val();
    
    //make new object to send to the server
    let taskToSend = {
        task: newTask, 
        priority: newPriority,
        status: newStatus, // must be true or false
        notes: newNotes

    };
    //call saveTask with new object
    postTask(taskToSend);
    function postTask(newTask){
        console.log('in POST/task', newTask)
    }

    

}

function putTask(){}