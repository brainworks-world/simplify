async function makeApiCallHelperSheet() {
    var params1 = {
        spreadsheetId: '139zjaiJ1Fm6BG3XX3Pego_fB8n1cwF8aCKIJFY57g0w', 
        range: 'Skills!A2:Z1000',
    };

    var request1 = await gapi.client.sheets.spreadsheets.values.get(params1);
    let skills = [];

    if(request1.result.values != undefined) 
        skills = request1.result.values;

    let primarySkillSelect = document.getElementById("primarySkillSelect");
    for(let i=0; i<skills.length; i++) {
        if(skills[i] !== "") {
            let options = document.createElement("option");
            options.innerHTML = skills[i];

            primarySkillSelect.appendChild(options);
        }
    }
}

async function addTeamMember() {

    let obj = document.getElementById("addMemberSaveButton");
    obj.style.backgroundColor = "#f1f1f1";
    obj.style.borderColor = "black";
    obj.style.color = "black";
    obj.innerHTML = `<span class="spinner-border spinner-border-sm mr-1" role="status" aria-hidden="true"></span> Saving...`;
    

    var params = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA', 
        range: 'Team!A2:Z1000',
    };

    var request = await gapi.client.sheets.spreadsheets.values.get(params);
    request = request.result.values;

    var len = 1;
    if(request != undefined)
        var len = request.length + 1;
    var name = document.getElementById("name").value;
    var emailId = document.getElementById("emailId").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var primarySkill = document.getElementById("primarySkillSelect").value;
    var skillDetail = document.getElementById("skillDetail").value;
    var address = document.getElementById("address").value;
    var remarks = document.getElementById("remarks").value;
    var bankName = document.getElementById("bankName").value;
    var ifsc = document.getElementById("IFSC").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var panNumber = document.getElementById("PAN").value;
    var payoutTracker = document.getElementById("payoutTracker").value;
    var status = "free";
    var performance = "10/10";
    var earnings = "10000";
    var projects = "1";

    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
        dd='0'+dd;

    if(mm<10) 
        mm='0'+mm;
        
    var date = dd+'/'+mm+'/'+yyyy;

    var params = {
        spreadsheetId: '1FJGc-rKYqcrwDTPfdo4Hzx2Mpcou558aco9Sp1BKNLA', 
        range: 'Team!A2:Z1000',
        valueInputOption: "USER_ENTERED",
    };

    var valueRangeBody = {
        "majorDimension": "ROWS",
        "values": [
            [name,
            primarySkill,
            status,
            performance,
            earnings,
            projects,
            emailId,
            phoneNumber,
            address,
            skillDetail,
            panNumber,
            accountNumber,
            bankName,
            ifsc,
            payoutTracker,
            remarks,
            date,
            len]
        ]
    };

    var request = await gapi.client.sheets.spreadsheets.values.append(params, valueRangeBody);
    obj.style.backgroundColor = "#007bff";
    obj.innerHTML = "Save";
    obj.style.color = "white";
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
        makeApiCallHelperSheet();
        let signInButton = document.getElementById("addTeamMemberSignInButton");

        signInButton.style.backgroundColor = "#f1f1f1";
        signInButton.style.borderColor = "black";
        signInButton.style.borderWidth = "2px";
        signInButton.style.color = "black";
        signInButton.innerHTML = "<b>Signed In</b>";
    }
}

function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}
