/**
 * Created by ulysse on 20/08/2017.
 */

$( document ).ready(function() {
    $("#right-column .filler:last").before($(".floating-code"));
});


function centerFigure(force, did) {
    rc = $("#right-column");
    $(".code-handle").each(function(i) {
        ch =$(this);
        wh = $(window).height();
        if ( (ch.offset().top > 2.5 * wh / 6 && ch.offset().top < 3.5 * wh / 6) || force ) {
            if (force)
                id = did
            else
                id = ch.data('id')
            cb = $('.floating-code[data-id="' + id + '"]');
            // alert($('.floating-code[data-id="'+that.data('id')+'"]').data('id'));
            //alert(cb.offset().top);
            //document.getElementById("right-column").scrollTop += cb.offset().top - ($(window).height() / 2 - cb.height()/2);
            newST = rc.scrollTop() + cb.position().top - ($(window).height() / 2 - cb.height() / 2);// - ($(window).height() / 2 - cb.height() / 2);
            //alert(newST);
            $("#right-column").stop().animate({scrollTop: newST}, 500, 'swing', function () {
                //alert("Finished animating");
            });
        }
    });
}

function flash(did) {
    //alert(did);
    centerFigure(true, did);
    $('.floating-code[data-id="'+did+'"] figure').addClass('animPulse');
    setTimeout(function(){
        $('.floating-code[data-id="'+did+'"] figure').removeClass('animPulse');
    }, 1000);

}