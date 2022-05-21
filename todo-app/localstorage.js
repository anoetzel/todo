export function createAppTitle(title) {
  let appTitle = document.createElement('h2');
  appTitle.innerHTML = title;
  return appTitle;
}

export function createTodoItemForm() {
  let form = document.createElement('form');
  let input = document.createElement('input');
  let buttonWrapper = document.createElement('div');
  let button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Enter a new TODO';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Add TODO';

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  button.disabled = true;

  return {
    form,
    input,
    button
  };
}

export function createTodoList() {
  let list = document.createElement('ul');
  list.classList.add('list-group');
  return list;
}

export function createTodoItem(name, done, id) {
  let item = document.createElement('li');
  let buttonGroup = document.createElement('div');
  let doneButton = document.createElement('button');
  let deleteButton = document.createElement('button');
  let newObj = {
    name,
    done,
    id
  };

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  item.textContent = newObj.name;
  newObj.done = false;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Done';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Delete';

  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    doneButton,
    deleteButton,
    newObj
  };
}

export function createTodoApp(container, title = 'TODO List', arrayKey) {
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();

  let savedArray = [];
  let itemsArray = JSON.parse(localStorage.getItem(arrayKey));


  function initialState() {

    if (localStorage.getItem(arrayKey)) {

      for (let obj of itemsArray) {
        let itemToSave = createTodoItem(obj.name, obj.done, obj.id);

        if (obj.done == true) {
          itemToSave.item.classList.add('list-group-item-success');
        }

        todoList.append(itemToSave.item);

        savedArray = itemsArray;

        let itemFind = itemsArray.find(item => item.id == obj.id);

        itemToSave.doneButton.addEventListener('click', function () {
          itemToSave.item.classList.toggle('list-group-item-success');

          itemToSave.item.classList.contains('list-group-item-success') ?
            itemFind.done = true :
            itemFind.done = false;

          addToStorage();
        });

        itemToSave.deleteButton.addEventListener('click', function () {
          if (confirm(`Are you sure you want to delete ${itemFind.name}?`)) {
            itemToSave.item.remove();
            savedArray.shift(itemFind);
            addToStorage();
          }
        });
      }
    }

  }
  initialState();

  function addToStorage() {
    localStorage.setItem(arrayKey, JSON.stringify(savedArray));
    JSON.parse(localStorage.getItem(arrayKey));
  }

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!todoItemForm.input.value) {
      return;
    }

    let todoItem = createTodoItem(todoItemForm.input.value);

    savedArray.push({
      name: todoItemForm.input.value,
      done: false,
      id: generateId()
    });

    todoList.prepend(todoItem.item);
    addToStorage();
    window.location.reload();


    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;

    if (itemsArray.length == 0) {
      localStorage.removeItem('arrayKey');
    }

  });


  function generateId() {
    let number = Math.round(Math.random() * Math.abs(1 - 1000)) + Math.min(1, 1000);
    return number;
  }

  todoItemForm.input.addEventListener('input', () => {
    if (todoItemForm.input.value === '') {
      todoItemForm.button.disabled = true;
    } else {
      todoItemForm.button.disabled = false;
    }
  });

}
