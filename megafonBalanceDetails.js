var replaces = [
    {
        find: 'Прод/ Объем',
        replace: 'Кол-во'
    },
    {
        find: 'Вид услуги',
        replace: 'Услуга'
    },
    {
        find: 'Абонентский номер, адрес электронной почты, точка доступа',
        replace: 'Номер'
    },
    {
        find: 'Единица тарификации (мин, сек, шт, Kb, Mb)',
        replace: 'Ед.'
    },
    {
        find: 'Стоимость (с НДС),  руб.',
        replace: 'Руб.'
    },
    {
        find: 'Секунда',
        replace: 'Сек.'
    },
    {
        find: 'Мобильный интернет',
        replace: 'интернет'
    },
    {
        find: 'на мобильные номера дом. региона',
        replace: '→ звонок'
    },
    {
        find: 'с номеров МегаФон дом. региона',
        replace: '← звонок на МегаФон'
    },
    {
        find: 'с мобильных номеров дом. региона',
        replace: '← звонок'
    },
    {
        find: 'Входящий',
        replace: '← звонок'
    },
    {
        find: 'на МегаФон домашнего региона',
        replace: '→ звонок на МегаФон'
    },
    {
        find: 'Входящее SMS',
        replace: '← SMS'
    },
    {
        find: 'Исходящее SMS',
        replace: '→ SMS'
    },
    {
        find: 'Входящий',
        replace: '←'
    },
    {
        find: 'Исходящий',
        replace: '→'
    },
    {
        find: 'Исх. на ТФОП региона филиала',
        replace: '→ ☏'
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
        var re = new RegExp(r.find, 'g');
        thead = thead.replace(re, r.replace);
        tbody = tbody.replace(re, r.replace);
    });

    document.body.innerHTML = [
        '<table>',
        '<thead>' + thead + '</thead>',
        '<tbody>' + tbody + '</tbody>',
        '<tfoot><tr><td colspan="7">summary:</td><td class="summary">' + summary.toFixed(2) + '</td></tfoot>',
        '</table>'
    ].join('\n');

    $('style').remove();

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
