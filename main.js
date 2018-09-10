document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e) {
    let issueDesc = document.getElementById('issueDescriptionInput').value,
        issueSeverity = document.getElementById('issueSeverityInput').value,
        issueAssignTo = document.getElementById('issueAssignToInput').value,
        issueId = chance.guid(),
        issueStatus = 'Open';

    let issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignTo,
        status: issueStatus
    };

    if (localStorage.getItem('issues') === null) {
        let issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    } else {
        let issues = JSON.parse(localStorage.getItem(issues));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    document.getElementById(issueInputForm).reset();

    fetchIssues();

    e.preventDefault();
}

function fetchIssues () {
    let issues = JSON.parse(localStorage.getItem('issues')),
        issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (let i = 0; i < issues.length; i++) {
        let id = issues[i].id,
            desc = issues[i].description,
            severity = issues[i].severity,
            assignedTo = issues[i].assignedTo,
            status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID:' + id +'</h6>'+
                                '<p><span class="label label-info">' + status + '</span></p>'+
                                '<h3>'+ desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>'+
                                '<a href="#" class="btn btn-warning" onclick="setStatusCloesd(\''+id+'\')">Close</a>'+
                                '<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
                                '</div>';
    }
}