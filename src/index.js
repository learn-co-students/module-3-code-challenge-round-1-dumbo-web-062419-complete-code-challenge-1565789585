document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 1 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTitle = document.getElementById("name");
  const imgSrc = document.getElementById("image");
  const commentsUL = document.getElementById("comments");
  const likes = document.getElementById("likes");
  const likeButton = document.getElementById("like_button")

    fetch("https://randopic.herokuapp.com/images/3181")
      .then(r => r.json())
      .then(data => renderData(data))


function renderData(data) {
  imgTitle.innerText = data.name;
  imgSrc.src = data.url;
  commentsUL.innerHTML += 
  `<li>${data.comments.content}`;
  likes.innerText = parseInt(data.like_count);

  }

likeButton.addEventListener("click", function() {
  likes.innerText ++ ;
})

// postLikes("https://randopic.herokuapp.com/likes", {image_id: 3181, like_count: likes.innerText})



// fetch("https://randopic.herokuapp.com/likes")
//   method: "POST",
//   headers: {
//   'Accept': 'application/json',
//   'Content-Type': 'application/json'
// },
//   body: JSON.stringify(data)
//   .then(res => res.json())






})