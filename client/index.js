const displayBtn = document.querySelector('#display') // this is so that our button will display 

displayBtn.addEventListener('click', fetchInstrument) 

function fetchInstrument() { // this function will fetch the array of instruments we created when we made the server
    fetch("http://localhost:3000/instruments/")
    .then(resp => resp.json())
    .then(addInstrunment) //this is another function that we are calling and we are putting data in it's parameter
}

function addInstrunment(data) {
    const instruments = data 
    const instrumentList = document.querySelector('#instruments') // calling on the id for the list, so this function will edit the list
    instrumentList.textContent = '' // this means that after the instrument is added, the input will dissapear

    instruments.forEach(instrument => {
        const li = document.createElement('li') // this means that we will be creating a new element in the list, a new bullet point
        li.textContent = instrument.name // this means that what will be shown at that bullet point will be the instrument name
        instrumentList.appendChild(li) //this means to add that instrument to the instrument list that our server has? 
    })
}

const form = document.getElementById('instrumentForm') // this is refering back to the form we made in html 

form.addEventListener('submit', createInstrument) // this means we want something to happen to the form after we press submit

async function createInstrument(e) { //creating a function that will do something after we press submit 
    e.preventDefault() // after we press submit into the form, we want to stop the page from redirecting 
    const typedInstrument = e.target.instrument.value // we want this varibale to have the value of what was typed in?
  
  
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: typedInstrument // we want the name of the instrument added to the list
      })
    }
  
    const response = await fetch('http://localhost:3000/instruments/', options) // get the information from the instrument sever we made
  
    if (response.status === 201) {
      alert("instrument created")
      e.target.instrument.value = ""
    }
  }
  