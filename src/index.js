document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3171 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(`https://randopic.herokuapp.com/images/${imageId}`)
  .then(response => response.json())
  //.then(picture => console.log(picture))
  .then(image => loadImage(image))
})

//Slap Image on DOM
function loadImage(image){
  //main Image
  const imgTag = document.getElementById("image")
  imgTag.src = image.url

  //title
  const nameTag = document.getElementById("img-name")
  nameTag.innerText = image.name

  //like count
  const likesTag = document.getElementById("img-likes")
  const likesCountTag = likesTag.querySelector("#likes")
  likesCountTag.innerText = image.like_count;

  //comments
  const commentsUl = document.getElementById("all-comments")

  image.comments.forEach(function(comment){
    let li = document.createElement("li");
    li.innerHTML = `${comment.content} <button id=${comment.id}>X</button>`

    li.dataset.id = comment.id
    li.addEventListener("click", deleteComment);

    commentsUl.append(li)
  })

}

const mainDiv = document.getElementById("image_card")
const likeButton = mainDiv.querySelector("#like_button")

likeButton.addEventListener("click", likePicture)


//liking image fetch request
function likePicture(){
  const imgId = 3171

  fetch("https://randopic.herokuapp.com/likes/", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imgId
    })
  })
  .then(response => response.json())
  .then(data => updateLikesOnDom(data))
}

//udpating likes on DOM
function updateLikesOnDom(data){
  const likesTag = document.getElementById("img-likes")
  const likesCountTag = likesTag.querySelector("#likes")
  let numberOfLikes = parseInt(likesCountTag.innerText)
  numberOfLikes ++
  likesCountTag.innerText = numberOfLikes

}

//adding comments
const submitForm = document.getElementById("comment_form")
submitForm.addEventListener("submit", addComment)

function addComment(event){
  event.preventDefault();


  const imgId = 3171
  let content = event.target.querySelector("#comment_input").value



  event.target.reset();

  fetch("https://randopic.herokuapp.com/comments", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imgId,
      content: content
    })
  })
  .then(response => response.json())
  .then(data => addCommentToDOM(data))
}

  //update comments on DOM
  function addCommentToDOM(data){
    let commentsUl = document.getElementById("all-comments")
    let li = document.createElement("li")
    li.innerHTML =
      li.innerHTML = `${data.content} <button id=${data.id}>X</button>`

    commentsUl.append(li)
  }


  //deleting comments
  function deleteComment(event){
    console.log("clicked delete")
    const commentId = event.target.id
    let commentsUl = document.getElementById("all-comments")

    let li = document.getElementById(commentId)
    li.parentElement.remove()

    fetch(`https://randopic.herokuapp.com/comments/${commentId}`, {
      method: "DELETE"
    })
  }




//
