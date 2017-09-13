/**
 * Created by ulysse on 20/08/2017.
 */

$( document ).ready(function() {
    //$(".post-aside-2 .filler:last").before($(".floating-card"));

    $(".url-card").each(function (i) {
        var elt = $(this);

       // For each url that should be displayed in a card :
        var figure = $("<figure>", {'data-id': elt.data('id'), "class": "floating-card floating-url card is-hidden-mobile"});
        var div = $("<div>", {'class': 'card-content'});
        var url = elt.children("a").attr('href');

        if(elt.data('alt') != "") {
            div.append(elt.data('alt')+': <a href="'+url+'">'+url+'</a>');
        }
        else {
            div.append('<a href="'+url+'">'+url+'</a>');
        }
        figure.append(div);

        $(".post-aside-2 .filler:last").before(figure);
    });

    $(".floating-card-me").each (function (i) {
       var elt = $(this);

        // We create the correct floating card, et add it to the right column :
        if(elt.hasClass("floating-url")) {
            var figure = $("<figure>", {'data-id': elt.data('id'), "class": "floating-card floating-url card is-hidden-mobile"});
            var div = $("<div>", {'class': 'card-content'});
            var url = elt.data('url');

            if(elt.data('title') != "") {
                div.append(elt.data('title')+': <a href="'+url+'">'+url+'</a>');
            }
            else {
                div.append('<a href="'+url+'">'+url+'</a>');
            }
            figure.append(div);

            $(".post-aside-2 .filler:last").before(figure);
        }
        else if(elt.hasClass("floating-code")) {
            var figure = $("<figure>", {'data-id': elt.data('id'), "class": "floating-card floating-code code card is-hidden-mobile"});
            var div = $("<div>", {'class': 'card-content'});

            // The copy button :
            div.append('<a class="btn-copy button is-info is-small"  onclick="copyToClipboard($(this).next())">Copy</a>');
            div.append('<pre><code class="'+elt.data('lang')+'">'+elt.data('code')+'<!--{{ highlight .Inner (.Get 2) "" }}--></code></pre>');

            div.append('<div class="content">'+elt.data('description')+'</div>');

            figure.append(div);

            $(".post-aside-2 .filler:last").before(figure);
        }
    });

    // Everything's ready for highlighting :
    $(document).ready(function() {
        $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });

        /*var y = document.querySelectorAll("pre code");
        for(var i = 0; i < y.length; i++) {
            y[i].innerHTML = y[i].innerHTML.replace("\n", "");
        }*/
    });
});


function centerFigure(force, did) {
    rc = $(".post-aside-2");
    $(".code-handle").each(function(i) {
        ch =$(this);
        wh = $(window).height();
        if ( (ch.offset().top > 2.5 * wh / 6 && ch.offset().top < 3.5 * wh / 6) || force ) {
            if (force)
                id = did;
            else
                id = ch.data('id');
            cb = $('.floating-code[data-id="' + id + '"]');
            // alert($('.floating-code[data-id="'+that.data('id')+'"]').data('id'));
            //alert(cb.offset().top);
            //document.getElementById("right-column").scrollTop += cb.offset().top - ($(window).height() / 2 - cb.height()/2);
            newST = /*rc.scrollTop() +*/ cb.position().top;// - (rc.height() / 2 - cb.height() / 2);// - ($(window).height() / 2 - cb.height() / 2);// - ($(window).height() / 2 - cb.height() / 2);
            //alert(id+' '+rc.scrollTop() +' ' +  cb.position().top+' '+newST);
            //alert(rc.scrollTop() + '+++++'+ cb.position().top+'+++++++'+$(window).height());$
            //alert(newST);

            //alert(rc.height());
            $(".post-aside-2").stop().animate({scrollTop: newST}, 500, 'swing', function () {
                //alert("Finished animating");
            });
        }
    });
}

function flash(did) {
    centerFigure(true, did);
    $('figure.floating-code[data-id="'+did+'"]').addClass('animPulse');
    setTimeout(function(){
        $('figure.floating-code[data-id="'+did+'"]').removeClass('animPulse');
    }, 1000);

}