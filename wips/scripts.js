window.onload = function() {
    fetch('/api/episodes')
        .then(response => response.json())
        .then(data => {
            const episodesDiv = document.getElementById('episodes');
            data.forEach(episode => {
                console.log(episode);
                const episodeDiv = document.createElement('div');
                episodeDiv.className = 'episode';

                const title = document.createElement('h2');
                title.textContent = episode.title;
                episodeDiv.appendChild(title);

                const showNotes = document.createElement('div');
                const showNotesDiv = document.createElement('div');
                showNotesDiv.innerHTML = episode.showNotes; // Setting the HTML content
                episodeDiv.appendChild(showNotesDiv);

                const player = document.createElement('audio');
                player.src = episode.link;
                player.setAttribute('id', episode.title);
                player.setAttribute('controls', '');
                episodeDiv.appendChild(player);



                episodesDiv.appendChild(episodeDiv);


                // Add more elements like show notes, date, etc.

                episodesDiv.appendChild(episodeDiv);
            });
        });
};