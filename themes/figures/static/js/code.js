/**
 * Created by ulysse on 20/08/2017.
 */


$( document ).ready(function() {
    // We need to scan the DOM to look for elements that need to be copied on the right side :
    $(".card-handle").each(function () {
        var elt = $(this);

        // The common elements to all figures :
        var figure = $("<figure>", {"class": "floating-card card is-hidden-mobile"});
        var div = $("<div>", {'class': 'card-content'});


        // If it's a link :
        if(elt.hasClass("url-card")) {
            figure.addClass('floating-url');

            // The link should be a child of the handle
            var url = elt.children("a").attr('href');

            // If this link as a name :
            if(elt.data('alt') != "") {
                div.append(elt.data('alt')+': ');
            }

            // The link in itself
            div.append('<a href="'+url+'" target="_blank">'+url+'</a>');
        }


        // If it's an image :
        if(elt.hasClass('img-card-link')) {
            figure.addClass('floating-img');
            
            var img = elt.next('img').clone();
            var url = img.attr('src');
            var alt = img.attr('alt');
            var a = $("<a>", {'class': 'image-pop-link', 'href': url});
            a.append(img);
            div.append(a);

            if(alt != "") {
                div.append($("<div class='card-caption'>").append(alt));
            }

            // Adding the flashing :
            elt.click(function() { flashCard(figure); });
        }

        // If it a code :
        if (elt.hasClass('code-card-link')) {
            figure.addClass('floating-code');

            // We look for the nearet code-block (may be in a parent) :
            var codePreOrig = elt.parents().nextAll('pre:first');
            var codePre = codePreOrig.clone();

            codePreOrig.addClass('is-hidden-tablet');

            div.append('<a class="btn-copy button is-info is-small"  onclick="copyToClipboard($(this).next())">Copy</a>');
            div.append(codePre);

            var dataAlt;
            if ((dataAlt = elt.data('alt')) != '') {
                div.append($("<div class='card-caption'>").append(dataAlt));
            }

            // Adding the flashing :
            elt.click(function() { flashCard(figure); });
        }

        elt.on('centerCard', function () {
           centerCard(figure);
        });


        // Now we attach the newly created figure to the right column :
        figure.append(div);
        $(".post-aside-2 .filler:last").before(figure);
    });

    // Everything's ready for highlighting :
    $('pre code').each(function(i, block) {
            hljs.highlightBlock(block);
        });

    // Initializing image gallery :
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


function flash(did) {
    flashCard($('figure.floating-code[data-id="'+did+'"]'));
}

function flashCard(card) {
    var caption = card.find('.card-caption');
    centerCard(card);
    //alert(caption.html());
    caption.addClass('animPulse');
    setTimeout(function(){
        caption.removeClass('animPulse');
    }, 1000);
}

var actualCard;
function centerCard(card) {
    var rightcolumn = $(".post-aside-2");

    if(actualCard != card) {
        var newST = card.position().top + card.parent().scrollTop() - (card.parent().offset().top - 20);
        rightcolumn.stop().animate({scrollTop: newST}, 1000, 'swing');
        actualCard = card;
    }
}

function syncScroll() {
    // We check if a card element link is at the vertical center of the screen.
    $(".card-handle").each(function(i) {
        ch =$(this);
        wh = $(window).height();
        if (ch.offset().top > 2.5 * wh / 6 && ch.offset().top < 3.5 * wh / 6) {
            ch.trigger('centerCard');//$('.floating-card[data-id="' + ch.data('id') + '"]'));
        }
    });
}