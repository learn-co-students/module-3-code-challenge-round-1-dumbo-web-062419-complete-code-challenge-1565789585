document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 3178 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageDiv = document.querySelector("#image_card")
  const imgTag = imageDiv.querySelector("img")
  const imageTitle = imageDiv.querySelector("#name")
  const imageLikes = imageDiv.querySelector("#likes")
  const likeButton = document.querySelector("#like_button")
  const form = document.querySelector("#comment_form")
  const commentUl= document.querySelector("#comments")

// ---------------fetch



  fetch(imageURL)
  .then(res => res.json())
  .then(imageOnDom)


  // image count

  function updateImageCount(newImageCount){
    fetch(likeURL,{
      method: 'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": 3178 ,
        "like_count":newImageCount
      })
    })
  }


//post Comment
  function postComment(comment){
    fetch(commentsURL,{
      method:'POST',
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        "image_id": 3178 ,
        "content": comment
      })
    })
  }


   // -----------DOM
  function imageOnDom(image){
    imgTag.src= image.url
    imgTag.id= "image"
    imgTag.dataset.id = image.id
    imageTitle.innerText = image.name
    imageLikes.innerText = image.like_count
    image.comments.forEach(comment => {
      let li = document.createElement("li")
      li.dataset.id=comment.id
      li.innerHTML = `<h4>${comment.content}</h4>
      <button id=Delete>DELETE</button>
      `
      // li .innerText = comment.content
      commentUl.append(li)
    })
  }


  function deleteComment(id) {
    fetch(`https://randopic.herokuapp.com/comments/${id}`,{
      method: 'DELETE'
    })
  }




//----------––––––––addEventListener
likeButton.addEventListener("click" , function(){
    let newImageCount = imageLikes.innerText++
    newImageCount
    updateImageCount(newImageCount);

})

form.addEventListener("submit",function(){
  event.preventDefault();
  const comment = document.querySelector("#comment_input").value
  let li = document.createElement("li")
  // li.innerText = comments
  li.innerHTML = `<h4>${comment}</h4>
  <button id=Delete>DELETE</button>
  `
  commentUl.append(li)
  // commentUl.append(comment)
  postComment(comment);

})




  commentUl.addEventListener("click", function(){
    if(event.target.tagName === "BUTTON"){
      const id =event.target.parentElement.dataset.id
      event.target.parentElement.remove()
      deleteComment(id)
    }
  })





})
