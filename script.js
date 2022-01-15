let artist_name = ""
let song_name = ""

document.getElementById("previous").style.display = "none"


function list_songs(artist, song) {
    let api_key = "51a4048bb0c0585454fb141080d508ad"
    document.getElementById("result").innerHTML = ""
    document.getElementById("previous").style.display = "block";
    document.getElementById("search-container").style.display = 'none';
    document.getElementById("search-container-2").style.display = 'none';
    document.getElementById("artist-label").style.display = 'none';
    document.getElementById("song-label").style.display = 'none';
    document.getElementById("songs-like").innerHTML = "Songs Like " + song.toUpperCase();
    document.getElementById("songs-like").style.paddingTop = "30px";
    document.getElementById("result").style.display = "block";
    document.getElementById("enterButton").style.display = "none";
    $(document).ready(function() {
        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song +"&autocorrect[0|1]&api_key=" + api_key +"&limit=15&format=json", function(json) {
            var html = '';
            try {
                $.each(json.similartracks.track, function(i, item) {
                    html += "<h3 class='results-line" + i + "' id='results-line" + i + "'><a href=" + item.url + " target='_blank'>" + item.name + " By " + item.artist.name + "</a></h3>";
                });
            } catch (error) {
                html = '';
                alert("An Error Acoured, Most Likely That Isn't A Song")
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
            }
            $('#result').append(html)
        });
    });
}




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
}


function button_pressed() {
    let songSearchInput = document.getElementById("search-text-2")
    let artistSearchInput = document.getElementById("search-text")
    songSearchInput.value && artistSearchInput.value ? list_songs(artistSearchInput.value, songSearchInput.value) : null;
}