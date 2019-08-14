document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3179; //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgName = document.querySelector('#name');
  const imgTag = document.querySelector('#image');
  const likesTag = document.querySelector('#likes');
  const likeButton = document.querySelector('#like_button');
  const commentForm = document.querySelector('#comment_form');
  const commentList = document.querySelector('#comments');
  const imgCard = document.querySelector('#image_card');
  const commentInput = document.querySelector('#comment_input');

  function slapCommentOnDOM(comment) {
  	commentList.innerHTML += `<li>${comment}</li>`
  	commentInput.value = "";
  }

  function addLike(event) {
  	const button = event.target;
  	if (button.id === 'like_button') {
		fetch(likeURL, {
	  		method: "POST",
	  		headers: {"Content-Type": "application/json",
	  				  "Accept": "application/json"},
	  		body: JSON.stringify({image_id: parseInt(button.dataset.imageId)})
	  	});
	  	likesTag.innerText = parseInt(likesTag.innerText) + 1;
	}
  }

  function addComment(event) {
  	event.preventDefault();
  	const form = event.target;
  	if (form.id === 'comment_form' && commentInput.value !== "") {
  		fetch(commentsURL, {
  			method: "POST",
			headers: {'Accept': 'application/json',
					  'Content-Type': 'application/json'},
  			body: JSON.stringify({
			  image_id: form.dataset.imageId,
			  content: commentInput.value
  			})
  		});
		slapCommentOnDOM(commentInput.value);
  	}
  	else {
  		alert("No empty comments allowed!");
  	}
  }

  fetch(imageURL)
  .then(res => res.json())
  .then((img) => {
  	imgName.innerText = img.name;
  	imgTag.src = img.url;
  	likesTag.innerText = img.like_count;
  	likeButton.dataset.likes = img.like_count;
  	likeButton.dataset.imageId = img.id;
  	commentForm.dataset.imageId = img.id;
  	img.comments.forEach(comment => {
  		slapCommentOnDOM(comment.content);
  	});
  });

  imgCard.addEventListener('click', addLike);
  imgCard.addEventListener('submit', addComment);

})
