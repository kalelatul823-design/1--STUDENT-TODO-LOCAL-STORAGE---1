let cl = console.log;

const stdForm = document.getElementById("stdForm");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const contactControl = document.getElementById("contact");
const emailControl = document.getElementById("email");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const stdInfo = document.getElementById("stdInfo");

// let stdArr = [
//     {
//         id : '101',
//         fname : "atul",
//         lname : "kalel",
//         contact : "7887676676",
//         email : "kalelatul23@gmail.com"
//     },
//      {
//         id : '102',
//         fname : "karan",
//         lname : "shedge",
//         contact : "9845738676",
//         email : "karanshe45@gmail.com"
//     }
// ]

// localStorage.setItem("stdArr", JSON.stringify(stdArr));

let stdArr = JSON.parse(localStorage.getItem("stdArr")) || [];
cl(stdArr);

function showUi(arr) {
  let result = "";
  arr.forEach((ele, i) => {
    result += `<tr id=${ele.id}>
                      <td>${i + 1}</td>
                      <td>${ele.fname}</td>
                      <td>${ele.lname}</td>
                      <td>${ele.contact}</td>
                      <td>${ele.email}</td>
                      <td>
                        <i onclick="onEdit(this)"
                          class="fa-solid fa-pen-to-square fa-2x text-primary"
                          role="button" data-editid=${ele.id}
                        ></i>
                      </td>
                      <td>
                        <i onclick="onRemove(this)"
                          class="fa-solid fa-trash fa-2x text-danger"
                          role="button" data-removeid=${ele.id}
                        ></i>
                      </td>
                    </tr>`;
  });
  stdInfo.innerHTML = result;
}
showUi(stdArr);

//create
function create(NEW_STD) {
  let tr = document.createElement("tr");

  tr.id = NEW_STD.id;

  tr.innerHTML = ` <td>${stdArr.length}</td>
                      <td>${NEW_STD.fname}</td>
                      <td>${NEW_STD.lname}</td>
                      <td>${NEW_STD.contact}</td>
                      <td>${NEW_STD.email}</td>
                      <td>
                        <i onclick="onEdit(this)"
                          class="fa-solid fa-pen-to-square fa-2x text-primary"
                          role="button" data-editid=${NEW_STD.id}
                        ></i>
                      </td>
                      <td>
                        <i onclick="onRemove(this)"
                          class="fa-solid fa-trash fa-2x text-danger"
                          role="button" data-removeid=${NEW_STD.id}
                        ></i>
                      </td>`;
  stdInfo.append(tr);
  Swal.fire({
    title: `This Student is created successfully`,
    icon: "success",
    timer: 3000,
  });
}

//remove
function onRemove(ele) {
  let getConfirm = confirm("Are you sure to remove this student ?");
  if (getConfirm) {
    let REMOVE_ID = ele.dataset.removeid;
    cl(REMOVE_ID);

    let getIndex = stdArr.findIndex((ele) => ele.id === REMOVE_ID);
    cl(getIndex);
    stdArr.splice(getIndex, 1);
    ele.closest("tr").remove();
    localStorage.setItem("stdArr", JSON.stringify(stdArr));
    let td = [...document.querySelectorAll("#stdInfo tr td:first-child")];
    td.forEach((ele, i) => {
      ele.innerText = i + 1;
    });
    Swal.fire({
      title: `This Student is created successfully`,
      icon: "success",
      timer: 3000,
    });
  }
}

//edit
function onEdit(ele) {
  let EDIT_ID = ele.dataset.editid;
  cl(EDIT_ID);
  let EDIT_OBJ = stdArr.find((ele) => ele.id === EDIT_ID);
  cl(EDIT_OBJ);
  fnameControl.value = EDIT_OBJ.fname;
  lnameControl.value = EDIT_OBJ.lname;
  contactControl.value = EDIT_OBJ.contact;
  emailControl.value = EDIT_OBJ.email;
  updateBtn.classList.remove("d-none");
  submitBtn.classList.add("d-none");
  localStorage.setItem("EDIT_ID", EDIT_ID);
}

function onUpdate(eve) {
  let UPDATE_ID = localStorage.getItem("EDIT_ID");
  cl(UPDATE_ID);

  let getIndex = stdArr.findIndex((ele) => ele.id === UPDATE_ID);

  let UPDATE_OBJ = {
    id: UPDATE_ID,
    fname: fnameControl.value,
    lname: lnameControl.value,
    contact: contactControl.value,
    email: emailControl.value,
  };

  stdArr[getIndex] = UPDATE_OBJ;
  localStorage.setItem("stdArr", JSON.stringify(stdArr));
  let tr = document.getElementById(UPDATE_ID).children;

  tr[1].innerText = UPDATE_OBJ.fname;
  tr[2].innerText = UPDATE_OBJ.lname;
  tr[3].innerText = UPDATE_OBJ.contact;
  tr[4].innerText = UPDATE_OBJ.email;
  updateBtn.classList.add("d-none");
  submitBtn.classList.remove("d-none");
  stdForm.reset();
  Swal.fire({
    title: `This Student is updated successfully`,
    icon: "success",
    timer: 3000,
  });
}

//funtion
function onSubmit(eve) {
  eve.preventDefault();

  let NEW_STD = {
    id: crypto.randomUUID(),
    fname: fnameControl.value,
    lname: lnameControl.value,
    contact: contactControl.value,
    email: emailControl.value,
  };
  cl(NEW_STD);
  stdArr.push(NEW_STD);
  localStorage.setItem("stdArr", JSON.stringify(stdArr));
  cl(stdArr);

  create(NEW_STD);
  stdForm.reset();
}

stdForm.addEventListener("submit", onSubmit);
updateBtn.addEventListener("click", onUpdate);
