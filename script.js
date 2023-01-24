const inputEl = document.getElementById("input")
const infoTextEl = document.getElementById("info-text")
const meaningContainer = document.getElementById("meaning-container");
const tilleEl = document.getElementById("title");
const meaningElement = document.getElementById("meaning")
const audioEl = document.getElementById("audio")
async function fetchAPI(word){

    try {
    infoTextEl.style.display = "block";
    meaningContainer.style.display = "none";

    infoTextEl.innerText = `Searching the Meaning of "${word}"` 
    // console.log(word);
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    const result = await fetch(url).then((res)=>res.json())
    // console.log(result)

    if(result.title){
    meaningContainer.style.display = "block";
    infoTextEl.style.display = "none"

    tilleEl.innerText = word;
    meaningElement.innerText = "N/A"
    
    audioEl.style.display = "none";
    }else{
        infoTextEl.style.display = "none"
        meaningContainer.style.display = "block";
        audioEl.style.display="inline-flex";

        tilleEl.innerText = result[0].word;
        meaningElement.innerText = result[0].meanings[0].definitions[0].definition
        
        audioEl.src = result[0].phonetics[0].audio;
    }

    
    

    } catch (error) {
        console.log(error);
    infoTextEl.innerText = `An error happened ,try again later` 

    }
  

}

inputEl.addEventListener("keyup", (e) => {
    // console.log(e.key);
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value);
    }
})