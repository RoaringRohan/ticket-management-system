let isLoggedIn = false;
let id;

function populateTables() {
    // Populating closed tickets table
    let url = '/api/ticket/allClosed';

    fetch(url)
        .then(res => res.json()
            .then(data => {
                let table = document.getElementById('closed-tickets')
                data.forEach(i => {
                    let row = document.createElement('tr')

                    let ticketID = document.createElement('td')
                    ticketID.appendChild(document.createTextNode(i.ticketID))
                    row.appendChild(ticketID)

                    let subject = document.createElement('td')
                    subject.appendChild(document.createTextNode(i.subject))
                    row.appendChild(subject)

                    let description = document.createElement('td')
                    description.appendChild(document.createTextNode(i.description))
                    row.appendChild(description)

                    let software = document.createElement('td')
                    software.appendChild(document.createTextNode(i.software))
                    row.appendChild(software)

                    let dateOpened = document.createElement('td')
                    dateOpened.appendChild(document.createTextNode(i.dateOpened))
                    row.appendChild(dateOpened)

                    let dateClosed = document.createElement('td')
                    dateClosed.appendChild(document.createTextNode(i.dateClosed))
                    row.appendChild(dateClosed)

                    let state = document.createElement('td')
                    state.appendChild(document.createTextNode(i.state))
                    row.appendChild(state)

                    let priorityLevel = document.createElement('td')
                    priorityLevel.appendChild(document.createTextNode(i.priorityLevel))
                    row.appendChild(priorityLevel)

                    let techNotes = document.createElement('td')
                    techNotes.appendChild(document.createTextNode(i.techNotes))
                    row.appendChild(techNotes)

                    let userID = document.createElement('td')
                    userID.appendChild(document.createTextNode(i.userID))
                    row.appendChild(userID)

                    let issuerID = document.createElement('td')
                    issuerID.appendChild(document.createTextNode(i.issuerID))
                    row.appendChild(issuerID)

                    let technicianID = document.createElement('td')
                    technicianID.appendChild(document.createTextNode(i.technicianID))
                    row.appendChild(technicianID)

                    table.appendChild(row)
                });
            }))

    // Populating open/inprogress tickets by department
    let anotherUrl = '/api/ticket/departmentsMost';

    fetch(anotherUrl)
    .then(res => res.json()
    .then(data => {
        let table = document.getElementById('inprogress-tickets')
        
        data.forEach(i => {
            let row = document.createElement('tr')

            let departmentName = document.createElement('td')
            departmentName.appendChild(document.createTextNode(i.software))
            row.appendChild(departmentName);
            
            let numOpenTickets = document.createElement('td')
            numOpenTickets.appendChild(document.createTextNode(i.num_of_tickets))
            row.appendChild(numOpenTickets)

            table.appendChild(row)
        });
    }))

    // Populating open tickets for a technician table
    let yetAnotherUrl = `/api/ticket/technicianTickets/${id}`;

    fetch(yetAnotherUrl)
        .then(res => res.json()
        .then(data => {
            if (data.length == 0){
                let feedback = document.getElementById('openTicketFeedback')
                feedback.innerText = ""
                feedback.appendChild(document.createTextNode(`No Open Tickets For Employee # ${id}!`))
            }
            else {
                let feedback = document.getElementById('openTicketFeedback')
                feedback.innerText = ""
                if (feedback.hasChildNodes()){
                    feedback.removeChild(feedback.lastElementChild);
                }
            }
            let table = document.getElementById('open-tickets')
            data.forEach(i => {
                let row = document.createElement('tr')

                let ticketID = document.createElement('td')
                ticketID.appendChild(document.createTextNode(i.ticketID))
                row.appendChild(ticketID)
                
                let subject = document.createElement('td')
                subject.appendChild(document.createTextNode(i.subject))
                row.appendChild(subject)

                let description = document.createElement('td')
                description.appendChild(document.createTextNode(i.description))
                row.appendChild(description)

                let software = document.createElement('td')
                software.appendChild(document.createTextNode(i.software))
                row.appendChild(software)

                let dateOpened = document.createElement('td')
                dateOpened.appendChild(document.createTextNode(i.dateOpened))
                row.appendChild(dateOpened)

                let dateClosed = document.createElement('td')
                dateClosed.appendChild(document.createTextNode(i.dateClosed))
                row.appendChild(dateClosed)

                let state = document.createElement('td')
                state.appendChild(document.createTextNode(i.state))
                row.appendChild(state)

                let priorityLevel = document.createElement('td')
                priorityLevel.appendChild(document.createTextNode(i.priorityLevel))
                row.appendChild(priorityLevel)

                let techNotes = document.createElement('td')
                techNotes.appendChild(document.createTextNode(i.techNotes))
                row.appendChild(techNotes)

                let userID = document.createElement('td')
                userID.appendChild(document.createTextNode(i.userID))
                row.appendChild(userID)

                let issuerID = document.createElement('td')
                issuerID.appendChild(document.createTextNode(i.issuerID))
                row.appendChild(issuerID)

                let technicianID = document.createElement('td')
                technicianID.appendChild(document.createTextNode(i.technicianID))
                row.appendChild(technicianID)

                table.appendChild(row)
            });
        }))
        
}

