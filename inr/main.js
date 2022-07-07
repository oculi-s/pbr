import { $, $$ } from '/pbr/common/com.js';

const u = new URL('https://d3fy651gv2fhd3.cloudfront.net/embed/');
var par = u.searchParams;
par.set('d1', '20120101');
var type = $$('[name=type]');
var sel = $('select');
var img = $('img');

var dtype = { 'fdtr': 'interest-rate', 'cpi+yoy': 'inflation-rate' };

type.forEach(e => {
    e.onchange = e => {
        par.set('s', e.target.value);
    }
});

const country = {
    '한국': 'south-korea',
    '일본': 'japan',
    '중국': 'china',
    '유로존': 'euro-area',
    '호주': 'australia',
    '캐나다': 'canada',
    '뉴질랜드': 'new-zealand',
    '영국': 'united-kingdom',
    '인도': 'india',
    '러시아': 'russia',
}

for (let x in country) {
    let opt = document.createElement('option');
    opt.value = country[x];
    opt.innerHTML = x;
    sel.append(opt);
}

sel.onchange = e => {
    par.set('url2', `/${sel.value}/${dtype[$('[name=type]:checked').value]}`);
    img.src = u;
}