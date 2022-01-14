let artist_name = ""
let song_name = ""

function list_songs(artist, song) {
    document.getElementById("search-wrapper").style.display = 'none';
    document.getElementById("search-wrapper-2").style.display = 'none';
    document.getElementById("artist-label").style.display = 'none';
    document.getElementById("song-label").style.display = 'none';
    document.getElementById("songs-like").innerHTML = "Songs Like: " + song
    document.getElementById("songs-like").style.paddingTop = "30px";
    document.getElementById("copyright").style.paddingTop = "20px"
    $(document).ready(function() {
        $.getJSON("http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist=" + artist + "&track=" + song +"&autocorrect[0|1]&api_key=51a4048bb0c0585454fb141080d508ad&limit=15&format=json", function(json) {
            var html = '';
            try {
                $.each(json.similartracks.track, function(i, item) {
                    html += "<h3><a href=" + item.url + " target='_blank'>" + item.name + " By " + item.artist.name + "</a></h3>";
                });
            } catch (error) {
                document.getElementById("search-wrapper").style.display = 'block';
                document.getElementById("search-wrapper-2").style.display = 'block';
                document.getElementById("artist-label").style.display = 'block';
                document.getElementById("song-label").style.display = 'block';
                document.getElementById("songs-like").innerHTML = "Songs Like:"
                document.getElementById("songs-like").style.paddingTop = "100px";
                document.getElementById("copyrght").style.paddingTop = "450px"
                alert("An Error Acoured, That Probobly Isn't A Song")
            }
            $('#result').append(html);
        });
    });
}


function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
        else {
            let artistSearchInput = document.getElementById("search-input").value
            document.getElementById("search-input-2").value ? list_songs(artistSearchInput, document.getElementById("search-input-2").value) : alert("Please Fill Out All Properties.")
        }
}

function searchToggle2(obj, evt){
    var container = $(obj).closest('.search-wrapper-2');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input-2').val('');
        }
        else {
            let searchInput = document.getElementById("search-input-2").value
            document.getElementById("search-input").value ? list_songs(document.getElementById("search-input").value, searchInput) : alert("Please Fill Out All Properties.")
        }
}