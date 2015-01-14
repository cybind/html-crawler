var endpoint = 'http://localhost:3000/auth';
// var endpoint = 'http://localhost:3000/process';

highlightLinks();
addCrawlButton();

function highlightLinks() {

    $('a').addClass('crawler-link');
    $('a').click(function() {
        if ($(this).hasClass('selected'))
            $(this).removeClass('selected');
        else
            $(this).addClass('selected');
        return false;
    });

}

function addCrawlButton() {
    $('body').append('<button class="apply-crawl-button">Crawl</button>');

    $('.apply-crawl-button').click(function() {
        $(this).addClass('in-progress');
        crawl();
    });

}

function crawl() {

    var linksToSend = [];

    var links = $('a.crawler-link.selected');

    for (var i = 0; i < links.length; i++) {
        var href = $(links[i]).attr('href');
        var text = $(links[i]).text();
        console.log('Crawling "' + text + '" (' + href + ')');
        linksToSend.push(href);
    }

    var data = {
        links: linksToSend
    }

    console.log(data);

    $.ajax({
        type: "POST",
        url: endpoint,
        data: data,
        success: function() {
            console.log('Links has been sent!');
            $('.apply-crawl-button').removeClass('in-progress');
            window.open(endpoint);
        },
        error: function(jqXHR, textStatus, err) {
            console.log('text status ' + textStatus + ', err ' + err)
            $('.apply-crawl-button').removeClass('in-progress');
        },
        dataType: 'json'
    });

}

/* Helper functions */
function css(a) {
    var sheets = document.styleSheets, o = {};
    for (var i in sheets) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        for (var r in rules) {
            if (a.is(rules[r].selectorText)) {
                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
            }
        }
    }
    return o;
}

function css2json(css) {
    var s = {};
    if (!css) return s;
    if (css instanceof CSSStyleDeclaration) {
        for (var i in css) {
            if ((css[i]).toLowerCase) {
                s[(css[i]).toLowerCase()] = (css[css[i]]);
            }
        }
    } else if (typeof css == "string") {
        css = css.split("; ");
        for (var i in css) {
            var l = css[i].split(": ");
            s[l[0].toLowerCase()] = (l[1]);
        }
    }
    return s;
}