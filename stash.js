"use strict";

var tabGroups = [];

function buildTable() {
  var table = document.getElementById("stashTable");
  var fragment = document.createDocumentFragment();

  tabGroups.forEach(function(group, index) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", index);
    var td = document.createElement("td");
    td.textContent = group.name;
    var restoreLink = buildRestore();
    var deleteLink = buildDelete();
    tr.appendChild(td);
    tr.appendChild(restoreLink);
    tr.appendChild(deleteLink);
    fragment.appendChild(tr);
  });

  table.appendChild(fragment);
}

function buildRestore() {
  var td = document.createElement("td");
  var a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = "Restore";
  td.appendChild(a)
  return td;
}

function buildDelete() {
  var td = document.createElement("td");
  var a = document.createElement("a");
  a.setAttribute("href", "#");
  a.textContent = "Delete";
  td.appendChild(a)
  return td;
}

// Delete the contents of the table so we can rebuild it based on what's currently stored.
function resetTable() {
  var table = document.getElementById("stashTable");
  table.innerHTML = "";
}

function getTabGroups() {
  chrome.storage.sync.get("tabGroups", function(data) {
    tabGroups = data.tabGroups;
    resetTable();
    buildTable();
  });
}

function saveTabs() {
  // Grab the name of the tab group, or set it to a default value if blank.
  var name = document.getElementById("tabGroupName").value;

  if (name = "") {
    name = "(no name)";
  }

  // Get all tabs in the current window and build an array of URLs from them.
  var urls = [];
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    tabs.forEach(function(tab) {
      urls.push(tab.url);
    });
  });

  // Construct the tab group.
  var tabGroup = {
    name: name,
    urls: urls
  };

  // Append the new tab group to the existing groups.
  tabGroups.push(tabGroup);

  // Save the tab group to storage.
  chrome.storage.sync.set({ "tabGroups": tabGroups }, function() {
    resetTable();
    buildTable();
  });
}

function setup() {
  console.log("setup");
  getTabGroups();
  document.getElementById("save").addEventListener("click", saveTabs);
}

document.addEventListener("DOMContentLoaded", setup);
// window.onload = function() {
//   setup();
// }
