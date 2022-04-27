async function totalPayCalculation(id) {

    let str = "";
    let s = "";
    str += id;

    if (str[0] == 't') {
        let i = 0;
        while (i < str.length && str[i] != 'y') {
            i++;
        }

        i++;
        while (i < str.length) {
            s += str[i];
            i++;
        }
        id = s;
    }

    let fixedPay = document.getElementById("fixedPayActual" + id);

    let feedbackContentS = document.getElementById("feedbackS" + id).value;
    let feedbackContentQ = document.getElementById("feedbackQ" + id).value;
    let feedbackContentC = document.getElementById("feedbackC" + id).value;
    let feedbackContentO = document.getElementById("feedbackO" + id).value;
    let feedbackContentD = document.getElementById("feedbackD" + id).value;

    if (feedbackContentS == "" || feedbackContentQ == "" || feedbackContentC == "" || feedbackContentO == "" || feedbackContentD == "") {

        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var modalContent = document.getElementById("modalContent");
        modalContent.innerText = "Please fill all the feedbacks";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }
        return;

    }

    let variablePay = document.getElementById("variablePayActual" + id);

    let totalPay = document.getElementById("totalPayContent" + id);

    let variablePayMax = document.getElementById("variablePayMax" + id);
    variablePayMax = variablePayMax.innerText;

    // remove the % sign
    variablePayMax = variablePayMax.slice(0, -1);

    // get average of all the feedback content
    let average = (parseFloat(feedbackContentS) + parseFloat(feedbackContentQ) + parseFloat(feedbackContentC) + parseFloat(feedbackContentO) + parseFloat(feedbackContentD)) / 5.0;
    let variablePayValue = average * parseFloat(variablePayMax) / 5;

    console.log("average: ", average);

    variablePay.value = variablePayValue.toFixed(2) + "%";

    // let variablePayStr = variablePay.value;
    // if (variablePayStr[variablePayStr.length - 1] == "%")
    //     variablePayStr.slice(0, -1);

    if (fixedPay.value == "") {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        var modalContent = document.getElementById("modalContent");
        modalContent.innerText = "Please fill the fixed pay";
        var span = document.getElementsByClassName("close")[0];
        span.onclick = function () {
            modal.style.display = "none";
        }
        return;
    }

    let total = 0.0;
    total = parseInt(fixedPay.value) + (0.01) * parseInt(fixedPay.value) * parseFloat(variablePayValue.toFixed(2));
    totalPay.innerText = total;

    let totalPayoutsDiv = document.getElementsByClassName("totalPay");

    // var params1 = {
    //     spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA', 
    //     range: 'Delivery!A2:Z1000',
    // };

    // var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    // let deliveryArray = request1.result.values;

    // let x = 0.0;
    // for(let i=0; i<deliveryArray.length; i++) {
    //     if(deliveryArray[i][12] == "Due") {
    //         if(deliveryArray[i][11] != "") {
    //             x += parseFloat(deliveryArray[i][11]);
    //         } else if(deliveryArray[i][10] != "" && deliveryArray[i][9] != "") {
    //             x += parseFloat(deliveryArray[i][9]) + parseFloat(deliveryArray[i][9])*parseFloat(deliveryArray[i][10])/100.0;
    //         } 
    //     }
    // }

    let x = 0.0;
    let toggle = document.getElementsByClassName("toggleClass");
    for (let i = 0; i < toggle.length; i++) {
        if (toggle[i].checked == false) {
            let t = toggle[i].parentElement.parentElement.parentElement.parentElement;
            let pay = t.getElementsByClassName("totalPay");

            for (let j = 0; j < pay.length; j++) {
                if (pay[j].innerText != "Total Payout") {
                    if (pay[j].innerText == '0') {
                        let e = pay[j].parentElement.parentElement;
                        let fixed = e.getElementsByTagName("input");

                        if (fixed[0].value != "" && fixed[1].value != "")
                            x += parseFloat(fixed[0].value) * (100 + parseFloat(fixed[1].value)) / 100.0;
                    } else {
                        x += parseFloat(pay[j].innerText);
                    }
                }
            }
        }
    }

    let payoutsDueNum = document.getElementById("payoutsDueNum");
    payoutsDueNum.innerText = x;

    let totalMadeNum = document.getElementById("payoutsMadeNum");

    let totalpayNum = document.getElementById("totalpayNum");
    totalpayNum.innerText = parseFloat(totalMadeNum.innerText) + parseFloat(payoutsDueNum.innerText);

    let elem = totalPay.parentElement.parentElement.parentElement.parentElement;
    let totalDue = totalPay.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;

    totalPayoutsDiv = elem.getElementsByClassName("totalPay");

    x = 0.0;
    for (let i = 0; i < totalPayoutsDiv.length; i++) {
        let num = totalPayoutsDiv[i].getElementsByTagName("h6");
        if (num[0].innerText != "Total Payout" && num[0].innerText != "") {
            x += parseInt(num[0].innerText);
        }
    }

    totalDue = totalDue.getElementsByTagName("h6");
    totalDue = totalDue[0];

    totalDue.innerText = "Total Due: Rs " + x;
}

