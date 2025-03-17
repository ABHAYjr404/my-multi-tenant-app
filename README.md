# Multi-Tenant School Profile Application

This is a multi-tenant school profile application built with Next.js 14+, Prisma, NextAuth (Credentials Provider), and Tailwind CSS. The application displays different school information based on the subdomain accessed, and provides an admin dashboard for authenticated administrators to edit their school’s details.

## Project Overview

- **Subdomain-based Routing:**  
  Public school profiles are displayed based on the subdomain (e.g. `school1.localhost:3000`).

- **Admin Dashboard:**  
  Admin users can log in via NextAuth and access a dedicated admin page to update their school’s information (name, description, and contact).

- **API Routes:**  
  Built-in API endpoints handle fetching and updating school data.

- **Database:**  
  Prisma with SQLite is used as the database, containing two tables: `School` and `Profile`.

- **Responsive UI:**  
  Styled with Tailwind CSS for a modern, responsive design.

## Tech Stack

- **Next.js 14+ (App Router)**  
- **Prisma ORM (SQLite)**  
- **NextAuth (Credentials Provider)**  
- **Tailwind CSS**  
- **React**  

## Project Structure
```
my-multi-tenant-app/
├── app/
│   ├── [school]/
│   │   └── page.jsx                // Public school profile page (read-only)
│   ├── admin/
│   │   └── page.jsx                // Admin dashboard for login and school editing
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │         └── route.js      // NextAuth API route (admin authentication)
│   │   └── schools/
│   │       └── [id]/
│   │             └── route.js      // API route for fetching/updating school data
│   └── layout.jsx                 // Root layout (Server Component)
├── components/
│   └── ClientProviders.jsx        // Client-only provider wrapper (for NextAuth)
├── lib/
│   └── db.js                      // Prisma Client and helper functions
├── prisma/
│   └── schema.prisma              // Prisma schema defining School and Profile models
├── styles/
│   └── globals.css                // Global Tailwind CSS styles
├── next.config.js                 // Next.js configuration (rewrites, etc.)
├── tailwind.config.js             // Tailwind CSS configuration
├── postcss.config.js              // PostCSS configuration
├── package.json                   // Project dependencies and scripts
└── README.md                      // This file
```

## Setup Instructions

1. **Clone the Repository**
```
   git clone https://github.com/yourusername/my-multi-tenant-app.git
   cd my-multi-tenant-app
```
2. **Install Dependencies**
```
   npm install
```
3. **Run Prisma Migrations and Generate the Client**
```
   npx prisma migrate dev --name init
   npx prisma generate
```
4. **(Optional) Seed the Database**
   "Use your seed script (if available) to add initial records for School and Profile."
```
   node prisma/seed.js
```

6. **Run Prisma Studio**
```
   npx prisma studio
```
   "Use Studio to inspect and manage your database records."

7. **Running the Application**
   
   Start the development server:
```
   npm run dev
```
## Usage
Public School Page
Access the public profile by visiting a URL based on the subdomain, 
e.g.: http://school1.localhost:3000 for the school with subdomain school1.
The public page displays the school’s name, description, and contact details in read-only mode.

Admin Dashboard
Admin Login:
Visit http://localhost:3000/admin and log in using your admin credentials (from the Profile table).

Edit School Data:
After a successful login, the admin dashboard will display a pre-filled form with the school's details (name, description, and contact). 
You can update the data and click “Update School Info” to send a PUT request to the API.

Logout:
The admin can also log out using the “Logout” button.

## Screenshots

![](public/Screenshot%20(60).png)
![](public/Screenshot%20(61).png)
![](public/Screenshot%20(62).png)
![](public/Screenshot%20(63).png)
![](public/Screenshot%20(64).png)
![](public/Screenshot%20(67).png)
