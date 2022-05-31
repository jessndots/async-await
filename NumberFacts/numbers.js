// Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.

let baseURL = 'http://numbersapi.com'
async function getNumFact(num){
    let numFact = await axios.get(`${baseURL}/${num}?json`)
    console.log(numFact.data.text)
}
getNumFact(23)

// Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
async function getNumsFacts(numsArr){
    let stringNums = numsArr.toString()
    let numsFacts = await axios.get(`${baseURL}/${stringNums}?json`)
    
    for (num in numsFacts.data) {
        $('ul').append(`<li>${numsFacts.data[num]}</li>`)
    }
}

getNumsFacts([1,2,3])


// Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function get4Facts(num) {
    let fact1Promise = axios.get(`${baseURL}/${num}`)
    let fact2Promise = axios.get(`${baseURL}/${num}`)
    let fact3Promise = axios.get(`${baseURL}/${num}`)
    let fact4Promise = axios.get(`${baseURL}/${num}`)

    let fact1 = await fact1Promise
    let fact2 = await fact2Promise
    let fact3 = await fact3Promise
    let fact4 = await fact4Promise

    $('ul').append(`<li>${fact1.data}</li>`)
    $('ul').append(`<li>${fact2.data}</li>`)
    $('ul').append(`<li>${fact3.data}</li>`)
    $('ul').append(`<li>${fact4.data}</li>`)
}

get4Facts(23)
