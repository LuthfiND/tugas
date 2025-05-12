// pages/events/[id].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const EventDetailPage = () => {
  const { query } = useRouter();
  const { id } = query; // Mendapatkan id dari URL params

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchEventDetails = async () => {
        try {
          const response = await axios.get(`/api/events/${id}`);
          setEvent(response.data); // Menyimpan data event
        } catch (error) {
          setError('Event not found or error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchEventDetails();
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (!event) return <p>No event data</p>;

  return (
    <div className="event-detail">
  
    </div>
  );
};

export default EventDetailPage;
