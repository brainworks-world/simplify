let teamArray = [];
let projectArray = [];
let deliveryArray = [];
var deleteProjectId;

async function getAllSheets() {
  var params = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Team!A2:Z1000",
  };

  var request = await gapi.client.sheets.spreadsheets.values.get(params);
  request = request.result.values;

  for (let i = 0; i < request.length; i++) {
    // if (request[i][2].toLowerCase() == "free" || request[i][2].toLowerCase() == "occupied") {
    teamArray.push([request[i][0], request[i][2]]);
    // }
  }
  teamArray.sort();
}

let idArray = [];
async function addNewTask(
  id,
  Id = "",
  taskName = "",
  dueDate = "",
  teamMember = "",
  fixedPay = "",
  variablePay = "",
  taskStatus = "",
  payStatus = "",
  projectId = "",
) {
  idArray[id - 1]++;

  console.log("ID", id)
  let accordion = document.getElementById("collapse" + id);
  let cardbody = accordion.getElementsByClassName("card-body");

  let outerDiv = document.createElement("div");
  outerDiv.setAttribute("class", "row ml-1 mt-2 Row");
  let string = "";
  string += idArray.length;
  string += idArray[id - 1];
  outerDiv.setAttribute("id", string);

  let taskIdDiv = document.createElement("div");
  taskIdDiv.setAttribute("class", "col-1 taskId ");
  let taskIdNumber = document.createElement("h6");
  taskIdDiv.appendChild(taskIdNumber);

  let taskNameDiv = document.createElement("div");
  taskNameDiv.setAttribute("class", "col-2 fieldClass ");
  let taskNameInput = document.createElement("input");
  taskNameInput.setAttribute("type", "text");
  taskNameInput.setAttribute("class", "form-control taskNameClass");
  taskNameInput.setAttribute("placeholder", "Task Name");
  taskNameInput.setAttribute("style", "display: inline;");
  taskNameDiv.appendChild(taskNameInput);

  let datepickerDiv = document.createElement("div");
  datepickerDiv.setAttribute(
    "class",
    "col input-group date datepicker form-group fieldClass "
  );
  datepickerDiv.setAttribute("data-date-format", "dd-mm-yyyy");
  let datepickerInput = document.createElement("input");
  datepickerInput.setAttribute("type", "text");
  datepickerInput.setAttribute("placeholder", "dd-mm-yyyy");
  datepickerInput.setAttribute("class", "form-control datePickerClass");
  let datepickerSpan = document.createElement("span");
  datepickerSpan.setAttribute("class", "input-group-addon");
  datepickerDiv.appendChild(datepickerInput);
  datepickerDiv.appendChild(datepickerSpan);

  let selectDiv = document.createElement("div");
  selectDiv.setAttribute("class", "col fieldClass ");
  let selectElement = document.createElement("select");
  selectElement.setAttribute("class", "custom-select selectClass");
  selectDiv.appendChild(selectElement);

  let fixedPayDiv = document.createElement("div");
  fixedPayDiv.setAttribute("class", "col fieldClass ");
  let fixedPayInput = document.createElement("input");
  fixedPayInput.setAttribute("type", "text");
  fixedPayInput.setAttribute("class", "form-control fixedPayoutClass");
  fixedPayInput.setAttribute("placeholder", "Fixed Payout");
  fixedPayInput.setAttribute("style", "display: inline;");
  fixedPayDiv.appendChild(fixedPayInput);

  let variablePayDiv = document.createElement("div");
  variablePayDiv.setAttribute("class", "col fieldClass ");
  let variablePayInput = document.createElement("input");
  variablePayInput.setAttribute("type", "text");
  variablePayInput.setAttribute("class", "form-control variablePayoutClass");
  variablePayInput.setAttribute("placeholder", "Variable Payout");
  variablePayInput.setAttribute("style", "display: inline;");
  variablePayDiv.appendChild(variablePayInput);

  let checkBoxDiv = document.createElement("div");
  checkBoxDiv.setAttribute(
    "class",
    "col row align-items-center toggleClass taskStatusDiv  fieldClass"
  );
  let checkBoxLabel = document.createElement("label");
  checkBoxLabel.setAttribute("class", "ml-2 mr-2 switch toggleButton");
  let checkBoxinput = document.createElement("input");
  checkBoxinput.setAttribute("type", "checkbox");
  checkBoxinput.setAttribute("class", "checkboxClass");
  let checkBoxSpan = document.createElement("span");
  checkBoxSpan.setAttribute("class", "slider round");
  checkBoxLabel.appendChild(checkBoxinput);
  checkBoxLabel.appendChild(checkBoxSpan);
  let heading = document.createElement("h6");
  heading.setAttribute("class", "completedText");
  heading.innerHTML = "Completed";
  checkBoxDiv.appendChild(checkBoxLabel);
  checkBoxDiv.appendChild(heading);

  let PayDiv = document.createElement("div");
  PayDiv.setAttribute("class", "col payStatusDiv fieldClass");
  let PayInput = document.createElement("h6");
  PayInput.setAttribute("style", "display: inline;");
  PayInput.setAttribute("class", "payStatus");
  PayDiv.appendChild(PayInput);

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn deleteButton  fieldClass");
  deleteButton.setAttribute("id", "delete" + string);
  deleteButton.setAttribute("onclick", "confirmDelete(id)");
  let deleteLogo = document.createElement("i");
  deleteLogo.setAttribute("class", "bi bi-trash cardIconManageProject");
  deleteButton.appendChild(deleteLogo);

  outerDiv.appendChild(taskIdDiv);
  outerDiv.appendChild(taskNameDiv);
  outerDiv.appendChild(datepickerDiv);
  outerDiv.appendChild(selectDiv);
  outerDiv.appendChild(fixedPayDiv);
  outerDiv.appendChild(variablePayDiv);
  outerDiv.appendChild(checkBoxDiv);
  outerDiv.appendChild(PayDiv);


  cardbody[0].appendChild(outerDiv);

  let arrList = cardbody[0].getElementsByClassName("Row");
  let countTask = arrList.length;

  if (countTask == 1) {
    let taskId = arrList[countTask - 1].getElementsByClassName("taskId");
    let num = taskId[0].getElementsByTagName("h6");
    num[0].innerHTML = "1";
  } else {
    let x = 0;
    for (let i = 0; i < arrList.length - 1; i++) {
      let taskId = arrList[i].getElementsByClassName("taskId");
      let num = taskId[0].getElementsByTagName("h6");
      let temp = num[0].innerHTML;

      if (parseInt(temp) > x) {
        x = parseInt(temp);
      }
    }

    taskId = arrList[countTask - 1].getElementsByClassName("taskId");
    num = taskId[0].getElementsByTagName("h6");
    num[0].innerHTML = parseInt(x) + 1;
  }

  if (Id != "") {
    taskIdNumber.innerHTML = Id;
  }

  // for (let i = 0; i < deliveryArray.length; i++) {
  //   if (deliveryArray[i][0] == projectId) {
  //     deliveryArray[i][3] = projectName;
  //     deliveryArray[i][7] = projectValue;
  //   }
  // }


  let selectOption = cardbody[0].getElementsByTagName("select");
  for (let i = 0; i < teamArray.length; i++) {

    let option1 = document.createElement("option");
    option1.setAttribute("value", teamArray[i][0]);
    option1.innerHTML = teamArray[i][0];

    if (teamMember == teamArray[i][0]) {
      option1.setAttribute("selected", "selected");
    }

    if (teamArray[i][1].toLowerCase() == "unavailable") {

      for (let j = 0; j < deliveryArray.length; j++) {
        if (deliveryArray[j][0] == projectId) {
          // console.log("here",deliveryArray[i][4], teamArray[i][0]);
          if (deliveryArray[j][4] == teamArray[i][0]) {
            selectOption[countTask - 1].appendChild(option1);
            break;
          }
        }
      }

    } else {
      selectOption[countTask - 1].appendChild(option1);
    }

    // if (teamArray[i][1].tolowercase() != "unavailable")
    //   selectOption[countTask - 1].appendChild(option1);
  }

  taskNameInput.setAttribute("value", taskName);
  datepickerInput.setAttribute("value", dueDate);
  fixedPayInput.setAttribute("value", fixedPay);
  variablePayInput.setAttribute("value", variablePay);
  if (taskStatus === "Completed") {
    checkBoxinput.setAttribute("checked", true);
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn deleteButton  fieldClass");
    deleteButton.setAttribute("id", "delete" + string);
    outerDiv.appendChild(deleteButton);
  } else {
    outerDiv.appendChild(deleteButton);
  }
  selectOption[countTask - 1].setAttribute("value", teamMember);

  PayInput.innerText = payStatus;
  $(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    todayHighlight: true,
    showOtherMonths: true,
    selectOtherMonths: true,
    changeMonth: true,
    changeYear: true,
    orientation: "button",
    clearBtn: true,
    todayBtn: "linked",
  });
}

