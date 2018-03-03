import $ from 'zepto';

$(function () {
    function getState() {
        let state = window.localStorage.getItem('state') || '{}';
        return JSON.parse(state);
    } 
    function setState(state) {
        window.localStorage.setItem('state', JSON.stringify(state));
    }
    (function() {
        //初始化
        const PAGE_DATA = window.PAGE_DATA;
        let cur = Number(PAGE_DATA.ARTICLE_ORDER || 0);
        let pageTotal = Number(PAGE_DATA.ARTICLE_PAGE_COUNT || 2);
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
        //初始化数据
        let state = getState();
        !state.notFrist && $('.cover').show().on('click', function() {
            $('.cover').hide();
            let state = getState();
            state.notFrist = true;
            setState(state);
        });
        state.night && (function() {
            const $nightSetting = $('.nightSetting');
            $nightSetting.addClass('night').children('.night').hide();
            $nightSetting.children('.day').show();
            $('.article').css({
                backgroundColor: '#333',
                color: '#fff'
            });
            let state = getState();
            state.night = true;
            setState(state);
        })();
        $('.content').css('line-height', (state.lineHeight || 18)  + 'px');
        $('html').css('font-size', (state.fontSize || 22) + 'px');
    })();
   
    //页面功能
    $('.article').on('click', function (e) {
        const clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const prevY = (clientHeight - 60) / 2;
        const nextY = clientHeight - (clientHeight - 60) / 2;
        const clickY = e.clientY;
        if(clickY <= prevY) {
            //上一页
            let targetY = $('html').scrollTop() - clientHeight + 30;
            window.scrollTo(0, targetY);
        }
        else if(clickY >= nextY) {
            //下一页
            let targetY = $('html').scrollTop() + clientHeight - 30;
            window.scrollTo(0, targetY);
        }
        else {
            //呼出菜单栏
            $('.menu').show();
        }
    });
    $('.menuToggle').on('click', function() {
        $('.menu').hide();
    });
    $('.fontAdd').on('click', function() {
        const $html = $('html');
        let state = getState();
        state.fontSize = (state.fontSize || 18) + 2;
        $html.css('font-size', state.fontSize + 'px');
        setState(state);
    });
    $('.fontDel').on('click', function() {
        const $html = $('html');
        let state = getState();
        state.fontSize = (state.fontSize || 18) - 2;
        $html.css('font-size', state.fontSize + 'px');
        setState(state);
    });
    $('.lineAdd').on('click', function() {
        let state = getState();
        state.lineHeight = (state.lineHeight || 22) + 2;
        $('.content').css('line-height', state.lineHeight + 'px');
        setState(state);
    });
    $('.lineDel').on('click', function() {
        let state = getState();
        state.lineHeight = (state.lineHeight || 22) - 2;
        $('.content').css('line-height', state.lineHeight + 'px');
        setState(state);
    });
    $('.nightSetting').on('click', function() {
        const $nightSetting = $('.nightSetting');
        let state = getState();        
        if(!$nightSetting.hasClass('night')) {
            $nightSetting.addClass('night').children('.night').hide();
            $nightSetting.children('.day').show();
            $('.article').css({
                backgroundColor: '#333',
                color: '#fff'
            });
            state.night = true;
        }
        else {
            $nightSetting.removeClass('night').children('.night').show();
            $nightSetting.children('.day').hide();  
            $('.article').css({
                backgroundColor: '#e2e2e2',
                color: '#666'
            });
            state.night = false;
        }
        setState(state);        
    });
});


