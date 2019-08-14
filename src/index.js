document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3184 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageCardDiv = document.querySelector('#image_card');

//GETTING THE IMAGE AND SHOWING IT ON THE DOM
  fetch(imageURL)
  .then(function(response){
    return response.json()
  }).then(function(card){
    console.log(card)
    imageCardDiv.innerHTML = `
    <img src=${card.url} id="image" data-id="${card.id}"/>
    <h4 id="name">${card.name}</h4>
    <span>Likes:
      <span id="likes">${card.like_count}</span>
    </span>
    <button  data-id = ${card.id} id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <button id='submit'>Submit</button>
    </form>
    <ul id="comments">
    <!-- <li> for each comment goes here -->
</ul>`

const likeButton = document.getElementById('like_button')
likeButton.addEventListener('click', function(event){
const currentLikes
  fetch(`https://randopic.herokuapp.com/likes/${image_id}`,{
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
  },
  body:JSON.stringify({
    like_count: card.like_count
  })
  })


})//END OF LIKE FEATURE
  })//END OF SHOWING IMAGE



//COMMENT FEATURE
  const commentForm = document.querySelector('#comment_form')
  const imageComments = document.getElementById('comments').value
  // console.log(imageComments)
  submitButton = document.getElementById('submit')

  commentForm.addEventListener('submit',function(event){
    event.preventDefault();
    console.log(event.target)


  })// END OF FORM EVENT






})//END OF DOMCONTENTLOADED
