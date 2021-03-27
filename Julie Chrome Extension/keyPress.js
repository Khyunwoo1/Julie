

// can check for observations on keypress.js
// const observer = new MutationObserver();
// observer.observe();
console.log('yo')

window.addEventListener("keyup", function(event) {

  // right now 1 and 2 aren't tied in with anything on background so maybe I can use them subsequently
  console.log('something was clicked')
  //! !!!!!!!!!!!!!!! WE CAN BUY OFF AMAZON!!!!!!!!!
   if(event.key === '1'){
    // search bar
    console.log('1 clicked ')
    let searchBar = document.getElementById('twotabsearchtextbox');
    searchBar.value = 'pull up bar'
    let searchButton = document.getElementById('nav-search-submit-button');
    searchButton.click();
  }

  if(event.key === '2'){
    // ALSO WORKS!
    console.log('2 clicked ')
    // class = 'Delivery c-delivery circ-icons__icon  circ-icons__icon--delivery'
    // HolaHatha Pull Up Bar Heavy Duty Door Way Chin-up Dip Station Fitness Multi-use Portable Gym Home Workout for Door Way for Upper Body Strength and Building Muscle
    const nodes = document.evaluate(`//span[text()="HolaHatha Pull Up Bar Heavy Duty Door Way Chin-up Dip Station Fitness Multi-use Portable Gym Home Workout for Door Way for Upper Body Strength and Building Muscle"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    resultNode.click();
  }

  if(event.key === '3'){
    // search bar
    console.log('3 clicked ')
    let addToCart = document.getElementById('add-to-cart-button');
    addToCart.click();
  }

  if(event.key === '4'){
    // search bar
    console.log('4 clicked ')
    let addToCart = document.getElementById('hlb-ptc-btn-native');
    addToCart.click();
  }

  if(event.key === '5'){
    // search bar
    console.log('5 clicked ')
    const nodes = document.evaluate(`//a[@class="a-declarative a-button-text "]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    resultNode.click();
  }

  if(event.key === '6'){
    // search bar
    console.log('6 clicked ')
    const nodes = document.evaluate(`//input[@class="a-button-text"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    resultNode.click();

  }


  //! FOR DOMINOS
  // if(event.key === '1'){
  //   // WORKS WITH DOMINOS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  //   console.log('1 clicked ')
  //   const nodes = document.evaluate(`//a[text()="Order Online"]`, document, null, XPathResult.ANY_TYPE, null);
  //   const resultNode = nodes.iterateNext();
  //   console.log('is this the right one ', resultNode.innerHTML)
  //   console.log('should now click button');
  //   resultNode.click();
  // }

  // if(event.key === '2'){
  //   // ALSO WORKS!
  //   console.log('2 clicked ')
  //   // class = 'Delivery c-delivery circ-icons__icon  circ-icons__icon--delivery'
  //   const nodes = document.evaluate(`//span[@class="Delivery c-delivery circ-icons__icon  circ-icons__icon--delivery"]`, document, null, XPathResult.ANY_TYPE, null);
  //   const resultNode = nodes.iterateNext();
  //   resultNode.click();
  // }

  // // FOR DROP DOWN FORM OF HOUSE, APT, ETC...
  // if(event.key === '3'){

  //   console.log('3 clicked ')
  //   // arr of nodes
  //   // const nodes = document.evaluate(`//select[@id="Address_Type_Select"]`, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).

  //   // let dropDown = document.getElementById('Address_Type_Select');
  //   // console.log('dropDown', dropDown)
  //   // dropDown.click();

  //   selectElement('Address_Type_Select', 'House')

  //   function selectElement(id, valueToSelect) {    
  //       let element = document.getElementById(id);
  //       element.value = valueToSelect;
  //   }

    //! obviously this needs work but it works so far
    // const houseNode = nodes[0];
    // console.log('house', houseNode);
    // console.log('house node val', houseNode.value);
    // console.log('nodes val', nodes.value)
    // nodes.value = houseNode.value;
    // console.log('nodes val', nodes.value)

    // nodes.forEach(el=>{
    //   console.log('el', el)
    // })

    // const resultNode = nodes.iterateNext();
    // console.log('result Node for drop down ',resultNode)

  // }


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
