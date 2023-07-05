import React, { useState } from "react";
import "./SearchBar.css";
import axios from "axios";
import Card from "./Card";
import KGCard from "./KgCard";
import { MagnifyingGlass } from "react-loader-spinner";

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    sendRequest(searchQuery);
    setSearchQuery("");
  };

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const sendRequest = (query) => {
    setIsLoading(true);
    axios
      .post(`https://go-glyph-v2-f53b68856ba5.herokuapp.com/api/glyph/${query}`)
      .then((response) => {
        // Handle successful response
        setResponseData(response.data);
        setError(null);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        // Log the error message
        setResponseData(null);
        setError(error.message);
        setIsLoading(false);
        console.log("Error:", error.message);
      });
  };

  const sortResponseData = (data) => {
    return data.sort((a, b) => {
      if (a.Minute === b.Minute) {
        return a.Second - b.Second;
      } else {
        return a.Minute - b.Minute;
      }
    });
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter Match ID"
        />
        <button type="submit">Submit</button>
      </form>

    <div className="loading-spinner">
      {isLoading && (
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      )}
      </div>
      

      {responseData && !isLoading && (
        <div className="response-data">
          <ul>
            {sortResponseData(responseData).map((item, index) => (
              <Card
                key={index}
                heroID={item.HeroID}
                username={item.Username}
                minute={item.Minute}
                second={item.Second}
                team={item.Team}
              />
            ))}
          </ul>
        </div>
      )}

      {error && (
        <div className="error">
          <h2>Error:</h2>
          <p>{error}</p>
          <img src= "404.jpeg" alt = "error"></img>
        </div>
      )}


      {responseData && (
        <div className="test">
          <KGCard responseData={responseData} />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
