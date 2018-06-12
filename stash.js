chrome.browserAction.onClicked.addListener(function() {

});

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

// chrome.storage.sync.get('tabGroups', function(data) {

// });
