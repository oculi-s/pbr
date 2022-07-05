const body = document.body;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const tbody = $('tbody');
const par = new URLSearchParams(location.search);
var code = par.get('code');

HTMLElement.prototype.$ = HTMLElement.prototype.querySelector;
HTMLElement.prototype.$$ = HTMLElement.prototype.querySelectorAll;

if (code) {
    var per = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PER_A${code}_D_01_06.png`;
    var pbr = `http://cdn.fnguide.com/SVO2/chartImg/01_06/PBR_A${code}_D_01_06.png`;
    body.innerHTML += `<img src=${per}><img src=${pbr}>`;
} else {
    fetch('code.json')
        .then(r => r.json())
        .then(r => {
            let k = Object.keys(r).sort();
            k.forEach(name => {
                let tr = document.createElement('tr');
                tr.innerHTML = `<th>${name}</th><td><a href=?code=${r[name]}>${r[name]}</a></td>`;
                tr.id = r[name];
                tr.name = name;
                tbody.append(tr);
            });
            $('input').oninput = e => {
                let name = e.target.value.toUpperCase();
                $$('tr').forEach(tr => {
                    if (!tr.id.startsWith(name) && !tr.name.includes(name)) {
                        tr.classList.add('d');
                    } else {
                        tr.classList.remove('d');
                    }
                })
            }
            $('input').onkeyup = e => {
                if (e.keyCode == 13) {
                    let tr = $$('tr:not(.d)');
                    if (tr.length == 1) {
                        tr[0].$('a').click();
                    }
                }
            }
        });
}