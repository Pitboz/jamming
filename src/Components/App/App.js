import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  let searchTerm = '';

  const [searchResults, setSearchResults] = React.useState([{}]);

  const [playlistName, setPlaylistName] = React.useState("");
  const [playlistTracks, setPlaylistTracks] = React.useState([{}]);

  function addTrack(newTrack) {
    let currentPlaylist = playlistTracks;

    //This check doesn't work
    if(!currentPlaylist.includes.call(newTrack.id)){
      setPlaylistTracks([
        ...currentPlaylist,
        newTrack
      ]);
    }
  };

  
  //Need to rework this function because it doesn't work at all
  function removeTrack(removeTrack) {
    let currentPlaylist = playlistTracks;
    const indexOfTrack = currentPlaylist.indexOf.call(removeTrack.id);
    //if(indexOfTrack !== -1){
      setPlaylistTracks(
        currentPlaylist.filter( a => removeTrack.id !== a.id )
      );
    //}

    setPlaylistTracks(currentPlaylist);
  }

  function updatePlaylistName(newName){
    setPlaylistName(newName);
  }

  function savePlaylist() {
    const trackURIs = [];
    playlistTracks.forEach( (value) => {
      if(value.URI){
        trackURIs.push(value.URI);
      }
    });
    Spotify.savePlaylist(playlistName, trackURIs);

  }

  async function search(term) {
    const newTerms = await term;
    setSearchResults(newTerms);
  }

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar 
        onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
          searchResults={searchResults} 
          onAdd={addTrack} />
          <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks} 
          onRemove={removeTrack} 
          onNameChange={updatePlaylistName} 
          onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