function start() {
    let table = document.getElementById('inprogress-tickets')
    var rowCount = table.rows.length;
    var tableHeaderRowCount = 1;

    for (var i = tableHeaderRowCount; i < rowCount; i++) {
        table.deleteRow(tableHeaderRowCount);
    }

    let table1 = document.getElementById('closed-tickets')
    var rowCount1 = table1.rows.length;
    var tableHeaderRowCount1 = 1;

    for (var i = tableHeaderRowCount1; i < rowCount1; i++) {
        table1.deleteRow(tableHeaderRowCount1);
    }

    let table2 = document.getElementById('open-tickets')
    var rowCount2 = table2.rows.length;
    var tableHeaderRowCount2 = 1;

    if (rowCount2 > 0) {
        for (var i = tableHeaderRowCount2; i < rowCount2; i++) {
        table2.deleteRow(i);
        }
    }

    var loginDiv = document.getElementById("loginBox");
    loginDiv.style.display = "block";

    var viewOpenTicketsDiv = document.getElementById("view-open-tickets");
    viewOpenTicketsDiv.style.display = "none";
    
    let loginMenuBar = document.getElementById('loginNav')
    loginMenuBar.style.visibility = "visible"

    var assignTicketDiv = document.getElementById("assign-ticket");
    assignTicketDiv.style.display = "none";
    assignTicketDiv.style.padding = "10px"

    let assignMenuBar = document.getElementById('assignNav')
    assignMenuBar.style.visibility = "hidden"

    var technicianSalaryDiv = document.getElementById("technician-salary");
    technicianSalaryDiv.style.display = "none";

    let salaryMenuBar = document.getElementById('salaryNav')
    salaryMenuBar.style.visibility = "hidden"

    var createTicketDiv = document.getElementById("create-ticket");
    createTicketDiv.style.display = "none";

    let createMenuBar = document.getElementById('createNav')
    createMenuBar.style.visibility = "hidden"

    var editTicketDiv = document.getElementById("edit-ticket");
    editTicketDiv.style.display = "none";

    let editMenuBar = document.getElementById('editNav')
    editMenuBar.style.visibility = "hidden"

    var displayClosedTicketsDiv = document.getElementById("display-closed-tickets");
    displayClosedTicketsDiv.style.display = "none";

    let closedMenuBar = document.getElementById('closedNav')
    closedMenuBar.style.visibility = "hidden"

    var displayTicketsByDepDiv = document.getElementById("display-ticket-numbers");
    displayTicketsByDepDiv.style.display = "none";

    let openMenuBar = document.getElementById('openNav')
    openMenuBar.style.visibility = "hidden"

    let signoutMenuBar = document.getElementById('signoutNav')
    signoutMenuBar.style.visibility = "hidden"
}

start();

function login() {
    let username = document.getElementById('usernameInput').value;
    let password = document.getElementById('passwordInput').value;
    let url = `/api/login/${username}/${password}`


    fetch(url)
        .then(res => {

            let feedback = document.getElementById('loginFeedback')
            feedback.innerText = ""

            if (res.ok) {
                feedback.appendChild(document.createTextNode(`Welcome back ${username}!`))
                res.json()
                    .then(data => {
                        id = data.employeeID;
                        populateTables();
                    })
                getTypeOfUser(username)
            } else {
                feedback.appendChild(document.createTextNode("Invalid credentials."))
            }
        })

    isLoggedIn = true;
}

function getTypeOfUser(username) {
    let innerUrl = `/api/login/role/${username}`

    fetch(innerUrl)
        .then(res => res.json()
            .then(
                data => {
                    title = data.title
                    display(title);
                }
            ))
}

