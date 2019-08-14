document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3183 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  // HTML Variables
  const img = document.getElementById("image")
  const imgName = document.getElementById("name")
  const likes = document.getElementById("likes")
  const comments = document.getElementById("comments")

  // Fetch Image Data
  fetch(imageURL)
  .then(res => res.json())
  .then(slapImageDOM)

  // Display Image Data On The DOM

  function slapImageDOM(imageData) {
    // console.log(imageData)
    img.src = imageData.url
    img.dataset.id = imageData.id
    imgName.innerText = imageData.name
    likes.innerText = imageData.like_count

    imageData.comments.forEach(slapCommentDOM)
  }

  // Display Comment Data On The DOM

  function slapCommentDOM(comment) {
    const commentLi = document.createElement("li")
    commentLi.innerHTML = `
    ${comment.content}
    <button class="delete_btn" data-id="${comment.id}">x</button>
    `
    comments.append(commentLi)

    // BONUS: Delete Comment /////////////////////////////////
    commentLi.addEventListener("click", function() {
      // console.log(event.target)
      // Delegation: If event target has "delete_btn" in their ClassList,
      //              do fetch request
      if (event.target.classList.contains("delete_btn")) {
        // console.log(event.target)
        // console.log(`${commentsURL + event.target.dataset.id}`)
        fetch(`${commentsURL + event.target.dataset.id}`, {
          method: "DELETE"
        })
        .then(res => res.json())
        .then(function() {
          commentLi.remove()
        })
      }
    })
    //////////////////////////////////////////////////////////
  }

  // Like Button Functionality (Create Like)

  const likeBtn = document.getElementById("like_button")
  likeBtn.addEventListener("click", function() {
    // console.log(event.target)
    fetch(likeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        image: img.src,
        image_id: img.dataset.id
      })
    })
    .then(res => res.json())
    .then(slapLikesDOM)

    // Update Number Of Likes After Clicking Like Button On The DOM

    function slapLikesDOM(likeData) {
      likes.innerText = parseInt(likes.innerText) + 1
    }
  })

  // Comment Form Functionality (Create Comment)

  const commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", function(event) {
    event.preventDefault()
    // console.log(event.target)
    const commentInput = document.getElementById("comment_input").value
    // console.log(commentInput)

    // Condition: If field is NOT empty, do fetch request
    //            If field is empty, do not fetch
    if (commentInput != "") {
      fetch(commentsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          content: commentInput,
          image_id: img.dataset.id
        })
      })
      .then(res => res.json())
      .then(slapCommentDOM)
    } else {
      console.log("Please fill in all the fields.")
    }
  })

})
