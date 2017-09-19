/**
 * Created by ulysse on 20/08/2017.
 */


$( document ).ready(function() {
    var images = [];

    // IMAGES
    $(".img-card-link").each(function (i) {
        var elt = $(this);

        // For each url that should be displayed in a card :
        var figure = $("<figure>", {'data-id': elt.data('id'), "class": "floating-card floating-img card is-hidden-mobile"});
        var div = $("<div>", {'class': 'card-content'});
        var img = elt.next('img').clone();
        var url = img.attr('src');
        var alt = img.attr('alt');
        var a = $("<a>", {'class': 'image-pop-link', 'href': url});
        a.append(img);
        div.append(a);

        if(alt != "") {
            div.append($("<div class='card-caption'>").append(alt));
        }

        figure.append(div);

        img.onload = function()
        {
            var width = this.naturalWidth;
            alert(width);
        }
        // Adding the image to the image array for photoswipe gallery
        images.push({src: img.attr('src'), w: 100, h: 100});

        $(".post-aside-2 .filler:last").before(figure);
    });

    // LIENS
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


    // CODE
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
    $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });

    
    $('.image-pop-link').magnificPopup({
        // main options
        type: 'image',

        gallery: {
            // options for gallery
            enabled: true
        },
        closeOnBgClick: true,
        fixedContentPos: false,
        callbacks: {
        open: function() {
            jQuery('body').addClass('noscroll');
        },
        close: function() {
            jQuery('body').removeClass('noscroll');
        }
    },
        mainClass: 'mfp-with-zoom', // this class is for CSS animation below

        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
                // openerElement is the element on which popup was initialized, in this case its <a> tag
                // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
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