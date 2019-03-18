let touchIdentifier = 0;

function simulateTouchEvent(target, e, eventType) {
  if (!touchIdentifier) {
    return;
  }

  const touchObj = new Touch({
    identifier: touchIdentifier,
    target: target,
    clientX: e.clientX,
    clientY: e.clientY,
    radiusX: 2.5,
    radiusY: 2.5,
    rotationAngle: 10,
    force: 0.5,
  });

  const touchEvent = new TouchEvent(eventType, {
    cancelable: true,
    bubbles: true,
    touches: [touchObj],
    targetTouches: [],
    changedTouches: [touchObj],
    shiftKey: true,
  });

  target.dispatchEvent(touchEvent);
}

let dpcRoot = document.getElementById('dpc_root');
let config = {
  attributes: false,
  childList: true,
  subtree: true,
};

let mapTouchEvents = element => {
  element.addEventListener('mousedown', e => { touchIdentifier = Date.now(); simulateTouchEvent(element, e,'touchstart'); }, true);
  element.addEventListener('mousemove', e => { simulateTouchEvent(element, e,'touchmove'); }, true);
  element.addEventListener('mouseup', e => { simulateTouchEvent(element, e,'touchend'); touchIdentifier = 0; }, true);
}

let callback = (mutationsList, observer) => {
  for (let mutation of mutationsList) {
    if (mutation.type == 'childList') {
      let target = mutation.target;
      let table;

      mutation.addedNodes.forEach(node => {
        if (target.className && target.className.indexOf('app_NavContents') > -1) {
          table = node.querySelector('div[class^="tournamentpage_Standing"] > div')
        } else if (node.nodeName === 'DIV' && node.parentNode.className && node.parentNode.className.indexOf('tournamentpage_Standing') > -1) {
          table = node
        }
      });

      if (table) {
        mapTouchEvents(table);
      }
    }
  }
};

let observer = new MutationObserver(callback);
observer.observe(dpcRoot, config);