function checkTasks(id) {
  let toggle = document.getElementById(id);

  if (toggle.checked == true) {
    let elem = toggle.parentElement.parentElement.parentElement.parentElement;

    let checkbox = elem.getElementsByClassName("checkboxClass");
    for (let i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked == false) {
        let modal = document.getElementById("myModal1");
        let span1 = modal.getElementsByTagName("span");
        span1 = span1[0];
        console.log(span1);

        span1.setAttribute("id", id + "0");
        modal.style.display = "block";
        break;
      }
    }
  }
}

function makeProject(projectId, clientName, projectName, count, deliveryArray) {
  idArray.push(0);
  let outerDiv = document.getElementById("outerDiv");

  console.log("count", count)

  outerDiv.innerHTML +=
    `<div id="accordion` +
    count +
    `" class="manageProjectContainer">
      <div class="card manageProjectCard">
          <div class="card-header d-flex" id="heading` +
    count +
    `">
              <a class="title col-7">
                  <h5 class="mb-0 projectTitle" data-toggle="collapse" id="` + projectId + `"
                  data-target="#collapse` +
    count +
    `">
                  ` +
    projectId +
    ` : ` +
    clientName +
    ` : ` +
    projectName +
    `  
                  </h5>
              </a>
              <button class="btn manageProjectAddTaskButton mr-3" id="` +
    projectId +
    `" onclick="editProjectConfirm(id)"><i class="fa fa-edit"></i></button>
              <div class="col-2">   
              </div>
              <div class="col-3 manageProjectsToggle d-flex">
                  <h6 class="ml-4 ongoingText">
                      Ongoing
                  </h6>
                  <label class="ml-2 mr-2 switch toggleButton">
                      <input type="checkbox" id="Toggle` +
    count +
    `" class="projectStatus" onclick="checkTasks(id)">
                      <span class="slider round"></span>
                  </label>
                  <h6 class="completedText">
                      Completed
                  </h6>
              </div>
          </div>
  
          <div id="collapse` +
    count +
    `" class="collapse" aria-labelledby="heading` +
    count +
    `" data-parent="#accordion` +
    count +
    `">
              <div class="card-body">
                  <div class="row ml-3">
                      <button class="btn manageProjectAddTaskButton mr-3" id="` +
    count +
    `" onclick="addNewTask(id)">Add New Task</button>
                      <button class="btn manageProjectAddTaskButton" id="` +
    projectId +
    `" onclick="viewFinance(id)">View Finance</button>
                  </div>
                  <div class="row ml-1 mt-4">
                      <div class="col-1 taskId  ">
                          <h6>Task ID</h6>
                      </div>
                      <div class="col-2 taskNameDivClass ">
                          <h6>Task Name</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Due Date</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Team Member</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Fixed Payout</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Variable Payout</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Task Status</h6>
                      </div>
                      <div class="col taskNameDivClass ">
                          <h6>Payout</h6>
                      </div>
                      <div class="deleteButtonClass ">
                          <button class="btn deleteButton" onclick="deleteTask(id)">
                              <i class="bi bi-trash cardIconManageProject"></i>
                          </button>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>`;

  if (projectName == "ProjectBlank") {
    let elem = document.getElementById("accordion" + count);
    addNewTask(count, "", "", "", "", "", "", "", "", projectId);
    elem.style.visibility = "hidden";
  }

  if (deliveryArray != undefined) {
    for (let i = 0; i < deliveryArray.length; i++) {
      if (deliveryArray[i][0] == projectId && projectId != 0) {
        addNewTask(
          count,
          deliveryArray[i][2],
          deliveryArray[i][3],
          deliveryArray[i][5],
          deliveryArray[i][4],
          deliveryArray[i][6],
          deliveryArray[i][7],
          deliveryArray[i][8],
          deliveryArray[i][12],
          projectId
        );
      }
    }
  }
}

