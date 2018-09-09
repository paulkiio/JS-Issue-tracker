function fetchIssues () {
    let issues = JSON.parse(localStorage.getItem('issues')),
        issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';
}