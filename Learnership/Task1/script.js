// Selecting buttons and input screen
const buttons = document.querySelectorAll(".buttons button");
const screen = document.getElementById("input");

// Adding click event listener to each button
buttons.forEach(button => {
    button.addEventListener("click", function(event) {
  
        const buttonClicked = event.target.textContent;
        
        // Handling different button clicks
        if (buttonClicked === "AC") {
            // Clear screen
            screen.value = "";
        } else if (buttonClicked === "CE") {
            // Clear last entry
            screen.value = screen.value.toString().slice(0, -1);
    
        } else if (buttonClicked === "=") {
            screen.value=eval(screen.value)
            
        }
        else if (buttonClicked ==="%"){
            screen.value=screen.value/100;
        
        } 
        else if(buttonClicked ==="√"){
            screen.value=eval("Math.sqrt(" + screen.value + ")");
        }
        else {
            // Appending clicked button value to screen
            screen.value += buttonClicked;
        }
    });
});
