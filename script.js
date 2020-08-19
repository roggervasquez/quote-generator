// Dom Elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const characterImage = document.getElementById('character');
const loader = document.getElementById('loader');

// constants
const quoteLimit = 100;
const simpsonsQuoteUrl = 'https://thesimpsonsquoteapi.glitch.me/quotes';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en';


// Get quote from API
// Using async function
async function getQuoteAsync() {
    showLoaderImage();
    try {
        const response = await fetch(simpsonsQuoteUrl);
        const data = await response.json();
        const quoteObject = data[0];
        authorText.innerText = quoteObject.character;
        quoteText.innerText = quoteObject.quote;
        if (quoteObject.quote.length > quoteLimit) {
            quoteText.classList.add('long-quote') ;
        } else {
            quoteText.classList.remove('long-quote')
        }

        showCharacter(data[0].image);

    } catch (error) {
        authorText.innerText = 'Rogger';
        quoteText.innerText = 'Sorry, something went wrong getting the quote :D';
        console.log('Whoops :' , error);

    }
    finally { // No matter if call is succesful or an error we need to hide the loader
        hideLoaderImage() ; 
    }
}

function tweetQuote () {
    const quote = quoteText.innerText;
    const character = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${character}`;
    window.open(twitterUrl, '_blank');
}

function showLoaderImage() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoaderImage() {
   if(!loader.hidden) {
       quoteContainer.hidden =false;
       loader.hidden = true;
   }
}

function showCharacter (imgUrl) {
   if(imgUrl) {
      characterImage.src = imgUrl;
      characterImage.hidden = false;
   } else {
      hideCharacter();
   }

}

function hideCharacter() {
    characterImage.hidden = true;
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuoteAsync);
twitterBtn.addEventListener('click',tweetQuote);

//getQuotePromises();
getQuoteAsync();


// ---------------------
// Using promises testing quote endpoint
function getQuotePromises() {
  
    fetch(proxyUrl + apiUrl)
        .then(response => response.json())
        .then(data => {
             console.log('Quote :', data);
        })
        .catch((error) => {
            console.error('Whoops Error :', error);
    });

}