var pageConditions = {
  conditions: [new chrome.declarativeContent.PageStateMatcher({
    pageUrl: {
      schemes: ["https", "http"]
    }
  })],
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

function listenerFunction(information, tab) {
  //Open highlighted
  if (information.menuItemId == "openHighlighted") {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {
            method: "getSelection"
          },
          function (response) {
            console.log(response.data);
            let urls = response.data;
            let urls_no_repeats = [];

            //remove duplicate links
            urls.forEach(element => {
              if (!urls_no_repeats.includes(element)) {
                urls_no_repeats.push(element);
              }
            });

            for (var x = 0; x < urls_no_repeats.length; x++) {
              chrome.tabs.create({
                'url': urls_no_repeats[x]
              }, function (tab) {}); //opens in new tabs
            }
          });
      });

    //Open all with specified options
  } else if (information.menuItemId == "openAllOptions") {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {
            method: "getAll"
          },
          function (response) {
            console.log(response.data);
            let urls = response.data;
            let urls_no_repeats = [];
            chrome.storage.sync.get({
              saved: ''
            }, function (items) {
              var saveditems = items.saved;
              let sites = saveditems.split("\n");
              //remove duplicate links
              urls.forEach(element => {
                if (!urls_no_repeats.includes(element)) {
                  let matchesUrl = false;
                  for (let i = 0; i < sites.length; i++) {
                    if (element.includes(sites[i])) {
                      matchesUrl = true;
                    };
                  };
                  if (matchesUrl) {
                    urls_no_repeats.push(element);
                  };
                };
              });

              for (let x = 0; x < urls_no_repeats.length; x++) {
                chrome.tabs.create({
                  'url': urls_no_repeats[x]
                }, function (tab) {}); //opens in new tabs
              }
            });
          });
      });

    //Open highlighted with specified options
  } else if (information.menuItemId == "openAllOptionsHighlighted") {
    chrome.tabs.query({
        active: true,
        currentWindow: true
      },
      function (tab) {
        chrome.tabs.sendMessage(tab[0].id, {
            method: "getSelection"
          },
          function (response) {
            console.log(response.data);
            let urls = response.data;
            let urls_no_repeats = [];
            chrome.storage.sync.get({
              saved: ''
            }, function (items) {
              var saveditems = items.saved;
              let sites = saveditems.split("\n");
              //remove duplicate links
              urls.forEach(element => {
                if (!urls_no_repeats.includes(element)) {
                  let matchesUrl = false;
                  for (let i = 0; i < sites.length; i++) {
                    if (element.includes(sites[i])) {
                      matchesUrl = true;
                    };
                  };
                  if (matchesUrl) {
                    urls_no_repeats.push(element);
                  };
                };
              });

              for (let x = 0; x < urls_no_repeats.length; x++) {
                chrome.tabs.create({
                  'url': urls_no_repeats[x]
                }, function (tab) {}); //opens in new tabs
              }

            });

          });
      });
  };
};

chrome.runtime.onInstalled.addListener(function () {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    chrome.declarativeContent.onPageChanged.addRules([pageConditions]); //When we're allowing users to use app
  });
  buildMenu();
});


//builds the context menu.
function buildMenu() {
  chrome.contextMenus.removeAll(function () {
    chrome.contextMenus.create({
      title: "Open all highlighted links",
      id: "openHighlighted",
      contexts: ["selection"]
    });
    chrome.storage.sync.get({
      saved: ''
    }, function (items) {
      var saveditems = items.saved;
      chrome.contextMenus.create({
        title: "Open all links with saved options: " + saveditems,
        id: "openAllOptions",
        contexts: ["all"]
      });
      chrome.contextMenus.create({
        title: "Open highlighted links with saved options: " + saveditems,
        id: "openAllOptionsHighlighted",
        contexts: ["selection"]
      });
    });
  });

  //One listener, uses OnClickData to find which menu item was clicked.
  chrome.contextMenus.onClicked.addListener(listenerFunction);
};