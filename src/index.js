document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 1 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

document.addEventListener("DOMContentLoaded", function(){
  fetch(`https://randopic.herokuapp.com/images/3172`)
  .then(resp => resp.json())
  .then(renderPicture)
})
const imageCard = document.getElementById("image_card")

function renderPicture (data) {
  imageCard.innerHTML =
  `
  <img src="${data.url}" id="image" data-id="${data.id}"/>
  <h2>Uncomment Likes and Comment feature!</h2>
  <h4 id="name">${data.name}</h4>
  <p id="likes"> ${data.like_count} </p>
  <button id="like_button" class="like_button"> Like </button>
  <form id="comment_form">
    <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
    <input id="comment_submit" type="submit" value="Submit"/>
  </form>
  <ul id="comments">
       <li>${data.comments.map (x => x.content)}</li>
  </ul>
  `
}

// ------------------------ Likes --------------------

// imageCard.addEventListener(`click`, clickFunction)
//
// function clickFunction (event){
//   // likeId = event.target.dataset.id
//   // likesP = imageCard.getElementById("likes")
//   // likesNow = likesP.value
//   // console.log(likesNow)
//  // console.log(event.target)
//   if (event.target.classList.contains("like_button")) {
//     likeId = event.target.dataset.id
//     likesP = document.getElementById("likes")
//     likesNow = likesP.innerText
//     likesNow++
//     const imageCard = document.getElementById("image_card")
//
//
//     fetch(`https://randopic.herokuapp.com/likes/`, {
//       method: 'PATCH',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'},
//         body: JSON.stringify({ like_count: likesNow })
//
//  })
//     .then(resp => resp.json())
//     .then(renderPicture)
//  })


// -------------------------- PATCH ------------------

// const input = document.getElementById("comment_input")
// const submitBtn = document.getElementById("comment_submit")

// imageCard.addEventListener(`submit`, renderComment)
//
// function renderComment (event) {
// event.preventDefault()
// const input = document.getElementById("comment_input")
// const textInput = input.value
// // console.log(textInput)
//
// fetch(`https://randopic.herokuapp.com/comments/`,{
//      method: 'PATCH',
//      headers:
//      {
//        'Accept': 'application/json',
//        'Content-Type': 'application/json'},
//         body: JSON.stringify({ content: textInput })
// })
//     .then(resp => resp.json())
//     .then(renderPicture)
//
// }
// --------------------------------------------
