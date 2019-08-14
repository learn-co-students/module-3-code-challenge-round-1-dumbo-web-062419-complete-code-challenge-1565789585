// 1. First, I start with checking what constants I have
// 2. I need to fetch
// 3. Slap it on the DOM
// For that, I need to create an li and append it to the UL
// Target appendUL (inside is the createdLI)
// 4. add EventListener (to make sure the scope doesn't break). This will have a callback function.


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  //-------------------const-------------------------------------------

  const URL = "https://randopic.herokuapp.com/"

  let imageId = 3185 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  var node = document.createElement("LI");
  const UL = document.querySelector( "#image_content" )

//-------------------fetch------------------------------------------------

fetch(imageURL)
  .then(response => response.json())
  .then(data => slapToTheDOM)


  //JSON.stringify(myJSON)

  // fetch('http://example.com/movies.json')
  // .then(function(response) {
  //   return response.json();
  // })
  // .then(function(myJson) {
  //   console.log(JSON.stringify(myJson));
  // });



//-------------------slapToTheDOM-----------------------------------------
function slapToTheDOM(data) {
var node = document.createElement("LI");
createdLI = document.getElementById("LI");
targetUL.append(createdLI)
//   var placedPic = document.getElementById("image_content").imageURL
//
//   console.log("Done")
// }

var img = document.createElement("image_content");
img.src = imageURL;

var src = document.getElementById("header");
src.appendChild(img);

}


// I need to append the LI that I created to the UL that my document contains
// I need to take the container (UL), add the .innerHTML and +=
// Then I add the required working, paying particular attention to wrapping the
// <img src=""</img>

//-------------------eventListeners---------------------------------------




})
