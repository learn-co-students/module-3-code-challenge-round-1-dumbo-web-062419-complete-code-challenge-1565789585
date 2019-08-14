document.addEventListener('DOMContentLoaded', () => {
  console.log('%c Git Rich or Die Pryin!', 'color: magenta')

  let imageId = 3173
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const pic = document.getElementById('image')
  const likes = document.getElementById('likes')
  const commentsUl = document.getElementById('comments')
  const likeBtn = document.getElementById('like_button')
  const commentForm = document.getElementById('comment_form')

  renderPic()

  function renderComment(comment){

      commentsUl.innerHTML += `
        <li data-id='${comment.id}'>
        ${comment.content}
        <button data-id='${comment.id}' class='delete'>X</button>
        </li>
      `;
  }

  function renderPic(){
    fetch(imageURL, {
      method: 'GET'
    })
    .then(res => res.json())
    .then(picData => {
      pic.src = picData.url;
      pic.dataset.id = picData.id;
      document.querySelector('h4').innerText = picData.name;
      likes.innerText = picData.like_count;
      picData.comments.forEach(renderComment);
    })
  }

  likeBtn.addEventListener('click', function(){
    likes.innerText++;
    fetch('https://randopic.herokuapp.com/likes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image_id': imageId
      })
    })
  })



  commentForm.addEventListener('submit', function(){
    event.preventDefault();
    let content = document.getElementById('comment_input').value;
    let li = document.createElement('li');
    li.innerHTML = `${content}<button>X</button>`;
    commentsUl.append(li);

    fetch('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image_id': imageId,
        'content': content
      })
    })
    .then(res => res.json())
    .then(comment => {
      li.dataset.id = imageId;
    })
  })


//delete button only works on newly added comments after refreshing... hmmmm....

  commentsUl.addEventListener('click', function(){
    if(event.target.classList.contains('delete')){
      fetch(`https://randopic.herokuapp.com/comments/${event.target.parentElement.dataset.id}`,{
        method: 'DELETE'
      })
      event.target.parentElement.remove();
    }
  })






// end of DOMContentLoaded
})
