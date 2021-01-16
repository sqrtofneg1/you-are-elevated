var pageConditions = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {
      schemes: ["https", "http"]
    }
  })],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

function getHighlighted(element) {
  chrome.tabs.query({active: true, currentWindow: true}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      console.log(response.data);
      let urls = response.data;
      let urls_no_repeats = [];

      //remove duplicate links
      urls.forEach(element => {
        if (!urls_no_repeats.includes(element)){
          urls_no_repeats.push(element);
        }
      });

      for (var x = 0; x < urls_no_repeats.length; x++){
        chrome.tabs.create({'url': urls_no_repeats[x]}, function(tab){});//opens in new tabs
      }
    });
  });
};

chrome.runtime.onInstalled.addListener(function(){
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
    chrome.declarativeContent.onPageChanged.addRules([pageConditions]);//When we're allowing users to use app
  });
  
  chrome.contextMenus.removeAll(function(){
    chrome.contextMenus.create({
      title: "Open all highlighted links",
      id: "openHighlighted",
      contexts: ["selection"]
    })
  });
  chrome.contextMenus.onClicked.addListener(getHighlighted);
});