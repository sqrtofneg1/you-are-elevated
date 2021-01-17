let getSelectedButton = document.getElementById('open-selected');
let getLinksSpecified = document.getElementById('open-specified');
let getLinksSpecifiedAll = document.getElementById('open-specified-all');
let getOptions = document.getElementById('go-to-options');

//Highlighted links
getSelectedButton.onclick = function(element) {
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

//Specified, highlighted links
getLinksSpecified.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getSelection"}, 
    function(response){
      console.log(response.data);
      let urls = response.data;
      let urls_no_repeats = [];
      let sites = document.getElementById("url-value").value.split("\n");
      //remove duplicate links
      urls.forEach(element => {
        if (!urls_no_repeats.includes(element)){
          let matchesUrl = false;
          for (let i = 0; i < sites.length; i++){
            if (element.includes(sites[i])){
              matchesUrl=true;
            };
          };
          if (matchesUrl){
            urls_no_repeats.push(element);
          };
        };
      });

      for (let x = 0; x < urls_no_repeats.length; x++){
        chrome.tabs.create({'url': urls_no_repeats[x]}, function(tab){});//opens in new tabs
      }
    });
  });
};

//Specified links, whole page
getLinksSpecifiedAll.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, 
  function(tab) {
    chrome.tabs.sendMessage(tab[0].id, {method: "getAll"}, 
    function(response){
      console.log(response.data);
      let urls = response.data;
      let urls_no_repeats = [];
      let sites = document.getElementById("url-value2").value.split("\n");
      //remove duplicate links
      urls.forEach(element => {
        if (!urls_no_repeats.includes(element)){
          let matchesUrl = false;
          for (let i = 0; i < sites.length; i++){
            if (element.includes(sites[i])){
              matchesUrl=true;
            };
          };
          if (matchesUrl){
            urls_no_repeats.push(element);
          };
        };
      });

      for (let x = 0; x < urls_no_repeats.length; x++){
        chrome.tabs.create({'url': urls_no_repeats[x]}, function(tab){});//opens in new tabs
      }
    });
  });
};

getOptions.onclick = function(element) {
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('../options.html'));
  }
};