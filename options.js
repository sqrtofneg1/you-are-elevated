// Saves options to chrome.storage
function save_options() {
  var links_to_open = document.getElementById("savehref").value;
  console.log(links_to_open);
  chrome.storage.sync.set({
    saved: links_to_open
  }, function () {
    // Update status to let user know options were saved.
    buildMenu();
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function () {
      status.textContent = '';
    }, 750);
  });
};

function restore_options() {
  chrome.storage.sync.get({
    saved: ''
  }, function (items) {
    document.getElementById('savehref').value = items.saved;
  });
};

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);

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
};