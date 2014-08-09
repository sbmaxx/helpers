var head = document.querySelector('head');

var jq = document.createElement('script');
jq.type = 'text/javascript';
jq.src = 'http://yastatic.net/jquery/2.1.1/jquery.min.js';

var js = document.createElement('script');
js.type = 'text/javascript';
js.src = 'file:///Users/sbmaxx/Development/helpers/megafonBalanceDetails.js';

var css = document.createElement('link');
css.href = 'file:///Users/sbmaxx/Development/helpers/megafonBalanceDetails.css';
css.rel = 'stylesheet';
css.type = 'text/css';

head.appendChild(jq);
head.appendChild(js);
head.appendChild(css);
