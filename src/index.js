/////////////////// Listen for X event
document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3176 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetchImage(imageURL)

})

const likeBtn = document.getElementById("like_button")
likeBtn.addEventListener('click', event => addOneLike(event))

const commentForm = document.getElementById("comment_form")
commentForm.addEventListener("submit", event => addComment(event))

////////////////// Make Y fetch from server
function fetchImage(imageURL){

  // let imageId = 3176 //Enter the id from the fetched image here
  // const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  // const likeURL = `https://randopic.herokuapp.com/likes/`
  // const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(res => res.json())
  .then(img => renderImage(img))

}

///////////////////// Slap Z to the dom (Manipulate/render)
function renderImage(img){
  const imgTag = document.getElementById("image")
  const imgNameTag = document.getElementById("name")
  const imgLikes = document.getElementById("likes")
  const imgCommentsULTag = document.getElementById("comments")

  imgTag.src = img.url
  imgNameTag.innerText = img.name
  imgLikes.innerText = img.like_count

  img.comments.forEach(comment => {
    const li = document.createElement("li")
    li.innerText = comment.content
    imgCommentsULTag.append(li)
  })
}

function addOneLike(event){
  const imgLikes = document.getElementById("likes")
  let imgLikesCount = parseInt(imgLikes.innerText)
  let imageId = 3176
  console.log(imgLikes)
  console.log(imgLikesCount)

  imgLikesCount++
  imgLikes.innerText = imgLikesCount

  /////////////// Fetch not working properly
  fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      like_count: imgLikesCount
    })
  }).then(res => res.json())
  .then(img => console.log(img))
  // .then(img => renderImage(img))


  /////////////// Fetch not working properly
  // fetch('https://randopic.herokuapp.com/likes', {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: {
  //     image_id: imageId
  //   }
  // }).then(res => res.json())
  // .then(img => console.log(img))
  // // .then(img => renderImage(img))
}

function addComment(event){
  event.preventDefault()

  let userInput = document.getElementById("comment_input").value
  const commentsULTag = document.getElementById("comments")
  const li = document.createElement("li")

  li.innerText = userInput
  commentsULTag.append(li)
  commentForm.reset()

  let imageId = 3176

  /////////////// Fetch not working properly
  // fetch('https://randopic.herokuapp.com/comments', {
  //   method: "POST",
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: {
  //     image_id: imageId,
  //     content: userInput
  //   }
  // }).then(res => res.json())
  // .then(comment => console.log(comment))
  // .then(img => renderImage(img))

  /////////////// Fetch not working properly
  fetch(`https://randopic.herokuapp.com/images/${imageId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      content: userInput
    })
  }).then(res => res.json())
  .then(img => console.log(img))
  // .then(img => renderImage(img))
}
