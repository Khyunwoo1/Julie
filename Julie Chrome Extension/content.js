console.log('CONTENT JS INJECTED')

// ! this wouldn't make sense until the machine learning bit
// Algo Script 
function domTraverse(){
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

  const amazonHomePageParams = {
    searchBar : 'twotabsearchtextbox'
  }

  for(let key in amazonHomePageParams){
    const importantEl = {};
    const currentParam = amazonHomePageParams[key];

    let result = document.getElementById(currentParam);
    if(result){
      importantEl.name = key
      arrOfImportantEls.push(importantEl);
    }
  }


  // Since dominos dom is protected: loop through obj of w3SchoolsHomePageParams
  // basically checks based off "type" of website, what Julie believes would be important elements
  //! this is for w3schools loop
  // for(let key in w3SchoolsHomePageParams){
    
  //   const importantEl = {};
  //   const currentParam = w3SchoolsHomePageParams[key];
  //   // will regex ^ this string to be more dynamic


  //   // XPATH is async, document.getlementby is not.

  //   // do xpath search of each critera
  //   // search param is for "a", but need to make dynamic also
  //   // CASE SENSITIVE!!!

  //   const nodes = document.evaluate(`//a[text()="${currentParam}"]`, document, null, XPathResult.ANY_TYPE, null);
  //   const resultNode = nodes.iterateNext();
  //   // should put into obj with element type and any relevant info like inner html or class/id name
  //   // push results into arr of important els

  //   if(resultNode){
  //     // Need a way to get the current result node's el/tag type and innerHTML
  //     const nodeText = resultNode.innerHTML;
  //     importantEl.name = nodeText;
  //     // importantEl[dom_element] = 
  //     arrOfImportantEls.push(importantEl)
  //   } else {
  //     // alert('inside else of result node')
  //   }
  // }
  return arrOfImportantEls;
}

// SEND DATA TO BACK END
if(domTraverse().length !== 0){
  console.log('inside dom traverse')
  const myMessage = {message: domTraverse()}
  chrome.runtime.sendMessage({message: myMessage});

  // after we get a response, can we clear it?
} else {
  console.log('not inside dom traverse')
}
