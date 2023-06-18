import React from "react";
import "./SearchBar.css";
import Spotify from "../../util/Spotify";

function SearchBar(props) {

    let searchTerm = '';

    function search(term) {
        props.onSearch(term);
    }

    function handleTermChange(event) {
        searchTerm = event.target.value;
    }

    function submitRequest() {
        search(Spotify.search(searchTerm));
    }

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song, Album, or Artist" onChange={handleTermChange}/>
            <button className="SearchButton" onClick={submitRequest}>SEARCH</button>
        </div>
    );
}

export default SearchBar;