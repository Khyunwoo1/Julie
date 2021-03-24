// awesome so this is basically content.js
/**
  NOW YOU KNOW HOW THE BACKGROUND/CONTENT DYNAMIC WORKS

  basically you'll have to send messages back and forth to each other and try to keep shit modular

  - 1: listen to rankings
  - 2: screen reader mode
  - 3: edit rankings
  - 4: assign hot keys
  - R: repeat

 */

window.addEventListener("keyup", function(event) {
    
  // sends message to background upon register key press
  if (event.key === "1") {
      const myMessage = {message: event.key}
      console.log('myMessage ', myMessage)
      chrome.runtime.sendMessage({message: myMessage});
  }

  if (event.key === "2") {
    console.log('screen reader mode')
    const myMessage = {message: event.key}
    console.log('myMessage ', myMessage)
    chrome.runtime.sendMessage({message: myMessage});
  }
  
  if (event.key === "3") {
    console.log('edit rankings')
  }

  if (event.key === "4") {
    console.log('assign hot keys')
  }

  if (event.key === "82") {
    console.log('repeat')
  }
});