async function saveProjectTasks() {
  obj = document.getElementById("manageProjectSaveButton");
  obj.style.backgroundColor = "#f1f1f1";
  obj.style.borderColor = "black";
  obj.style.color = "black";
  obj.innerHTML = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...`;

  var paramsDelivery = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };

  var requestDelivery = await gapi.client.sheets.spreadsheets.values.get(
    paramsDelivery
  );
  requestDelivery = requestDelivery.result.values;

  let outerDiv = document.getElementById("outerDiv");
  let projects = outerDiv.getElementsByClassName("manageProjectContainer");

  for (let i = 0; i < projects.length - 1; i++) {
    let idName = projects[i].getElementsByTagName("h5");
    idName = idName[0].innerText;

    let id = "";
    let name = "";

    let iterator = 0;
    while (idName[iterator] != " ") {
      id += idName[iterator];
      iterator++;
    }
    while (idName[iterator] != ":") {
      iterator++;
    }
    iterator++;
    while (idName[iterator] != ":") {
      iterator++;
    }
    iterator += 2;
    while (iterator < idName.length) {
      name += idName[iterator];
      iterator++;
    }

    let taskData = projects[i].getElementsByClassName("Row");

    for (let j = 0; j < taskData.length; j++) {
      let taskIdNum = taskData[j].getElementsByClassName("taskId");
      let taskNameClass = taskData[j].getElementsByClassName("taskNameClass");
      let datePickerClass =
        taskData[j].getElementsByClassName("datePickerClass");
      let selectClass = taskData[j].getElementsByClassName("selectClass");
      let fixedPayoutClass =
        taskData[j].getElementsByClassName("fixedPayoutClass");
      let variablePayoutClass = taskData[j].getElementsByClassName(
        "variablePayoutClass"
      );
      let checkboxClass = taskData[j].getElementsByClassName("checkboxClass");
      let paidStatus = taskData[j].getElementsByClassName("payStatus");

      for (let k = 0; k < taskIdNum.length; k++) {
        let taskStatusChecker = "";
        let completedTaskBoolean = false;
        let trackerFlag = false;

        if (checkboxClass[k].checked == true) {
          taskStatusChecker = "Completed";
          completedTaskBoolean = true;
          trackerFlag = true;

          if (paidStatus[k].innerText == "") {
            paidStatus[k].innerText = "Due";
          }
        } else {
          taskStatusChecker = "Ongoing";
        }

        if (paidStatus[k].innerText == "Due") {
          trackerFlag = true;
        }

        var flag = false;
        if (requestDelivery != undefined) {
          for (let l = 0; l < requestDelivery.length; l++) {
            let num = l + 2;

            if (
              requestDelivery[l][0] == id &&
              requestDelivery[l][2] == taskIdNum[k].innerText
            ) {
              flag = true;
            }

            if (
              requestDelivery[l][0] == id &&
              requestDelivery[l][2] == taskIdNum[k].innerText &&
              (taskNameClass[k].value != requestDelivery[l][3] ||
                selectClass[k].value != requestDelivery[l][4] ||
                datePickerClass[k].value != requestDelivery[l][5] ||
                fixedPayoutClass[k].value != requestDelivery[l][6] ||
                variablePayoutClass[k].value != requestDelivery[l][7] ||
                taskStatusChecker != requestDelivery[l][8] ||
                paidStatus[k].innerText != requestDelivery[l][12] ||
                (trackerFlag == true && requestDelivery[l][14] == "") ||
                (completedTaskBoolean == true &&
                  requestDelivery[l][16] == undefined))
            ) {
              console.log(id);
              console.log(taskIdNum[k].innerText);
              let temp = [];
              let data = [];

              temp.push(id);
              temp.push(name);
              temp.push(taskIdNum[k].innerText);
              temp.push(taskNameClass[k].value);
              temp.push(selectClass[k].value);
              temp.push(datePickerClass[k].value);
              temp.push(fixedPayoutClass[k].value);
              temp.push(variablePayoutClass[k].value);
              if (checkboxClass[k].checked == true) {
                temp.push("Completed");
              } else {
                temp.push("Ongoing");
              }

              temp.push(requestDelivery[l][9]);
              temp.push(requestDelivery[l][10]);
              temp.push(requestDelivery[l][11]);

              temp.push(paidStatus[k].innerText);

              temp.push(requestDelivery[l][13]);

              if (trackerFlag == true && requestDelivery[l][14] == "") {
                console.log("yet to update");
                temp.push("Yet to update");
              } else {
                temp.push(requestDelivery[l][14]);
              }

              temp.push(requestDelivery[l][15]);
              if (
                completedTaskBoolean == true &&
                requestDelivery[l][16] == undefined
              ) {
                var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth() + 1;
                var yyyy = today.getFullYear();
                if (dd < 10) dd = "0" + dd;

                if (mm < 10) mm = "0" + mm;

                var date = dd + "/" + mm + "/" + yyyy;

                temp.push(date);
              } else {
                temp.push(requestDelivery[l][16]);
              }

              data.push(temp);
              console.log(data);
              let str = "Delivery!A" + num;
              var params = {
                spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
                // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
                range: str,
                valueInputOption: "USER_ENTERED",
              };

              var valueRangeBody = {
                majorDimension: "ROWS",
                values: data,
              };

              var request = await gapi.client.sheets.spreadsheets.values.update(
                params,
                valueRangeBody
              );
            }
          }
        }

        if (flag == false) {
          let temp = [];
          let data = [];

          temp.push(id);
          temp.push(name);
          temp.push(taskIdNum[k].innerText);
          temp.push(taskNameClass[k].value);
          temp.push(selectClass[k].value);
          temp.push(datePickerClass[k].value);
          temp.push(fixedPayoutClass[k].value);
          temp.push(variablePayoutClass[k].value);
          if (checkboxClass[k].checked == true) {
            temp.push("Completed");
            taskStatusChecker = "Completed";
            completedTaskBoolean = true;
            if (paidStatus[k].innerText == "") {
              paidStatus[k].innerText = "Due";
            }
          } else {
            temp.push("Ongoing");
            taskStatusChecker = "Ongoing";
          }
          temp.push("");
          temp.push("");
          temp.push("");
          temp.push("");
          temp.push("");
          temp.push("");

          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth() + 1;
          var yyyy = today.getFullYear();
          if (dd < 10) dd = "0" + dd;

          if (mm < 10) mm = "0" + mm;

          var date = dd + "/" + mm + "/" + yyyy;
          temp.push(date);
          temp.push("");
          data.push(temp);

          console.log("false", data);

          var params = {
            spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
            // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
            range: "Delivery!A2:Z1000",
            valueInputOption: "USER_ENTERED",
          };

          var valueRangeBody = {
            majorDimension: "ROWS",
            values: data,
          };

          var request = await gapi.client.sheets.spreadsheets.values.append(
            params,
            valueRangeBody
          );
        }
      }
    }
  }

  obj.innerHTML = "Saved <b>&#10003;</b>";
  setTimeout(function () {
    obj.style.backgroundColor = "#007bff";
    obj.innerHTML = "Save";
    obj.style.color = "white";
  }, 1000);

  // Project Toggle Button

  var paramsProjects = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2:Z1000",
  };

  var requestProjects = await gapi.client.sheets.spreadsheets.values.get(
    paramsProjects
  );
  requestProjects = requestProjects.result.values;

  for (let i = 0; i < projects.length - 1; i++) {
    let temp = projects[i].getElementsByClassName("projectStatus");

    let idName = projects[i].getElementsByTagName("h5");
    idName = idName[0].innerText;

    let id = "";
    let iterator = 0;
    while (idName[iterator] != " ") {
      id += idName[iterator];
      iterator++;
    }

    let arr = [];
    let projectStatusArray = [];

    if (temp[0].checked == true) {
      arr.push("Completed");
    } else {
      arr.push("Ongoing");
    }
    projectStatusArray.push(arr);

    for (let j = 0; j < requestProjects.length; j++) {
      if (id == requestProjects[j][0] && requestProjects[j][10] != arr[0]) {
        var num = j + 2;
        var str = "Projects!K" + num;

        var params1 = {
          spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
          // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
          range: str,
          valueInputOption: "USER_ENTERED",
        };

        var valueRangeBody1 = {
          majorDimension: "COLUMNS",
          values: projectStatusArray,
        };

        var request1 = await gapi.client.sheets.spreadsheets.values.update(
          params1,
          valueRangeBody1
        );
      }
    }
  }

  //Team member occupancy update function

  var paramsDelivery1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Team!A2:Z1000",
  };

  var requestTeam = await gapi.client.sheets.spreadsheets.values.get(
    paramsDelivery1
  );
  requestTeam = requestTeam.result.values;

  paramsDelivery = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };

  var requestTasks = await gapi.client.sheets.spreadsheets.values.get(
    paramsDelivery
  );
  requestTasks = requestTasks.result.values;

  for (let i = 0; i < requestTeam.length; i++) {
    let taskBoolean = false;
    for (let j = 0; j < requestTasks.length; j++) {
      if (
        requestTeam[i][0] == requestTasks[j][4] &&
        requestTasks[j][8] == "Ongoing" &&
        requestTeam[i][2] != "Occupied"
      ) {
        taskBoolean = true;

        var num = i + 2;
        var str = "Team!C" + num;

        var params1 = {
          spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
          // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
          range: str,
          valueInputOption: "USER_ENTERED",
        };

        var valueRangeBody1 = {
          majorDimension: "COLUMNS",
          values: [["Occupied"]],
        };

        var request1 = await gapi.client.sheets.spreadsheets.values.update(
          params1,
          valueRangeBody1
        );
        break;
      }
    }

    if (taskBoolean == false && requestTeam[i][2] == "Occupied") {
      var num = i + 2;
      var str = "Team!C" + num;

      var params1 = {
        spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
        // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
        range: str,
        valueInputOption: "USER_ENTERED",
      };

      var valueRangeBody1 = {
        majorDimension: "COLUMNS",
        values: [["Free"]],
      };

      var request1 = await gapi.client.sheets.spreadsheets.values.update(
        params1,
        valueRangeBody1
      );
    }
  }

  updateSheet();
  // setTimeout(function () {
  //   location.reload();
  // }, 1000);

}

async function makeApiCallManageProjects() {
  var params = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2:Z1000",
  };

  var request = await gapi.client.sheets.spreadsheets.values.get(params);
  projectArray = request.result.values;

  // console.log(projectArray);

  var params1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };

  var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
  deliveryArray = request1.result.values;

  idArray = [];
  var count = 0;
  for (let i = 0; i < projectArray.length + 1; i++) {
    if (i == projectArray.length) {
      count++;
      makeProject(0, "No Client", "ProjectBlank", count, deliveryArray);
    } else if (projectArray[i][10] == "Ongoing") {
      count++;
      makeProject(
        projectArray[i][0],
        projectArray[i][2],
        projectArray[i][3],
        count,
        deliveryArray
      );
    }
  }
}

async function updateSheet() {
  var params1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };

  var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
  var deliveryArray = request1.result.values;

  console.log(deliveryArray);
  let count2 = deliveryArray.length;

  let count = 0;
  for (let i = 0; i < deliveryArray.length; i++) {
    if (deliveryArray[i] != "") {
      count++;
    }
  }

  let arr = [];
  for (let i = 0; i < deliveryArray.length; i++) {
    if (deliveryArray[i] != "") {
      arr.push(deliveryArray[i]);
    }
  }

  var params1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2",
    valueInputOption: "USER_ENTERED",
  };

  var valueRangeBody1 = {
    majorDimension: "ROWS",
    values: arr,
  };

  var request1 = await gapi.client.sheets.spreadsheets.values.update(
    params1,
    valueRangeBody1
  );

  for (let j = count + 2; j < count + 2 + (count2 - count); j++) {
    let num = j;
    var a = 65;
    var str1 = String.fromCharCode(a);
    let str = "Delivery!";
    str += str1;
    str += num;
    str += ":";
    a += 16;
    str1 = String.fromCharCode(a);
    str += str1;
    str += num;

    console.log("here is the str in the update function", str);

    var params1 = {
      spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
      // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
      range: str,
    };

    var clearValuesRequestBody = {};

    var request = await gapi.client.sheets.spreadsheets.values.clear(
      params1,
      clearValuesRequestBody
    );
  }

  setTimeout(function () {
    location.reload();
  }, 1000);

}

async function viewFinance(id) {
  let headerText = document.getElementById("modal-header-text");
  headerText.innerHTML = "Project Details" + " ";
  let flag = document.getElementById("modalContent");
  flag.innerHTML = "";
  let content = document.createElement("h5");
  content.setAttribute("style", "display: inline");
  content.setAttribute("class", "mt-2");
  content.setAttribute("class", "mb-2");
  content.innerHTML = " ";

  var er = 0;

  var params = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2:Z1000",
  };
  var request = await gapi.client.sheets.spreadsheets.values.get(params);
  var projectArray = request.result.values;

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i][0] == id) {

      let projectName = document.createElement("h5");
      projectName.setAttribute("class", "mt-2");
      projectName.setAttribute("class", "mb-2");
      projectName.innerHTML = "Project Name: " + projectArray[i][3] + "  ";

      let clientName = document.createElement("h5");
      clientName.setAttribute("class", "mt-2");
      clientName.setAttribute("class", "mb-2");
      clientName.innerHTML = "Client Name: " + projectArray[i][2] + "  ";

      let projectValue = document.createElement("h5");
      projectValue.setAttribute("class", "mt-2");
      projectValue.setAttribute("class", "mb-2");
      projectValue.innerHTML = "Project Value: $" + projectArray[i][7] + "  ";

      let feesRate = document.createElement("h5");
      feesRate.setAttribute("class", "mt-2");
      feesRate.setAttribute("class", "mb-2");
      feesRate.innerHTML = "FeesRate: " + projectArray[i][8] + "  ";

      er = projectArray[i][9];

      let expectedRevenue = document.createElement("h5");
      expectedRevenue.setAttribute("class", "mt-2");
      expectedRevenue.setAttribute("class", "mb-2");
      expectedRevenue.innerHTML = "ExpectedRevenue: ???" + projectArray[i][9] + "  ";

      flag.appendChild(projectName);
      flag.appendChild(clientName);
      flag.appendChild(projectValue);
      flag.appendChild(feesRate);
      flag.appendChild(expectedRevenue);
    }
  }

  var totalCost = 0;

  // loop over the deliveryArray
  for (let i = 0; i < deliveryArray.length; i++) {
    if (deliveryArray[i][0] == id) {
      if (deliveryArray[i][12].toLowerCase() == "paid") {
        totalCost += parseInt(deliveryArray[i][11]);
      } else {
        let x = parseInt(deliveryArray[i][6]);

        // deliveryArray[i][7] is of kind 20%. remove the % sign
        let y = parseInt(deliveryArray[i][7].substring(0, deliveryArray[i][7].length - 1));

        // calculate the cost
        let cost = x * y / 100;


        totalCost += x + cost;
      }
    }
  }

  let teamCost = document.createElement("h5");
  teamCost.setAttribute("class", "mt-2");
  teamCost.setAttribute("class", "mb-2");
  teamCost.innerHTML = "Team Cost: ???" + totalCost + "  ";

  let tcs = (totalCost / er) * 100;

  // round the cost to 2 decimal places
  tcs = Math.round(tcs * 100) / 100;

  let teamCostShare = document.createElement("h5");
  teamCostShare.setAttribute("class", "mt-2");
  teamCostShare.setAttribute("class", "mb-2");
  teamCostShare.innerHTML = "Team Cost Share: " + tcs + "%  ";

  flag.appendChild(teamCost);
  flag.appendChild(teamCostShare);

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

var clientName = undefined;
var contractTypeSelect = undefined;

async function editProjectConfirm(projectId) {

  let headerText = document.getElementById("modal-header-text");
  headerText.innerHTML = "update project details" + " ";
  let flag = document.getElementById("modalContent");
  flag.innerHTML = "";

  let params = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2:Z1000",
  };
  var request = await gapi.client.sheets.spreadsheets.values.get(params);
  var projectArray = request.result.values;


  let formDiv = document.createElement("div");
  formDiv.setAttribute("class", "form-group");

  let exchangeRate = document.createElement("label");
  exchangeRate.setAttribute("for", "exchangeRate");
  exchangeRate.setAttribute("class", "mt-4");
  exchangeRate.innerHTML = "Exchange Rate: ";

  let exchangeRateInput = document.createElement("input");
  exchangeRateInput.setAttribute("type", "text");
  exchangeRateInput.setAttribute("class", "form-control");
  exchangeRateInput.setAttribute("id", "exchangeRate");
  exchangeRateInput.setAttribute("placeholder", "Enter Exchange Rate");


  let feesRate = document.createElement("label");
  feesRate.setAttribute("for", "feesRate");
  feesRate.setAttribute("class", "mt-4");
  feesRate.innerHTML = "Fees Rate: ";

  let feesRateCalculator = document.createElement("button");
  feesRateCalculator.setAttribute("class", "btn calculatorButton");
  feesRateCalculator.setAttribute("onclick", "feesRateCalculation()");
  feesRateCalculator.innerHTML = "<i class='bi bi-calculator'></i>";

  let feesRateInput = document.createElement("input");
  feesRateInput.setAttribute("type", "text");
  feesRateInput.setAttribute("class", "form-control");
  feesRateInput.setAttribute("id", "feesRate");
  feesRateInput.setAttribute("placeholder", "Enter Fees Rate");


  let projectValue = document.createElement("label");
  projectValue.setAttribute("for", "projectValue");
  projectValue.setAttribute("class", "mt-4");
  projectValue.innerHTML = "Project Value: ";

  let projectValueInput = document.createElement("input");
  projectValueInput.setAttribute("type", "text");
  projectValueInput.setAttribute("class", "form-control");
  projectValueInput.setAttribute("id", "projectValue");
  projectValueInput.setAttribute("placeholder", "Enter Project Value");

  let expectedRevenue = document.createElement("label");
  expectedRevenue.setAttribute("for", "expectedRevenue");
  expectedRevenue.setAttribute("class", "mt-4");
  expectedRevenue.innerHTML = "Expected Revenue: ";

  let expectedRevenueInput = document.createElement("input");
  expectedRevenueInput.setAttribute("type", "text");
  expectedRevenueInput.setAttribute("class", "form-control");
  expectedRevenueInput.setAttribute("id", "expectedRevenue");
  expectedRevenueInput.setAttribute("placeholder", "Enter Expected Revenue");

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i][0] == parseInt(projectId)) {
      clientName = projectArray[i][2];
      contractTypeSelect = projectArray[i][6];
      projectValueInput.value = projectArray[i][7];
      feesRateInput.value = projectArray[i][8];
      expectedRevenueInput.value = projectArray[i][9];
    }
  }

  formDiv.appendChild(projectValue);
  formDiv.appendChild(projectValueInput);
  formDiv.appendChild(exchangeRate);
  formDiv.appendChild(exchangeRateInput);
  formDiv.appendChild(feesRate);
  formDiv.appendChild(feesRateCalculator);
  formDiv.appendChild(feesRateInput);
  formDiv.appendChild(expectedRevenue);
  formDiv.appendChild(expectedRevenueInput);

  flag.appendChild(formDiv);

  let updateButton = document.createElement("button");
  updateButton.setAttribute("class", "btn btn-primary mt-2 mb-4");

  updateButton.setAttribute("onclick", "editProject(" + projectId + ")");
  updateButton.setAttribute("style", "display: inline; background-color:#921c30;");
  updateButton.innerHTML = "update";

  flag.appendChild(updateButton);

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

async function editProject(projectId) {


  let projectValue = document.getElementById("projectValue").value;
  let feesRate = document.getElementById("feesRate").value;
  let expectedRevenue = document.getElementById("expectedRevenue").value;

  let params = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2:Z1000",
  };
  var request = await gapi.client.sheets.spreadsheets.values.get(params);
  var projectArray = request.result.values;

  for (let i = 0; i < projectArray.length; i++) {
    if (projectArray[i][0] == projectId) {
      projectArray[i][7] = projectValue;
      projectArray[i][8] = feesRate;
      projectArray[i][9] = expectedRevenue;
    }
  }

  var params1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Projects!A2",
    valueInputOption: "USER_ENTERED",
  };

  var valueRangeBody = {
    "majorDimension": "ROWS",
    "values": projectArray,
  };

  var request1 = await gapi.client.sheets.spreadsheets.values.update(
    params1,
    valueRangeBody,
  );

  var modal = document.getElementById("myModal");
  modal.style.display = "none";

}

async function feesRateCalculation() {
  let feeRate = 0.0;
  var params1 = {
    spreadsheetId: '139zjaiJ1Fm6BG3XX3Pego_fB8n1cwF8aCKIJFY57g0w',
    range: 'Fees Rate!A4:Z1000',
  };
  var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
  var regularContractFeesRate = request1.result.values;

  var params2 = {
    spreadsheetId: '139zjaiJ1Fm6BG3XX3Pego_fB8n1cwF8aCKIJFY57g0w',
    range: 'Fees Rate!E3',
  };
  var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);
  var directContractFeesRate = request2.result.values;

  // var clientName = document.getElementById("clientName").value;
  var projectValue = document.getElementById("projectValue").value;
  if (projectValue === "")
    projectValue = "0";
  // var contractTypeSelect = document.getElementById("contractTypeSelect").value;

  var totalProjectValue = 0;
  var params3 = {
    spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
    range: 'Projects!A2:Z1000',
  };

  var request3 = await gapi.client.sheets.spreadsheets.values.get(params3);
  var projectArray = [];
  if (request3.result.values != undefined)
    projectArray = request3.result.values;

  for (var i = 0; i < projectArray.length; i++) {
    if (projectArray[i][2] == clientName) {
      totalProjectValue += parseInt(projectArray[i][7]);
    }
  }
  totalProjectValue = totalProjectValue - projectValue;
  var totalProjectValueBofore = 0;
  totalProjectValueBofore += totalProjectValue;
  totalProjectValue += parseInt(projectValue);
  var totalProjectSum = 0.0;
  var first = 0;
  var last = 0;
  if (contractTypeSelect === "Regular Contract") {
    var i = 0;
    while (totalProjectValueBofore >= parseInt(regularContractFeesRate[i][1])) {
      i++;
    }
    first = i;
    regularContractFeesRate[i][0] = totalProjectValueBofore;

    while (totalProjectValue > regularContractFeesRate[i][1]) {
      i++;
    }
    regularContractFeesRate[i][1] = totalProjectValue;
    last = i;

    while (first <= last) {
      totalProjectSum += (parseInt(regularContractFeesRate[first][1]) - parseInt(regularContractFeesRate[first][0])) * parseInt(regularContractFeesRate[first][2]) / 100.0;
      first++;
    }
    console.log(totalProjectSum);

    var val = (totalProjectSum / (projectValue)) * 100.0;
    feeRate += val;
    document.getElementById("feesRate").value = val.toFixed(1) + "%";
  } else if (contractTypeSelect === "Direct Contract") {
    document.getElementById("feesRate").value = (directContractFeesRate[0][0]);
    feeRate = parseFloat(directContractFeesRate[0][0]);
  }

  let projValue = document.getElementById("projectValue").value;
  projValue = parseInt(projValue);
  let exchangeRate = document.getElementById("exchangeRate").value;
  exchangeRate = parseFloat(exchangeRate);

  let num = 0.0;
  num += (projValue * (100.0 - feeRate) * exchangeRate) / 100.0;
  console.log(num);

  document.getElementById("expectedRevenue").value = num;
}

async function deleteTask(id) {

  let divElement = id.parentElement;

  let taskId = divElement.getElementsByTagName("h6");
  let taskName = divElement.getElementsByClassName("taskNameClass");

  taskId = taskId[0].innerText;
  taskName = taskName[0].value;
  var params1 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };

  var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
  let deliveryArray = request1.result.values;

  for (let i = 0; i < deliveryArray.length; i++) {
    if (
      deliveryArray[i] !== "" &&
      deliveryArray[i][2] == taskId &&
      deliveryArray[i][3] == taskName
    ) {
      let num = i + 2;
      var a = 65;
      var str1 = String.fromCharCode(a);
      let str = "Delivery!";
      str += str1;
      str += num;
      str += ":";
      a += 16;
      var str1 = String.fromCharCode(a);
      str += str1;
      str += num;

      console.log("here is the string in the update functions: ", str);

      var params1 = {
        spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
        // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
        range: str,
      };

      var clearValuesRequestBody = {};

      var request = await gapi.client.sheets.spreadsheets.values.clear(
        params1,
        clearValuesRequestBody
      );

    }
  }

  var params2 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
  };




  var request3 = await gapi.client.sheets.spreadsheets.values.get(params2);

  console.log("request3: ", request3);

  let dArray = request3.result.values;

  crnt = 1;
  for (let i = 0; i < dArray.length; i++) {
    // console.log(dArray[i], deleteProjectId)
    if (dArray[i][0] == deleteProjectId) {
      console.log("here in d", dArray[i]);
      dArray[i][2] = crnt;
      crnt += 1;
    }
  }

  console.log("dArray", dArray);

  var params2 = {
    spreadsheetId: "1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA",
    // spreadsheetId: '12qJIZIOTvOc8KMaxu90_VHbcwDqqpDAMP-Ec8aOnGIE',
    range: "Delivery!A2:Z1000",
    valueInputOption: "USER_ENTERED",
  }

  var valueRangeBody = {
    "majorDimension": "ROWS",
    "values": dArray,
  };

  var request2 = await gapi.client.sheets.spreadsheets.values.update(params2, valueRangeBody);

  updateSheet();

  var modal = document.getElementById("myModal");
  modal.style.display = "none";


}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

var modal1 = document.getElementById("myModal1");
var span1 = document.getElementsByClassName("close")[1];

// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal1) {
//         modal1.style.display = "none";
//     }
// }

function closeModal() {
  var modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function closeModal1(id) {
  let id1 = id.slice(0, -1);
  let toggle = document.getElementById(id1);
  toggle.checked = false;
  modal1.style.display = "none";
}

function confirmDelete(id) {

  let headerText = document.getElementById("modal-header-text");
  headerText.innerHTML = "Confirmation" + " ";
  let elem = document.getElementById(id);
  let divElement = elem.parentElement;

  let taskName = divElement.getElementsByTagName("input");
  taskName = taskName[0].value;

  let projectElem = divElement.parentElement.parentElement.parentElement;

  projectElem = projectElem.getElementsByClassName("title");

  projectElem = projectElem[0].getElementsByTagName("h5");

  projectElem = projectElem[0].innerText;

  let flag = document.getElementById("modalContent");
  flag.innerHTML = "";
  let content = document.createElement("h5");
  content.setAttribute("style", "display: inline");
  content.setAttribute("class", "mt-2");
  content.setAttribute("class", "mb-2");
  content.innerHTML =
    "Are you sure you want to delete '" +
    taskName +
    "' from '" +
    projectElem +
    "' ?";

  // extract the project id from projectElem
  let projectId = parseInt(projectElem.split(":")[0]);
  deleteProjectId = projectId;

  let deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "btn btn-primary ml-5 mt-2 mb-2");
  deleteButton.setAttribute("onclick", "deleteTask(" + id + ")");
  deleteButton.setAttribute("style", "display: inline");
  deleteButton.innerHTML = "Yes";

  let cancelButton = document.createElement("button");
  cancelButton.setAttribute("class", "btn btn-primary ml-2 mt-2 mb-2");
  cancelButton.setAttribute("onclick", "closeModal()");
  cancelButton.setAttribute("style", "display: inline");
  cancelButton.innerHTML = "Cancel";

  flag.appendChild(content);
  flag.appendChild(deleteButton);
  flag.appendChild(cancelButton);

  var modal = document.getElementById("myModal");
  modal.style.display = "block";
}

//Authentication functions used for this app

$(document).ready(function () {
  $(".signoutButton").click(function () {
    location.reload();
  });
});

function initClient() {
  var API_KEY = "AIzaSyA5iKpQ3DJ66zFJGsQCaNV8lF7dv0alyAw";
  var CLIENT_ID =
    "1080657069033-jcl8n4ojl14fvofuq9qh1esfog3g0piq.apps.googleusercontent.com";
  var SCOPE = "https://www.googleapis.com/auth/spreadsheets";

  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      scope: SCOPE,
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(function () {
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
      updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
  gapi.load("client:auth2", initClient);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    let signInButton = document.getElementById("manageProjectsSignIn");

    signInButton.style.backgroundColor = "#f1f1f1";
    signInButton.style.borderColor = "black";
    signInButton.style.borderWidth = "2px";
    signInButton.style.color = "black";
    signInButton.innerHTML = "<b>Signed In</b>";

    makeApiCallManageProjects();
    getAllSheets();
  }
}

function handleSignInClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}
