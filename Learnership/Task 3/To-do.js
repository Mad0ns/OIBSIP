// Execute when the DOM content is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get required elements from the DOM
    var click = document.getElementById("Set-button"); // Button for adding tasks
    var whatToDo = document.querySelector(".ToDoClass"); // Container for to-do items
    var completed = document.querySelector(".Complete"); // Container for completed tasks

    // Function to get current time
    function time(){
        var date= document.createElement("p");
        var currentDate=new Date();
        var formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
        date.textContent=formattedDate;
        date.style.marginLeft = "10px"; // Add some margin between text and date
        return date;
    }

    // Check if required elements are present
    if (!click || !whatToDo || !completed) {
        console.error("One or more required elements not found.");
        return;
    }

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Event listener for adding tasks
    click.addEventListener('click', function() {
        // Get the title from input field
        var title = document.getElementById("title").value.trim();
        // If title is empty, show alert and return
        if (title === "") {
            alert("Please enter a title for your to-do item.");
            return;
        }

        // Create list item for new task
        var todoList = document.createElement("li");
        
        // Create buttons for delete, edit, and complete actions
        var deletebtn = document.createElement("button");
        var editbtn = document.createElement("button");
        var completebtn = document.createElement("button");

        // Set class names for buttons
        deletebtn.className = "deletebtn";
        completebtn.className = "completebtn";
        editbtn.className = "editbtn";

        // Set text content for buttons
        deletebtn.textContent = "Delete";
        completebtn.textContent = "Complete";
        editbtn.textContent = "Edit";

        // Set text content for task list item
        todoList.textContent = `${title}`; 

        // Append buttons to task list item
        todoList.appendChild(deletebtn);
        todoList.appendChild(editbtn);
        todoList.appendChild(completebtn);

        // Append task list item to container for to-do items
        whatToDo.appendChild(todoList);
        
        // Call saveTasks() after adding a task
        saveTasks(); 
    });

    // Function to remove an item
    function remove(item){
        if (item) {
            item.parentNode.removeChild(item);
        }
    }

    // Event listener for task actions
    whatToDo.addEventListener('click', function(event) {
        var clickedElement = event.target;
        if (clickedElement.className === 'deletebtn') {
            // Delete button clicked, remove task
            var listItem = clickedElement.closest('li');
            remove(listItem);
            // Call saveTasks() after removing a task
            saveTasks(); 
        }
        if (clickedElement.className === "completebtn") {
            // Complete button clicked, move task to completed list
            var done = document.createElement("li");
            done.textContent = clickedElement.closest("li").textContent.replace("DeleteEditComplete", "");
            completed.appendChild(done);
            remove(clickedElement.closest('li'));
            // Add completion date
            var completedate=time();
            completed.appendChild(completedate);
            // Call saveTasks() after completing a task
            saveTasks(); 
        }
        if (clickedElement.className === "editbtn") {
            // Edit button clicked, enable editing of task title
            var item = clickedElement.closest('li');
            title.value = item.textContent.replace("DeleteEditComplete", "");
            remove(item);
            // Call saveTasks() after editing a task
            saveTasks(); 
        }
    });

    // Function to save tasks into localStorage
    function saveTasks() {
        // Arrays to store tasks and completed tasks
        let tasks = [];
        let complete = [];
        // Loop through to-do items and store in tasks array
        whatToDo.querySelectorAll('li').forEach(function(item) {
            let taskText = item.textContent.trim();
            // Remove specific text from task text
            taskText = taskText.replace(/Delete|Edit|Complete/g, "");
            tasks.push(taskText);
        });
        // Loop through completed items and store in complete array
        completed.querySelectorAll('li').forEach(function(item) {
            let completeTask = item.textContent.trim();
            completeTask = completeTask.replace(/Delete|Edit|Complete/g, "");
            complete.push(completeTask);
        });
        // Store tasks and complete tasks arrays in localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('complete', JSON.stringify(complete));
    }
    
    // Function to load tasks from localStorage
    function loadTasks() {
        // Retrieve tasks and complete tasks arrays from localStorage
        var tasks = JSON.parse(localStorage.getItem('tasks'));
        var complete = JSON.parse(localStorage.getItem('complete'));
        
        // If tasks exist, loop through and append to to-do list
        if (tasks) {
            tasks.forEach(function(task) {
                var todoList = document.createElement("li");
                
                var deletebtn = document.createElement("button");
                var editbtn = document.createElement("button");
                var completebtn = document.createElement("button");

                deletebtn.className = "deletebtn";
                completebtn.className = "completebtn";
                editbtn.className = "editbtn";

                deletebtn.textContent = "Delete";
                completebtn.textContent = "Complete";
                editbtn.textContent = "Edit";

                todoList.textContent = `${task}`; 

                todoList.appendChild(deletebtn);
                todoList.appendChild(editbtn);
                todoList.appendChild(completebtn);

                whatToDo.appendChild(todoList);
            });
        }
        
        // If complete tasks exist, loop through and append to completed list
        if (complete) {
            complete.forEach(function(task) {
                var done = document.createElement("li");
                done.textContent = task;
                
                var completedate = time();
                completed.appendChild(done);
                completed.appendChild(completedate);
            });
        }
    }
});
