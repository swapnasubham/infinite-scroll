// DOM Element
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Image Load Variable
let ready = false;
let imageLoad = 0;
let totalImage = 0;

// Empty Array
let photoArray = [];

// UnSplash API
let count = 5;
const apiKey = "Obtsg8Q3Fl0OMtbc45WXDo2mrZ70ElHu1iCwd1OGqaQ";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Function Check Image Loaded or Not
function imageLoaded(){
    console.log("Image Loaded");
    imageLoad++;
    if(imageLoad === totalImage){
        ready = true;
        loader.hidden = true;
        count = 10;
        apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
    }
}
// Helper Function for set attribute on DOM element
function setDomAttribute(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Get Element For Links, Photos and Add to DOM
function displayPhoto(){
    imageLoad = 0;
    totalImage = photoArray.length;
    photoArray.forEach((photo) => {
        // Anchor Tag
        const item = document.createElement("a");
        setDomAttribute(item, {href : photo.links.html, target: "_blank"})
        // Image Tag
        const img = document.createElement("img");
        setDomAttribute(img, {src: photo.urls.regular, alt: photo.alt_description, title: photo.alt_description});
        // Event Listner, Check When Each is finished loading Loading 
        img.addEventListener("load",imageLoaded);
        // Put Image Inside Anchor Tag then Put both inside image-container element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// Get Photos from UnSplash API
async function getPhotos(){
    try {
        const response = await fetch(apiURL);
        photoArray = await response.json();
        displayPhoto();
    }
    catch (error){
        console.error(error);
    }
}
// Check to see if scrolling near bottom of page, Load More Photo
window.addEventListener("scroll",()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});
// On Load
getPhotos();