import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [searchResults, setSearchResults] = React.useState([]);

  const [playlistName, setPlaylistName] = React.useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = React.useState([]);

  function addTrack(newTrack) {
    let currentPlaylist = playlistTracks;

    if ( ! currentPlaylist.some( (value) => value.id === newTrack.id) ) {
      setPlaylistTracks([
        ...currentPlaylist,
        newTrack
      ]);
    }
  };

  function removeTrack(removeTrack) {
    let currentPlaylist = playlistTracks;
      setPlaylistTracks(
        currentPlaylist.filter( a => removeTrack.id !== a.id )
      );
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
