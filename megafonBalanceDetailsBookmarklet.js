var bookmarkletPath = 'file:///Users/sbmaxx/Development/helpers/';
var head = document.querySelector('head');

var jq = document.createElement('script');
jq.type = 'text/javascript';
jq.src = 'http://yastatic.net/jquery/2.1.1/jquery.min.js';

var js = document.createElement('script');
js.type = 'text/javascript';
js.src = bookmarkletPath + 'megafonBalanceDetails.js';

head.appendChild(jq);

var jqInterval = setInterval(function() {
    checkJQ();
}, 5);

function checkJQ() {
    if (typeof window.$ !== 'undefined') {
        head.appendChild(js);
        clearInterval(jqInterval);
    }
}
