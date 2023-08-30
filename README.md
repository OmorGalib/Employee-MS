# Employee Management System

## Motivation:
1. The project enables users to create, store, and manage Employee Records, including payroll and leave application.
2. Facilities: Payroll system and leave application.
Employee and task management.
3. Technology Used:
REACT JS, NODE JS, EXPRESS, MySQL DB
1. GitHub Repository: https://github.com/OmorGalib/Employee-MS
## Installation

1. Backend Dependencies/Packages:
   
       >cd Backend
       >npm install express mysql cors nodemon bcrypt cookie-parser jsonwebtoken multer
2. Frontend Dependencies/Packages:
   
       >npm init vite

         select project name: ... fontend
         select framework : React
         select varient : Javascript
         >cd fontend
         >npm install
         >npm install Bootstrap react-router-dom axios

## User Guide

1. To Run the Project:
   
   Open XAMPP and start Apache and MySQL services.
2. Run the backend:

         >cd Backend
         >npm start

3. Run the frontend:

         >cd frontend
         >npm run dev

## Testing

1. Login.test.js

         import React from 'react';
         import { render, fireEvent, waitFor, screen } from '@testing-library/react';
         import '@testing-library/jest-dom/extend-expect'; // For enhanced matching assertions
         import axiosMock from 'axios'; // Mocking axios for API calls
         import Login from './Login';

         jest.mock('axios'); // Mock axios calls

         test('Login form submission', async () => {
           // Mocked axios.post returns a resolved promise with a custom response
           axiosMock.post.mockResolvedValue({ data: { Status: 'Success' } });

           render(<Login />);

           fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
           fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

           fireEvent.click(screen.getByText('Log in'));

           // Wait for the form submission and response handling
           await waitFor(() => {
             expect(axiosMock.post).toHaveBeenCalledWith(
               'http://localhost:8081/login',
             );
             // Test whether the user is navigated to the home page after successful login
             expect(screen.getByText('Welcome to the Dashboard')).toBeInTheDocument();
           });
         });


2. AddEmployee.test.js

         import React from 'react';
         import { render, fireEvent, waitFor, screen } from '@testing-library/react';
         import '@testing-library/jest-dom/extend-expect'; // For enhanced matching assertions
         import axiosMock from 'axios'; // Mocking axios for API calls
         import AddEmployee from './AddEmployee';

         jest.mock('axios'); // Mock axios calls

         test('AddEmployee form submission', async () => {
           // Mocked axios.post returns a resolved promise with a custom response
           axiosMock.post.mockResolvedValue({ data: { Status: 'Success' } });

           render(<AddEmployee />);

           fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
           fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
           // ... simulate filling out other fields ...

           // Simulate form submission
           fireEvent.click(screen.getByText('Create'));

           // Wait for the form submission and response handling
           await waitFor(() => {
             expect(axiosMock.post).toHaveBeenCalledWith(
               'http://localhost:8081/create',
             );
             // Test whether a success message is displayed or not
             expect(screen.getByText('Employee added successfully')).toBeInTheDocument();
           });
         });

3. LeaveApplication.test.js

         import React from 'react';
         import { render, screen, fireEvent } from '@testing-library/react';
         import axios from 'axios'; // You might want to mock axios for testing
         import LeaveApplication from './LeaveApplication';

         // Mock axios for testing
         jest.mock('axios');

         describe('LeaveApplication', () => {
           it('submits the form with user input', async () => {
             const mockNavigate = jest.fn();
             const mockParams = { id: '123' };

             // Mock useParams
             jest.mock('react-router-dom', () => ({
               useParams: () => mockParams,
               useNavigate: () => mockNavigate,
             }));

             render(<LeaveApplication />);

             // Simulate user input
             fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'John Doe' } });
             fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'john@example.com' } });
             fireEvent.change(screen.getByLabelText('Start Date'), { target: { value: '2023-08-30' } });
             fireEvent.change(screen.getByLabelText('End Date'), { target: { value: '2023-09-05' } });
             fireEvent.change(screen.getByLabelText('Reason'), { target: { value: 'Vacation' } });

             // Mock axios post request
             axios.post.mockResolvedValueOnce({});

             // Submit the form
             fireEvent.click(screen.getByText('Apply'));

             // Expect axios post to be called with correct data
             expect(axios.post).toHaveBeenCalledWith('http://localhost:8081/apply', expect.any(FormData));

             // Expect navigation to be called
             expect(mockNavigate).toHaveBeenCalledWith('/employeeDetail/123');
           });
         });

