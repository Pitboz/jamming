let accessToken = "";
const clientID = 'eac99a1de38544dcb63d442a02b8d39b';
const redirectURI = 'http://localhost:3000/';

const Spotify = {
    getAccessToken() {

        if(accessToken) {
            return accessToken;
        }

        const url = window.location.href;
        const tokenInURL = url.match(/access_token=([^&]*)/);
        const expires = url.match(/expires_in=([^&]*)/);

        if(tokenInURL && expires){
            
            accessToken = tokenInURL[1];
            const expiration = expires[1];
            window.setTimeout(() => accessToken='', expiration * 1000);
            window.history.pushState('Access Token', null, '/');
        }

        if(accessToken.length === 0 && !tokenInURL){
            window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
        }
    },
    
    async search(term) {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`,{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.getAccessToken()
            }
        });
        const json = await response.json();
        const tracks = json.tracks.items.map((value) => {
            return {
                id: value.id,
                name: value.name,
                artist: value.artists[0].name,
                album: value.album.name,
                URI: value.uri
            };
        });
        return tracks;
    },

    async savePlaylist(playlistName, trackURIs){

        //Some sort of warning needed that the title of the playlist needs to be changed for this to work
        if(playlistName.length === 0 || trackURIs.length === 0) {
            return;
        };
        
        const headers = {
            Authorization: 'Bearer ' + this.getAccessToken(),
            "Content-Type": "application/json"
        };

        let response = await fetch(`https://api.spotify.com/v1/me`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + this.getAccessToken()
            },
        });

        let json = await response.json();
        const userID = json.id;
        let data = {
            "name": playlistName
        }

        response = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        json = await response.json();
        data = {
            "uris": trackURIs
        };
        const playlistID = json.id;

        response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        json = await response.json();

    },
};

export default Spotify;