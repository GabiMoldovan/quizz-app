-- SELECT * FROM sys.sql_logins;
-- CREATE DATABASE [quizz-app-db];

USE [quizz-app-db];



/*
CREATE TABLE users (
    id INT PRIMARY KEY IDENTITY(1,1),
    nume NVARCHAR(50) NOT NULL,
    prenume NVARCHAR(50) NOT NULL,
    email NVARCHAR(100) UNIQUE NOT NULL,
    parola NVARCHAR(100) NOT NULL,
    grad NVARCHAR(10) DEFAULT 'user'
);
*/


SELECT * FROM users

-- DELETE FROM users