async function updateTracker(id) {
    let updateButton = document.getElementById(id);

    updateButton.style.backgroundColor = "#f1f1f1";
    updateButton.style.borderColor = "black";
    updateButton.style.color = "black";
    updateButton.innerHTML = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Updating...`;

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;

    if (mm < 10)
        mm = '0' + mm;

    var date = dd + '/' + mm + '/' + yyyy;

    let teamMemberName = updateButton.parentElement.parentElement;
    teamMemberName = teamMemberName.getElementsByTagName("h5");
    teamMemberName = teamMemberName[0].innerText;

    var params = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    request = request.result.values;

    let link = "";

    for (let i = 0; i < request.length; i++) {
        if (request[i][0] == teamMemberName) {
            link = request[i][14];
        }
    }

    let spreadsheetIdExtracted = "";
    let iterator = 0;
    while (link[iterator] != "d" || link[iterator + 1] != "/") {
        iterator++;
    }
    iterator += 2;

    while (iterator < link.length && link[iterator] != "/") {
        spreadsheetIdExtracted += link[iterator];
        iterator++;
    }

    let updateArray = [];

    let card = updateButton.parentElement.parentElement.parentElement;
    let project = card.getElementsByClassName("project");

    for (let i = 0; i < project.length; i++) {
        let projectIdName = project[i].getElementsByTagName("h6");
        projectIdName = projectIdName[0].innerText;

        let id = "";
        let name = "";

        let iterator = 0;
        while (projectIdName[iterator] != " ") {
            id += projectIdName[iterator];
            iterator++;
        }
        iterator += 4;
        while (iterator < projectIdName.length) {
            name += projectIdName[iterator];
            iterator++;
        }

        let tasks = project[i].getElementsByClassName("Row");
        for (let j = 0; j < tasks.length; j++) {
            let task = tasks[j].getElementsByTagName("h6");
            let arr = [];
            arr.push(id);
            arr.push(name);
            // arr.push(task[0].innerText);
            arr.push(task[1].innerText);
            arr.push(task[2].innerText);
            arr.push(task[3].innerText);
            arr.push(date);

            let task1 = tasks[j].getElementsByTagName("input");

            // console.log("task1: ", task1)



            arr.push(task1[0].value);
            arr.push(task1[1].value);

            arr.push(task[4].innerText);

            arr.push("")

            arr.push(task1[2].value);
            arr.push(task1[3].value);
            arr.push(task1[4].value);
            arr.push(task1[5].value);
            arr.push(task1[6].value);

            updateArray.push(arr);
        }
    }

    var params = {
        spreadsheetId: spreadsheetIdExtracted,
        range: 'Sheet1!A2:Z1000',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": updateArray
    };

    var request = await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);

    var params1 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Payouts!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let payoutsArray = request1.result.values;

    let totalPayoutMade = updateButton.parentElement.parentElement;
    totalPayoutMade = totalPayoutMade.getElementsByTagName("h6");
    totalPayoutMade = totalPayoutMade[0].innerText;

    iterator = 0;
    while (totalPayoutMade[iterator] != "s") {
        iterator++;
    }
    iterator += 2;
    let num = "";
    while (iterator < totalPayoutMade.length) {
        num += totalPayoutMade[iterator];
        iterator++;
    }

    let tempRange = 0;
    for (let k = 0; k < payoutsArray.length; k++) {
        console.log(num);
        if (payoutsArray[k][1] == teamMemberName) {
            let arr = [["Updated"]];

            tempRange = k + 2;
            let str = "Payouts!D" + tempRange;

            var params2 = {
                spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
                range: str,
                valueInputOption: "USER_ENTERED",
            };

            var valueRangeBody2 = {
                "majorDimension": "ROWS",
                "values": arr,
            };

            var request = await gapi.client.sheets.spreadsheets.values.update(params2, valueRangeBody2);
        }
    }



    var params1 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Delivery!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let deliveryArray = request1.result.values;

    let array = [];
    for (let k = 0; k < project.length; k++) {

        let projectIdandTitle = project[k].getElementsByClassName("projectIdandTitle");
        projectIdandTitle = projectIdandTitle[0].innerHTML;

        let id = "";
        let name = "";

        let iterator = 0;
        while (projectIdandTitle[iterator] != " ") {
            id += projectIdandTitle[iterator];
            iterator++;
        }
        iterator += 4;
        while (iterator < projectIdandTitle.length) {
            name += projectIdandTitle[iterator];
            iterator++;
        }

        let task = project[k].getElementsByClassName("Row");

        for (let j = 0; j < task.length; j++) {
            let temp = [];
            temp.push(id);

            let a = task[j].getElementsByClassName("taskId");
            a = a[0].getElementsByTagName("h6");
            a = a[0].innerText;
            temp.push(a);
            temp.push("Updated");

            let task1 = task[j].getElementsByTagName("input");
            temp.push(task1[2].value);
            temp.push(task1[3].value);
            temp.push(task1[4].value);
            temp.push(task1[5].value);
            temp.push(task1[6].value);

            array.push(temp);
        }
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < deliveryArray.length; j++) {
            if (deliveryArray[j][0] == array[i][0] && deliveryArray[j][2] == array[i][1]) {

                let ArrayOne = [];
                let ArrayTwo = [];
                ArrayOne.push(array[i][2]);

                ArrayOne.push(deliveryArray[j][15]);
                ArrayOne.push(deliveryArray[j][16]);

                // ArrayOne.push(array[i][3]);
                // ArrayOne.push(array[i][4]);
                // ArrayOne.push(array[i][5]);
                // ArrayOne.push(array[i][6]);
                // ArrayOne.push(array[i][7]);

                ArrayTwo.push(ArrayOne);

                let rangeStr = "Delivery!O";
                let num = j + 2;
                rangeStr += num;

                console.log("rangeStr: " + rangeStr);

                var params = {
                    spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
                    range: rangeStr,
                    valueInputOption: "USER_ENTERED",
                };

                var valueRangeBody = {
                    "majorDimension": "ROWS",
                    "values": ArrayTwo,
                };

                var request = await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
            }
        }
    }

    updateButton.removeAttribute("onclick", "updateTracker(id)");
    updateButton.style.backgroundColor = "#f1f1f1";
    updateButton.style.borderColor = "black";
    updateButton.style.color = "bla     ck";
    updateButton.style.cursor = "default";
    updateButton.style.boxShadow = "none";
    updateButton.innerHTML = "Updated";
}

function createPayouts(arr, projectsArray, deliveryArray, count) {
    let outerDiv = document.getElementById("accordion");

    let card = document.createElement("div");
    card.setAttribute("class", "card payoutsCard");
    card.setAttribute("id", "card" + count);

    let cardHead = document.createElement("div");
    cardHead.setAttribute("class", "card-header d-flex");
    cardHead.setAttribute("id", "heading" + count);

    let title = document.createElement("a");
    title.setAttribute("class", "title col-2");
    title.setAttribute("data-toggle", "collapse");
    title.setAttribute("data-target", "#collapse" + count);
    let titleContent = document.createElement("h5");
    titleContent.setAttribute("class", "mb-0");
    titleContent.setAttribute("id", "title" + count);
    titleContent.innerText = arr[0];
    title.appendChild(titleContent);

    let totalDueDiv = document.createElement("div");
    totalDueDiv.setAttribute("class", "col-3 d-flex align-items-center pointerClass");
    totalDueDiv.setAttribute("data-toggle", "collapse");
    totalDueDiv.setAttribute("data-target", "#collapse" + count);
    let totalDueContent = document.createElement("h6");
    totalDueContent.setAttribute("class", "d-flex align-items-center");
    totalDueContent.setAttribute("id", "totalDue" + count);
    totalDueContent.innerHTML += "Total Due : Rs. 0";
    totalDueDiv.appendChild(totalDueContent);

    let saveDiv = document.createElement("div");
    saveDiv.setAttribute("class", "col-2");
    let saveButton = document.createElement("button");
    saveButton.setAttribute("class", "btn btn-primary savePayoutsButton");
    saveButton.setAttribute("id", "saveButton" + count);
    saveButton.setAttribute("onclick", "savePayouts(id," + count + ")");
    saveButton.innerHTML = "Save";
    saveDiv.appendChild(saveButton);

    let paidStatusDiv = document.createElement("div");
    paidStatusDiv.setAttribute("class", "col-2 manageProjectsToggle d-flex");
    let paidLabel = document.createElement("label");
    paidLabel.setAttribute("class", "ml-2 mr-2 switch toggleButton");
    let paidInput = document.createElement("input");
    paidInput.setAttribute("type", "checkbox");
    paidInput.setAttribute("id", "Toggle" + count);
    paidInput.setAttribute("onclick", "updatePayoutsSheet(id)");
    paidInput.setAttribute("class", "toggleClass");
    let paidSpan = document.createElement("span");
    paidSpan.setAttribute("class", "slider round");
    paidLabel.appendChild(paidInput);
    paidLabel.appendChild(paidSpan);
    let paidStatus = document.createElement("h6");
    paidStatus.setAttribute("class", "completedText");
    paidStatus.innerText = "Paid";
    let paidStatus1 = document.createElement("h6");
    paidStatus1.setAttribute("class", "completedText");
    paidStatus1.innerText = "Payouts: Due";
    paidStatusDiv.appendChild(paidStatus1);
    paidStatusDiv.appendChild(paidLabel);
    paidStatusDiv.appendChild(paidStatus);

    let trackerDiv = document.createElement("div");
    trackerDiv.setAttribute("class", "col-3");
    let trackerContent = document.createElement("button");
    trackerContent.setAttribute("class", "btn trackerButton");
    trackerContent.setAttribute("id", "trackerButton" + count);
    trackerContent.setAttribute("style", "cursor: default; border: 1px solid black;")
    trackerContent.innerHTML += "Update Tracker";
    trackerDiv.appendChild(trackerContent);

    let totalPayoutsBoolean = false;

    for (let i = 0; i < deliveryArray.length; i++) {
        if (deliveryArray[i][4] == arr[0] && deliveryArray[i][12] == "Paid" && (deliveryArray[i][14] == "Yet to update")) {
            paidInput.checked = true;
            totalPayoutsBoolean = true;
            trackerContent.setAttribute("onclick", "updateTracker(id)");
            trackerContent.setAttribute("class", "btn btn-primary trackerButton");
            trackerContent.setAttribute("style", "cursor: pointer");
            paidInput.removeAttribute("onclick", "updatePayoutsSheet(id)");
            paidInput.setAttribute("disabled", true);
            paidInput.setAttribute("style", "cursor: context-menu !important;");
            break;
        }
    }

    cardHead.appendChild(title);
    cardHead.appendChild(totalDueDiv);
    cardHead.appendChild(saveDiv);
    cardHead.appendChild(paidStatusDiv);
    cardHead.appendChild(trackerDiv);

    let cardbodyDiv = document.createElement("div");
    cardbodyDiv.setAttribute("id", "collapse" + count);
    cardbodyDiv.setAttribute("class", "collapse");
    cardbodyDiv.setAttribute("aria-labelledby", "heading" + count);
    cardbodyDiv.setAttribute("data-parent", "#accordion");

    let cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardbodyDiv.appendChild(cardBody);

    card.appendChild(cardHead);
    card.appendChild(cardbodyDiv);
    outerDiv.appendChild(card);

    let projectCount = 0;
    for (let i = 0; i < projectsArray.length; i++) {

        var addTaskArray = [];
        for (let j = 0; j < deliveryArray.length; j++) {

            if (deliveryArray[j][4] == arr[0] && deliveryArray[j][0] == projectsArray[i][0] && deliveryArray[j][8] == "Completed" && (deliveryArray[j][14] != "Updated")) {

                let dummyArray = [];
                dummyArray.push(deliveryArray[j][2]);
                dummyArray.push(deliveryArray[j][3]);
                dummyArray.push(deliveryArray[j][6]);
                dummyArray.push(deliveryArray[j][7]);
                dummyArray.push(deliveryArray[j][9]);
                dummyArray.push(deliveryArray[j][10]);
                dummyArray.push(deliveryArray[j][11]);
                dummyArray.push(deliveryArray[j][13]);

                dummyArray.push(deliveryArray[j][14]);
                dummyArray.push(deliveryArray[j][15]);
                dummyArray.push(deliveryArray[j][16]);
                dummyArray.push(deliveryArray[j][17]);
                dummyArray.push(deliveryArray[j][18]);
                dummyArray.push(deliveryArray[j][19]);
                dummyArray.push(deliveryArray[j][20]);
                dummyArray.push(deliveryArray[j][21]);
                dummyArray.push(deliveryArray[j][22]);

                addTaskArray.push(dummyArray);
            }
        }

        console.log("addTaskArray", addTaskArray);

        if (addTaskArray != "") {
            projectCount++;

            let outerDiv1 = document.createElement("div");
            outerDiv1.setAttribute("class", "project");

            let projectDiv = document.createElement("div");
            projectDiv.setAttribute("class", "row align-items-center");
            let projectTitleDiv = document.createElement("div");
            projectTitleDiv.setAttribute("class", "col-12");
            let projectTitle = document.createElement("h6");
            projectTitle.setAttribute("class", "mt-2 projectIdandTitle");
            projectTitle.style.backgroundColor = "#f1f1f1";
            projectTitle.innerHTML += projectsArray[i][0];
            projectTitle.innerHTML += " :: ";
            projectTitle.innerHTML += projectsArray[i][3];
            projectTitleDiv.appendChild(projectTitle);
            projectDiv.appendChild(projectTitleDiv);

            let headingsDiv = document.createElement("div");
            headingsDiv.setAttribute("class", "row align-items-center mt-1");

            let taskIdDiv = document.createElement("div");
            taskIdDiv.setAttribute("class", "taskId");
            let taskIdContent = document.createElement("h6");
            taskIdContent.innerHTML += "Task ID";
            taskIdDiv.appendChild(taskIdContent);

            let completedTaskDiv = document.createElement("div");
            completedTaskDiv.setAttribute("class", "completedTask");
            let completedTaskContent = document.createElement("h6");
            completedTaskContent.innerHTML += "Completed Task";
            completedTaskDiv.appendChild(completedTaskContent);

            let fixedPayMaxDiv = document.createElement("div");
            fixedPayMaxDiv.setAttribute("class", "fixedPayMax");
            let fixedPayMaxContent = document.createElement("h6");
            fixedPayMaxContent.innerHTML += "Fixed Pay (Max)";
            fixedPayMaxDiv.appendChild(fixedPayMaxContent);

            let variablePayMaxDiv = document.createElement("div");
            variablePayMaxDiv.setAttribute("class", "variablePayMax");
            let variablePayMaxContent = document.createElement("h6");
            variablePayMaxContent.innerHTML += "Variable Pay (Max)";
            variablePayMaxDiv.appendChild(variablePayMaxContent);

            let fixedPayDiv = document.createElement("div");
            fixedPayDiv.setAttribute("class", "fixedPayActual");
            let fixedPayContent = document.createElement("h6");
            fixedPayContent.innerHTML += "Fixed Pay (Actual)";
            fixedPayDiv.appendChild(fixedPayContent);

            let variablePayDiv = document.createElement("div");
            variablePayDiv.setAttribute("class", "variablePayActual");
            let variablePayContent = document.createElement("h6");
            variablePayContent.innerHTML += "Variable Pay (Actual)";
            variablePayDiv.appendChild(variablePayContent);

            let totalPayDiv = document.createElement("div");
            totalPayDiv.setAttribute("class", "totalPay");
            let totalPayContent = document.createElement("h6");
            totalPayContent.innerHTML += "Total Payout";
            totalPayDiv.appendChild(totalPayContent);

            let feedbackDiv = document.createElement("div");
            feedbackDiv.setAttribute("class", "feedback");

            let feedbackContent = document.createElement("h6");
            feedbackContent.innerHTML += "Feedback";
            feedbackDiv.appendChild(feedbackContent);

            headingsDiv.appendChild(taskIdDiv);
            headingsDiv.appendChild(completedTaskDiv);
            headingsDiv.appendChild(fixedPayMaxDiv);
            headingsDiv.appendChild(variablePayMaxDiv);
            headingsDiv.appendChild(fixedPayDiv);
            headingsDiv.appendChild(variablePayDiv);
            headingsDiv.appendChild(totalPayDiv);
            headingsDiv.appendChild(feedbackDiv);

            outerDiv1.appendChild(projectDiv);
            outerDiv1.appendChild(headingsDiv);

            cardBody.appendChild(outerDiv1);

            let taskCount = 0;

            for (let j = 0; j < addTaskArray.length; j++) {
                taskCount++;

                // console.log("addTaskArray[j]", addTaskArray[j]);

                let taskDiv = document.createElement("div");
                taskDiv.setAttribute("class", "row align-items-center mt-1 Row");
                let projectsCount = "";
                let tasksCount = "";

                if (projectCount < 10) {
                    projectsCount += "0" + projectCount;
                }
                if (taskCount < 10) {
                    tasksCount += "0" + taskCount;
                }
                taskDiv.setAttribute("id", "task" + count + projectsCount + tasksCount);

                let taskIdDiv = document.createElement("div");
                taskIdDiv.setAttribute("class", "taskId");
                let taskIdContent = document.createElement("h6");
                taskIdContent.setAttribute("id", "taskId" + count + projectsCount + tasksCount);
                taskIdContent.innerHTML += addTaskArray[j][0];
                taskIdDiv.appendChild(taskIdContent);

                let completedTaskDiv = document.createElement("div");
                completedTaskDiv.setAttribute("class", "completedTask");
                let completedTaskContent = document.createElement("h6");
                completedTaskContent.setAttribute("id", "taskName" + count + projectsCount + tasksCount);
                completedTaskContent.innerHTML += addTaskArray[j][1];
                completedTaskDiv.appendChild(completedTaskContent);

                let fixedPayMaxDiv = document.createElement("div");
                fixedPayMaxDiv.setAttribute("class", "fixedPayMax");
                let fixedPayMaxContent = document.createElement("h6");
                fixedPayMaxContent.setAttribute("id", "fixedPayMax" + count + projectsCount + tasksCount);
                fixedPayMaxContent.innerHTML += addTaskArray[j][2];
                fixedPayMaxDiv.appendChild(fixedPayMaxContent);

                let variablePayMaxDiv = document.createElement("div");
                variablePayMaxDiv.setAttribute("class", "variablePayMax");
                let variablePayMaxContent = document.createElement("h6");
                variablePayMaxContent.setAttribute("id", "variablePayMax" + count + projectsCount + tasksCount);
                variablePayMaxContent.innerHTML += addTaskArray[j][3];
                variablePayMaxDiv.appendChild(variablePayMaxContent);

                let fixedPayDiv = document.createElement("div");
                fixedPayDiv.setAttribute("class", "fixedPayActual");
                let fixedPayContent = document.createElement("input");
                fixedPayContent.setAttribute("type", "text");
                fixedPayContent.setAttribute("class", "form-control");
                fixedPayContent.setAttribute("placeholder", "Fixed Payout");
                fixedPayContent.setAttribute("id", "fixedPayActual" + count + projectsCount + tasksCount);
                fixedPayContent.value = addTaskArray[j][4];
                fixedPayDiv.appendChild(fixedPayContent);

                let variablePayDiv = document.createElement("div");
                variablePayDiv.setAttribute("class", "variablePayActual");
                let variablePayContent = document.createElement("input");
                variablePayContent.setAttribute("type", "text");
                variablePayContent.setAttribute("class", "form-control");
                variablePayContent.setAttribute("placeholder", "Variable Payouts");
                variablePayContent.setAttribute("id", "variablePayActual" + count + projectsCount + tasksCount);
                variablePayContent.setAttribute("disabled", "true");
                // variablePayContent.value = addTaskArray[j][5];
                variablePayContent.value = "?";
                variablePayDiv.appendChild(variablePayContent);

                let totalPayDiv = document.createElement("div");
                totalPayDiv.setAttribute("class", "totalPay");
                let totalPayButton = document.createElement("button");
                totalPayButton.setAttribute("class", "btn calculatorButton");
                totalPayButton.setAttribute("id", "totalPay" + count + projectsCount + tasksCount);
                totalPayButton.setAttribute("onclick", "totalPayCalculation(" + count + projectsCount + tasksCount + ")");

                if (paidInput.checked == true) {
                    totalPayButton.removeAttribute("onclick", "totalPayCalculation(" + count + projectsCount + tasksCount + ")");
                    totalPayButton.setAttribute("disabled", true);
                    totalPayButton.setAttribute("style", "cursor: context-menu !important;");
                }
                let buttonLogo = document.createElement("i");
                buttonLogo.setAttribute("class", "bi bi-calculator");
                totalPayButton.appendChild(buttonLogo);
                let totalPayContent = document.createElement("h6");
                totalPayContent.setAttribute("style", "display: inline;")
                totalPayContent.setAttribute("class", "ml-1")
                totalPayContent.setAttribute("id", "totalPayContent" + count + projectsCount + tasksCount);
                if (totalPayoutsBoolean == true)
                    totalPayContent.innerText = addTaskArray[j][6];
                else
                    totalPayContent.innerText = '?';
                totalPayDiv.appendChild(totalPayButton);
                totalPayDiv.appendChild(totalPayContent);

                let feedbackDiv = document.createElement("div");
                feedbackDiv.setAttribute("class", "feedback row align-items-center mt-1");

                let feedbackContent1 = document.createElement("input");
                feedbackContent1.setAttribute("type", "text");

                feedbackContent1.setAttribute("class", "form-control mt-1 mr-2");
                feedbackContent1.setAttribute("style", "width:18%");
                feedbackContent1.setAttribute("placeholder", "S");
                feedbackContent1.setAttribute("id", "feedbackS" + count + projectsCount + tasksCount);
                if (addTaskArray[j][11] != undefined)
                    feedbackContent1.value = addTaskArray[j][11];

                let feedbackContent2 = document.createElement("input");
                feedbackContent2.setAttribute("type", "text");
                feedbackContent2.setAttribute("class", "form-control mt-1 mr-2");
                feedbackContent2.setAttribute("style", "width:18%");
                feedbackContent2.setAttribute("placeholder", "Q");
                feedbackContent2.setAttribute("id", "feedbackQ" + count + projectsCount + tasksCount);
                if (addTaskArray[j][12] != undefined)
                    feedbackContent2.value = addTaskArray[j][12];

                let feedbackContent3 = document.createElement("input");
                feedbackContent3.setAttribute("type", "text");
                feedbackContent3.setAttribute("class", "form-control mt-1 mr-2");
                feedbackContent3.setAttribute("style", "width:18%");
                feedbackContent3.setAttribute("placeholder", "C");
                feedbackContent3.setAttribute("id", "feedbackC" + count + projectsCount + tasksCount);
                if (addTaskArray[j][13] != undefined)
                    feedbackContent3.value = addTaskArray[j][13];

                let feedbackContent4 = document.createElement("input");
                feedbackContent4.setAttribute("type", "text");
                feedbackContent4.setAttribute("class", "form-control mt-1 mr-2");
                feedbackContent4.setAttribute("style", "width:18%");
                feedbackContent4.setAttribute("placeholder", "O");
                feedbackContent4.setAttribute("id", "feedbackO" + count + projectsCount + tasksCount);
                if (addTaskArray[j][14] != undefined)
                    feedbackContent4.value = addTaskArray[j][14];

                let feedbackContent5 = document.createElement("input");
                feedbackContent5.setAttribute("type", "text");
                feedbackContent5.setAttribute("class", "form-control mt-1");
                feedbackContent5.setAttribute("style", "width:18%");
                feedbackContent5.setAttribute("placeholder", "D");
                feedbackContent5.setAttribute("id", "feedbackD" + count + projectsCount + tasksCount);
                if (addTaskArray[j][15] != undefined)
                    feedbackContent5.value = addTaskArray[j][15];

                // if (addTaskArray[j][7] != undefined)
                //     feedbackContent.selectedIndex = addTaskArray[j][7];
                // else
                //     feedbackContent.value = "";
                feedbackDiv.appendChild(feedbackContent1);
                feedbackDiv.appendChild(feedbackContent2);
                feedbackDiv.appendChild(feedbackContent3);
                feedbackDiv.appendChild(feedbackContent4);
                feedbackDiv.appendChild(feedbackContent5);

                taskDiv.appendChild(taskIdDiv);
                taskDiv.appendChild(completedTaskDiv);
                taskDiv.appendChild(fixedPayMaxDiv);
                taskDiv.appendChild(variablePayMaxDiv);
                taskDiv.appendChild(fixedPayDiv);
                taskDiv.appendChild(variablePayDiv);
                taskDiv.appendChild(totalPayDiv);
                taskDiv.appendChild(feedbackDiv);

                outerDiv1.appendChild(taskDiv);
            }
        }
    }
}

async function savePayouts(id, count) {

    obj = document.getElementById(id);
    obj.style.backgroundColor = "#f1f1f1";
    obj.style.borderColor = "black";
    obj.style.color = "black";
    obj.innerHTML = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...`;

    var params1 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Delivery!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let deliveryArray = request1.result.values;

    let card = obj.parentElement.parentElement.parentElement;
    let array = [];
    let inputs = [];

    let project = card.getElementsByClassName("project");

    for (let k = 0; k < project.length; k++) {

        let projectIdandTitle = project[k].getElementsByClassName("projectIdandTitle");
        projectIdandTitle = projectIdandTitle[0].innerHTML;

        let id = "";
        let name = "";

        let iterator = 0;
        while (projectIdandTitle[iterator] != " ") {
            id += projectIdandTitle[iterator];
            iterator++;
        }
        iterator += 4;
        while (iterator < projectIdandTitle.length) {
            name += projectIdandTitle[iterator];
            iterator++;
        }

        let task = project[k].getElementsByClassName("Row");

        for (let j = 0; j < task.length; j++) {
            let temp = [];
            temp.push(id);

            let t = task[j].getElementsByTagName("h6");
            let status = task[j].parentElement.parentElement.parentElement.parentElement;

            let paidStatusToggle = status.getElementsByTagName("input");

            if (paidStatusToggle[0].checked == true) {
                paidStatusToggle = "Paid";
            } else {
                paidStatusToggle = "Due";
            }
            temp.push(t[0].innerText);
            temp.push(t[1].innerText);
            temp.push(t[2].innerText);
            temp.push(t[3].innerText);

            let i = task[j].getElementsByTagName("input");
            inputs.push(i);

            // console.log("i", i);

            if (i[0] != undefined)
                temp.push(i[0].value);

            if (i[1] != undefined)
                temp.push(i[1].value);

            temp.push(t[4].innerText);

            // if (i[2] != undefined)
            //     temp.push(i[2].value);

            // if (i[3] != undefined)
            //     temp.push(i[3].value);

            // if (i[4] != undefined)
            //     temp.push(i[4].value);


            temp.push(paidStatusToggle);

            // console.log("temp", temp);

            array.push(temp);
        }
    }

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < deliveryArray.length; j++) {
            if (deliveryArray[j][0] == array[i][0] && deliveryArray[j][2] == array[i][1]) {

                let ArrayOne = [];
                let ArrayTwo = [];
                ArrayOne.push(array[i][5]);
                if (array[i][6] != "" && array[i][6][(array[i][6]).length - 1] != "%") {
                    array[i][6] += "%";
                }
                ArrayOne.push(array[i][6]);
                if (array[i][7] == "0") {
                    array[i][7] = "";
                }
                ArrayOne.push(array[i][7]);
                // ArrayOne.push(array[i][9]);
                ArrayOne.push(array[i][8]);

                var thisInput = inputs[i];

                console.log("array one", thisInput[2])

                ArrayOne.push(undefined);
                ArrayOne.push(undefined);
                ArrayOne.push(undefined);
                ArrayOne.push(undefined);

                if (thisInput[2] != undefined)
                    ArrayOne.push(thisInput[2].value);

                if (thisInput[3] != undefined)
                    ArrayOne.push(thisInput[3].value);

                if (thisInput[4] != undefined)
                    ArrayOne.push(thisInput[4].value);

                if (thisInput[5] != undefined)
                    ArrayOne.push(thisInput[5].value);

                if (thisInput[6] != undefined)
                    ArrayOne.push(thisInput[6].value);

                ArrayTwo.push(ArrayOne);

                let rangeStr = "Delivery!J";
                let num = j + 2;
                rangeStr += num;
                rangeStr += ":V";
                rangeStr += num;

                var params = {
                    spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
                    range: rangeStr,
                    valueInputOption: "USER_ENTERED",
                };

                var valueRangeBody = {
                    "majorDimension": "ROWS",
                    "values": ArrayTwo,
                };

                var request = await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
            }
        }
    }

    obj.innerHTML = "Saved <b>&#10003;</b>";
    setTimeout(function () {
        obj.style.backgroundColor = "#007bff";
        obj.innerHTML = "Save";
        obj.style.color = "white";
    }, 1000);
}

