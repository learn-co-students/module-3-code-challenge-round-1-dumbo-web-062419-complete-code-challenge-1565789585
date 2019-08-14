document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 3182 //Enter the id from the fetched image here
  //https://randopic.herokuapp.com/:id

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const hTag = document.getElementById("name")
  const spanTag = document.getElementById("likes")
  const formTag = document.getElementById("comment_form")
  //const--fetch--slapToDOM--addEventListner

  fetch(imageURL)
  .then(res => res.json())
  .then(renderTheImage)

  function renderTheImage(image){
    //console.log(image)
    console.log(hTag)
    const img = document.createElement ('img')

    img.className = "picture"
    img.src = "http://blog.flatironschool.com/wp-content/uploads/2016/10/Code-Background-352x200.jpg"
    
    hTag.appendChild(img)
  }
///-------like feature--------
spanTag.addEventListener("click", function(event){
  event.preventDefault()

  let likeBtnisPressed = event.target.classname === "like_button"

  if (likeBtnisPressed){
    let id= parseInt(event.target.dataset.id)
    let strNum = spanTag.innerText
    spanTag.innerText= parseInt(strNum)+1
    
    fetch(likeURL, {
      method : "POST",
      headers : {
        "Content-Type" : "applicaiton/json",
        "Accept" : "applicaiton/json"
      },
      body: JSON.stringify({
        likes : strNum 
      })
    }).then(resp =>resp.json())
    .then(function(likes){
      //this function will slap like to the DOM
      //will return to this function once I can reslove what is wrong with 
      //fetch and its not even picking up on the network tab on my end

    })

  }

})

///--------Add comments ---------
formTag.addEventListener("click", function(event){
  event.preventDefault()
  
  //let submitBtnPressed= event.target.className === ""
  
  
  
  
  event.reset()
})




})
