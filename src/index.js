document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3174 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  function postPicOnDom(data) {
    const imgTag = document.getElementById('image')
    imgTag.src = `${data.url}`



  }

  fetch('https://randopic.herokuapp.com/images/3174')
  .then(resp => resp.json())
  .then(data => postPicOnDom(data))


  const likeButton = document.getElementById('like_button')

    likeButton.addEventListener("click", likeButtonClicked)


    function likeButtonClicked(event) {
      console.log(event.target);
      const likes = document.getElementById('likes')

      let count = count + 1


    likes.innerHTML = count



      fetch('https://randopic.herokuapp.com/likes/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}`
        })
      }).then(resp => resp.json())
      .then(data => addLikeToDom(data))

    }
    function addLikeToDom(data) {
      const likes = document.getElementById('likes')

      let count = count + 1


    likes.innerHTML = count
    }



    const form = document.getElementById('comment_form')
    form.addEventListener("submit", addComment)

    function addComment(event) {
      event.preventDefault()
      const commentInput = document.getElementById('comment_input')



      fetch('https://randopic.herokuapp.com/comments/', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: `${imageId}` ,
          content: `${commentInput.value}`
        })
      }).then(resp => resp.json())
      .then(data =>{const commentInput = document.getElementById('comment_input')

      const ulTagForComments = document.getElementById('comments')
      const liTag = document.createElement('li')
    ulTagForComments.innerHTML += `<li>${commentInput.value}</li>`})



        // const commentInput = document.getElementById('comment_input')





    }



})
