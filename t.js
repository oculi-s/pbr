const body = document.body;

var d = {};
var etf;
fetch('https://finance.naver.com/api/sise/etfItemList.nhn')
    .then(r => r.json())
    .then(r => { etf = r.result.list;
        console.log(r.result) })

fetch('/bin/corpcode.json')
    .then(r => r.json())
    .then(r => {
        r.result.list.forEach(e => {
            var c = e.stock_code[0].trim()
            if (c.length)
                if (etf[c] == undefined)
                    d[c] = e.corp_name[0];
        });
        body.innerHTML += JSON.stringify(d);
    });