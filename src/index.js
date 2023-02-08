// write your code here

const ramenMenu = document.getElementById("ramen-menu")
const ramenDetail = document.getElementById("ramen-detail")
const ramenDetailImage = document.querySelector("img.detail-image")
const ramenDetailName = document.querySelector("h2.name")
const ramenDetailRestaurant = document.querySelector("h3.restaurant")
const ramenDetailRating = document.getElementById("rating-display")
const ramenDetailComment = document.getElementById("comment-display")

const addRamenHeader = document.querySelector("h4")

const ramenForm = document.querySelector("form#new-ramen")

const deleteButton = document.createElement("button")
addRamenHeader.appendChild(deleteButton)
deleteButton.textContent = "DELETE SELECTED RAMEN"

deleteButton.addEventListener("click", deleteRamen)


ramenForm.addEventListener("submit", addRamen)

function addRamen(event){
    event.preventDefault()

    let newRamenName = event.target.name.value;
    let newRamenRestaurant = event.target.restaurant.value;
    let newRamenImage = event.target.image.value;
    let newRamenRating = event.target.rating.value;
    let newRamenComment = document.querySelector("textarea#new-comment").value;

    console.log(newRamenComment)

    fetch("http://localhost:3000/ramens", {
        method: "POST",
        headers:
        {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            "name": newRamenName,
            "restaurant": newRamenRestaurant,
            "image": newRamenImage,
            "rating": newRamenRating,
            "comment": newRamenComment
        })
    })
    .then(response => response.json())
    .then((data) => {
        let currentId = data.id
        let currentRamenName = data.name
        let currentRestaurant = data.restaurant
        let currentImage = data.image
        let currentRating = data.rating
        let currentComment = data.comment

        let ramenImage = document.createElement("img")
        ramenImage.src = currentImage
        ramenMenu.appendChild(ramenImage)

        ramenImage.addEventListener("click", () => {
            ramenDetailImage.src = currentImage
            ramenDetailName.textContent = currentRamenName
            ramenDetailRestaurant.textContent = currentRestaurant
            ramenDetailRating.textContent = currentRating
            ramenDetailComment.textContent = currentComment
            deleteButton.selectedRamenId = currentId
        })
    })
}





initializeRamen()

function initializeRamen(){
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then((data) => {

        for(let ramen in data){
            let currentId = data[ramen].id
            let currentRamenName = data[ramen].name
            let currentRestaurant = data[ramen].restaurant
            let currentImage = data[ramen].image
            let currentRating = data[ramen].rating
            let currentComment = data[ramen].comment

            let ramenImage = document.createElement("img")
            ramenImage.src = currentImage
            ramenMenu.appendChild(ramenImage)

            ramenImage.addEventListener("click", () => {

                ramenDetailImage.src = currentImage
                ramenDetailName.textContent = currentRamenName
                ramenDetailRestaurant.textContent = currentRestaurant
                ramenDetailRating.textContent = currentRating
                ramenDetailComment.textContent = currentComment
                deleteButton.selectedRamenId = currentId
                
            })

        }
    })
}

function deleteRamen(){

    let ramenId = deleteButton.selectedRamenId

    fetch(`http://localhost:3000/ramens/${ramenId}`, {
        method: "DELETE",
        headers:{
            "Content-Type": "application.json"
        }
    })
}