var count = 0;
function displayTeam(arr) {
    count++;
    var tableBody = document.getElementById("teamTableBody");
    
    var tableRow = document.createElement("tr");
    var name = document.createElement("th");
    var primarySkill = document.createElement("td");
    var status = document.createElement("td");
    var performance = document.createElement("td");
    var earnings = document.createElement("td");
    var projects = document.createElement("td");
    var detailsButton = document.createElement("td");
    var buttons = document.createElement("button");
    buttons.setAttribute("id","id"+count);
    
    name.setAttribute("scope","row");

    name.innerHTML = arr[0];
    primarySkill.innerHTML = arr[1];
    status.innerHTML = arr[2];
    performance.innerHTML = arr[3];
    earnings.innerHTML = arr[4];
    projects.innerHTML = arr[5];
    
    buttons.setAttribute("class","btn btn-primary");
    buttons.setAttribute("onclick","moreDetails(id)");
    buttons.innerHTML = "More Details";
    detailsButton.appendChild(buttons);


    tableRow.appendChild(name);
    tableRow.appendChild(primarySkill);
    tableRow.appendChild(status);
    tableRow.appendChild(performance);
    tableRow.appendChild(earnings);
    tableRow.appendChild(projects);
    tableRow.appendChild(detailsButton);

    tableBody.appendChild(tableRow);
}

