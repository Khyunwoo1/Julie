// var nodes = document.evaluate("//body[@id='walking-icon']", document, null, XPathResult.ANY_TYPE, null)
// var resultNode = nodes.iterateNext()
// if (resultNode) {

//   // Found the first node. Output its contents.
//   // basically outputs everything contained within the thing
//   // returns string
//   // can regex
//   console.log(resultNode.innerHTML);
// }


setTimeout(function(){ 

  // TTS 
  function julieTalks(message){
    let msg = new SpeechSynthesisUtterance(message)
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[3]
      window.speechSynthesis.speak(msg)
  }

  // DOM Traverse
  // function domTraversal(){
  //   julieTalks('inside dominos site')
  //   var nodes = document.evaluate("//body[@id='_dpz']", document, null, XPathResult.ANY_TYPE, null)
  //   var resultNode = nodes.iterateNext()
  //   if (resultNode) {
  //     alert('yo')
  //     // Found the first node. Output its contents.
  //     // basically outputs everything contained within the thing
  //     // returns string
  //     // can regex
  //     console.log('typeof: ', typeof resultNode.innerHTML);
  //   }
    
  // }

  // Get current tab's URL
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
        julieTalks(`You're on ${shortURL}.`)

  // Check if new user
  let username;

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
    // have to make it modular so that it does initial get request
    // then if the response is (sorry bro, that domain doesnt exist yet)

    // then does web crawler algo run
    // finds important rankings

    // then does a post request 
    // at that point, table creation + updates happen

    // Check if Data is an empty array  
    if(data.length !== 0){
      julieTalks(`These are are the top results. ${data[0].ranking}. ${data[0].name}`)
    } else {
      domTraversal();

      // fetch('http://localhost:3333/rankings/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     domainName: shortURL,
      //   })
      // })
      //   .then(res => json(res))
      //   .then((data)=> {
      //   }
      /**
        [
        { _id: 1, ranking: 1, dom_element: 'button', name: 'search button' }
        ]
      */

    }


      // POST req template
      // document.querySelector('button').addEventListener('click', onclick, false)
     
      // function onclick(){
      //   fetch('http://localhost:3333/rankings', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     params: JSON.stringify({
      //     })
      //   })
      //     .then((res) => res.json()) 
      // }

      /**
        ASSUMING THIS PART WORKS

        Dom trav script is for:
          - adding to hot keys
          - adding to rankings
       */

      // editing rankings

      // creating shortcuts

      // normal screen reading


      
    }); // end of .then
    }); // end of get current tab's url
});

function speak (message) {
  let msg = new SpeechSynthesisUtterance(message)
  let voices = window.speechSynthesis.getVoices()
  msg.voice = voices[3]
  window.speechSynthesis.speak(msg)
}
speak('')
