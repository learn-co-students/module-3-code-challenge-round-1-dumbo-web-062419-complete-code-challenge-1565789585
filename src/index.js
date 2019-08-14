document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3175

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/3175")
  .then(response => response.json())
  .then(slapImageOnDOM)

})

function slapImageOnDOM(data){
// console.log(data.comments)
const image = document.querySelector("img")
// console.log(image)
// console.log(image.src)
image.src = data.url

const imgName = document.getElementById("name")
// console.log(imgName)
imgName.innerText = data.name

const likeCount = document.getElementById("likes")
// console.log(likeCount)
likeCount.innerText = data.like_count

const commentUl = document.getElementById("comments")
// console.log(commentUl)
data.comments.forEach(function(comment){
  // console.log(comment)
  const newLi = document.createElement("li")
  newLi.innerText = comment.content
  commentUl.append(newLi)
})

}

const likeBtn = document.getElementById("like_button")
// console.log(likeBtn)
likeBtn.addEventListener("click", addLikes)

function addLikes(e){
  // console.log(likeCount)
  // console.log(e.target.previousElementSibling.innerText)
  const updatedLikes = parseInt(likeCount.innerText) + 1
  const likes = document.getElementById("likes")
  likes.innerText = parseInt(likes.innerText) + 1
  // e.target.
// console.log(updatedLikes)

  fetch('https://randopic.herokuapp.com/likes', {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      image_id: 3175
      // like_count: updatedLikes
    })
  }).then(response => response.json())
  .then(response => response)
  
}

const commentsForm = document.getElementById("comment_form")
commentsForm.addEventListener("submit", function(e){
  e.preventDefault()
  // console.log("Hello!")
// const addComment = e.target.value
const addedComment = commentsForm.querySelector("input").value
const addedCommentLi = document.createElement("li")
addedCommentLi.innerHTML = " 🎱 "
const commentUl = document.getElementById("comments")
commentUl.append(addedComment)

e.target.reset() 

fetch("https://randopic.herokuapp.com/comments", {
  method: "POST",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json"
},
  body: JSON.stringify({
    // image_id: 3175,
    comments: addedComment
  })
}).then(response => response.json())
.then(data => console.log(data))

})
