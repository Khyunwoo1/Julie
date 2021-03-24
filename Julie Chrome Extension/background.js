function speak (message) {
  let msg = new SpeechSynthesisUtterance(message)
  let voices = window.speechSynthesis.getVoices()
  msg.voice = voices[4]
  window.speechSynthesis.speak(msg)
}
speak('');

// TTS 
function julieTalks(message){
  let msg = new SpeechSynthesisUtterance(message)
    let voices = window.speechSynthesis.getVoices()
    msg.voice = voices[4]
    window.speechSynthesis.speak(msg)
}

// THIS WILL PROB HAVE TO BE SOME SORT OF OBJ BASED OFF WHAT MESSAGE IS
let messageFromFront;
// when file gets executed, we need to get a message back from content.js
let result = chrome.runtime.onMessage.addListener((req, sender, sendRes)=>{
  if(req.message){
    messageFromFront = req.message;
    console.log('message received from front', messageFromFront)
  }
});

// Keypress injection
const tabCache = {};
function keyPressInjection(){

  chrome.tabs.executeScript(null, {file: './keyPress.js'}, ()=>{
    // Julie: looks like users put in rankings, wanna hear them?
    // looks like its having the stacking issue like last time
    // see if sending through messenger changes anything
    julieTalks('1 or 2?') 
    console.log('yoyoyo')
    
  })
};

// ! IMPORTANT: chrome.tabs.onupdate could be for refreshing and not having to actively click on tab
chrome.tabs.onActivated.addListener(tab =>{

  chrome.tabs.get(tab.tabId, current_tab_info =>{
    let url = current_tab_info.url;
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
    julieTalks(shortURL)

    async function fetchRequestChain(){

      try{
      const response = await fetch('http://localhost:3333/rankings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domainName: shortURL,
        })
      })

      // if we do get rankings back
      if(response){
        // check if in cache
        if(!tabCache[shortURL]){
          // store url in cache here
          tabCache[shortURL] = true;
          // invoke inject func
          keyPressInjection();
          console.log('message from front', messageFromFront);
        } else {
          console.log('tabCache ', tabCache);
        }
      }



    } catch (err){
      
    }
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


