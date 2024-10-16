# Todolist Application Using React and Fetch

## Second Part of the TODO list, adding fetch

This exercise is meant to be completed after the _TODO list React application_ because the first part is the perfect boilerplate to start using API's.

For this second part, we will sync our to-do list with a real database, using a RESTful and public API made for this exercise.

Access to the [TODO-list API documentation](./openapi.json).

This whole exercise is about asynchronous programming because the interactions _from_ and _to_ the server need to be done async. That way, the user does not have to wait for the information to arrive.

> Remember to save and upload your code to GitHub by creating a new repository, updating the remote (`git remote set-url origin <your new url>`), and uploading the code to your new repository using the `add`, `commit` and `push` commands from the git terminal.

## Instructions:

- Make your to-do list sync with the backend API every time a task is added or deleted.
- Add a clean all tasks button that will `DELETE` the user from the server and empty the todo list on the front-end.

There are 3 critical moments in the application timeline (a.k.a. The runtime) to focus on while integrating this API:

- **After the list loads empty for the first time (`useEffect`)**: You should fetch (`GET`) the data from the API and update the tasks when the information finally arrives.
- **When a new task is added**: You should `PUT` the new list on the server.
- **When a task is removed**: You should `PUT` the new list on the server.

## Hint:

Use the following fetch call to synchronize your tasks with the server every time there is a change on the list:

```js
fetch("https://playground.4geeks.com/todo/user/alesanchezr", {
  method: "PUT",
  body: JSON.stringify(todos),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resp) => {
    console.log(resp.ok); // Will be true if the response is successful
    console.log(resp.status); // The status code=200 or code=400 etc.
    console.log(resp.text()); // Will try to return the exact result as a string
    return resp.json(); // (returns promise) Will try to parse the result as JSON and return a promise that you can .then for results
  })
  .then((data) => {
    // Here is where your code should start after the fetch finishes
    console.log(data); // This will print on the console the exact object received from the server
  })
  .catch((error) => {
    // Error handling
    console.error(error);
  });
```

For any other request, you have to keep changing the same variables on the fetch: The URL, the method and the payload.
