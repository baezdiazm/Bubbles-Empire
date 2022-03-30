document.addEventListener("DOMContentLoaded", () => {
    getData()
    toggleHide()
    newAmiiboForm()
    glosary()
})
function getData() {
    fetch("https://www.amiiboapi.com/api/amiibo")
    .then(data => data.json())
    .then(res => {
        //For now we will only render the first 3 elements
        renderData(res.amiibo[73])
        renderData(res.amiibo[74])
        renderData(res.amiibo[75])
        //This will iterate through the first 10 elements of the array obtained and call renderData on them
        //for(let i = 0; i < res.amiibo.length; i++) {
        //    renderData(res.amiibo[i])
        //}
    })
}

function renderData(data) {
    //This selects the Div where the objects will be displayed and appends them to it
    const div = document.querySelector('.items')
    const btn = document.createElement('button')
    //Creates a button under every rendered item || for now it only changes the page's background color to White
    btn.class = "button"
    btn.innerText = 'Remove Amiibo'
    btn.addEventListener('click', (e) => {
        e.target.parentNode.remove()
    })
    const post = document.createElement('div')
    post.innerHTML = `
        <h2>${data.name}</>
        <h5>Series: ${data.amiiboSeries}</h4>
        <img src='${data.image}'/>
        <br>
    `
    post.class="item"
    post.appendChild(btn)
    div.appendChild(post)
}

function toggleHide() {
    //The page defaults to all items hiding, this toggles them "on/off"
    const am = document.querySelector('#amiibos')
    const thumb = document.querySelector('.items')
    thumb.hidden = true
    am.addEventListener('click', () => {
        if (thumb.hidden) {
            thumb.hidden = false
            am.innerText='Hide Amiibos'
        } else {
            thumb.hidden = true
            am.innerText = 'Show Amiibos'
        }
    })
    submitAmiibo()
}

function newAmiiboForm() {
    const newBtn = document.querySelector('#new_amiibo')
    let form = document.querySelector('#amiibo_form')
    newBtn.addEventListener('click', () => {
        if(form.hidden === false) {
            form.hidden = true
            newBtn.innerText = "Add new Amiibo"
            form.reset()
        } else {
            form.hidden = false
            newBtn.innerText = "Cancel"
        }
    })
}

function submitAmiibo() {
    //Adds event listener to the FORM to handle its data
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const data = {}
        data.name =   document.querySelector('#new-name').value;
        data.amiiboSeries = document.querySelector('#new-series').value;
        data.image =  document.querySelector('#new-img').value;

        //Checks if text fields are empty before adding items to the DOM
        if(data.name === "" || data.amiiboSeries === "" || data.image === "") {
            alert("1 or more fields empty, please fill out every field before submitting!")
        } else {
            renderData(data)
            document.querySelector('form').reset()
        }
    })
}

function glosary() {
    const abc = ("ABCDEFGHIJKLMNOPQRSTUVWXYZ").toUpperCase().split('')
    const list = document.querySelector('#abc')
    for (let i=0; i<abc.length; i++) {
        console.log(abc[i])
        const letter = document.createElement("span")
        letter.innerHTML = ` ${abc[i]} `
        list.appendChild(letter)
        letter.addEventListener('click', () => {
            alert(`${abc[i]} was clicked!`)
        })
    }
}