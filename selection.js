chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getSelection"){
    var selectedFragment = window.getSelection().getRangeAt(0).cloneContents();
    var listOfAnchors = selectedFragment.querySelectorAll("a");
    let linkArray = []; 
    listOfAnchors.forEach(function(hrefvalue){
      linkArray.push(hrefvalue.href);
    });
    console.log(linkArray);
    sendResponse({data: linkArray});
  } else if (request.method == "getAll"){
    var listOfAnchors = document.body.querySelectorAll("a");
    let linkArray = []; 
    listOfAnchors.forEach(function(hrefvalue){
      linkArray.push(hrefvalue.href);
    });
    console.log(linkArray);
    sendResponse({data: linkArray});
  } else{
    sendResponse({});
  }
});