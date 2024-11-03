const cron = require('node-cron');
const nodemailer = require('nodemailer');
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'appointments'
});

// Setup email transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});

// Cron job runs every day at 8 AM
cron.schedule('0 8 * * *', () => {
    // Query upcoming appointments within 24 hours
    db.query('SELECT * FROM appointments WHERE appointment_time BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 DAY)', (err, appointments) => {
        if (err) throw err;
        appointments.forEach(appointment => {
            // Send reminder email
            const mailOptions = {
                from: 'your-email@gmail.com',
                to: appointment.email,
                subject: 'Appointment Reminder',
                text: `Reminder: You have an appointment on ${appointment.appointment_time}.`,
            };
            transporter.sendMail(mailOptions);
        });
    });
});
