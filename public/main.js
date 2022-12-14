const form = document.querySelector("form.top");
const alert_p = document.querySelector("p.alert");
const entry = document.getElementById("entry");
const submitBtn = document.querySelector(".submit-btn");
const ul = document.querySelector(".list-container");
const clearBtn = document.querySelector(".clear-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const loginBtn = document.querySelector("#login-btn");
const login = document.querySelector("#login");
const register = document.querySelector("#register");
const main = document.querySelector("#todo");
const swichBtn1 = document.querySelector(".swich1");
const swichBtn2 = document.querySelector(".swich2");
const registerForm = document.querySelector("#register_form");
const loginForm = document.querySelector("#login_form");
const username1 = document.querySelector("#username1");
const password1 = document.querySelector("#password1");
const username2 = document.querySelector("#username2");
const password2 = document.querySelector("#password2");
const endpoint = "http://localhost:5000/api/";
let listUser = [];
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

// submit register form
registerForm.addEventListener("submit", registerUser);
// submit login form
loginForm.addEventListener("submit", loginUser);
//handle user after login
localStorage.getItem("key") ? handleAfterLogin() : null;

function addItem(e) {
  e.preventDefault();
  let val = entry.value;
  let id = new Date().getTime().toString();
  console.log(val, "val");
  if (val && !editFlag) {
    fetch(`${endpoint}todo`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        title: "new todo!",
        todo: val,
        isActive: true,
      }),
    }).then((response) => {
      if (!response.ok) {
        displayAlert(" ???????????? ! ?????????? ?????? ??????????", "danger");
      } else {
        clearBtn.classList.remove("d-none");
        //set local storage
        addToLocalStorage(id, val);
        setBackToDefault();
        displayAlert("???? ???????????? ?????? ????", "success");
        location.reload();
      }
    });
  } else if (val && editFlag) {
    //4to B
    editElement.innerText = val;
    displayAlert("???? ???????????? ?????????? ???? !", "success");

    // LS
    editLS(editID, val);

    setBackToDefault();
    clearBtn.classList.remove("d-none");
    document.querySelectorAll(".fas").forEach((i) => {
      i.classList.remove("v-none");
    });
  } else {
    displayAlert("???????? ???????? ?????????????? !", "danger");
  }
}
function displayAlert(text, action) {
  alert_p.textContent = text;
  alert_p.classList.add(`alert-${action}`);
  //remove alert
  setTimeout(() => {
    alert_p.textContent = "";
    alert_p.classList.remove(`alert-${action}`);
  }, 2000);
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
  submitBtn.textContent = "??????";
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
  displayAlert("???????? ?????????? :(", "danger");
  setBackToDefault();
  // you can use  localStorage.removeItem("list"); pero se??re m??s sem??ntico
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
  submitBtn.innerText = "????????????";
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
  displayAlert("???? ???????????? ?????? ???? !", "danger");
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

swichBtn1.addEventListener("click", () => {
  register.classList.add("d-none");
  login.classList.add("d-show");
});
swichBtn2.addEventListener("click", () => {
  register.classList.remove("d-none");
  login.classList.remove("d-show");
});

//get all user from server
async function getListUsers() {
  let response = await fetch(`${endpoint}user`);
  const data = await response.json();
  const usernames = data.map((i) => i.username);
  listUser = usernames;
}
getListUsers();

function registerUser(e) {
  e.preventDefault();
  const user = String(username1.value.trim());
  const pass = String(password1.value.trim());
  //check duplicate user
  const userExist = listUser.includes(user);
  if (user.length < 6) {
    displayAlert("  ?????? ???????????? ???????? ?????????? ???? 6 ???????? ????????! ", "danger");
  } else if (userExist) {
    displayAlert("  ?????? ???????????? ???????????? ?????? !  ", "danger");
  } else if (pass.length < 6) {
    displayAlert("  ???????? ???????? ???????? ?????????? ???? 6 ???????? ????????!  ", "danger");
  } else {
    fetch(`${endpoint}user`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    }).then((response) => {
      if (!response.ok) {
        displayAlert(" ???????????? ! ?????????? ?????? ??????????", "danger");
      } else {
        fetch(`${endpoint}login`, {
          method: "post",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: user,
            password: pass,
          }),
        }).then((response) => {
          if (!response.ok) {
            displayAlert(" ???????????? ! ?????????? ?????? ??????????", "danger");
          } else {
            response.json().then((data) => {
              console.log(data);
              localStorage.setItem("key", JSON.stringify(data));
              displayAlert(
                "  ?????????? ! ?????? ???? ???????????? ???????? ???????? ?????? !  ",
                "success"
              );
              register.classList.remove("d-show");
              login.classList.remove("d-show");
              register.classList.add("d-none");
              login.classList.add("d-none");
              main.classList.add("d-show");
            });
          }
        });
      }
    });
  }
}

function loginUser(e) {
  e.preventDefault();
  const user = String(username2.value.trim());
  const pass = String(password2.value.trim());
  //check user exist
  const userExist = listUser.includes(user);
  console.log(listUser);
  if (user.length < 6) {
    displayAlert("  ?????? ???????????? ???????? ?????????? ???? 6 ???????? ????????! ", "danger");
  } else if (!userExist) {
    displayAlert(" ?????? ???????? ?????? ?????? ?????? ! ", "danger");
  } else if (pass.length < 6) {
    displayAlert("  ???????? ???????? ???????? ?????????? ???? 6 ???????? ????????!  ", "danger");
  } else {
    fetch(`${endpoint}login`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
        password: pass,
      }),
    }).then((response) => {
      if (!response.ok) {
        displayAlert(" ???????????? ! ?????????? ?????? ??????????", "danger");
      } else {
        response.json().then((data) => {
          console.log(data);
          localStorage.setItem("key", JSON.stringify(data));
          displayAlert("  ?????????? ! ?????? ???? ???????????? ???????? ???????? ?????? !  ", "success");
          register.classList.remove("d-show");
          login.classList.remove("d-show");
          register.classList.add("d-none");
          login.classList.add("d-none");
          main.classList.add("d-show");
        });
      }
    });
  }
}

function handleAfterLogin() {
  console.log("localstrogae");
  displayAlert("  ?????????? ! ?????? ???? ???????????? ???????? ???????? ?????? !  ", "success");
  register.classList.remove("d-show");
  login.classList.remove("d-show");
  register.classList.add("d-none");
  login.classList.add("d-none");
  main.classList.add("d-show");
}
