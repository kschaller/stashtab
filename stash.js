"use strict";

function buildTable() {
  var table = document.getElementById('stashTable');
  var fragment = document.createDocumentFragment();

  tabGroups.forEach(function(group, index) {
    var tr = document.createElement('tr');
    tr.setAttribute("id", index);
    var td = document.createElement('td');
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
  var td = document.createElement('td');
  var a = document.createElement('a');
  a.setAttribute("href", "#");
  a.textContent = "Restore";
  td.appendChild(a)
  return td;
}

function buildDelete() {
  var td = document.createElement('td');
  var a = document.createElement('a');
  a.setAttribute("href", "#");
  a.textContent = "Delete";
  td.appendChild(a)
  return td;
}

// Delete the contents of the table so we can rebuild it based on what's currently stored.
function resetTable() {
  var table = document.getElementById('stashTable');
  table.innerHTML = "";
}

/*
[
  {
    name: "Group 1",
    urls: [
      "http://google.com",
      "http://www.nytimes.com"
    ]
  },
]
*/

/*

1. Retrieve a list of stored objects

2. Create HTML list elements with a loop. Assign index as a value for later use.

3. Save a new one? Just reload the whole table for simplicity.

*/

var tabGroups = [];

var testGroup = {
  name: "Test Group",
  urls: [
    "http://google.com",
    "http://www.nytimes.com"
  ]
}

tabGroups = [testGroup];

// chrome.storage.sync.get('tabGroups', function(data) {

// });

window.onload = function() {
  resetTable();
  buildTable();
}
