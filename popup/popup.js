let getHighlightedButton = document.getElementById('open-highlighted');

getHighlightedButton.onclick = function(element) {
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