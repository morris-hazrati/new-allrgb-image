// Captures input from form and prepares string
function captureForm() {
    // Flickr API key
    var api_key = "239125bcc03d4efa36227d1e4eec735a";

    // Store this variable  as an image tag
    var searchTerm = document.getElementById("search").value;

    if(searchTerm) {
        // Construct the search query string
        var formatImgURL =
            "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="
            + api_key
            + "&tags="
            + searchTerm
            //+ "&format=rest";
            +"&format=json&nojsoncallback=1";

        // Pass the formatImgURL, the api_key and search term to the readLink() function
        readLink(formatImgURL, api_key, searchTerm);
    }
    else {
        alert("Please enter a search string");
        return false;
    }
}

// Read the generated link
function readLink(searchString, api_key, searchFor) {
    //document.getElementById("searchString").innerHTML = "<b>Search string: </b>" + searchString;
    console.log("Search string: " + searchString);
    document.getElementById("searchedFor").innerHTML = "<b>You searched for: </b>" + searchFor;

    // Display the loading image whilst AJAX loads the images
    $(".loading").css({"display":"block"});


    // jQuery to retrieve JSON content
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: searchString,
            dataType: "json",
            success: jsonParser(searchString, searchFor) // callback function to run once the AJAX request succeeds
        });
    });
}

function jsonParser(searchString, searchFor) {

    // Empty the current gallery before beginning a new search
    $("#imageGallery").empty();

    // JSON request to Flickr
    $.getJSON(searchString, function (data) {


        console.log(data);
        console.log("Photos found: " + data.photos.total);
        if (data.photos.total != 0) {
            document.getElementById("resultsCount").innerHTML = "<b>" + data.photos.total + " results found</b>";
        } else {
            document.getElementById("resultsCount").innerHTML = "<b>Your search returned no results</b>";
            $(".loading").fadeOut();
        }

        $.each(data.photos.photo, function (i, item) {

            var farmId = item.farm;
            var serverId = item.server;
            var id = item.id;
            var secret = item.secret;
            // This is the title of the image to be used for the caption
            var title = item.title;

            // Construct the image url as per the format defined in the 'Flickr Photo Source URLs' page
            // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg

            $("#imageGallery").append(
                '<div class="imageContainer">'
               +'<p class="caption">'
               + title + '</p>'
               + '<a target="_blank" href="exif.html'
               + '?' + farmId + '?' + serverId + '?' + id + '?' + secret + '?' + title + '"'
               + '><img class="image" src=https://farm'
               + farmId
               + '.staticflickr.com/'
               + serverId
               + '/'
               + id
               + '_'
               + secret
               + '.jpg"/></a></div>');

            $(".loading").fadeOut();
        });
    });
}

// EXIF related set of functions
function captureAttrib() {
    var href = window.location.href;
    //document.getElementById("capturedAttrib").innerHTML = "<b>The captured HREF is: </b>" + href;
    console.log("The captured HREF is: " + href);

    // Parse the href variable and extract the necessary attributes: farmId, serverId, id, secret and title
    // We shall parse by splitting the string based on the delimiter '?'
    var output = href.split("?");
    var farmId_attrib = output[1];
    var serverId_attrib = output[2];
    var id_attrib = output[3];
    var secret_attrib = output[4];
    var title_attrib = decodeURI(output[5]);  // decodeURI strips off the %20 and replaces it with a space

    // Log to console
    console.log("farmId_attrib = " + farmId_attrib);
    console.log("serverId_attrib = " + serverId_attrib);
    console.log("id_attrib = " + id_attrib);
    console.log("secret_attrib = " + secret_attrib);
    console.log("title_attrib = " + title_attrib);

    // Pass the attribute values to this function
    showImage(farmId_attrib, serverId_attrib, id_attrib, secret_attrib, title_attrib);
}

function showImage(farmId_attrib, serverId_attrib, id_attrib, secret_attrib, title_attrib) {
    // Build the URL and display the larger version of the image
    // The suffix 'b' before the image type refers to the large image size
    $("#largerImage").append(
        '<div class="largeImageContainer center">'
        +'<h2>'
        + title_attrib + '</h2>'
        + '<img class="fluid-img" alt="Image of ' + title_attrib + '" src=https://farm'
        + farmId_attrib
        + '.staticflickr.com/'
        + serverId_attrib
        + '/'
        + id_attrib
        + '_'
        + secret_attrib
        + '_b.jpg"/></div>');

    // Pass photo_id to the getEXIF function
    getEXIF(id_attrib);
}

function getEXIF(photo_id) {
    // Flickr API key
    var api_key = "239125bcc03d4efa36227d1e4eec735a";

    // Construct the EXIF query string
    var formatExifURL =
        "https://api.flickr.com/services/rest/?method=flickr.photos.getExif&api_key="
        + api_key
        + "&photo_id="
        + photo_id
        +"&format=json&nojsoncallback=1";

    // Display the EXIF URL
    //document.getElementById("generatedXrifURL").innerHTML = "<b>EXIF request URL is: </b>" + formatExifURL;
    console.log("EXIF request URL is: " + formatExifURL);

    // Display the loading image whilst AJAX loads the images
    $(".loading").css({"display":"block"});

    // jQuery to retrieve JSON content
    $(document).ready(function() {
        $.ajax({
            type: 'GET',
            url: formatExifURL,
            dataType: "json",
            success: jsonExifParser(formatExifURL) // callback function to run once the AJAX request succeeds
        });
    });
}

function jsonExifParser(formatExifURL) {

    // This flag relates to the Error Codes that are provided if something is wrong with the EXIF service
    // Default setting for flag = 0, relates to 'no errors' being present and that EXIF can load
    var error = 0;

    // JSON request to Flickr
    $.getJSON(formatExifURL, function (data) {
        console.log("Output of the getEXIF method is: " + data.photo);
        console.log("ERROR CODE response from the service, if available: " + data.code);

        // Check the error status
        if(data.code) {
            error = data.code;
        }

        if(error == 0) {
            $("#heading").append(
                '<div class="title">Title</div>'
                +'<div class="value">Value</div>');

            $.each(data.photo.exif, function (i, item) {

                var label = item.label;
                var raw_content = item.raw._content;

                $("#content ul").append(
                    '<li class="clearfix">'
                    +'<div id="exifTitle" class="exifcontent"><p>'
                    + label
                    +'</p></div>'
                    +'<div id="exifValue" class="exifcontent"><p>'
                    + raw_content
                    +'</p></div></li>');

                $(".loading").fadeOut();
            });
        } else if (error == 2) {
            document.getElementById("exifTitle").innerHTML = "<strong>EXIF data has not been made public</strong>";
            $(".loading").fadeOut();
            error = 0;
        } else {
            document.getElementById("exifTitle").innerHTML = "<strong>EXIF data could not be retrieved!</strong>";
            $(".loading").fadeOut();
            error = 0;
        }
    });
}