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

let arrOfDoms;
// when file gets executed, we need to get a message back from content.js
let result = chrome.runtime.onMessage.addListener((req, sender, sendRes)=>{
  if(req.message){
    console.log('message received');
    console.log(req.message);
    arrOfDoms = req.message;
  }
});

// ! IMPORTANT: chrome.tabs.onupdate could be for refreshing and not having to actively click on tab
chrome.tabs.onActivated.addListener(tab =>{

  chrome.tabs.get(tab.tabId, current_tab_info =>{
    let url = current_tab_info.url;
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
    // julieTalks(shortURL)
    fetch('http://localhost:3333/rankings/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        domainName: shortURL,
      })
    })
    .then((res) => res.json())
    .then((data)=> {

      // Check if Data is an empty array  
      if(data.length !== 0){
        julieTalks(`These are are the top results. ${data[0].ranking}. ${data[0].name}`)
      } else {
        chrome.tabs.executeScript(null, {file: './content.js'}, ()=>{
          console.log('do we have access to req.message here???', arrOfDoms)
          fetch('http://localhost:3333/rankings/new', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              newElements: arrOfDoms.message,
            })
          })
            .then(res => json(res))
            .then((data)=> {
            })
          }); // end of chrome tabs execute
      } // end of else block
    }); // end of last .then
  }); // end of chrome tabs get url
});


