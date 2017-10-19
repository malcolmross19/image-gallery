const apiEndPoint =
    "https://api.unsplash.com/search/photos?page=1&query=travel&client_id=628a9768332e7da922f8b0e4748f0d7f66139de9a0a1ea55b244cfd1d562fdf5";
let galleryContent = '';

// Event Listeners
window.addEventListener('load', function() {
    let url = apiEndPoint;

    // Instantiate new instance of XHR object
    let request = new XMLHttpRequest();

    // Send the request
    request.overrideMimeType('application/json');
    request.open('GET', url, false);


    request.onreadystatechange = function() {
        let responseObject = JSON.parse(request.responseText); // Parse the data from JSON

        for(let i = 0; i < responseObject.results.length; i++){
            galleryContent += '<article class=picture>';
            galleryContent += '<img src=' + responseObject.results[i].urls.regular + ' ';
            galleryContent += 'srcset="' + responseObject.results[i].urls.regular + ', ';
            galleryContent += responseObject.results[i].urls.regular + '" ';
            galleryContent += 'sizes="(max-width:300px) 100vw,';
            galleryContent += '(max-width:600px) 33vw,';
            galleryContent += '300px" ';
            galleryContent += 'alt="' + responseObject.results[i].description + '" />';
            galleryContent += '<div class=overlay>';
            galleryContent += '<img src="images/user-icon.svg" alt="user icon" class="user" /><p class="user">';
            galleryContent += responseObject.results[i].user.name + '</p>';
            galleryContent += '<img src="images/heart.svg" alt="likes" class="likes" /><p class=likes>';
            galleryContent += responseObject.results[i].likes + '</p>';
            galleryContent += '</div>';
            galleryContent += '</article>';
        }
    };

    request.send();

    let gallery = document.querySelector('#gallery');

    if(galleryContent){
        gallery.innerHTML = galleryContent;
    }

}, false);