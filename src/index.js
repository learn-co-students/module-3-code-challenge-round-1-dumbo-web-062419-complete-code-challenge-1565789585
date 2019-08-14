document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3177 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/3177`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageDiv = document.getElementById("image_card")
  const image = document.getElementById('image')
  const imageTitle = document.getElementById('name')
  const likes = document.getElementById("likes")
  const likebutton = document.getElementById("like_button")


// FETCH IMAGE

  fetch("https://randopic.herokuapp.com/images/3177")
    .then(response => response.json())
    .then(data => {
      image.src = data.url
      imageTitle.innerText = data.name
      likes.innerText = data.like_count
      
      
    })
})

// ---------> LIKE BUTTON
let imageId = 3177
const likebutton = document.getElementById("like_button")
likebutton.addEventListener('click', function() {
  let imageId = 3177
  const likebutton = document.getElementById("like_button")
  // console.log(likebutton)
  likes.innerHTML = parseInt(likes.innerHTML) + 1
  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      imageId: `${imageId}`,
      like_count: `${likes.innerText}`
    })
      .then(response => response.json())
  })
})

//----------------> COMMENT

const form = document.getElementById("comment_form")
form.addEventListener('submit', event => {
  // console.log(form)
  event.preventDefault();
  let imageId = 3177
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  // console.log(commentsURL)
  const comments = document.getElementById("comment_input")
  // console.log(comments)
  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      image_id: `${imageId}`,
      content: `${comments.value}`
    })
  }).then(response => response.json())
  .then(data => console.log(data))

})
