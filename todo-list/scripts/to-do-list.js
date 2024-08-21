const toDoListArray = JSON.parse(localStorage.getItem('todolist')) || [];

renderTodoList();

function renderTodoList(){
    const outputTodolist = document.querySelector('.js-output-todolist');

    let html = '';

    toDoListArray.forEach((toDo,todoId) => {
      const {name, date} = toDo;

      let todoList = `
        <div class="js-todo-list-${todoId} todo-output">
          <div class="js-todo-name todo-name">${name}</div>

            <input type="text" class="js-todo-input-edit-name todo-input-edit" value="${name}">

          <div class="js-todo-date todo-date">${date}</div>

            <input type="date" class="js-todo-input-edit-date todo-input-edit" value="${date}">  

          <button class="js-delete-btn todo-delete-btn">Delete</button>
          <button class="todo-edit-btn js-edit-btn">Edit</button>
          <button class="todo-save-btn js-save-btn">Save</button>
        </div>
        `
      html += todoList;
    });

    outputTodolist.innerHTML = html;

    document.querySelectorAll('.js-delete-btn')
      .forEach((deleteButton, index) => {
        deleteButton.addEventListener('click',() => {
          toDoListArray.splice(index,1);
          localStorage.removeItem('todolist');
          renderTodoList();
        })
      })

    document.querySelectorAll('.js-edit-btn')
      .forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
          const todoItem = editButton.closest(`.todo-output`);
          todoItem.classList.add('is-editing-btn');  
        });
      });

    document.querySelectorAll('.js-save-btn')
      .forEach((saveButton, index) => {
        saveButton.addEventListener('click', () => {    
          const todoItem = saveButton.closest(`.todo-output`);
          const nameEdit = todoItem.querySelector('.js-todo-input-edit-name');
          const name = nameEdit.value;
          const edittedToDo = todoItem.querySelector('.js-todo-input-edit-date');
          const toDoName = edittedToDo.value;

          toDoListArray[index].name = name;
          toDoListArray[index].date = toDoName;
          renderTodoList();

          todoItem.classList.remove('is-editing-btn');
        });
      });
}

  renderTodoList();

function addedTodoList(){
      const toDoList =  document.querySelector('.js-text-todolist');
      const name =  toDoList.value;
      const dateInputElement =  document.querySelector('.js-date');
      const date =  dateInputElement.value;
  
      toDoListArray.push({
        name,
        date
      })
      toDoList.value = '';
      dateInputElement.value = '';
      console.log(JSON.stringify(toDoListArray));
      localStorage.setItem('todolist',JSON.stringify(toDoListArray));

      renderTodoList();
  
};


  document.querySelector('.js-add-button')
  .addEventListener('click', () => {
    addedTodoList();
  });
  
  document.body.addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      addedTodoList();
    }
  });





