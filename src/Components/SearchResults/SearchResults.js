import React from "react";
import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

function SearchResults(props) {

    return (
        <div className="SearchResults">
            <h2>Results</h2>
            <TrackList 
            searchResults={props.searchResults} 
            onAdd={props.onAdd} 
            isRemoval={false} ></TrackList>
        </div>
    );
}

export default SearchResults;