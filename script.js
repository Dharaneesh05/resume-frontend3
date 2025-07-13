// ✅ Set this to your deployed backend URL
const BACKEND_BASE_URL = 'https://your-backend-url.onrender.com';

document.getElementById('buildResume').addEventListener('click', async function() {
    // Get input values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;

    // Prepare data for API
    const resumeData = { name, email, phone, education, experience, skills };

    try {
        // Make API call to generate resume
        // const response = await fetch('http://127.0.0.1:5000/generate_resume', {
        const response = await fetch(`${BACKEND_BASE_URL}/generate_resume`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resumeData),
        });

        // Check if response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Parse JSON response
        const result = await response.json();

        // Display resume (assuming the API returns the formatted resume)
        document.getElementById('outputName').textContent = result.name || name;
        document.getElementById('outputEmail').textContent = result.email || email;
        document.getElementById('outputPhone').textContent = result.phone || phone;
        document.getElementById('outputEducation').textContent = result.education || education;
        document.getElementById('outputExperience').textContent = result.experience || experience;
        document.getElementById('outputSkills').textContent = result.skills || skills;
        document.getElementById('resumeOutput').classList.remove('hidden');

        // Analyze resume (client-side for now)
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
