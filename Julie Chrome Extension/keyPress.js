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
    console.log('make Julie shut up')
    const myMessage = {message: event.key}
    chrome.runtime.sendMessage({message: myMessage});
  }

  if (event.key === "4") {
    console.log('assign hot keys')
  }

  if (event.key === "82") {
    console.log('repeat')
  }
});