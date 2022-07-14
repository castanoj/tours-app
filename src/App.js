import React, { useState, useEffect } from 'react';
import Loading from './components/Loading';
import Tours from './components/Tours';
import { Container } from 'react-bootstrap';

const url = 'https://course-api.com/react-tours-project';

function App() {
  const [loading, setLoading] = useState(false);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch(url);
      const tours = await response.json();

      setTours(tours);
    } catch (error) {
      setLoading(false);
    }
  };

  const removeTour = id => {
    const newTours = tours.filter(tour => tour.id !== id);
    setTours(newTours);
  };

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <Container>
      <main>
        {loading ? (
          <Loading />
        ) : (
          <Tours tours={tours} removeTour={removeTour} />
        )}
      </main>
    </Container>
  );
}

export default App;
