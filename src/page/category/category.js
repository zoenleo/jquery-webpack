import $ from 'zepto';

$(function () {
    $('.reverseBtn').on('click', function(){
        let $noteList = $('.noteList');
        let $list = $noteList.children('li');
        [].reverse.call($list);
        let $newNoteList = $('<ul class="note-list noteList"><ul>');
        for (let i = 0; i < $list.length; i++) {
            const element = $list[i];
            $newNoteList.append(element);
        }
        $noteList.replaceWith($newNoteList);
    });
});


