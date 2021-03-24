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
    // Works
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


let messageFromFront;
// when file gets executed, we need to get a message back from content.js
let result = chrome.runtime.onMessage.addListener((req, sender, sendRes)=>{

  if(req.message){
    messageFromFront = req.message;
    console.log('message received from front', messageFromFront)
    
    // This makes Julie stfu
    if(messageFromFront.message === '3'){
      console.log('will she shut up? ',letJulieSpeak)
      if(letJulieSpeak){
        letJulieSpeak = false;
      } else {
        letJulieSpeak = true;
      }
    } else {

      //! COME BACK AND FIX BUG WITH THIS
      userCRUDInput(messageFromFront.message);
      messageFromFront.message = undefined;
    }
      
  }
});

// Keypress injection
const tabCache = {};
function keyPressInjection(){
  chrome.tabs.executeScript(null, {file: './keyPress.js'}, ()=>{    
  })
};

// ! IMPORTANT: chrome.tabs.onupdate could be for refreshing and not having to actively click on tab
chrome.tabs.onActivated.addListener(tab =>{

  chrome.tabs.get(tab.tabId, current_tab_info =>{
    let url = current_tab_info.url;
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
    julieTalks(shortURL)

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

      // if we do get rankings back
      if(data.length !== 0){
        julieTalks(`These are the top ${data.length} rankings for this site.`) 
        // loop through responses up to 5
        data.forEach(el => {
          julieTalks(`${el.ranking}. ${el.name}`); 
        })
        // check if in cache
        if(!tabCache[shortURL]){

          // store url in cache here
          tabCache[shortURL] = true;
          // invoke inject func
          keyPressInjection();

        } else {
          messageFromFront.message = undefined;
          // we put the if conditions for checking key presses here
          console.log('tabCache ', tabCache);
        }

      } else {
        // make sure we set the content.js script inject in the same format as the keypress inject
        julieTalks(`nope`) 
      }
    });
    }
    fetchRequestChain();
    


    // fetch('http://localhost:3333/rankings/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     domainName: shortURL,
    //   })
    // })
    // .then((res) => res.json())
    // .then((data)=> {

    //   // Check if Data is an empty array  
    //   if(data.length !== 0){
    //     // make this more modular in the future
    //     // possibly another page for just handling responses
    //     julieTalks('Looks like users had some recommendations for this site. Would you like to hear them? Press 1 for yes, 2 for no') 
    //     chrome.tabs.addEventListener("keyup", function(event) {
    //       alert('hi')
    //       if (event.key === "1") {
    //         julieTalks(`These are are the top results. ${data[0].ranking}. ${data[0].name}`)
    //       }
    //     });
  

        
    //   } else {
    //     chrome.tabs.executeScript(null, {file: './content.js'}, ()=>{
    //       fetch('http://localhost:3333/rankings/new', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           newElements: messageFromFront.message,
    //         })
    //       })
    //         .then(res => json(res))
    //         .then((data)=> {
    //         })
    //       }); // end of chrome tabs execute
    //   } // end of else block
    // }); // end of last .then
  }); // end of chrome tabs get url
});


