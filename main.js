const body = document.body;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tbody = $('tbody');
const searchBox = $('input');
const par = new URLSearchParams(location.search);
var code = par.get('code');

HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;

var d;
fetch('code.json')
    .then(r => r.json())
    .then(r => { d = r });

if (code) {
    var per = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PER_A${code}_D_01_06.png`;
    var pbr = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PBR_A${code}_D_01_06.png`;
    body.innerHTML += `<img src=${per}><img src=${pbr}>`;
} else {
    let k = Object.keys(d).sort();
    k.forEach(name => {
        let tr = document.createElement('tr');
        tr.innerHTML = `<th>${name}</th><td><a href=?code=${d[name]}>${d[name]}</a></td>`;
        tr.id = d[name];
        tr.name = name;
        tbody.append(tr);
    });
    searchBox.oninput = search;
}
searchBox.onkeyup = move;

function search(e) {
    let name = event.target.value.toUpperCase();
    $$('tr').forEach(tr => {
        if (!tr.id.startsWith(name) && !tr.name.includes(name)) {
            tr.classList.add('d');
        } else {
            tr.classList.remove('d');
        }
    })
}

function move(e) {
    let name = event.target.value.toUpperCase();
    if (event.keyCode == 13) {
        let tr = $('tr:not(.d)');
        if (tr) {
            par.set('code', tr.id);
        } else if (d[v] != undefined){
            par.set('code', d[v]);
        } else if (Object.values(d).includes(v)){
            par.set('code', v);
        }
        location.href = location.pathname + '?' + par.toString();
    }
}