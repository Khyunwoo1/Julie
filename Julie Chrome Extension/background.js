function speak (message) {
  let msg = new SpeechSynthesisUtterance(message)
  let voices = window.speechSynthesis.getVoices()
  msg.voice = voices[4]
  window.speechSynthesis.speak(msg)
}
speak('');

// Toggle Julie TTS on or off
let letJulieSpeak = true;
let firstTime = true;
let firstRanking = true;

// TTS 
function julieTalks(message){
  if(letJulieSpeak){
    let msg = new SpeechSynthesisUtterance(message)
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[4]
      window.speechSynthesis.speak(msg)
  }
}

let shortUrl;

// Basic user input
//! THIS SHOULD ULTIMATELY BE TOWARDS USERS OWN TABLE
//! ALSO, NEED TO SET IT UP SO WE GET THE PROPER NAME OF WHAT TO SEND OVER
  // AKA: SEARCH BUTTON, ORDER ONLINE, ETC
function userCRUDInput(input){

  let voteVal;
  if(input === "2"){
    voteVal = -1; 
  } else if (input === "1"){
    voteVal = 1;
  }

  console.log('vote val before ', voteVal)  

  fetch('http://localhost:3333/rankings/edit/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currentUrl: shortURL,
      voteType: voteVal,

    })
  })
  .then(res => res.json())
  .then(data => {
    console.log('returned from user input backend', data);
  })
}

// Julie says rankings
let rankingResponse;
function julieSaysRankings(){
  if(firstRanking){
    julieTalks(`These are the top ${rankingResponse.length} rankings for this site.`) 
    julieTalks(`If at any point you would like to hear rankings for a site, just press 4 again`);
    firstRanking = false;
  }
  rankingResponse.forEach(el => {
    julieTalks(`${el.ranking}. ${el.name}`); 
  }) 

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

// WHY IS IT LOOPING OR STACKING?
let tabUpdated = false;
//! TEST FOR ON UPDATED
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined) {
      if (!tabUpdated) {
          hi();
          tabUpdated = true;
        } 
      else {
        hi();
        tabUpdated = false;
        
      }
  }
});

function hi(){
  keyPressInjection();
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
  
  // on Key press, that's when we want to invoke listener, no?
  // onupdated listener has to be listening the whole time from before when 
  // key is pressed
  if(messageFromFront.message === '1' || messageFromFront.message === '2'){
    console.log('you pressed: ', messageFromFront.message);

  }


  // If user chooses 4 (aka yes to hearing rankings)
  if(messageFromFront.message === '4'){
    console.log('4 PRESSED')
    // rankingLoop = true;
    julieSaysRankings();
  } 

  // This makes Julie stfu
  if(messageFromFront.message === '3'){
    if(letJulieSpeak){
      letJulieSpeak = false;
    } else {
      letJulieSpeak = true;
    }
  }
  //! UNCOMMENT THIS PART AFTER YOU FIGURE OUT THE WEB NAV PART 
  // userCRUDInput(messageFromFront.message);
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

  if(firstTime){
    // julieTalks(`Hi. I’m Julie. I’ll be your virtual assistant in navigating the web.
    // Since this is your first time, I’ll quickly go over 3 things you should remember.
    // 1. If you want bring up all your key options, just press the “~” key for the menu...
    // `);

    // julieTalks(`
    // 2. If you want to repeat what I just said, you can press r... 
    // 3. If you want me to go on mute, just toggle the “3” key on and off!
    
    // Otherwise, just click on any tab and I’ll help you navigate the most important parts of that webpage!
    // `) 
    firstTime = false;
    
  } else {

  // Get activate tab's URL
  chrome.tabs.get(tab.tabId, current_tab_info =>{
    let url = current_tab_info.url;
    shortURL = url.match(/\.(.*?)\.co/i)[1];
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

        // Ask user if they'd like to listen to rankings for site
        if(firstRanking){
          julieTalks(`Rankings. 1 order Online. 2. Delivery`);
        }
        
        rankingResponse = data;
        if(!tabCache[shortURL]){
          tabCache[shortURL] = true;
          keyPressInjection();

        } else {
          // try removing from cache
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
  } // end of first time else
});


