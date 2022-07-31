// ==UserScript==
// @name         百度文库VIP文档免费下载|全文阅读|开启右键复制，淘宝、天猫、京东商品优惠券查询
// @version      1.5.5
// @description  【本脚本功能】解除继续阅读限制，导出 PDF 文件，净化弹窗、广告，开启文库本地 VIP，淘宝、天猫、京东商品优惠券查询
// @author       zhihu
// @antifeature  membership  为防止接口被盗！该脚本需要输入验证码之后才能使用完整功能，感谢理解
// @antifeature  referral-link 【此提示为GreasyFork代码规范要求含有查券功能的脚本必须添加，实际使用无任何强制跳转，代码可查，请知悉】
// @license      End-User License Agreement
// @require      https://cdn.staticfile.org/jquery/3.6.0/jquery.min.js
// @require      https://cdn.staticfile.org/limonte-sweetalert2/11.1.9/sweetalert2.all.min.js
// @match        *://wenku.baidu.com/*
// @match        *://wk.baidu.com/*
// @match        *://item.taobao.com/*
// @match        *://chaoshi.detail.tmall.com/*
// @match        *://*detail.tmall.com/*
// @match        *://*detail.tmall.hk/*
// @match        *://*item.jd.com/*
// @match        *://npcitem.jd.hk/*
// @match        *://*.yiyaojd.com/*
// @icon         https://www.baidu.com/favicon.ico
// @connect      bdimg.com
// @connect      tool.wezhicms.com
// @grant        unsafeWindow
// @grant        GM.xmlHttpRequest
// @grant        GM_xmlhttpRequest
// @run-at       document-start
// @namespace    http://zhihupe.com/
// ==/UserScript==
// 文档净化
(function () {
    'use strict';
    const author = "zhihu";
    var url = window.location.href;
    function Toast(msg, duration = 3000) {
        var m = document.createElement('div');
        m.innerHTML = msg;
        m.style.cssText = "max-width:60%;min-width: 150px;padding:0 14px;height: 40px;color: rgb(255, 255, 255);line-height: 40px;text-align: center;border-radius: 4px;position: fixed;top: 50%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size: 16px;";
        document.body.appendChild(m);
        setTimeout(() => {
            var d = 0.5;
            m.style.webkitTransition = '-webkit-transform ' + d + 's ease-in, opacity ' + d + 's ease-in';
            m.style.opacity = '0';
            document.body.removeChild(m)
        }, duration);
    }
    
 //弹窗提示

    function GetVip(){
        // 注册个 MutationObserver，根治各种垃圾弹窗
        let count = 0;
        const blackListSelector = [
            '.vip-pay-pop-v2-wrap',
            '.reader-pop-manager-view-containter',
            '.fc-ad-contain',
            '.shops-hot',
            '.video-rec-wrap',
            '.pay-doc-marquee',
            '.card-vip',
            '.vip-privilege-card-wrap',
            '.doc-price-voucher-wrap',
            '.vip-activity-wrap-new',
            '.creader-root .hx-warp',
            '.hx-recom-wrapper',
            '.hx-bottom-wrapper',
            '.hx-right-wrapper.sider-edge'
        ]

        const killTarget = (item) => {
            if (item.nodeType !== Node.ELEMENT_NODE) return false;
            let el = item;
            if (blackListSelector.some(i => (item.matches(i) || (el = item.querySelector(i)))))
                el?.remove(), count++;
            return true
        }
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                killTarget(mutation.target)
                for (const item of mutation.addedNodes) {
                    killTarget(item)
                }
            }
        });
        observer.observe(document, { childList: true, subtree: true });
        window.addEventListener("load", () => {
            console.log(`[-] 文库净化：共清理掉 ${count} 个弹窗~`);
        });

        // 启用 VIP，解锁继续阅读

        let pageData, pureViewPageData;
        Object.defineProperty(unsafeWindow, 'pageData', {
            set: v => pageData = v,
            get() {
                if (!pageData) return pageData;

                // 启用 VIP
                if('vipInfo' in pageData) {
                    pageData.vipInfo.global_svip_status = 1;
                    pageData.vipInfo.global_vip_status = 1;
                    pageData.vipInfo.isVip = 1;
                    pageData.vipInfo.isWenkuVip = 1;
                }

                if ('readerInfo' in pageData && pageData?.readerInfo?.htmlUrls?.json) {
                    pageData.readerInfo.showPage = pageData.readerInfo.htmlUrls.json.length;
                }

                if ('appUniv' in pageData) {
                    // 取消百度文库对谷歌、搜狗浏览器 referrer 的屏蔽
                    pageData.appUniv.blackBrowser = [];

                    // 隐藏 APP 下载按钮
                    pageData.viewBiz.docInfo.needHideDownload = true;
                }

                return pageData
            }
        })
        Object.defineProperty(unsafeWindow, 'pureViewPageData', {
            set: v => pureViewPageData = v,
            get() {
                if (!pureViewPageData) return pureViewPageData;

                // 去除水印，允许继续阅读
                if('customParam' in pureViewPageData) {
                    pureViewPageData.customParam.noWaterMark = 1;
                    pureViewPageData.customParam.visibleFoldPage = 1;
                }

                if('readerInfo2019' in pureViewPageData) {
                    pureViewPageData.readerInfo2019.freePage = pureViewPageData.readerInfo2019.page;
                }

                return pureViewPageData
            }
        })
    }
    function sleep(time) {
            return new Promise(resolve => setTimeout(resolve, time));
        }
    function AddBtn(){
            function observeVueRoot(callbackVue) {
                const checkVue2Instance = (target) => {
                    const vue = target && target.__vue__
                    return !!(
                        vue
                        && (typeof vue === 'object')
                        && vue._isVue
                        && (typeof vue.constructor === 'function')
                    )
                }

                const vue2RootSet = new WeakSet();
                const observer = new MutationObserver(
                    (mutations, observer) => {
                        const disconnect = observer.disconnect.bind(observer);
                        for (const { target } of mutations) {
                            if (!target) {
                                return
                            } else if (checkVue2Instance(target)) {
                                const inst = target.__vue__;
                                const root = inst.$parent ? inst.$root : inst;
                                if (vue2RootSet.has(root)) {
                                    // already callback, continue loop
                                    continue
                                }
                                vue2RootSet.add(root);
                                callbackVue(root, disconnect);
                            }
                        }
                    }
                );
                observer.observe(document.documentElement, {
                    attributes: true,
                    subtree: true,
                    childList: true
                });
                return observer
            }
            observeVueRoot((el, disconnect) => {
                while (el.$parent) {
                    // find base Vue
                    el = el.$parent
                }

                const findCreader = (root, selector) => {
                    if (!root) return null;
                    if (root?.$el?.nodeType === Node.ELEMENT_NODE && root?.$el?.matches('#creader-app') && 'creader' in root) return root.creader;

                    for (const child of root.$children) {
                        let found = findCreader(child, selector);
                        if (found) return found;
                    }
                    return null;
                }

                if (unsafeWindow['__creader__'] || (unsafeWindow['__creader__'] = findCreader(el))) disconnect();
            });
            ///////////////////////////////////////////////////////////////////////////////////////////////

            const loadScript = url => new Promise((resolve, reject) => {
                const removeWrap = (func, ...args) => {
                    if (script.parentNode) script.parentNode.removeChild(script);
                    return func(...args)
                }

                const script = document.createElement('script');
                script.src = url;
                script.onload = removeWrap.bind(null, resolve);
                script.onerror = removeWrap.bind(null, reject);
                document.head.appendChild(script);
            })

            const loadJsPDF = async () => {
                if (unsafeWindow.jspdf) return unsafeWindow.jspdf;
                await loadScript('https://cdn.staticfile.org/jspdf/2.5.1/jspdf.umd.min.js');
                return unsafeWindow.jspdf;
            }

            window.addEventListener('DOMContentLoaded', async () => {
                await sleep("2000")
                const creader = unsafeWindow?.__creader__;
                console.log(creader)
                if (!creader) {
                    console.error('[x] creader is undefined');
                    return
                }

                const showStatus = (text='', progress=-1) => {
                    document.querySelector('.s-top.s-top-status').classList.add('show');
                    if(text) document.querySelector('.s-panel .s-text').innerHTML = text;
                    if (progress >= 0) {
                        progress = Math.min(progress, 100);
                        document.querySelector('.s-panel .s-progress').style.width = `${Math.floor(progress)}%`;
                        document.querySelector('.s-panel .s-progress-text').innerHTML = `${Math.floor(progress)}%`;
                    }
                }

                const hideStatus = () => {
                    document.querySelector('.s-top.s-top-status').classList.remove('show');
                }

                let lastMessageTimer;
                const showMessage = (msg, time=3000) => {
                    const msgEl = document.querySelector('.s-top.s-top-message');
                    msgEl.classList.add('show');
                    document.querySelector('.s-top.s-top-message .s-message').innerHTML = msg;
                    clearTimeout(lastMessageTimer);
                    lastMessageTimer = setTimeout(() => msgEl.classList.remove('show'), time);
                }

                const loadImage = (url) => new Promise(async (resolve, reject) => {
                    if (!url) {
                        resolve(null);
                        return;
                    }

                    let img = await request('GET', url, null, 'blob');
                    let imgEl = document.createElement('img');
                    imgEl.onload = () => {
                        resolve(imgEl);
                    }
                    imgEl.onabort = imgEl.onerror = reject;
                    imgEl.src = URL.createObjectURL(img);
                })

                const drawNode = async (doc, page, node) => {
                    if (node.type == 'word') {
                        for (let font of node.fontFamily) {
                            font = /['"]?([^'"]+)['"]?/.exec(font)
                            if (!font || page.customFonts.indexOf(font[1]) === -1) continue;

                            doc.setFont(font[1], node.fontStyle);
                            break;
                        }

                        doc.setTextColor(node.color);
                        doc.setFontSize(node.fontSize);

                        const options = {
                            charSpace: node.letterSpacing,
                            baseline: 'top'
                        };
                        const transform = new doc.Matrix(
                            node.matrix?.a ?? node.scaleX,
                            node.matrix?.b ?? 0,
                            node.matrix?.c ?? 0,
                            node.matrix?.d ?? node.scaleY,
                            node.matrix?.e ?? 0,
                            node.matrix?.f ?? 0);

                        if (node.useCharRender) {
                            for (const char of node.chars)
                                doc.text(char.text, char.rect.left, char.rect.top, options, transform);
                        } else {
                            doc.text(node.content, node.pos.x, node.pos.y, options, transform);
                        }
                    } else if (node.type == 'pic') {
                        let img = page._pureImg;
                        if (!img) {
                            console.debug('[+] page._pureImg is undefined, loading...');
                            img = await loadImage(node.src);
                        }

                        if (!('x1' in node.pos)) {
                            node.pos.x0 = node.pos.x1 = node.pos.x;
                            node.pos.y1 = node.pos.y2 = node.pos.y;
                            node.pos.x2 = node.pos.x3 = node.pos.x + node.pos.w;
                            node.pos.y0 = node.pos.y3 = node.pos.y + node.pos.h;
                        }

                        const canvas = document.createElement('canvas');
                        const [w, h] = [canvas.width, canvas.height] = [node.pos.x2 - node.pos.x1, node.pos.y0 - node.pos.y1];
                        const ctx = canvas.getContext('2d');

                        if (node.pos.opacity && node.pos.opacity !== 1) ctx.globalAlpha = node.pos.opacity;
                        if (node.scaleX && node.scaleX !== 1) ctx.scale(node.scaleX, node.scaleY);
                        if (node.matrix) ctx.transform(node.matrix.a ?? 1, node.matrix.b ?? 0, node.matrix.c ?? 0, node.matrix.d ?? 1, node.matrix.e ?? 0, node.matrix.f ?? 0);

                        ctx.drawImage(img, node.picPos.ix, node.picPos.iy, node.picPos.iw, node.picPos.ih, 0, 0, node.pos.w, node.pos.h);
                        doc.addImage(canvas, 'PNG', node.pos.x1, node.pos.y1, w, h);

                        canvas.remove();
                    }
                }

                const request = (method, url, data, responseType = 'text') => new Promise((resolve, reject) => {
                    GM.xmlHttpRequest({
                        method,
                        url,
                        data,
                        responseType,
                        onerror: reject,
                        ontimeout: reject,
                        onload: (response) => {
                            if (response.status >= 200 && response.status < 300) {
                                resolve(responseType === 'text' ? response.responseText : response.response);
                            } else {
                                reject(new Error(response.statusText));
                            }
                        }
                    });
                });

                const loadFont = async (doc, page) => {
                    const apiBase = 'https://wkretype.bdimg.com/retype';
                    let params = ["pn=" + page.index, "t=ttf", "rn=1", "v=" + page.readerInfo.pageInfo.version].join("&");
                    let ttf = page.readerInfo.ttfs.find(ttf => ttf.pageIndex === page.index)
                    if (!ttf) return;

                    let resp = await request('GET', apiBase + "/pipe/" + page.readerInfo.storeId + "?" + params + ttf.params)
                    if (!resp) return;
                    resp = resp.replace(/[\n\r ]/g, '');

                    let fonts = [];
                    let blocks = resp.matchAll(/@font-face{[^{}]+}/g);
                    for (const block of blocks) {
                        const base64 = block[0].match(/url\(["']?([^"']+)["']?\)/);
                        const name = block[0].match(/font-family:["']?([^;'"]+)["']?;/);
                        const style = block[0].match(/font-style:([^;]+);/);
                        const weight = block[0].match(/font-weight:([^;]+);/);
                        if (!base64 || !name) throw new Error('failed to parse font');
                        fonts.push({
                            name: name[1],
                            style: style ? style[1] : 'normal',
                            weight: weight ? weight[1] : 'normal',
                            base64: base64[1]
                        })
                    }

                    for (const font of fonts) {
                        doc.addFileToVFS(`${font.name}.ttf`, font.base64.slice(font.base64.indexOf(',') + 1));
                        doc.addFont(`${font.name}.ttf`, font.name, font.style, font.weight);
                    }
                }
                const generateArray = (start, end) => {
                             return Array.from(new Array(end + 1).keys()).slice(start)
                }
                const downloadimgPDF = async(arr) =>{
                    let pageRangearr = [...Array(creader.readerDocData.showPage).keys()];
                    var pageRange;
                    if(arr!=null){
                       pageRange = arr;
                    }else{
                        pageRange = pageRangearr;
                    }
                    const version = 6;
                    showStatus('正在加载', 0);
                    const jspdf = await loadJsPDF();
                    let doc;
                    for(let i = 0; i < pageRange.length; i++){
                        showStatus('正在准备', ((i + 1) / pageRange.length) * 100);
                        let url = pageRange[i]
                        const page = creader.renderPages[0];
                        console.log(page);
                        // 缩放比例设为 1
                       // page.pageUnDamageScale = page.pageDamageScale = () => 1;

                        if (page.readerInfo.pageInfo.version !== version) {
                            throw new Error(`脚本已失效： 文库版本号=${page.readerInfo.pageInfo.version}, 脚本版本号=${version}`);
                        }

                        const pageSize = [page.pageWidth, page.pageHeight]
                        if (!doc) {
                            doc = new jspdf.jsPDF(pageSize[0] < pageSize[1] ? 'p' : 'l', 'pt', pageSize);
                        } else {
                            doc.addPage(pageSize);
                        }

                        showStatus('正在下载图片');
                        page._pureImg = await loadImage(page.readerInfo.urls[url]);
                        showStatus('正在绘制');
                        for (const node of page.nodes) {
                            await drawNode(doc, page, node);
                        }

                        if(page._pureImg?.src) URL.revokeObjectURL(page._pureImg.src);
                        page._pureImg?.remove();

                    }
                    doc.save(`${unsafeWindow?.pageData?.title?.replace(/ - 百度文库$/, '') ?? 'export'}.pdf`);
                }
                const downloadPDF = async (arr) => {
                    let pageRangearr = [...Array(creader.readerDocData.showPage).keys()];
                    var pageRange;
                    if(arr!=null){
                       pageRange = arr;
                    }else{
                        pageRange = pageRangearr;
                    }
                    const version = 6;

                    showStatus('正在加载', 0);

                    // 强制加载所有页面
                    creader.loadNextPage(Infinity, true);
                    console.debug('[+] pages:', creader.renderPages);

                    const jspdf = await loadJsPDF();

                    let doc;
                    for (let i = 0; i < pageRange.length; i++) {
                        if(pageRange[i] >= creader.renderPages.length) {
                            console.warn('[!] pageRange[i] >= creader.renderPages.length, skip...');
                            continue;
                        }

                        showStatus('正在准备', ((i + 1) / pageRange.length) * 100);
                        const page = creader.renderPages[pageRange[i]];

                        // 缩放比例设为 1
                        page.pageUnDamageScale = page.pageDamageScale = () => 1;

                        if (creader.readerDocData.readerType === 'html_view')
                            await page.loadXreaderContent()

                        if (creader.readerDocData.readerType === 'txt_view')
                            await page.loadTxtContent()

                        if (page.readerInfo.pageInfo.version !== version) {
                            throw new Error(`脚本已失效： 文库版本号=${page.readerInfo.pageInfo.version}, 脚本版本号=${version}`);
                        }

                        const pageSize = [page.readerInfo.pageInfo.width, page.readerInfo.pageInfo.height]
                        if (!doc) {
                            doc = new jspdf.jsPDF(pageSize[0] < pageSize[1] ? 'p' : 'l', 'pt', pageSize);
                        } else {
                            doc.addPage(pageSize);
                        }

                        showStatus('正在下载图片');
                        page._pureImg = await loadImage(page.picSrc);

                        showStatus('正在加载字体');
                        await loadFont(doc, page);

                        showStatus('正在绘制');
                        for (const node of page.nodes) {
                            await drawNode(doc, page, node);
                        }

                        if(page._pureImg?.src) URL.revokeObjectURL(page._pureImg.src);
                        page._pureImg?.remove();
                    }

                    doc.save(`${unsafeWindow?.pageData?.title?.replace(/ - 百度文库$/, '') ?? '百度文库文档'}.pdf`);
                }

                // 添加需要用到的样式
                async function injectUI() {
                    const pdfButton = `<div class="s-btn-pdf"><div class="s-btn-img" ></div> <span>下载文档</span></div>`
                    const statusOverlay = `<div class="s-top s-top-status"><div class="s-panel"><div class="s-progress-wrapper"><div class="s-progress"></div></div><div class="s-status" style=""><div class="s-text" style="">正在加载...</div><div class="s-progress-text">0%<div></div></div></div></div></div>`;
                    const messageOverlay = `<div class="s-top s-top-message"><div class="s-message">testtest</div></div>`;

                    document.body.insertAdjacentHTML('afterbegin', statusOverlay);
                    document.body.insertAdjacentHTML('afterbegin', messageOverlay);
                    document.body.insertAdjacentHTML('afterbegin', pdfButton);
                    document.head.appendChild(document.createElement('style')).innerHTML = `
            .s-btn-pdf {
              background: #0b1628;
              box-shadow: 0 2px 8px 0 #ddd;
              border-radius: 23px;
              width: 122px;
              height: 45px;
              line-height: 45px;
              text-align: center;
              cursor: pointer;
              position: fixed;
              top: 150px;
              right: 42px;
              z-index: 999;
            }

            .s-btn-pdf:hover {
              background-color: #fff;
              cursor: pointer;
            }
            .s-btn-pdf span{
              font-size: 14px;
              color: #d0b276;
              line-height: 14px;
              font-weight: 700;
            }
            .s-btn-img {
               background: url(https://wkstatic.bdimg.com/static/ndpcwenku/static/ndaggregate/img/gold-arrow-down.2a7dd761ebe866f57483054babe083bd.png) no-repeat;
               width: 18px;
               height: 18px;
               background-position: -1px 5px;
               background-size: cover;
               display: inline-block;
            }
            .s-top {
              position: fixed;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              z-index: 2000;
              padding-top: 40vh;
              display: none;
            }

            .s-top.s-top-message {
              text-align: center;
            }

            .s-message {
              background-color: #000000aa;
              color: white;
              padding: 8px 14px;
              text-align: center;
              font-size: 18px;
              border-radius: 6px;
              display: inline-block;
            }

            .s-top.s-top-status {
              z-index: 1000;
              cursor: wait;
              background-color: rgba(0, 0, 0, 0.4);
              backdrop-filter: blur(10px) saturate(1.8);
            }

            .s-top.show {
              display: block;
            }

            .s-panel {
              background: white;
              width: 90%;
              max-width: 480px;
              border-radius: 12px;
              padding: 14px 24px;
              margin: 0 auto;
            }

            .s-progress-wrapper {
              height: 24px;
              border-radius: 12px;
              width: 100%;
              background-color: #eeeff3;
              overflow: hidden;
              margin-bottom: 12px;
            }

            .s-progress {
              background-color: #f7603e;
              height: 24px;
              width: 0;
              transition: width 0.2s ease;
            }

            .s-status {
              display: flex;
              font-size: 14px;
            }

            .s-text {
              flex-grow: 1;
              color: #5f5f5f;
            }

            .s-progress-text {
              color: #f7603e;
              font-weight: bold;
            }

            .s-message {

            }
            .swal2-actions {
               margin: 20px auto 0;
            }
            .swal2-styled.swal2-cancel{
               border-radius: 5px;
               font-size: 16px;
            }
            .swal2-styled.swal2-confirm{
               border-radius: 5px;
               font-size: 16px;
            }
            .swal2-styled {
                margin: 5px;
                padding: 8px 16px;
            }
            .none{
                display:none
            }
          `;
                }

                injectUI();

                const exportPDF = async (startnum,endnum) => {
                    try {
                        let num;
                        if(startnum!=""&&endnum!=""){
                            if(parseInt(startnum)<parseInt(endnum)){
                                if(parseInt(endnum)>creader.readerDocData.showPage||parseInt(startnum)<1){
                                    throw new Error('页码输入错误,结束页码大于可预览页数或者起始页码小于1');
                                    return
                                }else{
                                   let arr = generateArray(parseInt(startnum)-1,parseInt(endnum)-1);
                                    num = arr.length;
                                    await downloadPDF(arr);
                                    console.log(arr);
                                }
                            }else{
                                throw new Error('页码输入错误,结束页码小于或等于开始页码');
                                return
                            }
                        }else{
                          await downloadPDF();
                          num = creader.readerDocData.page;
                        }
                        showMessage(`已成功导出，共计 ${num} 页~`);
                    } catch (error) {
                        console.error('[x] failed to export:', error);
                        showMessage('导出失败：'+error?.message ?? error);
                    } finally {
                        hideStatus();
                    }
                }
                const imgPDF = async (startnum,endnum) => {
                    try {
                        let num;
                        if(startnum!=""&&endnum!=""){
                            if(parseInt(startnum)<parseInt(endnum)){
                                if(parseInt(endnum)>creader.readerDocData.showPage||parseInt(startnum)<1){
                                    throw new Error('页码输入错误,结束页码大于可预览页数或者起始页码小于1');
                                    return
                                }else{
                                   let arr = generateArray(parseInt(startnum)-1,parseInt(endnum)-1);
                                    num = arr.length;
                                    await downloadimgPDF(arr);
                                    console.log(arr);
                                }
                            }else{
                                throw new Error('页码输入错误,结束页码小于或等于开始页码');
                                return
                            }
                        }else{
                          await await downloadimgPDF();
                          num = creader.readerDocData.page;
                        }
                        showMessage(`已成功导出，共计 ${num} 页~`);
                    } catch (error) {
                        console.error('[x] failed to export:', error);
                        showMessage('导出失败：'+error?.message ?? error);
                    } finally {
                        hideStatus();
                    }
                }
                function ShowWenku(){

                    let defaultpassword = "";
                    if (localStorage.password && (Date.now() - localStorage.passwordTime) < 17280000) {
                        defaultpassword = localStorage.password;
                    } else {
                        localStorage.password = "";
                    }
                    if(unsafeWindow.pageData.readerInfo.freePage > 50){
                                 var style ="display:block"
                    }
                    let html = `<div id="mian" style="background-color: #fff;">
          <div style="line-height: 25px;">
            <span id="title" style="color: 545454;font-size: 18px;font-weight: bold;font-size: 18px;">正在获取 ${unsafeWindow?.pageData?.title?.replace(/ - 百度文库$/, '') ?? '百度文库文档'}</span>
          </div>
            <div style="display: flex;flex-direction:column;">
                <img style="width: 130px;height: 130px;margin: 20px auto;border-radius: 5px;" src="http://cdn.wezhicms.com/uploads/allimg/20211215/1-21121500044Q94.jpg">
                <span style="font-size: 14px;color: #666;text-align: center;">微信扫描上方二维码关注公众号<br>回复"3"获取验证码</span>
                <div class="none" style="text-align: center;font-weight: bold;margin: 20px 0 10px 0;height: 40px;line-height: 40px;${style}">
                    <input id="start" value="" placeholder="开始" style="box-sizing:border-box;font-size: 14px;width: 65px;height: 100%;padding:0 10px;border: 1px solid #D4D7DE;border-radius: 8px;" type="number">
                    <span style="padding: 0 10px;">-</span>
                    <input id="end" value="" placeholder="结束" style="box-sizing:border-box;font-size: 14px;width: 65px;height: 100%;padding:0 10px;border: 1px solid #D4D7DE;border-radius: 8px;" type="number">
                </div>
                <span class="none"  style="font-size: 14px;color: #666;text-align: center;${style}">大于50页建议分批下载，输入起始和结束页码</span>
                <div style="text-align: center;font-weight: bold;margin: 20px 0;height: 40px;line-height: 40px;">
                    <input name="passwordCode" id="passwordCode"
                             value="${defaultpassword}" placeholder="请输入验证码" style="box-sizing:border-box;font-size: 14px; width: 150px;height: 100%;padding:0 10px ;     border: 1px solid #D4D7DE;border-radius: 8px;" />
                </div>
                <div style="margin: 10px auto 0;height: 40px;line-height: 40px;">
                     <div id="dowmBtn" style=" font-size: 14px;height: 100%;width: 115px;background: #0b1628;border-radius: 10px;text-align: center;color: #fff;">下载PDF</div>
                </div>
            </div>
          </div>
<div style="font-size: 14px;margin-top: 15px;"><span style="font-weight: 900;">作者其他脚本推荐：</span><a href="https://greasyfork.org/scripts/444713-%E6%99%BA%E7%8B%90-%E5%85%A8%E7%BD%91vip%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E6%97%A0%E5%B9%BF%E5%91%8A%E6%92%AD%E6%94%BE-%E6%94%AF%E6%8C%81b%E7%AB%99%E5%A4%A7%E4%BC%9A%E5%91%98%E7%95%AA%E5%89%A7-%E8%A7%86%E9%A2%91%E6%89%B9%E9%87%8F%E4%B8%8B%E8%BD%BD-%E5%85%A8%E7%BD%91%E7%8B%AC%E5%88%9B%E8%87%AA%E7%94%B1%E9%80%89%E6%8B%A9%E8%87%AA%E5%8A%A8%E8%A7%A3%E6%9E%90%E6%8E%A5%E5%8F%A3-%E7%9F%AD%E8%A7%86%E9%A2%91%E6%97%A0%E6%B0%B4%E5%8D%B0%E4%B8%8B%E8%BD%BD-%E6%B7%98%E5%AE%9D-%E5%A4%A9%E7%8C%AB-%E4%BA%AC%E4%B8%9C%E4%BC%98%E6%83%A0%E5%88%B8%E6%9F%A5%E8%AF%A2-%E6%9B%B4%E5%A4%9A%E5%8A%9F%E8%83%BD%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0%E4%B8%AD/code/%E3%80%90%E6%99%BA%E7%8B%90%E3%80%91%E5%85%A8%E7%BD%91VIP%E8%A7%86%E9%A2%91%E8%A7%A3%E6%9E%90%E6%97%A0%E5%B9%BF%E5%91%8A%E6%92%AD%E6%94%BE%EF%BC%8C%E6%94%AF%E6%8C%81B%E7%AB%99%E5%A4%A7%E4%BC%9A%E5%91%98%E7%95%AA%E5%89%A7%E3%80%81%E8%A7%86%E9%A2%91%E6%89%B9%E9%87%8F%E4%B8%8B%E8%BD%BD%EF%BC%8C%E5%85%A8%E7%BD%91%E7%8B%AC%E5%88%9B%E8%87%AA%E7%94%B1%E9%80%89%E6%8B%A9%E8%87%AA%E5%8A%A8%E8%A7%A3%E6%9E%90%E6%8E%A5%E5%8F%A3%7C%E7%9F%AD%E8%A7%86%E9%A2%91%E6%97%A0%E6%B0%B4%E5%8D%B0%E4%B8%8B%E8%BD%BD%7C%E6%B7%98%E5%AE%9D%E3%80%81%E5%A4%A9%E7%8C%AB%E3%80%81%E4%BA%AC%E4%B8%9C%E4%BC%98%E6%83%A0%E5%88%B8%E6%9F%A5%E8%AF%A2%7C%E6%9B%B4%E5%A4%9A%E5%8A%9F%E8%83%BD%E6%8C%81%E7%BB%AD%E6%9B%B4%E6%96%B0%E4%B8%AD.user.js" style="color: #3caf7a;text-decoration:none;">原创力，道客巴巴文档下载脚本</a></div>
          </div>`;

                    Swal.fire({
                        html:html,
                        width: 380,
                        allowOutsideClick: false,
                        showCancelButton: true,
                        confirmButtonText: '交流反馈',
                        cancelButtonText: '关闭',
                        reverseButtons: true
                    }).then(r => {
                        if (r.isConfirmed)
                            GM_openInTab('https://www.zhihupe.com/ask/list_21_9.html');
                    });
                    $('#dowmBtn').off().on("click", function () {
                        let passwordCode = $("#passwordCode").val();
                        let startnum = $("#start").val();
                        let endnum = $("#end").val();
                        if (passwordCode) {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: "http://tool.wezhicms.com/bdwp.php?m=WENKU&author="+author+"&PWD="+passwordCode,
                                headers: {
                                    "Content-Type": "text/html; charset=utf-8"
                                },
                                onload: function(res){
                                    var json=JSON.parse(res.responseText);
                                    if(json.error == 1){
                                        if (passwordCode != localStorage.password) {
                                            localStorage.password = passwordCode;
                                            localStorage.passwordTime = Date.now();
                                        }
                                        if(unsafeWindow.pageData.readerInfo.htmlUrls.ttf){
                                            $(".swal2-cancel").click();
                                            exportPDF(startnum,endnum);
                                            unsafeWindow['downloadPDF'] = exportPDF;
                                        }
                                        else{
                                            $(".swal2-cancel").click();
                                            imgPDF(startnum,endnum);
                                            unsafeWindow['downloadimgPDF'] = imgPDF;
                                        }
                                    }else if(json.error == -2){
                                        Toast(json.msg);
                                    }else {
                                        Toast('服务器请求失败，请重试！');
                                    }
                                },
                                onerror: function(err){
                                    Toast(err);
                                }
                            });
                        }else {
                            Toast('请输入验证码！');
                        }
                    });
                }
                document.querySelector('.s-btn-pdf').onclick = ()=>ShowWenku();
            });
    }
    var qrname,nodeid,goodid,method,action;
    switch (window.location.host) {
        case 'wenku.baidu.com':
            AddBtn();
            GetVip();
            break;
        case 'wk.baidu.com':
            AddBtn();
            GetVip();
            break;
        case 'item.taobao.com':
            qrname = "淘宝";
            nodeid = "#J_PromoPrice";
            goodid = Getgoodid("id");
            method = "taobao";
            action = "getlink";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入淘宝');
            break;
        case 'detail.tmall.com':
            qrname = "天猫";
            nodeid = "#J_PromoPrice";
            goodid = Getgoodid("id");
            method = "taobao";
            action = "getlink";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入天猫');
            break;
        case 'detail.tmall.hk':
            qrname = "天猫";
            nodeid = "#J_PromoPrice";
            goodid = Getgoodid("id");
            method = "taobao";
            action = "getlink";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入天猫国际');
            break;
        case 'chaoshi.detail.tmall.com':
            qrname = "天猫";
            nodeid = "#J_PromoPrice";
            goodid = Getgoodid("id");
            method = "taobao";
            action = "getlink";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入天猫超市');
            break;
        case 'item.yiyaojd.com':
            qrname = "京东";
            nodeid = "#J-summary-top";
            goodid = geturlid(window.location.href);
            method = "jd";
            action = "getdetails";
            Getcoupon(goodid);
            console.log(goodid) ;
            console.log('已进入京东医药');
            break;
        case 'item.jd.com':
            qrname = "京东";
            nodeid = "#J-summary-top";
            goodid = geturlid(window.location.href);
            method = "jd";
            action = "getdetails";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入京东');
            break;
        case 'npcitem.jd.hk':
            qrname = "京东";
            nodeid = "#J-summary-top";
            goodid = geturlid(window.location.href);
            method = "jd";
            action = "getdetails";
            Getcoupon(goodid);
            console.log(goodid);
            console.log('已进入京东国际');
            break;
            break;

    }
    function Getgoodid(gid) {
        var reg = new RegExp("(^|&)" + gid + "=([^&]*)(&|$)");
        var s = window.location.search.substr(1).match(reg);
        if (s != null) {
            return s[2];
        }
        return "";
    }
    function geturlid(url) {
        if (url.indexOf("?") != -1) {
            url = url.split("?")[0]
        }
        if (url.indexOf("#") != -1) {
            url = url.split("#")[0]
        }
        var text = url.split("/");
        var id = text[text.length - 1];
        id = id.replace(".html", "");
        return id
    }
    function Getcoupon(t) {
        if (t != "") {
            GM_xmlhttpRequest({
                method: "GET",
                url: "http://tool.wezhicms.com/coupon/getcoupon.php?m=" + method + "&act=" + action + "&goodid=" + t,
                headers: {
                    "Content-Type": "text/html; charset=utf-8"
                },
                onload: function(res) {
                    var json = JSON.parse(res.responseText);
                    var code = json.code;
                    console.log(json);
                    if (method == "taobao") {
                        if (code == "0") {
                            var longTpwd = json.data.longTpwd
                            var couponUrl = longTpwd.match(/https:\/\/[\d\w\.\/]+/)[0];
                            console.log(longTpwd);
                            console.log(couponUrl);
                            var couponInfo = json.data.couponInfo;
                            var couponEndTime = json.data.couponEndTime;
                            var actualPrice = json.data.actualPrice;
                            addcoupon(couponUrl, couponInfo, couponEndTime, actualPrice,t)
                        }else{
                            let u="",f="",t="",p="";
                            addcoupon(u, f, t, p);
                        }
                    } else if (method == "jd") {
                        if (code == "0") {
                            var couponConditions = json.data[0].couponConditions;
                            var couponAmount = json.data[0].couponAmount;
                            var jdcouponInfo;
                            if (couponConditions != "") {
                                jdcouponInfo = "满" + couponConditions + "元减" + couponAmount + "元"
                            } else {
                                jdcouponInfo = "无门槛减" + couponAmount + "元"
                            }
                            var jdcouponEndTime = json.data[0].couponEndTime
                            var jdactualPrice = json.data[0].actualPrice;
                            var couponLink = json.data[0].couponLink;
                            addcoupon(couponLink, jdcouponInfo, jdcouponEndTime, jdactualPrice,"")
                        }else{
                            let u="",f="",t="",p="";
                            addcoupon(u, f, t, p);
                        }
                    }
                },
                onerror: function(err) {
                    console.log(err);
                }
            });
        } else {
            console.log('商品id为空！');
        }
    }
    function addcoupon(u, f, t, p,goodid) {
        var imgurl = "http://v.zhihupe.com/enQrcode?url=" + u
        var mainhtml,qa,cxalink,link;
        if(qrname =="淘宝"){
            let ht = document.querySelector("#J_Title");
            link ="http://tool.wezhicms.com/coupon/getscan.php?link="+u+"&goodid="+goodid
            qa = "淘宝";
            cxalink ='http://wxego.yhzu.cn/?r=/l&kw='+encodeURI(ht.querySelector("h3").innerText)+'&sort=0';
        }else if(qrname =="天猫"){
            let hm = document.querySelector(".tb-detail-hd");
            link ="http://tool.wezhicms.com/coupon/getscan.php?link="+u+"&goodid="+goodid
            cxalink ='http://wxego.yhzu.cn/?r=/l&kw='+encodeURI(hm.querySelector("h1").innerText)+'&sort=0';
            qa = "淘宝";
        }else if(qrname =="京东"){
            cxalink = 'http://wxego.yhzu.cn/?r=/l/jdlist&kw='+encodeURI(document.querySelector(".sku-name").innerText)+'&sort=0';
            link =u
            qa = "京东";
        }

        if (f != "" && u != "") {
            mainhtml = '<div style="text-align: center;font-size: 14px;width: 25%;"><img style="width: 100%;height: auto;"src="' + imgurl + '"><p style="font-size: 12px;margin-top: 5px;">手机' + qa + '扫码领取</p></div><div style="width: 72%;"><p style="margin-bottom:10px;font-size: 18px;font-weight: 700;">优惠劵：' + f + '</p><p style="margin-bottom:10px;font-size: 14px;color:#999;">有效期至：' + t + '</p><div style="display: flex;justify-content: space-between;align-items: flex-start;"><div><span style="font-size:14px">劵后价:</span><span style="font-size: 18px;font-weight: 700;color: #F40;">￥</span><span style="font-size: 26px;font-weight: 700;font-family: Tahoma,Arial,Helvetica,sans-serif;color: #F40;">' + p + '</span></div><a id="link"><span style="padding: 10px 20px;background-color: #df3033;font-size: 18px;color: #fff;font-weight: 700;">领券购买</span></a></div></div>'
        } else {
            mainhtml = '<div style="font-size: 18px;font-weight: 700;">暂无优惠券</div><a id="cxalink" style="background: #df3033;padding: 10px;color: #fff;font-size: 12px;">查询同款商品优惠</a>'
        }
        var couponhtml = '<div id="wenkucoupon" style="margin-top: 10px;background: #f1f1f100;padding: 15px 25px;display:flex;align-items: center;justify-content: space-between;margin-bottom:5px;font-family: tahoma,arial,Microsoft YaHei,Hiragino Sans GB;">' + mainhtml + '</div>';
        let iCount;
        let AddBiPromise = new Promise(function(resolve, reject){
            iCount = setInterval(function() {
                let a =document.querySelector(nodeid);
                let c =a.parentNode;
                if(c != null ){
                    resolve(c)
                }
                console.log("监听")
            },1000);
        });
        AddBiPromise.then(function(c){
            clearInterval(iCount);
            let b = document.createElement('div');
            b.innerHTML = couponhtml;
            let n = document.querySelector("#videocoupon");
            if(!n){
                c.appendChild(b);
                document.querySelector("#link").addEventListener('click',function() {
                    window.open(link);
                })
                document.querySelector("#cxalink").addEventListener('click',function() {
                    window.open(cxalink);
                })
            }
        });
    }
})();
