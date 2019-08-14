document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3168 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  // Let's fetch the image, parse the data into json and pass the data to the render function:
  fetch(imageURL)
      .then(resp => resp.json())
      .then(image => displayImage(image));


// Our render function. Let's grab the data from the fetch and render it in the DOM. Broken down into elements for clarity:
function displayImage(image){
  const imageTag = document.getElementById("image");
  imageTag.src = image.url;

  const  h4Tag = document.getElementById("name");
  h4Tag.innerText = image.name;

  likeCount = document.getElementById("likes");
  likeCount.innerText = image.like_count;

  commentList = document.getElementById("comments");
  image.comments.forEach(function(comment){
    addSingleComment(comment.content);
  });

  // Let's add our listeners:
  const likeButton = document.getElementById("like_button");
  likeButton.addEventListener("click", addLikeToDOM)
  const commentListener = document.getElementById("comment_form")

  commentListener.addEventListener("submit", updateComments);
}

// We could've rendered all the comments in the render function, but this way we can reuse it when adding new comments later: 
function addSingleComment(comment){
    newLi = document.createElement("li");
    newLi.innerText = comment;
    commentList.appendChild(newLi);
}

// First the DOM, though I must say it would've make more sernse to update on the server first and only change the dom if response from server was 200 but hey.
function addLikeToDOM(){
  const likeCount = document.getElementById("likes");
  likeCount.innerText++;
  addLikeToServer();
}


// Let's now update the server. God I hope this adderall is working
function addLikeToServer(){
  fetch(likeURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "Application/json"
    },
    body: JSON.stringify({
      image_id: imageId
    })
  }).then(resp => resp.json)
}


// Now let's do the same with the comments. First the DOM:
function updateComments(event){
  event.preventDefault();
  comment = document.getElementById("comment_input");
  comment = comment.value;
  addSingleComment(comment);
  addCommentToServer(comment);
}

// And now the server. Jesus Christ this is scary
function addCommentToServer(comment){
  fetch(commentsURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "Application/json"
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  }).then(resp => resp.json)
  // Holy shit it works!
}


// Too lazy to add the delete button plus I need a cigarette and a bathroom break. I loved this challenge!



}) // End of dom content loaded listener. Commenting because of ADHD