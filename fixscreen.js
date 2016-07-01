!(function(win,doc,undefined){
    var docEl = doc.documentElement;
    var metaEl = doc.querySelector('meta[name="viewport"]');
    var diyMeta = doc.querySelector('meta[name="diyscreen"]');
    var diyWidth = 0;
    var dpr = 0;
    var scale = 0;
    var tid;

    if(diyMeta){//作死万能模式 ==！
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
        if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
            var version = parseFloat(RegExp.$1);
            if (version > 2.3) {
                doc.write('<meta name="viewport" content="width=' + diyWidth + ', minimum-scale = ' + phoneScale + ', maximum-scale = ' + phoneScale + ', target-densitydpi=device-dpi">');
            } else {
                doc.write('<meta name="viewport" content="width=' + diyWidth + ', target-densitydpi=device-dpi">');
            }
        } else {
            doc.write('<meta name="viewport" content="width=' + diyWidth + ', user-scalable=no, target-densitydpi=device-dpi">');
        }
    }else{// rem方式 - -
        if (!dpr && !scale) {
            var isAndroid = win.navigator.appVersion.match(/android/gi);
            var isIPhone = win.navigator.appVersion.match(/iphone/gi);
            var devicePixelRatio = win.devicePixelRatio;
            if (isIPhone) {
                if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
                    dpr = 2;
                } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)){
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
        function refreshRem(){//  设计稿/2 = 实际/dpr
            var width = docEl.getBoundingClientRect().width;
            //if (width*2 > 1080*dpr) {
            //    width = 540 * dpr;
            //}
            var rem = (width*2)/(10*dpr);
            docEl.style.fontSize = rem + 'px';
        }

        win.addEventListener('resize', function() {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }, false);
        refreshRem();
    }

})(window,document)
