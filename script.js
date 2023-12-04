// JavaScript code for handling buttons

// Get DOM elements
const codeTextarea = document.getElementById("code");
const runButton = document.getElementById("run");
const clearButton = document.getElementById("clear");
const outputPre = document.getElementById("output");

// Add a click event listener to the "Run" button
runButton.addEventListener("click", () => {
    function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    let char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}
    // Get the code from the textarea
    const code = (codeTextarea.value).replace(/[^+\-<>,.\[\]]/g, '');
    function runBrainfuck(code) {
    const memory = new Array(30000).fill(0); // Initialize memory with 30,000 cells
    let pointer = 0; // Data pointer
    let output = ""; // Store output characters

    const stack = []; // Stack for handling loops

    for (let i = 0; i < code.length; i++) {
        const char = code[i];

        switch (char) {
            case ">":
                pointer++;
                break;
            case "<":
                pointer--;
                break;
            case "+":
                memory[pointer]++;
                break;
            case "-":
                memory[pointer]--;
                break;
            case "[":
                if (memory[pointer] === 0) {
                    let depth = 1;
                    while (depth !== 0) {
                        i++;
                        if (code[i] === "[") depth++;
                        if (code[i] === "]") depth--;
                    }
                } else {
                    stack.push(i);
                }
                break;
            case "]":
                if (memory[pointer] !== 0) {
                    i = stack[stack.length - 1] - 1;
                } else {
                    stack.pop();
                }
                break;
            case ",":
                // You can implement input handling here
                memory[pointer]= hashCode(prompt(""));
                break;
            case ".":
                output += String.fromCharCode(memory[pointer]);
                break;
            // Ignore any other characters
        }
    }
    
    return output;
}

    const output = runBrainfuck(code)
    // Display a simple message in the output for testing
    outputPre.textContent = "Code executed:\n" + output;
});

// Add a click event listener to the "Clear" button
clearButton.addEventListener("click", () => {
    // Clear the code textarea and output
    codeTextarea.value = "";
    outputPre.textContent = "";
});
