function domTraversal(){

  const arrOfImportantEls = [];
  
  // tags obj should probably be universal
  const tags = {
    a: 'a',
    button: 'button',
  }
  
  // and the unique ones will be brought to front end from backend
  const dominosHomePageParams = {
    order: 'order online',
    track: 'track order',
    delivery: 'delivery'
  }

  const w3SchoolsHomePageParams = {
    learnSQL: 'LEARN SQL',
    SQLReference: 'SQL REFERENCE',
    learnPython: 'LEARN PYTHON',
  }
  
  // Since dominos dom is protected: loop through obj of w3SchoolsHomePageParams
  // basically checks based off "type" of website, what Julie believes would be important elements
  for(let key in w3SchoolsHomePageParams){
    
    const importantEl = {};
    const currentParam = w3SchoolsHomePageParams[key];
    // will regex ^ this string to be more dynamic


    // XPATH is async, document.getlementby is not.
    alert(document.getElementsByClassName("w3-button w3-dark-grey"))
    // do xpath search of each critera
    // search param is for "a", but need to make dynamic also
    // CASE SENSITIVE!!!
    const nodes = document.evaluate(`//a[text()="${currentParam}"]`, document, null, XPathResult.ANY_TYPE, null);
    const resultNode = nodes.iterateNext();
    // should put into obj with element type and any relevant info like inner html or class/id name
    // push results into arr of important els

    if(resultNode){
      // Need a way to get the current result node's el/tag type and innerHTML
      const nodeText = resultNode.innerHTML;
      alert('inside result node if ')
      importantEl.name = nodeText;
      // importantEl[dom_element] = 
      arrOfImportantEls.push(importantEl)
    } else {
      alert('inside else of result node')
    }
  }
  // returns out the array that'll be fetched
  return arrOfImportantEls;
}




setTimeout(function(){ 

  // TTS 
  function julieTalks(message){
    let msg = new SpeechSynthesisUtterance(message)
      let voices = window.speechSynthesis.getVoices()
      msg.voice = voices[4]
      window.speechSynthesis.speak(msg)
  }

  // Get current tab's URL
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    // use `url` here inside the callback because it's asynchronous!
    let shortURL = url.match(/\.(.*?)\.co/i)[1];
        julieTalks(`You're on ${shortURL}.`)

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

    alert('else statement')
    const arrOfImportantEls = domTraversal();

    fetch('http://localhost:3333/rankings/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newElements: arrOfImportantEls,
      })
    })
      .then(res => json(res))
      .then((data)=> {
      })
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
speak('');
