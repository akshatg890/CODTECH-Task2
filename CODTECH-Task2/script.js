const inputEle = document.querySelector('.js-input-section');
const btnEle = document.querySelector('.js-btn');
const numberOfTaskEle = document.querySelector('.task-remaining');
const uncompleteTaskContainerEle = document.querySelector('.js-uncomplete-tasks');

const errorEle = document.querySelector('.js-error');

const taskSection = document.querySelector('.js-tasks');

let uncompletedTask = 0;
let taskHTML = ``;

function saveToStorage() {
    localStorage.setItem('data' , uncompleteTaskContainerEle.innerHTML);
}



function getNumber(){
    numberOfTaskEle.innerHTML = localStorage.getItem("number");
}

function getFromStorage() {
    // console.log('data')
    // localStorage.getItem('data');
    // console.log(JSON.parse(localStorage.getItem('data')))
    uncompleteTaskContainerEle.innerHTML = localStorage.getItem('data');
    getNumber();

}

function updateRemainingTaskNumber(){
    
    if(uncompletedTask >= 0){
        numberOfTaskEle.innerText = uncompletedTask;
    } else {
        numberOfTaskEle.innerText = 0;
    }
    // saveNumber();
}

function addTask(taskMsg){
    const task = document.createElement('li');
    task.innerHTML = `
        <div class="main">
            <span class="task-data">
                <img src="https://cdn-icons-png.flaticon.com/512/15476/15476717.png" alt="unchecked" class="unchecked task-status">

                <span class="task-msg">${taskMsg}</span>
            </span>
            
            <span class="options">
                

                <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="delete" class="delete-icon">
            </span>
        </div>
        `;

        console.log("add task called");

        uncompleteTaskContainerEle.appendChild(task);
        uncompletedTask++;
        updateRemainingTaskNumber();
        saveToStorage();
}


function deleteTask(deleteTaskEle, checkmarkImage) {

    console.log("Delete task");
    const liToDelete = deleteTaskEle.parentNode.parentNode;
    liToDelete.remove();


    if(!checkmarkImage.parentElement.parentElement.classList.contains("checked")){
        console.log("code run!!");
        uncompletedTask--;
    }

    updateRemainingTaskNumber();
}

function checkMarkToggle(checkmarkImage, taskMsgEle) {
    
    console.log(checkmarkImage);
    // console.log(checkmark);
    if(checkmarkImage.classList.contains('unchecked')){
        checkmarkImage.setAttribute('src' , 'https://cdn-icons-png.flaticon.com/512/14090/14090371.png');
        checkmarkImage.parentElement.parentElement.classList.add("checked");
        taskMsgEle.style.textDecoration = 'line-through';
        uncompletedTask--;
    } else{
        checkmarkImage.setAttribute('src' , 'https://cdn-icons-png.flaticon.com/512/15476/15476717.png');
        checkmarkImage.setAttribute('alt' , 'checked');
        taskMsgEle.style.textDecoration = 'none';
        uncompletedTask++;
    }

    console.log(uncompletedTask);
    updateRemainingTaskNumber();
    checkmarkImage.classList.toggle('unchecked');
    // console.log(checkmark.className)
}


btnEle.addEventListener('click', (e) => {
    e.preventDefault();
    let taskmsg = inputEle.value;

    if(taskmsg === '' || taskmsg === ' '){
        errorEle.style.display = 'block';
        errorEle.classList.add('shake-animation');
        setTimeout( () => {
            errorEle.classList.remove('shake-animation');
        }, 600);
    } else{
        // console.log('btn task msg:',taskmsg);
        addTask(taskmsg);
        errorEle.style.display = 'none';
    }
    inputEle.value = '';
} , false);

uncompleteTaskContainerEle.addEventListener('click' , (e) => {

 

    let element = e.target;
    console.log(element);

    
    let checkmarkImage , taskMsgEle;
    checkmarkImage = element.parentNode.children[0];
    taskMsgEle = element.parentNode.children[1];
    if(element.classList.contains('task-msg')){
        checkMarkToggle(checkmarkImage , taskMsgEle);
    } 
    else if( element.classList.contains('task-status')){
        checkMarkToggle(checkmarkImage , taskMsgEle);
    } 
    else if ( element.classList.contains('edit-icon') ){
        editTask(element.parentNode.parentNode.children[0].children[1]);
    } 
    else if(element.classList.contains('delete-icon')){
        deleteTask(element, checkmarkImage);
    }

}, false);


