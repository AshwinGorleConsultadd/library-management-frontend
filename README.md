# Library Management System - React Frontend

This is the frontend for the Library Management System, built with **React**, **TypeScript**, **Redux Toolkit**, and **shadcn/ui**.

It provides a modern, responsive interface for managing:

-  Books (Create, Read, Update, Delete)
-  Members (Users with role-based access)
-  Issued Books (Issue, Return, View History)
-  Auth (Login, Logout)

The frontend is fully integrated with the FastAPI backend using REST APIs and offers a smooth admin experience with dialogs, filters, search, and table views.

---

## Initial Setup

###  Tech Requirements

- Node.js 18+
- pnpm (or npm/yarn)
- Git

---

## Installation Steps

### Install Dependencies

If you are using **pnpm** (recommended):

    pnpm install

Or with **npm**:

    npm install

### Set Up Environment Variables

Create a `.env` file in the root directory with the following content:

    VITE_API_BASE_URL=http://localhost:8000/api

### Start the Development Server

With **pnpm**:

    pnpm dev

Or with **npm**:

    npm run dev

### Open the App in Your Browser

    http://localhost:5173

# Demo
## 1. Issue Book Feature
Admin can issue books to the members of library form here. this comes up with all the required validations for example checks for availability of the book is beging alloted.

<img width="1437" alt="Screenshot 2025-06-18 at 2 34 25 PM" src="https://github.com/user-attachments/assets/47b6553b-f043-4cb2-b49d-eadb4cfe8484" />

## 2. Allocation History Panel
The pannel shows the book allocation history like which book is alloted to which member when it is retured etc.
also comes up with date filter, status filter and search for the specific record

<img width="1437" alt="Screenshot 2025-06-18 at 2 34 25 PM" src="https://github.com/user-attachments/assets/33354838-0e80-4643-85a3-61c3d200cd0e" />

## 3. Book Panel
Provides features to maintain book : create, update, search and delete books. (allong with basic validations)

<img width="1438" alt="Screenshot 2025-06-18 at 2 35 31 PM" src="https://github.com/user-attachments/assets/b7b197b4-d716-473a-ae5f-8661cbd69fbd" />

## 4. Member Pannel
Provides features to maintain members : create, update, search and delete books. (allong with basic validations)

<img width="1436" alt="Screenshot 2025-06-18 at 2 36 09 PM" src="https://github.com/user-attachments/assets/eaa2a1ee-7d7a-4673-8303-055a42003317" />

## 5. Authentication
Provides complete authentication fllow : login, signup , verify email with otp etc.
<img width="1423" alt="Screenshot 2025-06-18 at 2 39 45 PM" src="https://github.com/user-attachments/assets/e9525d25-5687-40d9-b72d-b6d5881506d0" />

## 6. Responsive Design
The application supports both large and small screens 

<img width="381" alt="Screenshot 2025-06-18 at 3 52 49 PM" src="https://github.com/user-attachments/assets/32bdbb20-f18a-4c3c-85dc-402015e682ea" />

## 7. Toast
The application proides feedback and confirmation of user action and errors

<img width="884" alt="Screenshot 2025-06-18 at 4 24 03 PM" src="https://github.com/user-attachments/assets/2aa54971-6b8f-4767-8520-a06306cec9f2" />




