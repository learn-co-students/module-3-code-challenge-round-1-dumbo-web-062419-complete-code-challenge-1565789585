document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3123 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const img = document.getElementById('image')
  
  const imgName = document.getElementById('name')

  const likesCount = document.getElementById('likes')

  const commentForm = document.getElementById('comment_form')

  const likeButton = document.getElementById('like_button')

  const commentUl = document.getElementById('comments')

  fetchImage()

  commentForm.addEventListener('submit', addComments)
  likeButton.addEventListener('click', addLikes)
  console.log(event.target)

  function fetchImage(){
    fetch(imageURL)
    .then(res => res.json())
    .then(renderImage)
  }
  
  function renderImage(json){
    img.src = json.url
    imgName.innerText = json.name
    likesCount.innerText = json.like_count
    json.comments.forEach(comment => {
      commentLi = document.createElement('li')
      commentLi.innerText = comment.content
      commentUl.append(commentLi)
    
  })
  }
  

  function addLikes(){
    const currentLikes = parseInt(likesCount.innerText)
    newLikes = currentLikes + 1
    likesCount.innerText = newLikes
    saveLikes()

  }

  function saveLikes(){
    fetch(likeURL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId
      })
    })
  }
  function addComments(){
    // event.preventDefault()
    const newCommentLi = document.createElement('li')
    const commentInput = document.getElementById('comment_input')
    newCommentLi.innerText = commentInput.value
    commentUl.append(commentLi)

    saveComments(commentInput.value)

  }
  
  function saveComments(commentInput){
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentInput
      })
    })
  }
    


})


