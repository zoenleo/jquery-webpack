import $ from 'zepto';

$(function () {
    const PAGEDATA = window.PAGEDATA;
    let cur = Number(PAGEDATA.ARTICLE_ORDER || 0);
    let pageTotal = Number(PAGEDATA.ARTICLE_PAGE_COUNT || 2);
    let prePage = cur - 1;
    let nextPage = cur + 1;
    const API = window.API;
    if (prePage > 0) {
        $('.prevPage').show().attr('href', API.PAGE_LINK + prePage);
    }
    if (nextPage < pageTotal) {
        $('.nextPage').show().attr('href', API.PAGE_LINK + nextPage);
    }
    const $content = $('.content');
    let content = $content.text().replace(/\s+/ig, '<br/>');
    $content.html(content);
});


