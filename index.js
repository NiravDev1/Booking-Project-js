
//input field
const edName = document.getElementById("edName");
const edMobile = document.getElementById("edMobile");
const edBicycleNo = document.getElementById("edBicycleNo");

//button 

const btnSave = document.getElementById("btnSave");
let users = []

// localStorage.clear()
getSavedUsers()

btnSave.addEventListener('click', () => {

    let name = edName.value
    let mobile = edMobile.value
    let bicycleNo = edBicycleNo.value
    // Basic Validation
    if (name.trim() === "") {
        alert("Name is required!");
        edName.focus();
        return; // Stop further execution
    }


    if (mobile.trim() === "") {
        alert("Mobile number is required!");
        edMobile.focus();
        return;
    }

    // Mobile number validation (simple length check)
    if (mobile.length < 10) {
        alert("Please enter a valid mobile number!");
        edMobile.focus();
        return;
    }

    if (bicycleNo.trim() === "") {
        alert("Bicycle number is required!");
        edBicycleNo.focus();
        return;
    }


    let user = {
        id: users.length + 1,
        name: name,
        phone: mobile,
        bicycle_no: bicycleNo,
        time: getCurrentTime()
    };

    // const myJSON = JSON.stringify(user);
    console.log(user)
    users.push(user)

    localStorage.setItem("users", JSON.stringify(users));
    createTableRow(user)
 
    showToast("Data add successfully")

    showNotification("DATA addedd")
    

})

function showToast(message) {
    let toast = document.getElementById("toast");
    toast.innerText = message;
    toast.style.visibility = "visible";

    // Hide after 3 seconds
    setTimeout(function(){
        toast.style.visibility = "hidden";
    }, 3000);
    
}


function getCurrentTime() {
    return new Date().toLocaleTimeString();
}

function getSavedUsers() {
    const savedUsers = JSON.parse(localStorage.getItem("users"));
    if (savedUsers != null) {
        users.push(...savedUsers)
        console.log(`data add from savedUsers ${users}`)
        users.forEach(user=>{
            createTableRow(user)
        });
    }
}



function createTableRow(user) {

    
    let table = document.getElementById('userTable').getElementsByTagName(`tbody`)[0];
    let newRow = table.insertRow();

    newRow.insertCell(0).innerHTML = user.id;
    newRow.insertCell(1).innerHTML = user.name;
    newRow.insertCell(2).innerHTML = user.phone;
    newRow.insertCell(3).innerHTML = user.bicycle_no;
    newRow.insertCell(4).innerHTML = user.time;
    
    let btn = document.createElement("button");
    btn.className = "btn btn-check";
    btn.innerText = "Check In";
    
    btn.onclick = () => checkIn(user);
    
    newRow.insertCell(5).appendChild(btn)

    
}

function checkIn(user)
{

    

}


function showNotification(body)
{
    if (Notification.permission === "granted") {
        new Notification("Checked In", {
            body: body,
            icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png"
        });
    } else {
        Notification.requestPermission();
    }
}