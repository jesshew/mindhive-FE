import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { API_BASE_URL, ENDPOINTS } from '../constants';

const funResponses = [
  "Sorry, I don't know the answer to this question. Could you rephrase it another way?",
  "Hmm, that's a mystery I can't solve. How about another question?",
  "Hmm, I'm caught in a 'hive' of confusion on this one. Can you reframe your question?",
  "I'm lost in the maze on this one. Can you ask me about something else?",
  "My circuits are spinning on this question. Looks like I need an oil change— ;( ",
  "I wish I knew, but I'm just a chatbot. Can you try asking in a different way?",
  "I'm 'hive'-ly impressed by your question, but sadly my 'mind' is elsewhere. What else can I help with?",
  "This one's a puzzle! Can you give me a clue?",
  "Whoops! Looks like I need a hint. Can you rephrase that for me?",
];

const mathResponses = [
  "Sorry, numbers aren't my strong suit. How about we stick to words? ;)",
  "Counting? That's not my forte. Let's chat about fascinating facts instead!",
  "Math and I don't mix well, but I'm a whiz with words! Ask me something wordy instead!",
  "I'm better with letters than numbers. How about we explore some interesting facts together?",
  "Counting? More like 'can't-ing' for me! Let's switch gears and dive into some cool facts!",
  "Numbers and I have a complicated relationship, but I'm fluent in fascinating facts. Ask away!",
];

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResponse, setSearchResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Randomly choose a response
  const getRandomResponse = (responseList) => {
    const randomIndex = Math.floor(Math.random() * responseList.length);
    return responseList[randomIndex];
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.SEARCH}`, { query: searchQuery });
      if (response.data.response.includes("I don't know.")) {
        setSearchResponse(getRandomResponse(funResponses));
      } else if (/(count|number)/i.test(response.data.response))  {
        setSearchResponse(getRandomResponse(mathResponses));
      }
      else {
        setSearchResponse(response.data.response);
        setError('');
      }
    } catch (error) {
      console.error('LLM query error:', error);
      setSearchResponse('');
      setError('An error occurred while searching.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleButtonClick = () => {
    handleSearch();
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Let's hive a chat about what's on your mind! ;)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button
          className="search-button"
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? (
            'Searching...'
          ) : (
            'Search'
          )}
        </Button>
      </div>

      <div className="response-card">
        <h5 className="rresponse-title">Search Response:</h5>
        <p className="response-text">
        {loading ? 'Working on it...' : (searchResponse || error || 'No search results yet.')}
        </p>

      </div>
    </>
  );
};

export default Search;
