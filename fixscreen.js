!(function (win, doc, undefined) {
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var diyMeta = doc.querySelector('meta[name="diyscreen"]');
    var remMeta = doc.querySelector('meta[name="remscreen"]');
    var percentMeta = doc.querySelector('meta[name="percentscreen"]');
    var diyWidth = 0;
    var remWidth = 0;
    var percentWidth = 0;
    var virtualWidth = 0;
    var dpr = 0;
    var scale = 0;
    var tid;

    if (diyMeta) {//作死万能模式 ==！
        diyWidth = diyMeta.getAttribute("width");
        var iw = win.innerWidth || diyWidth,
            ow = win.outerWidth || iw,
            sw = win.screen.width || iw,
            saw = win.screen.availWidth || iw,
            ih = win.innerHeight || diyWidth,
            oh = win.outerHeight || ih,
            ish = win.screen.height || ih,
            sah = win.screen.availHeight || ih;
        var w = Math.min(iw, ow, sw, saw, ih, oh, ish, sah);
        var phoneScale = parseInt(w) / diyWidth;
        if (/Android (\d+\.\d+)/.test(win.navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                doc.write('<meta name="viewport" content="width=' + diyWidth + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            } else {
                doc.write('<meta name="viewport" content="width=' + diyWidth + ', target-densitydpi=device-dpi">');
            }
        } else {
            doc.write('<meta name="viewport" content="width=' + diyWidth + ', user-scalable=no, target-densitydpi=device-dpi">');
        }
    } else if (remMeta) {// rem方式 - -
        remWidth = remMeta.getAttribute("width");
        if (!dpr && !scale) {
            var isAndroid = win.navigator.appVersion.match(/android/gi);
            var isIPhone = win.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = win.devicePixelRatio;
            if (isIPhone) {
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 3;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
                    dpr = 2;
                } else {
                    dpr = 1;
                }
            } else {
                dpr = 1;
            }
            scale = 1 / dpr;
        }
        docEl.setAttribute('data-dpr', dpr);
        if (!metaEl) {
            metaEl = doc.createElement('meta');
            metaEl.setAttribute('name', 'viewport');
            metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
            if (docEl.firstElementChild) {
                docEl.firstElementChild.appendChild(metaEl);
            } else {
                var wrap = doc.createElement('div');
                wrap.appendChild(metaEl);
                doc.write(wrap.innerHTML);
            }
        }
        function refreshRem() {//  winWidth / designWidth * designFontSize;
            //remove max-size
            var rem;
            rem = docEl.getBoundingClientRect().width / 10;

            docEl.style.fontSize = rem + 'px';
        }

        win.addEventListener('resize', function () {
            win.clearTimeout(tid);
            tid = win.setTimeout(refreshRem, 300);
        }, false);
        refreshRem();
    } else if (percentMeta) {//rem 无缩放方式

        percentWidth = percentMeta.getAttribute("width");
        virtualWidth = percentMeta.getAttribute("virtual");

        doc.write('<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>');

        function refreshRem() {
            var rem;
            rem = docEl.getBoundingClientRect().width * virtualWidth / percentWidth;

            docEl.style.fontSize = rem + 'px';
        }

        win.addEventListener('resize', function () {
            win.clearTimeout(tid);
            tid = win.setTimeout(refreshRem, 300);
        }, false);
        refreshRem();
    }

})(window, document)
