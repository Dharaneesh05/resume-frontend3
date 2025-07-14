// Use global BACKEND_BASE_URL from main.js
const BACKEND_BASE_URL = window.BACKEND_BASE_URL;

document.getElementById('buildResume').addEventListener('click', async function() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    const resumeData = { name, email, phone, education, experience, skills };

    try {
        const response = await fetch(`${BACKEND_BASE_URL}/generate_resume`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resumeData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        document.getElementById('outputName').textContent = result.name || name;
        document.getElementById('outputEmail').textContent = result.email || email;
        document.getElementById('outputPhone').textContent = result.phone || phone;
        document.getElementById('outputEducation').textContent = result.education || education;
        document.getElementById('outputExperience').textContent = result.experience || experience;
        document.getElementById('outputSkills').textContent = result.skills || skills;
        document.getElementById('resumeOutput').classList.remove('hidden');

        let completenessIssues = [];
        if (!name) completenessIssues.push('Name is missing.');
        if (!email) completenessIssues.push('Email is missing.');
        if (!education) completenessIssues.push('Education is missing.');
        if (!experience) completenessIssues.push('Work experience is missing.');
        if (!skills) completenessIssues.push('Skills are missing.');

        const completenessMessage = completenessIssues.length > 0 
            ? `<strong>Completeness Check:</strong> Issues found - ${completenessIssues.join(' ')}`
            : '<strong>Completeness Check:</strong> All required fields are filled.';

        const techKeywords = ['python', 'javascript', 'sql', 'java', 'react', 'node'];
        const userSkills = skills.toLowerCase().split(',').map(skill => skill.trim());
        const matchedKeywords = userSkills.filter(skill => techKeywords.includes(skill));
        const keywordMessage = matchedKeywords.length > 0 
            ? `<strong>Keyword Match:</strong> Found relevant skills - ${matchedKeywords.join(', ')}.`
            : '<strong>Keyword Match:</strong> No relevant tech skills found. Consider adding skills like Python, JavaScript, or SQL.';

        document.getElementById('completenessCheck').innerHTML = completenessMessage;
        document.getElementById('keywordMatch').innerHTML = keywordMessage;
        document.getElementById('analysisOutput').classList.remove('hidden');
    } catch (error) {
        console.error('Error generating resume:', error);
        alert('Failed to generate resume. Check the console for details.');
    }
});
