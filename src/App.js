
import React, { useState } from 'react';
import './test.css'
import Title from './Title';


function App() {
  const [bookTitle, setBookTitle] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (event) => {
    setBookTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://192.168.0.104:5000/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ book_title: bookTitle }),
      });
      const data = await response.json();
      const recommendationsArray = Object.keys(data).map((key) => data[key]);
      setRecommendations(recommendationsArray);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Error retrieving recommendations. Please try again.');
    }
  };

  return (
    
    <div>
      <form className="form-container" onSubmit={handleSubmit}>
      <div className="App">
      <Title />
    </div>
        <label>
          Recommendation For 
          <div><input type="text" value={bookTitle} onChange={handleInputChange} />
            </div>
        </label>
        <button type="submit">Get Recommendations</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
      <div className="grid-container">
        {recommendations.map((recommendation, index) => (
          <div key={index} className="grid-item">
            <img src={recommendation['Image-URL-S']} alt={recommendation.Title} />
            <p>Title: {recommendation.Title}</p>
            <p>Author: {recommendation['Author Name']}</p>
            <p>Rating: {recommendation['Highest Rating']}</p>
            <p>Year: {recommendation['Published Year']}</p>
            <p>Distance: {recommendation.Distance}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
