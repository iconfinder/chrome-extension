// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
});

chrome.omnibox.onInputChanged.addListener(
    function(text, suggest)
    {
        text = text.replace(" ", "");

        // Add suggestions to an array
        var suggestions = [];
        suggestions.push({ content: "http://iconfinder.com/search/?q=" + text, description: "Search Iconfinder: " + text });

        // Set first suggestion as the default suggestion
        chrome.omnibox.setDefaultSuggestion({description:suggestions[0].description});

        // Remove the first suggestion from the array since we just suggested it
        suggestions.shift();

        // Suggest the remaining suggestions
        suggest(suggestions);
    }
);

chrome.omnibox.onInputEntered.addListener(
    function(text)
    {
        chrome.tabs.getSelected(null, function(tab)
        {
            var url;
            if (text.substr(0, 7) == 'http://iconfinder.com') {
                url = text;
            } else {
                url = 'http://iconfinder.com/search/?q=' + text;
            }
            chrome.tabs.update(tab.id, {url: url});
        });
    }
);
