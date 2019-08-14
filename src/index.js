document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3126 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  fetch(imageURL)
    .then(res => res.json())
    .then(displayImage)

      //----------------------------------------------------------->IMAGE
    function displayImage(imageObject){
      const img = document.getElementById('image')
        img.setAttribute('src', imageObject.url)

      const title = document.getElementById('name')
        title.innerText = 'Lovelace Graffiti Wall'
      //------------------------------------------------------------>LIKE COUNT    
        let counter = imageObject.like_count
        const likeSpan = document.getElementById('likes')
            likeSpan.innerText = counter
        const likeBtn = document.getElementById('like_button')
    
      likeBtn.addEventListener('click', () => {
        counter += 1
        likeSpan.innerText = counter 
        
          fetch(likeURL, {
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
              "image_id": imageId 
            })
          })
      })
      //--------------------------------------------------------------->Comments(front end)
      
      const commentForm = document.getElementById('comment_form')
      const commentUl = document.getElementById('comments')
      const commentInput = document.getElementById('comment_input')
      
      commentForm.addEventListener('submit', () => {
        event.preventDefault()
        const commentLi = document.createElement('li')

        commentLi.innerText = commentInput.value
        commentUl.append(commentLi)
        commentForm.reset()

        //--------------------------------------------------------------->Comments(back end)
    console.log(imageObject)
        fetch(commentsURL, {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }, 
          body: JSON.stringify({ //NOOOOOO PUSH INTO THE COMMENTS ARRRRRAAAYYYY NNOOO TIIMMMMMEEEEEEEEEEE code challenege just ended but I fully know what to do here... I think?
            "content": commentInput.value, 
            "image_id": imageId
          })
        })
      })


    }



})
