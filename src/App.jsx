import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';

export default function App() {
  const [events, setEvents] = useState([]);
  const [city, setCity] = useState('Miami');
  const [keyword, setKeyword] = useState('');
  const [segment, setSegment] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const fetchEvents = async () => {
    try {
      const res = await axios.get('https://app.ticketmaster.com/discovery/v2/events.json', {
        params: {
          apikey: '9kZDlyNDqhB8H4Uiug3dDOnqw75zvvJT', // replace this
          city: city || undefined,
          keyword: keyword || undefined,
          segmentId: segment || undefined,
          startDateTime: startDate ? `${startDate}T00:00:00Z` : undefined,
          endDateTime: endDate ? `${endDate}T23:59:59Z` : undefined,
          size: 50
        }
      });
      const data = res.data._embedded?.events || [];
      const formatted = data.map(event => ({
        title: event.name,
        date: event.dates.start.localDate,
        extendedProps: {
          description: event.info || 'No description available.',
          url: event.url,
          venue: event._embedded.venues[0].name
        }
      }));
      setEvents(formatted);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents(); // Initial load
  }, []);

  const handleEventClick = ({ event }) => {
    setSelectedEvent({
      title: event.title,
      venue: event.extendedProps.venue,
      description: event.extendedProps.description,
      url: event.extendedProps.url
    });
  };  

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: 1000, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>🎟️ Live Events Calendar</h1>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ marginRight: 10, padding: '8px', width: 200 }}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{ marginRight: 10, padding: '8px', width: 150 }}
        />
        <select
  value={segment}
  onChange={(e) => setSegment(e.target.value)}
  style={{ marginRight: 10, padding: '8px' }}
>
  <option value="">All Segments</option>
  <option value="KZFzniwnSyZfZ7v7nJ">Music</option>
  <option value="KZFzniwnSyZfZ7v7nE">Sports</option>
  <option value="KZFzniwnSyZfZ7v7na">Arts & Theater</option>
  <option value="KZFzniwnSyZfZ7v7nn">Film</option>
  <option value="KZFzniwnSyZfZ7v7n1">Miscellaneous</option>
  <option value="KZFzniwnSyZfZ7v7nI">Family</option>
  <option value="KZFzniwnSyZfZ7v7nJ">Concerts</option>
</select>
<input
  type="date"
  value={startDate}
  onChange={(e) => setStartDate(e.target.value)}
  style={{ marginRight: 10, padding: '8px' }}
/>
<input
  type="date"
  value={endDate}
  onChange={(e) => setEndDate(e.target.value)}
  style={{ marginRight: 10, padding: '8px' }}
/>

        <button onClick={fetchEvents} style={{ padding: '8px 16px', cursor: 'pointer' }}>
          Search
        </button>
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          start: 'prev,next today',
          center: 'title',
          end: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events}
        eventClick={handleEventClick}
      />
 
  {selectedEvent && (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999
      }}
      onClick={() => setSelectedEvent(null)} // Close on backdrop click
    >
      <div
        onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicked
        style={{
          background: '#fff',
          padding: 30,
          borderRadius: 10,
          maxWidth: 500,
          width: '90%',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
          textAlign: 'center'
        }}
      >
        <h2>{selectedEvent.title}</h2>
        <p><strong>Venue:</strong> {selectedEvent.venue}</p>
        <p>{selectedEvent.description}</p>
        <a
          href={selectedEvent.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            marginTop: 10,
            display: 'inline-block',
            background: '#007bff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: 5,
            textDecoration: 'none'
          }}
        >
          Buy Tickets
        </a>
        <div style={{ marginTop: 20 }}>
          <button onClick={() => setSelectedEvent(null)}>Close</button>
        </div>
      </div>
    </div>
  )}
     </div>
);
}
