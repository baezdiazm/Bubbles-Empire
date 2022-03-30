document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    //postHeader()
    getData()
})

function postHeader() {
    const header = document.querySelector("h1")
    
}

function getData() {
    fetch("https://www.amiiboapi.com/api/amiibo")
    .then(data => data.json())
    .then(res => {
        //For now we will only render the first 3 elements
        renderData(res.amiibo[74])
        renderData(res.amiibo[75])
        renderData(res.amiibo[76])
        //This will iterate through the first 10 elements of the array obtained and call renderData on them
        //for(let i = 0; i < res.amiibo.length; i++) {
        //    renderData(res.amiibo[i])
        //}
    })
}

function renderData(data) {
    //This selects the Div where the objects will be displayed and appends them to it
    const div = document.querySelector('.items')
    const post = document.createElement('div')
    post.innerHTML = `
        <h2>${data.name}</>
        <h5>Series: ${data.amiiboSeries}</h4>
        <img src='${data.image}'/>
        <button class="button">Change Color</button>
    `
    post.class="item"
    div.appendChild(post)
    
    const btn = document.querySelectorAll('.button')
    console.log(btn)
}

