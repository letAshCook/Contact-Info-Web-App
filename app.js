function initialize(){
    var status = "* offline *";
    if(navigator.onLine){
        status="* Online *";
        retrieveContacts();
    } else{
        const localStorage = window.localStorage;
        if(localStorage){
            const contacts = localStorage.getItem("contacts");
            if(contacts){
                displayContacts(JSON.parse(contacts));
            }
        }
    }

    document.getElementById("status").innerHTML = status;

    document.body.addEventListener(
        "online",
        function(){
            document.getElementById("status").innerHTML = "Online";
        },
        false
    );
    document.body.addEventListener(
        "offline",
        function(){
            document.getElementById("status").innerHTML = "Offline";
        },
        false
    );    
        
}

function retrieveContacts(){
    const xhr = new XMLHttpRequest();
    const url = "contacts.json";

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4){
            var contacts = JSON.parse(xhr.response).contacts
            displayContacts(contacts);

            const localStorage = window.localStorage;
            if(localStorage){
                localStorage.setItem("contacts", JSON.stringify(contacts));
            }
        }
    };

    xhr.open("get", url);
    xhr.send();
}

function displayContacts(contacts){
    contacts.forEach(addRow);
}

function addRow(contacts){
    var tcontent = document.getElementById("tcontent");
    var row = tcontent.insertRow();

    var nameCell = row.insertCell();
    nameCell.setAttribute('data-label', "name");
    nameCell.innerHTML = contacts.name;

    var addressCell = row.insertCell();
    addressCell.setAttribute('data-label', "address");
    addressCell.innerHTML = contacts.address;

    var mobileCell = row.insertCell();
    mobileCell.setAttribute('data-label', "mobile");
    mobileCell.innerHTML = contacts.phone.mobile;
}

