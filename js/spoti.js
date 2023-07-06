const client_id = '44947ef27c964ddab3f9f8f81aa2480e';
const client_secret = 'f4605509e468429fa5986f53cc72bb7f';
//Obtener token
const getToken = async () => {
  const credentials = `${client_id}:${client_secret}`;
  const base64Credentials = btoa(credentials);

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${base64Credentials}`
    },
    body: 'grant_type=client_credentials'
  });

  if (response.ok) {
    const data = await response.json();
    return data.access_token;
  } else {
    throw new Error('Failed to get access token');
  }
};

getToken()
  .then(token => {
    console.log('Access token:', token);
    
    // Mostrar el reproductor de Spotify embebido
    const embedContainer = document.getElementById('embed-iframe');
    const iframe = document.createElement('iframe');
    iframe.src = `https://open.spotify.com/embed/playlist/3mR5qpa0FvFhTlH6H1elP3`;
    iframe.width = '100%';
    iframe.height = '380';
    iframe.frameBorder = '0';
    iframe.allowtransparency = 'true';
    iframe.allow = 'encrypted-media';
    embedContainer.appendChild(iframe);
    
    fetch('https://api.spotify.com/v1/playlists/0h6PX89y3K9Fm5rCNcVZ3Y', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        // Acceder a los detalles de la lista de reproducción
        const playlistName = data.name;
        const playlistDescription = data.description;
        const playlistTracks = data.tracks.items;

        // Mostrar la información en el HTML
        const playlistNameElement = document.getElementById('playlist-name');
        playlistNameElement.textContent = playlistName;

        const playlistDescriptionElement = document.getElementById('playlist-description');
        playlistDescriptionElement.textContent = playlistDescription;

        const playlistTracksElement = document.getElementById('playlist-tracks');
        playlistTracks.forEach(track => {
          const trackName = track.track.name;
          const trackArtist = track.track.artists.map(artist => artist.name).join(', ');

          const trackElement = document.createElement('li');
          trackElement.textContent = `${trackName} by ${trackArtist}`;
          playlistTracksElement.appendChild(trackElement);
        });
      })
      .catch(error => {
        console.error('Error al obtener los detalles de la lista de reproducción:', error);
      });
  })
  .catch(error => {
    console.error('Error:', error);
  });