setTimeout(function(){ 

  // TTS 
  function julieTalks(message){
    let msg = new SpeechSynthesisUtterance(message)
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[3]
      window.speechSynthesis.speak(msg)
  }

  // Get current tab's URL
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
        julieTalks(`You're on ${shortURL}.`)

  // Check if new user
  let username;

  // Fetch request to see if current site has existing rankings
  /**
   Backend logic will:
    - check if user rankings for this site exists
    - check if user acc exists
    - check some cache to see if site was visited before
    - if yes, check if shortcuts for user exists
    - if no, based off if cached info exists, response will prompt front end to ask if want to create user account
   */

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
     /**
      [
      { _id: 1, ranking: 1, dom_element: 'button', name: 'search button' }
      ]
    */

      julieTalks(`These are are the top results. ${data[0].ranking}. ${data[0].name}`)

      // POST req template
      document.querySelector('button').addEventListener('click', onclick, false)
     
      function onclick(){
        fetch('http://localhost:3333/rankings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          params: JSON.stringify({
          })
        })
          .then((res) => res.json()) 
      }

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

/** 

WILL NEED TO FIX THIS WITH FIGURING OUT ASYNC OR PUTTING THIS
AS PART OF THE BACKGROUND.JS

this traverses dom of current page 

var nodes = document.evaluate("//body[@id='_dpz']", document, null, 
                               XPathResult.ANY_TYPE, null)
var resultNode = nodes.iterateNext()
if (resultNode) {
  // Found the first node. Output its contents.
  // basically outputs everything contained within the thing
  // returns string
  // can regex
  console.log('typeof: ', typeof resultNode.innerHTML);

}
*/