// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // No tabs or host permissions needed!
    console.log('Crawling ' + tab.url + '...');

    chrome.tabs.executeScript(null, {
        file: "lib/jquery-2.1.1.min.js"
    }, function() {
        chrome.tabs.executeScript(null, {
            file: 'script.js'
        });
    });

});