document.addEventListener("DOMContentLoaded", function() {
    var inputForm = document.getElementById("repl");
    var input = document.querySelectorAll("input[name='command']")[0];
    
    input.focus();
    
    inputForm.addEventListener("submit", function(e) {
        e.preventDefault();
        
        var pastInput = document.createElement('input');
        pastInput.disabled = true;
        pastInput.value = " IN: " + input.value;

        if (inputForm.parentNode) {
          inputForm.parentNode.insertBefore(pastInput, inputForm);
        }

        addOutput(eval(input.value), "OUT");
        input.value = "";
        return false;
    });
    
    // Capture console events
    window.console = {
      log: function(msg) { addOutput(msg, "LOG"); },
      info: function(msg) { addOutput(msg, "INFO"); },
      warn: function(msg) { addOutput(msg, "WARN"); },
      error: function(msg) { addOutput(msg, "ERROR"); }
    };
    
    window.onerror = function(messageOrEvent, source, lineno, colno, error) { addOutput(JSON.stringify(error), "ERROR"); console.log(messageOrEvent, source, lineno, colno, error); return true; };

    
    function addOutput(outputValue, errType) {
        var output = document.createElement('output');
        output.innerHTML = errType + ": " + outputValue;
        output.classList.add("type-" + errType);

        if (inputForm.parentNode) {
          inputForm.parentNode.insertBefore(output, inputForm);
        }
    }
});