let teamArray = [];
async function makeApiCallTeam() {
    var params = {
    spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
    range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    teamArray = request.result.values;
    var tableBody = document.getElementById("teamTableBody");
    tableBody.innerHTML = "";
    if(teamArray != undefined) {
        for(var i=0; i<teamArray.length; i++) {
            displayTeam(teamArray[i]);
        }
    }
}

function makeRow(a, b, c, d) {
    var containerTeam = document.getElementById("containerTeam");
    
    var firstRow = document.createElement("div");
    firstRow.setAttribute("class","row");

    var bankNameTagDiv = document.createElement("div");
    bankNameTagDiv.setAttribute("class","col-2 mt-3");
    var bankNameTag = document.createElement("h6");
    bankNameTag.innerHTML = a + ": ";
    bankNameTagDiv.appendChild(bankNameTag);

    var bankNameContentDiv = document.createElement("div");
    bankNameContentDiv.setAttribute("class","col-3 mt-3");
    var bankNameContent = document.createElement("input");
    bankNameContent.setAttribute("type","text");
    bankNameContent.setAttribute("class","form-control");
    bankNameContent.setAttribute("placeholder",a);
    bankNameContent.setAttribute("style","border: 2px solid black");
    if(a == "Skill Details" || a == "Address" || a == "Remarks") {
        var bankNameContent = document.createElement("textarea");
        bankNameContent.setAttribute("class","form-control");
        bankNameContent.setAttribute("placeholder", a);
        bankNameContent.setAttribute("style","border: 2px solid black; height: 150px;")
    } else {
        var bankNameContent = document.createElement("input");
        bankNameContent.setAttribute("type","text");
        bankNameContent.setAttribute("class","form-control");
        bankNameContent.setAttribute("placeholder",a);
        bankNameContent.setAttribute("style","border: 2px solid black");
    }
    bankNameContent.value = b;
    bankNameContentDiv.appendChild(bankNameContent);

    firstRow.appendChild(bankNameTagDiv);
    firstRow.appendChild(bankNameContentDiv);

    var accountNumberTagDiv = document.createElement("div");
    accountNumberTagDiv.setAttribute("class","col-2 mt-3");
    var accountNumberTag = document.createElement("h6");
    accountNumberTag.innerHTML = c+": ";
    accountNumberTagDiv.appendChild(accountNumberTag);

    var accountNumberContentDiv = document.createElement("div");
    accountNumberContentDiv.setAttribute("class","col-5 mt-3");
    if(c == "Skill Details" || c == "Address" || c == "Remarks") {
        var accountNumberContent = document.createElement("textarea");
        accountNumberContent.setAttribute("class","form-control");
        accountNumberContent.setAttribute("placeholder", c);
        accountNumberContent.setAttribute("style","border: 2px solid black; height: 150px;")
    } else {
        var accountNumberContent = document.createElement("input");
        accountNumberContent.setAttribute("type","text");
        accountNumberContent.setAttribute("class","form-control");
        accountNumberContent.setAttribute("placeholder", c);
        accountNumberContent.setAttribute("style","border: 2px solid black");
    }
    accountNumberContent.value = d;
    accountNumberContentDiv.appendChild(accountNumberContent);

    firstRow.appendChild(accountNumberTagDiv);
    firstRow.appendChild(accountNumberContentDiv);

    containerTeam.appendChild(firstRow);
}

async function updateMemberDetails(id) {
    var params = {
        spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
        range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    request = request.result.values;

    let button = document.getElementById(id);
    let container = button.parentElement.parentElement;

    let inputDetails = container.getElementsByTagName("input");
    let textDetails = container.getElementsByTagName("textarea");
    // let selectDetails = container.getElementsByTagName("select");

    let arrOne = [];
    let arrTwo = [];

    let memberId = container.getElementsByTagName("h5");
    memberId = memberId[1].innerText;

    let id1 = "";
    let name = "";
    let iterator = 0;
    while(memberId[iterator] != ":") {
        name += memberId[iterator];
        iterator++;
    }
    iterator+=2;
    while(iterator < memberId.length) {
        id1 += memberId[iterator];
        iterator++;
    }
    let name1 = name.slice(0,-1);
    console.log(id1);
    console.log(name1);

    for(let i=0; i<request.length; i++) {

        if(request[i][17] == id1) {
            
            arrOne.push(name1);
            arrOne.push(inputDetails[4].value);
            arrOne.push(request[i][2]);
            arrOne.push(request[i][3]);
            arrOne.push(request[i][4]);
            arrOne.push(request[i][5]);
            arrOne.push(request[i][6]);
            arrOne.push(request[i][7]);
            arrOne.push(textDetails[1].value);
            arrOne.push(textDetails[0].value);
            arrOne.push(inputDetails[3].value);
            arrOne.push(inputDetails[1].value);
            arrOne.push(inputDetails[0].value);
            arrOne.push(inputDetails[2].value);
            arrOne.push(inputDetails[5].value);
            arrOne.push(textDetails[2].value);
            arrOne.push(request[i][16]);
            arrOne.push(request[i][17]);

            arrTwo.push(arrOne);

            let num = i+2;

            var params2 = {
                spreadsheetId: '1g9y32IkyujOupw6O6eRhtlCcwhn5vv9mM_Yr4peRRmo', 
                range: "Team!A"+num,
                valueInputOption: "USER_ENTERED",
            };
        
            var valueRangeBody2 = {
                "majorDimension": "ROWS",
                "values": arrTwo,
            };
        
            var request = await gapi.client.sheets.spreadsheets.values.update(params2, valueRangeBody2);
        }
    }
}

function moreDetails(memberId) {
    memberId = parseInt(memberId.substring(2));
    var memberDetail = teamArray[memberId-1];
    console.log(memberDetail);

    var containerTeam = document.getElementById("containerTeam");
    containerTeam.innerHTML = "";

    let titleDiv = document.createElement("div");
    titleDiv.setAttribute("class","mt-1 teamTitle d-flex align-items-center");
    let backButtonLink = document.createElement("a");
    backButtonLink.setAttribute("href","./team.html");
    let backButton = document.createElement("button");
    backButton.setAttribute("type","button");
    backButton.setAttribute("class","btn backButton");
    backButton.setAttribute("id","backButton");
    let backButtonLogo = document.createElement("i");
    backButtonLogo.setAttribute("class","bi bi-arrow-left");
    let t = document.createElement("h5");
    t.innerText = "Team-Member Details";
    backButton.appendChild(backButtonLogo);
    backButtonLink.appendChild(backButton);
    backButtonLink.appendChild(t);
    titleDiv.appendChild(backButtonLink);
    containerTeam.appendChild(titleDiv);

    let saveButton = document.createElement("button");
    saveButton.setAttribute("class","btn btn-primary saveDetailsButton");
    saveButton.setAttribute("id","updateMemberButton");
    saveButton.setAttribute("onclick", "updateMemberDetails(id)");
    saveButton.innerText = "Update";

    titleDiv.appendChild(saveButton);

    var memberNameDiv = document.createElement("div");
    memberNameDiv.setAttribute("class","row mt-2");
    var memberNameDiv1 = document.createElement("div");
    memberNameDiv1.setAttribute("class","col-12");
    var memberName = document.createElement("h5");
    memberName.innerHTML = memberDetail[0] + ": " + memberDetail[17];
    memberNameDiv1.appendChild(memberName);
    memberNameDiv.appendChild(memberNameDiv1);

    var memberJoinDate = document.createElement("div");
    memberJoinDate.setAttribute("class","row mt-2");
    var memberJoinDate1 = document.createElement("div");
    memberJoinDate1.setAttribute("class","col-12");
    var joinDate = document.createElement("h6");
    joinDate.innerHTML = "Team Member Since: " + memberDetail[16];
    memberJoinDate1.appendChild(joinDate);
    memberJoinDate.appendChild(memberJoinDate1);

    containerTeam.appendChild(memberNameDiv);
    containerTeam.appendChild(memberJoinDate);
    
    makeRow("Bank Name", memberDetail[12], "Account Number", memberDetail[11]);
    makeRow("IFSC", memberDetail[13], "PAN", memberDetail[10]);
    makeRow("Primary Skills", memberDetail[1], "Skill Details", memberDetail[9]);
    makeRow("Address", memberDetail[8], "Remarks", memberDetail[15]);

    var firstRow = document.createElement("div");
    firstRow.setAttribute("class","row");

    var trackerTagDiv = document.createElement("div");
    trackerTagDiv.setAttribute("class","col-2 mt-3");
    var trackerTag = document.createElement("h6");
    trackerTag.innerHTML = "Payouts Tracker: ";
    trackerTagDiv.appendChild(trackerTag);

    var trackerContentDiv = document.createElement("div");
    trackerContentDiv.setAttribute("class","col-10 mt-3 mb-5");
    var trackerContent = document.createElement("input");
    trackerContent.setAttribute("type","text");
    trackerContent.setAttribute("class","form-control");
    trackerContent.setAttribute("placeholder", "Tracker Link");
    trackerContent.setAttribute("style","border: 2px solid black");
    trackerContent.value = memberDetail[14];
    trackerContentDiv.appendChild(trackerContent);

    firstRow.appendChild(trackerTagDiv);
    firstRow.appendChild(trackerContentDiv);

    containerTeam.appendChild(firstRow);
}

//Authentication functions used for this app

$(document).ready(function() {
    $('.signoutButton').click(function() {
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
    }).then(function() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
    updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
}

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function updateSignInStatus(isSignedIn) {
    if (isSignedIn) {
        makeApiCallTeam();
        let signInButton = document.getElementsByClassName("signinButton");

        for(let i=0; i<signInButton.length; i++) {
            signInButton[i].style.backgroundColor = "#f1f1f1";
            signInButton[i].style.borderColor = "black";
            signInButton[i].style.borderWidth = "2px";
            signInButton[i].style.color = "black";
            signInButton[i].innerHTML = "<b>Signed In</b>";
        }
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}