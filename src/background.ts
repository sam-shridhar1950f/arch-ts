// let active = false;
// const url = window.location.href;


function wayback(url : string): boolean | undefined {

    if (url?.startsWith("chrome://")) return undefined;
      
    var modify = "https://web.archive.org/web/";   
    var http = new XMLHttpRequest();

    http.open('HEAD', url, false); 
    http.send();

    if (http.status == 404 && !url.includes(modify)) {
        modify += url;
        window.location.replace(modify);
        } else {
            null;
        }
    

        
    return true;
}

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
  
        chrome.scripting.executeScript({
            target: {tabId: tab.id ? tab.id : -1},
            func: wayback,
            args: [tab.url!]
        }).then();
  
    }
  })