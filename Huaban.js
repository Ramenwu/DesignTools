// ==UserScript==
// @name         画板透明素材开启红色底
// @namespace    http://tampermonkey.net/
// @version      2025-03-04
// @description  try to take over the world!
// @author       You
// @match        https://huaban.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=huaban.com
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    function changeBackground() {
        document.querySelectorAll('img.transparent-img-bg').forEach(img => {
            img.style.background = 'red';
        });
    }

    // 初始执行
    changeBackground();

    // 监听 DOM 变化，确保动态加载的图片也能修改
    const observer = new MutationObserver(changeBackground);
    observer.observe(document.body, { childList: true, subtree: true });
})();
