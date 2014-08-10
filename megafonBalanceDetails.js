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
        find: /Единица тарификации \(мин, сек, шт, Kb, Mb\)/g,
        replace: 'Ед.'
    },
    {
        find: /Стоимость \(с НДС\),  руб\./g,
        replace: 'Руб.'
    },
    {
        find: /Секунда/g,
        replace: 'Сек.'
    },
    {
        find: /Мобильный интернет/g,
        replace: 'интернет'
    },
    {
        find: /на мобильные номера дом\. региона/g,
        replace: '→ звонок'
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
        find: /Место вызова/g,
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

    console.time('start');

    var thead = '';
    var tbody = '';

    var summary = 0.00,
        txt;

    $.each(document.querySelectorAll('table'), function(i, tbl) {
        var trs = tbl.querySelectorAll('tr');
        $.each(trs, function(j, tr) {
            if (i === 0 && j === 11) {
                // это заголовок
                thead += (wrapTR(cleanup(tr.innerHTML.replace(/td/g, 'th'))));
            } else if ( ! (j <= 11 || j === trs.length - 1 || tr.childElementCount > 15 || tr.childElementCount === 5) ) {
                // джойним в одну таблицу все строки кроме последней в таблице
                // или если в ней слишком много колонок
                // первые 11 строк — ненужная информация
                // если столбцов 5, то это саммари. его мы построим самостоятельно
                tbody += (wrapTR(cleanup(tr.innerHTML)));

                // стоимость услуги
                txt = parseFloat(tr.children[tr.children.length - 1].textContent);
                Number.isNaN(txt) || (summary += txt);
            }
        });
    });

    replaces.forEach(function(r) {
        thead = thead.replace(r.find, r.replace);
        tbody = tbody.replace(r.find, r.replace);
    });

    document.body.innerHTML = [
        '<table>',
        '<thead>' + thead + '</thead>',
        '<tbody>' + tbody + '</tbody>',
        '<tfoot><tr><td colspan="7">summary:</td><td class="summary">' + summary.toFixed(2) + '</td></tfoot>',
        '</table>'
    ].join('\n');

    // удаляем старые стили
    $('style').remove();

    // через $ не получилось
    var css = document.createElement('link');
    css.href = bookmarkletPath + 'megafonBalanceDetails.css';
    css.rel = 'stylesheet';
    css.type = 'text/css';
    document.querySelector('head').appendChild(css);

    console.timeEnd('start');

});

// var filters = document.createElement('div');
// filters.className = 'filters';
// filters.innerHTML = '<p>Фильтрация: <input type="text" value="0" name="price">';
// body.appendChild(filters);
//
// var input = document.querySelector('input[name="price"]');
// input.addEventListener('keyup', function(e) {
//     filterRows(getFilterValue());
// }, false);
//
// function getFilterValue() {
//     try {
//         return parseFloat(input.value);
//     } catch(e) {
//         return 0;
//     }
// }
//
// var rows = slice.call(document.querySelectorAll('tbody tr'));
// function filterRows(value) {
//     rows.forEach(function(row, i) {
//         var rv = parseFloat(row.lastElementChild.innerText);
//         if (rv < value) {
//             row.setAttribute('style', 'display: none;');
//         } else {
//             row.removeAttribute('style');
//         }
//     });
// }
//
