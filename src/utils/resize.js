(function resize(doc, win) {
  const docEl = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  function recalc() {
    const { clientWidth } = docEl;
    if (!clientWidth) return;
    if (clientWidth > 750) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = `${100 * (clientWidth / 750)}px`;
    }
  }
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  recalc();
}(document, window));
