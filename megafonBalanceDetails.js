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

    $.each(document.querySelectorAll('table'), function(i, tbl) {
        var trs = tbl.querySelectorAll('tr');
        $.each(trs, function(j, tr) {
            if (i === 0 && j === 11) {
                // это заголовок
                thead += (wrapTR(cleanup(tr.innerHTML.replace(/td/g, 'th'))));
            } else if ( ! (j <= 11 || j === trs.length - 1 || tr.childElementCount > 15) ) {
                // джойним в одну таблицу все строки кроме последней в таблице
                // или если в ней слишком много колонок
                // первые 11 строк — ненужная информация
                tbody += (wrapTR(cleanup(tr.innerHTML)));
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
        '<tfoot><tr><td colspan="8">ololo</td></tr></tfoot>',
        '</table>'
    ].join('\n');

    $('style').remove();

    console.timeEnd('start');

});

// var slice = Array.prototype.slice;
//
// // меняем текст
// var tds = slice.call(table.querySelectorAll('td'))
// tds.forEach(function(td) {
//     replaces.forEach(function(r) {
//         td.textContent = td.textContent.replace(r.find, r.replace);
//     });
// });
//
// // чистим все стили и атрибуты
// var trs = slice.call(table.querySelectorAll('tr'));
// trs.forEach(function(tr, i) {
//     var tds = slice.call(tr.querySelectorAll('td'));
//     tds.forEach(function(td, i) {
//         td.removeAttribute('colspan');
//         td.removeAttribute('class');
//         td.removeAttribute('style');
//         if (i === 3) {
//             // кол-во
//             td.setAttribute('class', 'qty');
//         } else if (i === 7) {
//             // руб
//             td.setAttribute('class', 'price');
//         }
//     });
// });
//
// // Вставляем шапку таблицы в thead
// var thead = document.createElement('thead');
// thead.appendChild(trs.shift());
// table.insertBefore(thead, table.firstElementChild);
//
// // заменяем td в шапке на th
// var tds = slice.call(table.querySelectorAll('thead td'));
// var ths = tds.map(function(td) {
//     var className = td.getAttribute('class');
//     var str = '';
//     if (className) {
//         str += '<th class="' + className + '">';
//     } else {
//         str += '<th>'
//     }
//     str += td.textContent;
//     str += '</th>';
//     return str;
// }).join('');
//
// table.querySelector('thead').innerHTML = ths;
//
// var trs = slice.call(table.querySelectorAll('tr'));
// var summary = [],
//     txts = [];
// summary.push(trs.pop());
// summary.push(trs.pop());
// summary.forEach(function(tr) {
//     // Записей:914Стоимость:944.30
//     var txt = tr.textContent;
//     var match = txt.match(/(\d+\.?\d+)/g);
//     txts.push({
//         qty: parseInt(match[0], 10),
//         total: parseFloat(match[1])
//     });
//     tr.parentNode.removeChild(tr);
// });
//
// if (txts[0].qty === txts[1].qty && txts[0].total === txts[1].total) {
//     txts.pop();
// }
//
// var body = document.querySelector('body');
//
// var summary = document.createElement('div');
// summary.className = 'summary';
// summary.innerHTML = '<p>Записей: ' + txts[0].qty + '</p><p>Сумма: ' + txts[0].total + '</p>';
// body.appendChild(summary);
//
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
//
// // удаляем пустые ссылки
// slice.call(document.querySelectorAll('a')).forEach(function(a) {
//     a.parentNode.removeChild(a);
// });
//
// // удаляем дефолтный CSS
// var style = document.querySelector('style');
// style.parentNode.removeChild(style);