async function makeApiCallPayouts() {

    var params1 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Delivery!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let deliveryArray = request1.result.values;

    // console.log("something", deliveryArray)

    var params2 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Team!A2:Z1000',
    };

    var request2 = await gapi.client.sheets.spreadsheets.values.get(params2);
    let teamArray = request2.result.values;

    var params3 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Projects!A2:Z1000',
    };

    var request3 = await gapi.client.sheets.spreadsheets.values.get(params3);
    let projectsArray = request3.result.values;

    var params4 = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
        range: 'Payouts!A2:Z1000',
    };

    var request4 = await gapi.client.sheets.spreadsheets.values.get(params4);
    let payouts = request4.result.values;

    let totalSum = 0.0;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;

    if (mm < 10)
        mm = '0' + mm;

    var date = dd + '/' + mm + '/' + yyyy;

    for (let i = 0; i < payouts.length; i++) {
        if (payouts[i][0] == date) {
            totalSum += parseFloat(payouts[i][2]);
        }
    }

    let payoutsMade = document.getElementById("payoutsMadeNum");
    payoutsMade.innerText = totalSum;

    let totalDue = 0.0;
    for (let i = 0; i < deliveryArray.length; i++) {
        if (deliveryArray[i][12] == "Due") {
            if (deliveryArray[i][11] != "") {
                totalDue += parseFloat(deliveryArray[i][11]);
            } else if (deliveryArray[i][10] != "" && deliveryArray[i][9] != "") {
                totalDue += parseFloat(deliveryArray[i][9]) + parseFloat(deliveryArray[i][9]) * parseFloat(deliveryArray[i][10]) / 100.0;
            }
        }
    }

    let payoutsDue = document.getElementById("payoutsDueNum");
    payoutsDue.innerText = totalDue;

    let payoutsTotal = document.getElementById("totalpayNum");
    payoutsTotal.innerText = totalDue + totalSum;

    for (let i = 0; i < teamArray.length; i++) {
        let flag = false;
        for (let j = 0; j < deliveryArray.length; j++) {
            if (deliveryArray[j][4] == teamArray[i][0] && (deliveryArray[j][12] == "Due" || deliveryArray[j][14] == "Yet to update")) {
                flag = true;
            }
        }

        if (flag == true)
            createPayouts(teamArray[i], projectsArray, deliveryArray, i + 1);
    }
}

