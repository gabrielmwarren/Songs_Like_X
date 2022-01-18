let artist_name = "";
let song_name = "";
const api_key = "51a4048bb0c0585454fb141080d508ad";

document.getElementById("previous").style.display = "none";
document.getElementById("show_btn").style.display = "none";



function list_songs(artist, song) {
    document.getElementById("result").innerHTML = ""
    document.getElementById("previous").style.display = "block";
    document.getElementById("search-container").style.display = 'none';
    document.getElementById("search-container-2").style.display = 'none';
    document.getElementById("artist-label").style.display = 'none';
    document.getElementById("song-label").style.display = 'none';
    document.getElementById("songs-like").style.paddingBottom = "40px";
    document.getElementById("songs-like").innerHTML = "Songs Like " + song.toUpperCase();
    document.getElementById("songs-like").style.paddingTop = "30px";
    document.getElementById("result").style.display = "block";
    document.getElementById("enterButton").style.display = "none";
    $(document).ready(function() {
        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song +"&autocorrect[0|1]&api_key=" + api_key +"&limit=25&format=json", function(json) {
            var html = '';
            try {
                html += `;
                <table class="table table-hover table-song-head">
                    <thead>
                        <tr>
                        <th scope="col">List:</th>
                        <th scope="col">Artist</th>
                        <th scope="col">Song</th>
                        <th scope="col">Duration</th>
                        <th scope="col">Play</th>
                        </tr>
                    </thead>
                    <tbody>`;
                $.each(json.similartracks.track, function(i, item) {
                    let artist = item.artist.name;
                    let song = item.name;
                    let song_duration_string = "" + item.duration;
                    let noSpaceArtist = artist.replace(/\s/g, '');
                    let noSpaceSong = song.replace(/\s/g, '-');
                    noSpaceArtist = noSpaceArtist.replace(/é/gi, "e");
                    noSpaceArtist = noSpaceArtist.replace(/é/gi, "e");
                    if (!(song_duration_string == "0") && !(song_duration_string == "undefined")) {
                        var song_duration = song_duration_string.slice(0, 1) + "." + song_duration_string.slice(1, 3) + " mins";
                    } else {
                        var song_duration = "No Value";
                    };
                    html += `<tr class="table-primary">
                                <th scope="row">Song:</th>
                                <td>` + item.artist.name +`</td>
                                <td>`+ item.name +`</td>
                                <td>` + song_duration +`</td>
                                <td><button class="btn play-btn" id="play-btn" onclick="show_soundcloud('${noSpaceArtist}', '${noSpaceSong}')"><i class="far fa-play-circle fa-2x"></i></button></td>
                            </tr>`
                    
                });
                html += "</tbody>";;
                $('#result').append(html);
            }
            catch (error) {
                html = '';
                alert("An Error Acoured, Most Likely That Isn't A Song");
                document.getElementById("result").style.display = "none";
                document.getElementById("previous").style.display = "none";
                document.getElementById("copyright").style.paddingTop = "500px"
                document.getElementById("search-container").style.display = 'block';
                document.getElementById("search-container-2").style.display = 'block';
                document.getElementById("artist-label").style.display = 'block';
                document.getElementById("song-label").style.display = 'block';
                document.getElementById("songs-like").innerHTML = "Songs Like:"
                document.getElementById("songs-like").style.paddingTop = "100px";
                document.getElementById("enterButton").style.display = "block";
                document.getElementById("copyright").style.paddingTop = "250px";
                document.getElementById("songs-like").style.paddingBottom = "0px";
                $('#result').append(html);
            };
        });
    });
};




function returnToHome() {
    document.getElementById("previous").style.display = "none";
    document.getElementById("copyright").style.paddingTop = "320px"
    document.getElementById("search-container").style.display = 'block';
    document.getElementById("search-container-2").style.display = 'block';
    document.getElementById("artist-label").style.display = 'block';
    document.getElementById("song-label").style.display = 'block';
    document.getElementById("songs-like").innerHTML = "Songs Like:"
    document.getElementById("songs-like").style.paddingTop = "100px";
    document.getElementById("copyright").style.paddingTop = "250px"
    document.getElementById("result").style.display = "none";
    document.getElementById("enterButton").style.display = "block";
    document.getElementById("songs-like").style.paddingBottom = "0px";
    document.getElementById("match-list").style.display = "table";
    document.getElementById("match-list-2").style.display = 'table';
};


function button_pressed() {
    let songSearchInput = document.getElementById("search-text-2");
    let artistSearchInput = document.getElementById("search-text");
    songSearchInput.value && artistSearchInput.value ? list_songs(artistSearchInput.value, songSearchInput.value) : null;
};

function hide_player() {
    document.getElementById("soundcloud").style.display = "none";
    document.getElementById("show_btn").style.display = "block";
};

function show_player() {
    document.getElementById("soundcloud").style.display = "block";
    document.getElementById("show_btn").style.display = "none";
};

function show_soundcloud(artist, song) {
    show_player();
    let html = ``;
    let url = "https://w.soundcloud.com/player/?url=https://soundcloud.com/" + artist + "/" + song;
    console.log(url);
    html = `<button class="btn" onclick="hide_player()"><i class="fas fa-times-circle"></i></button>`;
    html += `<iframe width="100%" height="80" scrolling="no" frameborder="no" allow="autoplay" src="${url}"></iframe>`;
    document.getElementById("soundcloud").innerHTML = html;
};


const searchArtists = async searchText => {
    document.getElementById("match-list").style.display = "table";
    document.getElementById("match-list").style.margin = "0 auto";
    const res = await fetch("http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" + document.getElementById("search-text").value + "&api_key=" + api_key + "&limit=3&format=json");
    const artists = await res.json();
    try {
        var matches = artists.results.artistmatches.artist
    } catch (error) {
        var matches = []
        document.getElementById("match-list").innerHTML = ''
    }
    outputHtml(matches, "artist")
};

const searchSongs = async searchText2 => {
    document.getElementById("match-list-2").style.display = "table";
    document.getElementById("match-list-2").style.margin = "0 auto";
    const res = await fetch("http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + document.getElementById("search-text-2").value + "&api_key=" + api_key + "&limit=3&format=json");
    const songs = await res.json();
    try {
        var matches = songs.results.trackmatches.track
    } catch (error) {
        var matches = []
        document.getElementById("match-list-2").innerHTML = ''
    }
    outputHtml(matches, "song")
};

function outputHtml(matches, field){
    if(matches.length > 0) {
        const html = matches.map(match => `
        <button class="btn" onclick="fillText('${match.name}', '${field}')">
            <div class="card border-info mb-3">
                <div class="card-header">${match.name}</div>
            </div>
        </button>
        `).join('');
        if(field === "artist") {
            document.getElementById("match-list").innerHTML = html
        } else {
            document.getElementById("match-list-2").innerHTML = html
        }
    }
}

function fillText(itemName, field) {
    if(field === "artist") {
        document.getElementById("search-text").value = itemName;
        document.getElementById("match-list").innerHTML = '';
        document.getElementById("match-list").style.display = 'none';
    } else {
        document.getElementById("search-text-2").value = itemName;
        document.getElementById("match-list-2").innerHTML = '';
        document.getElementById("match-list-2").style.display = 'none';
    }
}

document.getElementById("search-text").addEventListener('input', () => searchArtists(document.getElementById("search-text").value));
document.getElementById("search-text-2").addEventListener('input', () => searchSongs(document.getElementById("search-text-2").value));

