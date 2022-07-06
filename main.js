const body = document.body;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tbody = $('tbody');
const searchBox = $('input');
const par = new URLSearchParams(location.search);
var code = par.get('code');

HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;

const imgs = $$('img');

fetch('code.json')
    .then(r => r.json())
    .then(r => {
        if (code) {
            tbody.classList.add('d');
            imgs[0].src = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PER_A${code}_D_01_06.png`;
            imgs[1].src = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PBR_A${code}_D_01_06.png`;
        } else {
            tbody.classList.remove('d');
            let k = Object.keys(r).sort();
            k.forEach(name => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<th>${name}</th><td><a href=?code=${r[name]}>${r[name]}</a></td>`;
                tr.id = r[name];
                tr.name = name;
                tbody.append(tr);
            });
            searchBox.oninput = search;
        }
        searchBox.onkeyup = () => { move(r) };
        searchBox.focus();
    });


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

function move(d) {
    let name = event.target.value.toUpperCase();
    if (event.keyCode == 13) {
        let tr = $('tr:not(.d)');
        if (tr) {
            par.set('code', tr.id);
        } else if (d[name] != undefined) {
            par.set('code', d[name]);
        } else if (Object.values(d).includes(name)) {
            par.set('code', name);
        }
        location.search = par.toString();
    }
}