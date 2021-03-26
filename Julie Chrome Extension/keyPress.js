window.addEventListener("keyup", function(event) {

  console.log('something was clicked')
  if(event.key === '1'){
    // WORKS WITH DOMINOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('1 clicked ')
    const nodes = document.evaluate(`//a[text()="Order Online"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    console.log('is this the right one ', resultNode.innerHTML)
    console.log('should now click button');
    resultNode.click();
  }

  if(event.key === '2'){
    // WORKS WITH DOMINOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('2 clicked ')
    const nodes = document.evaluate(`//a[text()="Order Online"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    console.log('is this the right one ', resultNode.innerHTML)
    console.log('should now click button');
    resultNode.click();
  }

  if(event.key === '3'){
    // ALSO WORKS!
    console.log('3 clicked ')
    // class = 'Delivery c-delivery circ-icons__icon  circ-icons__icon--delivery'
    const nodes = document.evaluate(`//span[@class="Delivery c-delivery circ-icons__icon  circ-icons__icon--delivery"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    console.log('is this the right one ', resultNode.innerHTML)
    console.log('should now click button');
    resultNode.click();
  }

  // if(event.key === '4'){
  //   // WORKS WITH DOMINOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   counter++;
  //   console.log('4 clicked ')
  //   const nodes = document.evaluate(`//a[text()="Order Online"]`, document, null, XPathResult.ANY_TYPE, null);
  //   const resultNode = nodes.iterateNext();
  //   console.log('is this the right one ', resultNode.innerHTML)
  //   console.log('should now click button');
  //   resultNode.click();
  // }










  // It seems like it doesn't really even matter on this end what the event is including
  // letters
  // const myMessage = {message: event.key}
  // console.log('myMessage ', myMessage)
  // chrome.runtime.sendMessage({message: myMessage});

});