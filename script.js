var endpoint = 'http://localhost:3000/auth';

var exceptions = [
    'DB Weekly',
    'Archives',
    'Search',
    'RSS',
    'Issues',
    'safe.',
    'Archives',
    'Read this issue on the Web' //,
];

// .container used for HTML5 Weekly, DB Weekly, Node Weekly, JavaScript Weekly
var links = $('table.container').find('a');
var linksToSend = [];
// Web Tools Weekly
// Web Design Weekly


for (var i = 0; i < links.length; i++) {
    var href = $(links[i]).attr('href');
    var text = $(links[i]).text();

    // if ($(links[i]).css('font-size') == '17px' || $(links[i]).css('font-size') == '16px') {
        console.log('Crawling "' + text + '" (' + href + ')');
        highlightLink($(links[i]));
        // linksToSend.push(href);
    // }
}

var data = {
    links: linksToSend
}

console.log(data);

// $.ajax({
//     type: "POST",
//     url: endpoint,
//     data: data,
//     success: function() {
//         console.log('Links has been sent!');
//         window.open(endpoint);
//     },
//     error: function(jqXHR, textStatus, err) {
//         console.log('text status ' + textStatus + ', err ' + err)
//     },
//     dataType: 'json'
// });

$('.crawler-add-link').click(function() {
    console.log('Crawler add link click...');
    var el = $(this).parent().parent();
    var style = css(el);
    // $("#elementToPutStyleInto").css(style);    
    console.log(style);
    return false;
});

$('.crawler-remove-link').click(function() {
    console.log('Crawler remove link click...');
    return false;
});

addCrawlButton();

function highlightLink($link) {
    $link.addClass('crawler-link');
    addButtons($link);
}

function addButtons($link) {
    $link.append('<span class="crawler-buttons"><span class="crawler-add-link">+</span><span class="crawler-remove-link">-</span></span>');
}

function addCrawlButton() {
    $('body').append('<button class="apply-crawl-button">Crawl</button>');

    $('.apply-crawl-button').click(function() {
        $(this).addClass('in-progress');
    });

}

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