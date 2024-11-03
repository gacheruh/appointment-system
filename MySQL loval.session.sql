CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    appointment_time DATETIME,
    status ENUM('pending', 'confirmed', 'cancelled')
);

CREATE TABLE time_slots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    business_id INT,
    start_time DATETIME,
    end_time DATETIME,
    available BOOLEAN
);

--@block
DROP TABLE time_slotss;