const dogBar = document.getElementById('dog-bar')
const container = document.getElementById('dog-summary-container')
let dogsArray = []


document.addEventListener('DOMContentLoaded', () => {
    getAllDogs()
    const filterBtn = document.getElementById('good-dog-filter')    
    filterBtn.addEventListener('click',()=> handleFilter(filterBtn))
})


function getAllDogs(){
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        dogsArray = data
        addDogsToBar(dogsArray)
    })
}


function addDogsToBar(dogsArray){
    document.getElementById('dog-bar').innerHTML = ""
    dogsArray.forEach(dog => {
        let span = document.createElement('span')
        span.id = dog.id
        span.innerHTML = `${dog.name}`
        span.onclick = () => createDogCard(dog)
        document.getElementById('dog-bar').appendChild(span)
})
}

function createDogCard(dog){
    // console.log("you clicked on", dog.name)
    if (dog.isGoodDog === true){
    
        document.getElementById('dog-info').innerHTML = `
        <img src="${dog.image}"/>
        <h2>${dog.name}</h2>
        <button>Good Dog!</button>
    `
}
    else {
        document.getElementById('dog-info').innerHTML = `
        <img src="${dog.image}"/>
        <h2>${dog.name}</h2>
        <button>Bad Dog!</button>
    `
    }
    document.getElementById('dog-info').querySelector('button').addEventListener('click', () => handleGoodBad(dog))
}

function handleGoodBad(dog){
    // console.log(dog.name, "is a good dog :" , dog.isGoodDog)
    dog.isGoodDog === true ? dog.isGoodDog = false : dog.isGoodDog = true
    updateDodInfo(dog)
}

function updateDodInfo(dog){
    fetch(`http://localhost:3000/pups/${dog.id}`, {
        method: 'PATCH',
        headers : {
            "Content-type" : "application/json",
            Accept : "application/json"
        },
        body: JSON.stringify(dog)
    })
    .then(res => res.json())
    .then(dog => createDogCard(dog))
}

function handleFilter(filterBtn){
    
    if (filterBtn.textContent === 'Filter good dogs: OFF'){
        
        filterBtn.textContent = 'Filter good dogs: ON'
        let goodDogs = dogsArray.filter(dog => dog.isGoodDog === true)
        addDogsToBar(goodDogs)
    } 
    else {
        filterBtn.textContent = 'Filter good dogs: OFF'
        addDogsToBar(dogsArray)
    }
}
