// Declare as global variable to avoid redeclaration
window.BACKEND_BASE_URL = 'https://resume-backend-1-3ypj.onrender.com';

function login() {
    const email = document.getElementById('admin_email').value;
    const password = document.getElementById('admin_password').value;
    fetch(`${window.BACKEND_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.reload();
        } else {
            alert(data.message);
        }
    });
}

function logout() {
    fetch(`${window.BACKEND_BASE_URL}/logout`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            window.location.reload();
        }
    });
}

function selectResume(resumeId) {
    if (resumeId) {
        fetch(`${window.BACKEND_BASE_URL}/select_resume/${resumeId}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    window.location.reload();
                }
            });
    }
}
