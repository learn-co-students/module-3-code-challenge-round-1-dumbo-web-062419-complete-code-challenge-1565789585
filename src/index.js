document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  const imageId = 3169 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch("https://randopic.herokuapp.com/images/3169").then(res => res.json()).then(slapOnDOM)

})
const imgCard = document.getElementById("image_card")

function slapOnDOM(data) {

  let commentList = data.comments.map(comment => `<li>${comment.content}<button data-id="${comment.id}" id="deleteComment">X</button></li>`)



  imgCard.innerHTML = `
  <img src="${data.url}" id="image" data-id="${data.id}"/>
  <h4 id="name">${data.name}</h4>
  <span>Likes:
    <span id="likes"> ${data.like_count}</span>
  </span>
  <button id="like_button">Like</button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input type="submit" value="Submit"/>
  </form>
  <ul id="comments">
      ${commentList.join("")}
  </ul>
  `
  commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", addComment)

  

}

function addComment(event){
  event.preventDefault()
  let input = document.getElementById("comment_input")
  let comments = document.getElementById("comments")

  fetch("https://randopic.herokuapp.com/comments", {
     method: "POST",
     headers: {
      'Accept': 'application/json',
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       image_id: 3169 ,
       content: input.value
     })
   }).then(res => res.json()).then( function(comment){

    let newComment = `<li>${input.value}<button data-id="${comment.id}" id="deleteComment">X</button></li>`
    comments.innerHTML += newComment
   
   })
}

imgCard.addEventListener("click", function(event){
   
  if (event.target.id == "like_button"){
   const likeSpan = document.getElementById("likes")
   let likes = parseInt(likeSpan.innerText)
   likes += 1
   likeSpan.innerText = likes

   fetch("https://randopic.herokuapp.com/likes", {
     method: "POST",
     headers: {
      'Accept': 'application/json',
       "Content-Type": "application/json"
     },
     body: JSON.stringify({
       image_id: 3169
     })
   })

  }
 })

 imgCard.addEventListener("click", function(event) {
   if (event.target.id =="deleteComment"){
     
    let comment = event.target.parentElement 
    comment.remove()
    

    fetch(`https://randopic.herokuapp.com/comments/${event.target.dataset.id}`, {
      method: "DELETE"
    })

    

   }

 })



