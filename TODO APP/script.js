let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let add = document.getElementById('add');
let tasks = document.getElementById('tasks');

let data = [];

form.addEventListener('submit', (e) => {
    e.preventDefault();
    formValidation();
});

// get the data and show on screen
let showTasks = () => {
    let task = JSON.parse(localStorage.getItem('tasks'));
    tasks.innerHTML = '';
    task.map((item, index) => {
        return (tasks.innerHTML += `
      <div id=${index}>
      <span class="fw-bold">${item.text}</span>
      <span class="small text-secondary">${item.date}</span>
      <p>${item.description}</p>

      <spanc class="options">
        <!-- edit -->
        <i
          class="bi bi-pencil-square"
          onclick="editTask(this)"
          data-bs-toggle="modal"
          data-bs-target="#form"
        ></i>

        <!-- delete -->
        <i class="bi bi-trash" onclick="deleteTask(this)"></i>
      </span>
    </div>
      
      `);
    });

    resetForm();
};

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textarea.value = '';
};

// posting the data
let acceptData = () => {
    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    });

    localStorage.setItem('tasks', JSON.stringify(data));
    showTasks();

    console.log(data);
};

let formValidation = () => {
    if (textInput.value === '') {
        // failure
        msg.innerHTML = '* task title cannot be blank';
    } else {
        // success
        msg.innerHTML = '';
        acceptData();

        // close the modal after submission
        add.setAttribute('data-bs-dismiss', 'modal');
        add.click();

        // IIFE: Immediately Invoked function Expression
        (() => {
            add.setAttribute('data-bs-dismiss', '');
        })();
    }
};