4. EditEmployee.test.js

         import React from 'react';
         import { render, screen, fireEvent } from '@testing-library/react';
         import axios from 'axios'; // You might want to mock axios for testing
         import EditEmployee from './EditEmployee';

         // Mock axios for testing
         jest.mock('axios');

         describe('EditEmployee', () => {
           it('submits the form with user input', async () => {
             const mockNavigate = jest.fn();
             const mockParams = { id: '123' };

             // Mock useParams
             jest.mock('react-router-dom', () => ({
               useParams: () => mockParams,
               useNavigate: () => mockNavigate,
             }));

             // Mock axios get request
             axios.get.mockResolvedValueOnce({
               data: {
                 Result: [
                   {
                     name: 'John Doe',
                     email: 'john@example.com',
                     address: '1234 Main St',
                     salary: '50000',
                   },
                 ],
               },
             });

             render(<EditEmployee />);

             // Expect initial input values to be set correctly
             expect(screen.getByLabelText('Name').value).toBe('John Doe');
             expect(screen.getByLabelText('Email').value).toBe('john@example.com');
             expect(screen.getByLabelText('Address').value).toBe('1234 Main St');
             expect(screen.getByLabelText('Salary').value).toBe('50000');

             // Simulate user input
             fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Jane Smith' } });
             fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'jane@example.com' } });

             // Mock axios put request
             axios.put.mockResolvedValueOnce({ data: { Status: 'Success' } });

             // Submit the form
             fireEvent.click(screen.getByText('Update'));

             // Expect axios put to be called with correct data
             expect(axios.put).toHaveBeenCalledWith('http://localhost:8081/update/123', {
               name: 'Jane Smith',
               email: 'jane@example.com',
               address: '1234 Main St',
               salary: '50000',
             });

             // Expect navigation to be called
             expect(mockNavigate).toHaveBeenCalledWith('/employee');
           });
         });

5. delete.test.js

         const request = require('supertest');
         const app = require('./app'); // Import your Express app

         describe('DELETE /delete/:id', () => {
           it('should delete an employee with a given ID', async () => {
             const employeeIdToDelete = 123; // Replace with the actual employee ID

             // Send a DELETE request to the endpoint
             const response = await request(app).delete(`/delete/${employeeIdToDelete}`);

             // Assert the response
             expect(response.status).toBe(200);
             expect(response.body).toEqual({ Status: 'Success' });

             // You might want to add additional assertions to verify that the employee was actually deleted from the database
           });

           it('should return an error if employee deletion fails', async () => {
             const employeeIdToDelete = 456; // Replace with the actual employee ID

             // Mock the database error by modifying the app's route handler
             app.delete('/delete/:id', (req, res) => {
               const id = req.params.id;
               return res.status(500).json({ Error: 'delete employee error in sql' });
             });

             // Send a DELETE request to the endpoint
             const response = await request(app).delete(`/delete/${employeeIdToDelete}`);

             // Assert the response
             expect(response.status).toBe(500);
             expect(response.body).toEqual({ Error: 'delete employee error in sql' });
           });
         });

## Conclusion

1. Future enhancements:

   Adding features for HR users.

   Salary calculation and payment integration.

2. Admin capabilities:
   
      Access to user information and activities and check attandance.