function todayDate() {
    let dateElem = document.getElementById("todayDate");

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();
    if (dd < 10)
        dd = '0' + dd;

    if (mm < 10)
        mm = '0' + mm;

    var date = dd + '/' + mm + '/' + yyyy;

    dateElem.innerText += " " + date;
}

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];

// span.onclick = function() {
//     modal.style.display = "none";
// }

// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

function closeModal1(id) {
    let id1 = id.slice(0, -1);
    let toggle = document.getElementById(id1);
    toggle.checked = false;

    let calcButton = toggle.parentElement.parentElement.parentElement.parentElement;
    calcButton = calcButton.getElementsByClassName("Row");

    for (let i = 0; i < calcButton.length; i++) {
        let temp = calcButton[i].getElementsByTagName("button");
        temp = temp[0];

        temp.setAttribute("onclick", "totalPayCalculation(id)");
        temp.disabled = false;
        temp.removeAttribute("style", "cursor: context-menu !important;");
    }

    modal.style.display = "none";
}

async function updatePayoutsSheet(id) {
    let toggleButton = document.getElementById(id);
    let num = "";
    if (toggleButton.checked == true) {

        let calcButton = toggleButton.parentElement.parentElement.parentElement.parentElement;
        calcButton = calcButton.getElementsByClassName("Row");

        for (let i = 0; i < calcButton.length; i++) {
            let temp = calcButton[i].getElementsByTagName("button");
            temp = temp[0];

            temp.removeAttribute("onclick", "totalPayCalculation(id)");
            temp.setAttribute("disabled", true);
            temp.setAttribute("style", "cursor: context-menu !important;");
        }

        // let elem = toggleButton.parentElement.parentElement.parentElement;

        // let teamMember = elem.getElementsByTagName("h5");
        // teamMember = teamMember[0].innerText;

        // let pay = elem.getElementsByTagName("h6");
        // pay = pay[0].innerText;

        // let iterator = 0;
        // while(pay[iterator] != "s") {
        //     iterator++;
        // }
        // iterator+=2;
        // while(iterator < pay.length) {
        //     num += pay[iterator];
        //     iterator++;
        // }

        let elem = toggleButton.parentElement.parentElement.parentElement;

        let teamMember = elem.getElementsByTagName("h5");
        teamMember = teamMember[0].innerText;

        elem = elem.parentElement;

        let num = 0.0;
        let pay = elem.getElementsByClassName("totalPay");

        // console.log("pay", pay);

        for (let k = 0; k < pay.length; k++) {
            // console.log("payk", pay[k].innerText);
            if (pay[k].innerText == "?") {
                num = NaN;
                break;
            } else if (pay[k].innerText != "Total Payout") {
                num += parseFloat(pay[k].innerText);
            }
        }

        console.log("Num", num, isNaN(num));

        if (isNaN(num)) {
            toggleButton.checked = true;
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
            let span = modal.getElementsByTagName("span");
            span = span[0];
            span.setAttribute("id", id + "0");
            var modalContent = document.getElementById("modalContent");
            modalContent.innerText = "Please calculate the total payout";
            return;
        }

        // if (num == 0) {

        // }

        // console.log("num", num)

        // return;

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        if (dd < 10)
            dd = '0' + dd;

        if (mm < 10)
            mm = '0' + mm;

        var date = dd + '/' + mm + '/' + yyyy;

        let arrayOne = [];
        let arrayTwo = [];
        arrayOne.push(date);
        arrayOne.push(teamMember);
        arrayOne.push(num);
        arrayOne.push("Yet to update");
        arrayTwo.push(arrayOne);

        var params = {
            spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
            range: 'Payouts!A2:Z1000',
            valueInputOption: "USER_ENTERED",
        };

        var valueRangeBody = {
            "majorDimension": "ROWS",
            "values": arrayTwo
        };

        var request = await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);

        let update = toggleButton.parentElement.parentElement.parentElement;
        update = update.getElementsByTagName("button");
        update = update[1];

        update.setAttribute("onclick", "updateTracker(id)");
        update.setAttribute("class", "btn btn-primary trackerButton");
        update.setAttribute("style", "cursor: pointer");
        toggleButton.removeAttribute("onclick", "updatePayoutsSheet(id)");
        toggleButton.setAttribute("disabled", true);
        toggleButton.setAttribute("style", "cursor: context-menu !important;");

        let dueNum = toggleButton.parentElement.parentElement.parentElement;
        dueNum = dueNum.getElementsByTagName("h6");
        dueNum = dueNum[0];
        dueNum.innerText = "Total Due: Rs 0";

        let temp = document.getElementById("totalpayNum");
        let temp1 = document.getElementById("payoutsMadeNum");
        temp1.innerText = parseInt(temp1.innerText) + parseInt(num);

        let temp2 = document.getElementById("payoutsDueNum");
        temp2.innerText = parseInt(temp.innerText) - parseInt(temp1.innerText);

        var params1 = {
            spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
            range: 'Delivery!A2:Z1000',
        };

        var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
        let deliveryArray = request1.result.values;

        let card = toggleButton.parentElement.parentElement.parentElement.parentElement;
        let array = [];

        let project = card.getElementsByClassName("project");

        for (let k = 0; k < project.length; k++) {

            let projectIdandTitle = project[k].getElementsByClassName("projectIdandTitle");
            projectIdandTitle = projectIdandTitle[0].innerHTML;

            let id = "";
            let name = "";

            let iterator = 0;
            while (projectIdandTitle[iterator] != " ") {
                id += projectIdandTitle[iterator];
                iterator++;
            }
            iterator += 4;
            while (iterator < projectIdandTitle.length) {
                name += projectIdandTitle[iterator];
                iterator++;
            }

            let task = project[k].getElementsByClassName("Row");

            for (let j = 0; j < task.length; j++) {
                let temp = [];
                temp.push(id);

                let a = task[j].getElementsByClassName("taskId");
                a = a[0].getElementsByTagName("h6");
                a = a[0].innerText;
                temp.push(a);
                temp.push("Paid");
                array.push(temp);
            }
        }

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < deliveryArray.length; j++) {
                if (deliveryArray[j][0] == array[i][0] && deliveryArray[j][2] == array[i][1]) {

                    let ArrayOne = [];
                    let ArrayTwo = [];
                    ArrayOne.push(array[i][2]);
                    ArrayTwo.push(ArrayOne);

                    let rangeStr = "Delivery!M";
                    let num = j + 2;
                    rangeStr += num;
                    var params = {
                        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA',
                        range: rangeStr,
                        valueInputOption: "USER_ENTERED",
                    };

                    var valueRangeBody = {
                        "majorDimension": "ROWS",
                        "values": ArrayTwo,
                    };

                    var request = await gapi.client.sheets.spreadsheets.values.update(params, valueRangeBody);
                }
            }
        }
    }
}

//Authentication functions used for this app

$(document).ready(function () {
    $('.signoutButton').click(function () {
        location.reload();
    });
});

function initClient() {
    var API_KEY = 'AIzaSyA5iKpQ3DJ66zFJGsQCaNV8lF7dv0alyAw';
    var CLIENT_ID = '1080657069033-jcl8n4ojl14fvofuq9qh1esfog3g0piq.apps.googleusercontent.com';
    var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        'apiKey': API_KEY,
        'clientId': CLIENT_ID,
        'scope': SCOPE,
        'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
        updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        let signInButton = document.getElementById("singinPayouts");
        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";

        todayDate();
        makeApiCallPayouts();
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
