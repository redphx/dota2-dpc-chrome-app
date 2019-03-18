var webview = document.getElementById('webview');

webview.addEventListener('contentload', function () {
  webview.executeScript({
    file: 'js/touch-emulator.js',
  });

  webview.insertCSS({
    code: `div[class^="plusrequired_"] {display: none;}`,
  });
});
