let allData = []
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
        allData = res.amiibo
        //For now we will only render the first 3 elements
        renderData(allData[73])
        renderData(res.amiibo[74])
        renderData(res.amiibo[75])

        //for(let i = 0; i < res.amiibo.length; i++) {
        //    renderData(res.amiibo[i])
        //}
    })
}

function renderData(data) {
    //This selects the Div where the objects will be displayed to later append them to it
    const div = document.querySelector('.items')
    const btn = document.createElement('button')
    //Creates a button under every rendered item to remove each item individually
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
    post.className = `${data.name.split('')[0]}`
    post.appendChild(btn)
    div.appendChild(post)
}

function toggleHide() {
    //The page defaults to all items hiding, this toggles them "on/off"
    const am = document.querySelector('#amiibos')
    const thumb = document.querySelector('.items')
    const nav = document.querySelector('#abc')
    thumb.hidden = true
    nav.hidden = true
    am.addEventListener('click', () => {
        if (thumb.hidden) {
            nav.hidden = false
            thumb.hidden = false
            am.innerText='Hide Amiibos'
        } else {
            nav.hidden = true
            thumb.hidden = true
            am.innerText = 'Show Amiibos'
        }
    })
    submitAmiibo()
}

function newAmiiboForm() {
    //Creates the form to add a new Amiibo and defaults it to hidden
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
    const abc = ("8,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z, all").toUpperCase().split(',')
    const list = document.querySelector('#abc')
    for (let i=0; i<abc.length; i++) {
        const letter = document.createElement("span")
        letter.innerHTML = ` ${abc[i]} `
        letter.id = abc[i]
        list.appendChild(letter)

        letter.addEventListener('click', (e) => {
            console.log(`${e.target.innerText} Was clicked!`)
            
            //HIDES all the amiibos (Except for étoile because 'e' and 'é' are not the same characters)
            const ab = document.getElementById('abc').childNodes
            for (const i of abc) {
                const e = document.getElementsByClassName(`${i}`)
                for(const element of e) {
                    element.hidden = true
                }
            }

            //SHOWS/HIDES the clicked letter
            const letter = document.getElementsByClassName(`${e.target.innerText}`)
            for(const item of letter) {
                if(item.hidden === true) {
                    item.hidden = false
                }
                else {
                    item.hidden = true
                }
            }
        })
    }
}