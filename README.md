# Allara's Scheduling system

**Overview**

This project is a telehealth scheduling system designed to manage and optimize telehealth appointments for healthcare providers. The current implementation includes a backend server built with Node.js and Express, and a frontend built with React.

**Current Code Setup**

_Backend (Node.js with Express)_	
- Server Setup: The backend server listens on port 3001 and provides APIs to manage healthcare providers and their schedules.
- Endpoints:
  - GET `/providers`: Retrieve all providers.
  - POST `/providers`: Add a new provider.
  - GET `/schedule`: Get the appointment schedule for all providers.

_Frontend (React)_
- Components: The frontend includes components to display the list of providers, add a new provider, and view the schedule.
- API Integration: The frontend communicates with the backend using fetch requests to manage providers and schedules.

We would like you to build upon the existing system to help our concierge team. 

**Implement Additional Functionality:**

1. Edit Provider:
- Add an “Edit” button next to each provider in the providers list.
- When the “Edit” button is clicked, populate the form fields with the provider’s current details.
- Allow the user to update the provider’s details and save the changes.
2. Delete Provider:
- Add a “Delete” button next to each provider in the providers list
- When the “Delete” button is clicked, remove the provider from the list and update the backend.
3. Update UI to be more user-friendly 
4. Implement form validations and error handling in the frontend

Bonus: 

5. Provider search and filter 
6. Pagination

Feel free to approach these in whatever order you would like, but we'd love for you to discuss your approach and any product considerations with us before you start coding!
