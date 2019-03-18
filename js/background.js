let popupWidth = 550;
let popupHeight = window.screen.availHeight;

let runApp = () => {
  let appWindow = {
    id: 'embed',
    frame: {
      type: 'chrome',
    },
    'innerBounds': {
      width: popupWidth,
      height: popupHeight,
      minWidth: popupWidth,
      maxWidth: popupWidth,
    }
  }
  chrome.app.window.create('html/embed.html', appWindow, onWindowLoaded());
}

let onWindowLoaded = popup => {
  return win => {
    win.contentWindow.onload = () => {
      var webview = win.contentWindow.document.getElementById('webview');
      webview.setUserAgentOverride('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.75 Mobile Safari/537.36');
      webview.addEventListener('permissionrequest', e => {
        e.request.allow();
      });
    };
  };
}

chrome.app.runtime.onLaunched.addListener(runApp);
chrome.app.runtime.onRestarted.addListener(runApp);
