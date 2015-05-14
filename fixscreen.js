function fixScreen(wid) {
  var iw = window.innerWidth || wid,
    ow = window.outerWidth || iw,
    sw = window.screen.width || iw,
    saw = window.screen.availWidth || iw,
    ih = window.innerHeight || wid,
    oh = window.outerHeight || ih,
    ish = window.screen.height || ih,
    sah = window.screen.availHeight || ih;
  var w = Math.min(iw, ow, sw, saw, ih, oh, ish, sah);
  var phoneScale = parseInt(w) / wid;
  console && console.log(phoneScale);
  if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
    console && console.log(RegExp.$1);
    var version = parseFloat(RegExp.$1);
      if (version > 2.3) {
        document.write('<meta name="viewport" content="width=' + wid + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
      } else {
        document.write('<meta name="viewport" content="width=' + wid + ', target-densitydpi=device-dpi">');
      }
  } else {
    document.write('<meta name="viewport" content="width=' + wid + ', user-scalable=no, target-densitydpi=device-dpi">');
  }
};