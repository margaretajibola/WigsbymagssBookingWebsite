# 💇‍♀️ Wigs by Magss – Booking Website  

A modern full-stack booking platform for wig and hair services, built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, **Prisma**, and **PostgreSQL**.  

## ✨ Overview  
Wigs by Magss is a web application that allows clients to easily browse services, select dates, and book appointments online.  
It provides an intuitive interface for users and a management dashboard for the business owner to view, update, and manage bookings efficiently.  

## 🛠️ Built With  
- [React](https://react.dev/)  
- [Next.js](https://nextjs.org/) (App Router)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [PostgreSQL](https://www.postgresql.org/)  
- [Prisma ORM](https://www.prisma.io/)  
- [Playwright](https://playwright.dev/) for end-to-end testing  

## 🚀 Getting Started  

### Prerequisites  
- Node.js (v18 or later)  
- PostgreSQL database  
- npm or yarn package manager  

### Installation  
1. Clone the repository: git clone https://github.com/margaretajibola/WigsbymagssBookingWebsite.git
2. Navigate into the project directory: cd WigsbymagssBookingWebsite/my-booking-app
3. Install dependencies: npm install
4. Create a .env file in the root directory and include your own environment variables (depending on your setup):
# Example variables – adjust based on your configuration
DATABASE_URL="your_postgresql_connection_url"
NEXTAUTH_SECRET="your_generated_secret_key"
NEXTAUTH_URL="http://localhost:3000"
5. Apply database migrations and generate the Prisma client:
npx prisma migrate dev
npx prisma generate
6. Start the development server: npm run dev
7. Visit http://localhost:3000 to view the app.

🧩 Features
- Responsive UI with Tailwind CSS
- Browse services and pricing
- Select appointment dates and book sessions
- View bookings via client dashboard
- Admin dashboard for service management
- PostgreSQL database with Prisma ORM
- End-to-end testing using Playwright
- Built with type safety and scalability in mind

🧪 Testing
Run Playwright tests:
npx playwright test

View test results:
npx playwright show-report

