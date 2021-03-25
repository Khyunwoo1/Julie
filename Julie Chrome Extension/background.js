function speak (message) {
  let msg = new SpeechSynthesisUtterance(message)
  let voices = window.speechSynthesis.getVoices()
  msg.voice = voices[4]
  window.speechSynthesis.speak(msg)
}
speak('');

// Toggle Julie TTS on or off
let letJulieSpeak = true;

// TTS 
function julieTalks(message){
  if(letJulieSpeak){
    let msg = new SpeechSynthesisUtterance(message)
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[4]
      window.speechSynthesis.speak(msg)
  }
}

// Basic user input
async function userCRUDInput(input){
  try {
    await fetch('http://localhost:3333/rankings/edit/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userInput: input,
      })
    })

  } catch (err) {
    console.log('error occured', err);
  }
}

// Gets Julie's algo rankings
function julieAlgoPostReq(arrayOfImportantEls){

  fetch('http://localhost:3333/rankings/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newElements: arrayOfImportantEls,
    })
  })
  .then(res => res.json())
  .then((data)=> {
    console.log('w3schools data ',data)
    keyPressInjection();

  });
}

let messageFromFront;
// when file gets executed, we need to get a message back from content.js
let result = chrome.runtime.onMessage.addListener((req, sender, sendRes)=>{

  messageFromFront = req.message;
  // if message from front is from content.js, aka it's an array
  if(Array.isArray(messageFromFront.message)){
    julieAlgoPostReq(messageFromFront.message);
    return;
  }

  // This makes Julie stfu
  if(messageFromFront.message === '3'){
    if(letJulieSpeak){
      letJulieSpeak = false;
    } else {
      letJulieSpeak = true;
    }
  } 
  userCRUDInput(messageFromFront.message);
  messageFromFront.message = undefined;

});

// Keypress.js injection
const tabCache = {};
function keyPressInjection(){
  chrome.tabs.executeScript(null, {file: './keyPress.js'}, ()=>{    
  })
};

// Content.js injection
function contentInjection(){
  chrome.tabs.executeScript(null, {file: './content.js'}, ()=>{    
  })
};

// ! IMPORTANT: chrome.tabs.onupdate could be for refreshing and not having to actively click on tab
chrome.tabs.onActivated.addListener(tab =>{

  // Get activate tab's URL
  chrome.tabs.get(tab.tabId, current_tab_info =>{
    let url = current_tab_info.url;
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
    julieTalks(shortURL)

    // Initial fetch request to check if current tab's domain's rankings table exists
    function fetchRequestChain(){

      fetch('http://localhost:3333/rankings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainName: shortURL,
        })
      })
      .then(res => res.json())
      .then(data =>{

      // If user's rankings exist
      if(Array.isArray(data)){
        julieTalks(`These are the top ${data.length} rankings for this site.`) 

        data.forEach(el => {
          julieTalks(`${el.ranking}. ${el.name}`); 
        })

        if(!tabCache[shortURL]){
          tabCache[shortURL] = true;
          keyPressInjection();

        } else {
          messageFromFront.message = undefined;
          console.log('tabCache ', tabCache);
        }

      } else {
        if(!tabCache[shortURL]){
          tabCache[shortURL] = true;
          contentInjection();

        } else {
          messageFromFront.message = undefined;
          console.log('tabCache ', tabCache);
        }
      }
    })
    .catch(err => {
      console.log('error in fetch request', err);
    })}

    fetchRequestChain();
  }); // end of chrome tabs get url
});


