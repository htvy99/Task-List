# Task list

**Github page**: https://htvy99.github.io/Task-List/

1. **Define UI variable**

2. **Load all event listeners**

3. **Add tasks function**
    - Check if input is empty → alert
    - Create li element & set className
    - Create textnode & append to the li
    - Create link & inner HTML delete icon & add class
    - Append the link to the li
    - Append the li to ul
    - Store task in local storage
    - Clear input
    
4. **Store the new task in the local storage**
    - Initial a new task list.
    - Check if sth is in the LS.
    - Create a new task list array if not. Parse the task into string array using JSON if there's sth inside the LS. `JSON.parse(sth)`
    - Push new task to the task list array
    - Reset the LS w/ new task list array using `setItem` w/ `JSON.stringify`
    
5. **Show the task list in the LS to the UL whenever the DOM is reloaded.**
    - Add the event listener `DOMContentLoaded` with the function to get content from the LS.
    - Function getTask from the LS
        - Check the LS & put it to the variable by checking if there's anything inside the DOM, if yes, parse the list into array.
        - For each task in the array, we create the task in the HTML file.
        
6. **Remove task from the LS**
    - After remove task from the DOM, call the function `removeTaskFromLocalStorage`
    - Check the local storage & put it to the variable
    - Loop through the array of the LS, if the `textContent` of the delete item equal to the task in the array, we delete it
    - Set the LS again
