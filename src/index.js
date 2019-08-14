document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3170 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const image = document.getElementById('image')
  const title = document.getElementById('name')
  const likes = document.getElementById('likes')
  const commentSection = document.getElementById('comments')
  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')
  
  
  fetch(`${imageURL}`)
  .then(res => res.json())
  .then(postImage)

  function postImage(imgJson){
    image.src = imgJson.url
    title.innerText = imgJson.name
    likes.innerText = imgJson.like_count
    grabComments(imgJson)
  }

  function grabComments(imgJson){
    const comments = imgJson.comments
    comments.forEach(postComment)
  }

  function postComment(comment){
    const li = document.createElement('li')
    li.innerText = comment.content
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "❌👹Delete👹❌"
    deleteBtn.className = "delete"
    deleteBtn.dataset.id = comment.id
    li.append(deleteBtn)
    commentSection.append(li)
  }

  likeBtn.addEventListener('click', function(event){
    const newLike = parseInt(likes.innerText) + 1
    likes.innerText = newLike
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: 3170
      })
    })
    .then(res => res.json())
    .then(console.log)
  })

  commentForm.addEventListener('submit', function(event){
    event.preventDefault()
    newComment = event.target.comment.value
    event.target.reset()

    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image_id: 3170,
        content: newComment
      })
    })
    .then(res => res.json())
    .then(data => postComment(data))
  })

  commentSection.addEventListener('click', function(event){
    if(event.target.classList.contains('delete')){
      const commentID = event.target.dataset.id
      fetch(`https://randopic.herokuapp.com/comments/${commentID}`, {
        method: "DELETE"
      }).then(res => res.json())
      .then(event.target.parentElement.remove())
    }
  })


})
