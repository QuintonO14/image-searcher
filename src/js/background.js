
let searchEngines = ['google', 'tineye']
localStorage.services = searchEngines

let engines = {
    "google" : ["Google", "Google Search", "https://www.google.com/searchbyimage?image_url=", "image"],
    "tineye": ["TinEye", "TinEye Search", "https://www.tineye.com/search/?url=", "image"]
}
const menus = {}

const openTab = (service, query) => {
    const url = engines[service][2]+ encodeURIComponent(query);
    chrome.tabs.create({url : url});
}

const reverseImageSearch = (service, query) => {
        openTab(service, query);
}

const clickHandler = (info, tab) => {
    console.log('Clicked')
    console.log(info)
    reverseImageSearch(menus[info.menuItemId], link);
}

const createMenu = () => {
    chrome.contextMenus.create({
        "title" : "Reverse Image Search",
        "type" : "normal",
        "id" : "reverseSearch",
        "contexts" : ["image"]
    });

    const myServices = localStorage.services.split(",");

    console.log(myServices)
    for (i = 0; i < myServices.length; i++) {
        const menu = chrome.contextMenus.create({
          title: engines[myServices[i]][1],
          id: myServices[i],
          type: "normal",
          contexts: engines[myServices[i]].slice(3),
          parentId: "reverseSearch",
        })
        menus[menu] = myServices[i]
      }
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if(menus[info.menuItemId]) {
        const link = info.srcUrl
        reverseImageSearch(menus[info.menuItemId], link);
    }
})



createMenu();



