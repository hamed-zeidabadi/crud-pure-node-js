const form = document.querySelector("form.top");
const alert_p = document.querySelector("p.alert");
const entry = document.getElementById("entry");
const submitBtn = document.querySelector(".submit-btn");
const ul = document.querySelector(".list-container");
const clearBtn = document.querySelector(".clear-btn");
const cancelBtn = document.querySelector(".cancel-btn");
// edit option
let editElement;
let editFlag = false;
let editID = "";

// submit form
form.addEventListener("submit", addItem);
//clear list
clearBtn.addEventListener("click", clearItems);
// display items onload from localstorage DB
window.addEventListener("DOMContentLoaded", setupItems);
//cancel edit
cancelBtn.addEventListener("click", () => {
  setBackToDefault();
  clearBtn.classList.remove("d-none");
  document.querySelectorAll(".fas").forEach((i) => {
    i.classList.remove("v-none");
  });
});

function addItem(e) {
  e.preventDefault();
  let val = entry.value;
  let id = new Date().getTime().toString();

  if (val && !editFlag) {
    createListItem(id, val);
    clearBtn.classList.remove("d-none");
    displayAlert("با موفقیت ثبت شد", "success");

    //set local storage
    addToLocalStorage(id, val);

    setBackToDefault();
  } else if (val && editFlag) {
    //4to B
    editElement.innerText = val;
    displayAlert("با موفقیت آپدیت شد !", "success");

    // LS
    editLS(editID, val);

    setBackToDefault();
    clearBtn.classList.remove("d-none");
    document.querySelectorAll(".fas").forEach((i) => {
      i.classList.remove("v-none");
    });
  } else {
    displayAlert("لطفا چیزی بنویسید !", "danger");
  }
}
function displayAlert(text, action) {
  alert_p.textContent = text;
  alert_p.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert_p.textContent = "";
    alert_p.classList.remove(`alert-${action}`);
  }, 1000);
}

function createListItem(id, val) {
  let li = document.createElement("li");
  li.className = "list-item";
  li.setAttribute("data-id", id);
  li.innerHTML = `
        <p class="text">${val}</p>
        <i class="fas fa-edit"></i>
        <i class="fas fa-check"></i>
        <i class="fas fa-trash-alt"></i>`;
  //icons
  const check = li.querySelector(".fas.fa-check");
  check.addEventListener("click", checkItem);
  const edit = li.querySelector(".fas.fa-edit");
  edit.addEventListener("click", editItem);
  const trash = li.querySelector(".fas.fa-trash-alt");
  trash.addEventListener("click", trashItem);

  ul.append(li);
}
function setBackToDefault() {
  entry.value = null;
  editFlag = false;
  editID = "";
  submitBtn.textContent = "ثبت";
  cancelBtn.classList.add("d-none");
}

//2do
function clearItems() {
  clearBtn.classList.add("d-none");
  let lis = document.querySelectorAll(".list-item");
  if (lis.length > 0) {
    lis.forEach((li) => {
      ul.removeChild(li);
    });
  }
  displayAlert("لیست خالیه :(", "danger");
  setBackToDefault();

  // you can use  localStorage.removeItem("list"); pero se´re más semántico
  localStorage.clear(); //mueve todos los keys.. en este caso solo un key que es "list"
}
//3ro icons actions
function checkItem() {
  let parent = this.parentNode;
  let p_text = parent.querySelector(".text");
  let edit = parent.querySelector(".fas.fa-edit");
  p_text.classList.toggle("done");
  edit.classList.toggle("v-none");
}
function editItem() {
  //4to A
  let p_text = this.previousElementSibling; //p.text
  //set editElement
  editElement = p_text;
  //ser entry value
  entry.value = p_text.innerText;
  editFlag = true;

  //for LS
  editID = p_text.parentNode.dataset.id;

  //btn
  submitBtn.innerText = "ویرایش";
  cancelBtn.classList.remove("d-none");
  clearBtn.classList.add("d-none");
  document.querySelectorAll(".fas").forEach((i) => {
    i.classList.add("v-none");
  });
}
function trashItem() {
  let parent = this.parentNode;
  let id = parent.dataset.id;
  console.log(parent);
  ul.removeChild(
    parent
  ); /* si usas solo "remove" pues te vuela TODOS LOS HIJOS 
    es por eso que uso removeChild para mover el seleccionado solamente*/
  if (ul.children.length === 0) {
    clearBtn.classList.add("d-none");
  }
  displayAlert("با موفقیت پاک شد !", "danger");
  setBackToDefault();

  // LS
  removeFromLS(id);
}

/* ///// LOCAL STORAGE //////////// */
function addToLocalStorage(id, val) {
  let object = { id, val }; // ES6 {id:id, value:value}
  let items = getLocalStorage();
  items.push(object);
  // https://www.w3schools.com/jsref/met_storage_setitem.asp
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLS(id) {
  let items = getLocalStorage();
  items = items.filter((item) => item.id !== id && item);
  //updateing LS
  localStorage.setItem("list", JSON.stringify(items));
}
function editLS(editID, val) {
  let items = getLocalStorage();
  items = items.map((item) => {
    if (item.id === editID) item.val = val;
    return item;
  });
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
//LOAD CONTENT
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach((item) => {
      createListItem(item.id, item.val);
    });
    clearBtn.classList.remove("d-none");
  }
}

//Login

const loginBtn = document.querySelector("#login-btn");
const login = document.querySelector("#login");
const register = document.querySelector("#register");
const main = document.querySelector("#main");
const swichBtn1 = document.querySelector(".swich1");
const swichBtn2 = document.querySelector(".swich2");
swichBtn1.addEventListener("click", () => {
  register.classList.add("d-none");
  login.classList.add("d-show");
});
swichBtn2.addEventListener("click", () => {
  register.classList.remove("d-none");
  login.classList.remove("d-show");
});
