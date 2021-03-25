window.addEventListener("keyup", function(event) {
  
  // It seems like it doesn't really even matter on this end what the event is including
  // letters
  const myMessage = {message: event.key}
  console.log('myMessage ', myMessage)
  chrome.runtime.sendMessage({message: myMessage});

});