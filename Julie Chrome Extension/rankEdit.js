console.log('from rankEdit.js')
// Will do post reqs here

fetch('http://localhost:3333/rankings/new', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    newElements: arrayOfImportantEls,
  })
})
.then(res => res.json())
.then((data)=> {
  console.log('w3schools data ',data)
  keyPressInjection();

});