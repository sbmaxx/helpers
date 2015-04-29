var replaces = [
    {
        find: /Прод\/ Объем/g,
        replace: 'Кол-во'
    },
    {
        find: /Вид услуги/g,
        replace: 'Услуга'
    },
    {
        find: /Абонентский номер, адрес электронной почты, точка доступа/g,
        replace: 'Номер'
    },
    {
        find: /Длительность\/Объем \(мин.:сек.\)\/\(Kb\)/g,
        replace: 'Ед.'
    },
    {
        find: /Стоимость руб./g,
        replace: 'Руб.'
    },
    {
        find: /gprs/g,
        replace: 'интернет'
    },
    {
        find: /HSDPA\(3G\)/g,
        replace: 'интернет'
    },
    {
        find: /Телеф./g,
        replace: 'звонок'
    },
    {
        find: /с номеров МегаФон дом\. региона/g,
        replace: '← звонок на МегаФон'
    },
    {
        find: /с мобильных номеров дом\. региона/g,
        replace: '← звонок'
    },
    {
        find: /Входящий/g,
        replace: '← звонок'
    },
    {
        find: /на МегаФон домашнего региона/g,
        replace: '→ звонок на МегаФон'
    },
    {
        find: /Входящее SMS/g,
        replace: '← SMS'
    },
    {
        find: /Исходящее SMS/g,
        replace: '→ SMS'
    },
    {
        find: /Входящий/g,
        replace: '←'
    },
    {
        find: /Исходящий/g,
        replace: '→'
    },
    {
        find: /Исх\. на ТФОП региона филиала/g,
        replace: '→ ☏'
    },
    {
        find: /Зона направления вызова\/номер сессии/g,
        replace: 'Где'
    }
];

function cleanup(str) {
    return str.replace(/(t(?:d|r|h))\s?[^>]+/g, '$1')
}
function wrapTR(str) {
    return '<tr>' + str + '</tr>';
}

$(function() {

    // console.time('start');
    // console.profile('start');

    var table = $('table:eq(2)');
    var $html = $('<table>' + cleanup(table.get(0).innerHTML) + '</table>');

    $('table').remove();

    $html.find('tr').each(function(i, tr) {
        if (i === 0) {
            $(tr).remove();
        } else if (i === 1) {
            $(tr).find('th').each(function(t, td) {
                if (t === 0 || t === 3 || t === 5 || t === 8 || t === 11) {
                    $(td).remove();
                }
            });
        } else {
            $(tr).find('td').each(function(t, td) {
                if (t === 0 || t === 3 || t === 5 || t === 8 || t === 11) {
                    $(td).remove();
                }
            });
        }
    });

    var html = $html.html();

    replaces.forEach(function(r) {
        html = html.replace(r.find, r.replace);
    });


    $('body').append('<div class="table-container"><table>'+html+'</table></div>');
    $('body').append('<div class="filters"><p>Фильтрация: <input type="text" value="0" name="price"></div>');

    // console.profileEnd();
    // console.timeEnd('start');

    var timer;
    $('input').on('keyup', function() {
        // console.time('filter');
        // console.profile('filter');
        timer = setTimeout(function() {
            filterRows(getFilterValue(this))
        }.bind(this), 250);
        // console.profileEnd();
        // console.timeEnd('filter');
    });

    var trs = $('tr').toArray();

    function filterRows(value) {
        trs.forEach(function(row, i) {
            var rv = parseFloat(row.lastElementChild.innerHTML.replace(',', '.'));
            if (rv < value) {
                row.setAttribute('style', 'display: none;');
            } else {
                row.removeAttribute('style');
            }
        });
    }

    function getFilterValue(input) {
        try {
            return parseFloat(input.value);
        } catch(e) {
            return 0;
        }
    }

});