function display(user) {
    var loginDiv = document.getElementById("loginBox");
    loginDiv.style.display = "none";

    let loginMenuBar = document.getElementById('loginNav')
    loginMenuBar.style.visibility = "hidden"

    if (user === "Issuer") {
        var createTicketDiv = document.getElementById("create-ticket");
        createTicketDiv.style.display = "block";

        let createMenuBar = document.getElementById('createNav')
        createMenuBar.style.visibility = "visible"
    }

    else if (user === "Manager") {
        var assignTicketDiv = document.getElementById("assign-ticket");
        assignTicketDiv.style.display = "block";

        let assignMenuBar = document.getElementById('assignNav')
        assignMenuBar.style.visibility = "visible"
    }

    else if (user === "Technician") {
        var editTicketDiv = document.getElementById("edit-ticket");
        editTicketDiv.style.display = "block";

        var viewOpenTicketsDiv = document.getElementById("view-open-tickets");
        viewOpenTicketsDiv.style.display = "block";
        
        let editMenuBar = document.getElementById('editNav')
        editMenuBar.style.visibility = "visible"
    }

    var technicianSalaryDiv = document.getElementById("technician-salary");
    technicianSalaryDiv.style.display = "block";

    let salaryMenuBar = document.getElementById('salaryNav')
    salaryMenuBar.style.visibility = "visible"

    var displayClosedTicketsDiv = document.getElementById("display-closed-tickets");
    displayClosedTicketsDiv.style.display = "block";

    let closedMenuBar = document.getElementById('closedNav')
    closedMenuBar.style.visibility = "visible"

    var displayTicketsByDepDiv = document.getElementById("display-ticket-numbers");
    displayTicketsByDepDiv.style.display = "block";

    let openMenuBar = document.getElementById('openNav')
    openMenuBar.style.visibility = "visble"

    let signoutMenuBar = document.getElementById('signoutNav')
    signoutMenuBar.style.visibility = "visible"
}

function logout() {
    if (!isLoggedIn) {
        let feedback = document.getElementById('loginFeedback')
        feedback.innerText = ""
        feedback.appendChild(document.createTextNode("Please Sign In First!"))
    }
    else if (isLoggedIn) {
        let feedback = document.getElementById('loginFeedback')
        feedback.innerText = ""
        feedback.appendChild(document.createTextNode("Successfully Signed Out."))
    }
    isLoggedIn = false;

    start();
}

function assignTicket() {
    const managerID = parseInt(document.getElementById('managerIDInput').value)
    const technicianID = parseInt(document.getElementById('technicianIDInput').value)
    const ticketID = parseInt(document.getElementById('ticketIDInput').value)
    let url = "/api/assigns/assignTicket"

    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ managerID: managerID, technicianID: technicianID, ticketID: ticketID })
    })
        .then(res => {
            let feedback = document.getElementById('assignTicketFeedback')
            feedback.innerText = ""

            if (res.ok) {
                feedback.appendChild(document.createTextNode(`Inserted Assigns.`))
            } else {
                feedback.appendChild(document.createTextNode("Invalid credentials."))
            }
        })
}

function technicianSalary() {
    const level = document.getElementById('levelInput').value
    let url = `/api/technician/maxSalary/${level}`

    fetch(url)
        .then(res => {
            let feedback = document.getElementById('technicianSalaryFeedback')
            feedback.innerText = ""

            if (res.ok) {
                res.json()
                    .then(salary => {
                        if (salary.salary) {
                            feedback.appendChild(document.createTextNode(`The maximum salary for level ${level} is $${salary.salary}`))
                        } else {
                            feedback.appendChild(document.createTextNode(`Invalid level.`))
                        }
                    })
            } else {
                feedback.appendChild(document.createTextNode("Invalid level."))
            }
        })
}

function createTicket() {
    const userID = parseInt(document.getElementById('userIDInput').value)
    const issuerID = parseInt(document.getElementById('issuerIDInput').value)
    const subject = document.getElementById('subjectInput').value
    const description = document.getElementById('descriptionInput').value
    const software = document.getElementById('softwareInput').value
    let url = "/api/ticket/create"

    fetch(url, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userID: userID, issuerID: issuerID, subject: subject, description: description, software: software })
    })
        .then(res => {
            let feedback = document.getElementById('createTicketFeedback')
            feedback.innerText = ""

            if (res.ok) {
                feedback.appendChild(document.createTextNode(`Inserted Ticket.`))
            } else {
                feedback.appendChild(document.createTextNode("Invalid Input."))
            }
        })
}

function editTicket() {
    const technicianID = parseInt(document.getElementById('technicianIDInput2').value)
    const ticketID = parseInt(document.getElementById('ticketIDInput2').value)
    const state = document.getElementById('stateInput').value
    const techNotes = document.getElementById('techNotesInput').value
    let url = "/api/ticket/technicianEdit"

    fetch(url, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ technicianID: technicianID, ticketID: ticketID, state: state, techNotes: techNotes })
    })
        .then(res => {
            let feedback = document.getElementById('editTicketFeedback')
            feedback.innerText = ""

            if (res.ok) {
                feedback.appendChild(document.createTextNode(`Ticket modified successfully!`))
            } else {
                feedback.appendChild(document.createTextNode("Invalid Input."))
            }
        })
}
