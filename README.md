# 🎟️ Ticketmaster Events Calendar

A responsive web application that displays live Ticketmaster events using an interactive calendar UI. Built with React and FullCalendar, this app allows users to search and filter events by city, keyword, category, and date range — and view event details in a sleek modal popup.

## 🌐 Live Demo
[https://ticketmaster-calendar.vercel.app](https://ticketmaster-calendar.vercel.app)

## 🚀 Features

- 📆 **Interactive Calendar View**
  - Toggle between month, week, and day views
  - View events directly on the calendar
- 🔍 **Dynamic Filtering**
  - Search by keyword
  - Filter by city
  - Select from event categories (music, sports, arts, etc.)
  - Filter events by start and end date
- 📄 **Event Detail Modal**
  - Click an event to view details, including venue and description
  - Link to purchase tickets via Ticketmaster
- 🌐 **Live Deployment**
  - Hosted on Vercel
  - CI/CD integration via GitHub

## 🧱 Tech Stack

| Frontend  | API               | UI Components    | Hosting     |
|-----------|------------------|------------------|-------------|
| React (Vite) | Ticketmaster Discovery API | FullCalendar.js | Vercel      |

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/ticketmaster-calendar.git
cd ticketmaster-calendar

### 2. Install Dependencies

npm install

### 3. Add Environment Variable

Create a .env file in the project root:

VITE_TICKETMASTER_API_KEY=your_api_key_here

🎫 Get your API key from developer.ticketmaster.com

### 4. Run Locally

npm run dev

Then open your browser at:
http://localhost:5173

📁 Project Structure

ticketmaster-calendar/
├── public/
├── src/
│   ├── App.jsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.jsx        # React entry point
├── .env                # Environment variable
├── vite.config.js      # Vite configuration
└── package.json

📦 Deployment

Push to GitHub
Connect the repo to Vercel
Add the environment variable VITE_TICKETMASTER_API_KEY under project settings
Deploy 🎉
✨ Future Enhancements

Mobile responsiveness
Loading spinners and error states
Save favorite events (localStorage)
Map integration with venue locations
Calendar theme customization
📝 License

MIT