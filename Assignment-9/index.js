function openBookingForm(service) {
    document.getElementById('appointment-modal').style.display = 'block';
    document.getElementById('service').value = service;
}

function closeModal() {
    document.getElementById('appointment-modal').style.display = 'none';
}

document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let service = document.getElementById('service').value;
    let datetime = document.getElementById('datetime').value;
    let terms = document.getElementById('terms').checked;

    if (name === "" || !validateEmail(email) || phone.length !== 10 || !terms || new Date(datetime) < new Date()) {
        alert("Please fill in the form correctly.");
        return;
    }

    let appointment = {
        name: name,
        service: service,
        datetime: datetime,
        status: 'Pending'
    };

    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    document.getElementById('confirmation-message').innerText = `Thank you, ${name}! Your appointment for ${service} on ${datetime} is confirmed.`;
    document.getElementById('confirmation-popup').style.display = 'flex';

    document.getElementById('appointment-form').reset();
    closeModal();

    displayAppointments();
});

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function closeConfirmationPopup() {
    document.getElementById('confirmation-popup').style.display = 'none';
}

function displayAppointments() {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    let appointmentsBody = document.getElementById('appointments-body');
    appointmentsBody.innerHTML = ''; 

    appointments.forEach(appointment => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.name}</td>
            <td>${appointment.service}</td>
            <td>${new Date(appointment.datetime).toLocaleString()}</td>
            <td>${appointment.status}</td>
        `;
        appointmentsBody.appendChild(row);
    });
}

window.onload = displayAppointments;

