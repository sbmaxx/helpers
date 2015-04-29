(function() {

    var head = document.querySelector('head');

    var jq = document.createElement('script');
    jq.type = 'text/javascript';
    jq.src = 'http://yastatic.net/jquery/2.1.1/jquery.min.js';

    var path = 'file:///Users/sbmaxx/Develop/helpers/';
    var js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = path + 'mts.js';

    var css = document.createElement('link');
    css.href = path + 'mts.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';

    head.appendChild(css);
    head.appendChild(jq);

    var interval = setInterval(function() {
        if (typeof window.$ !== 'undefined') {
            head.appendChild(js);
            clearInterval(interval);
        }
    }, 42);

}());
