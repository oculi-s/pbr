const key = "175afe2314201063cdd3dbb159fd1c945deab5fb";
const $ = document.querySelector.bind(document);
// var u = new URL("https://opendart.fss.or.kr/api/company.json");
var u = new URL('https://opendart.fss.or.kr/api/corpCode.xml');
var p = new URLSearchParams(u.search);
p.set("crtfc_key", key);
// p.set("corp_code", '00126380');
u.search = p;

// function httpGetAsync(theUrl) {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() {
//         console.log(xmlHttp.readyState, xmlHttp.status)
//         if (xmlHttp.readyState == 4)
//             console.log(xmlHttp.response);
//     };
//     xmlHttp.open("GET", theUrl, true);
//     xmlHttp.send(null);
// }

// httpGetAsync(u.href, console.log);

const body = document.body;
fetch(u, { method: "GET" })
    .then(r => { body.innerHTML += r })
    .catch(e => { body.innerHTML += e.stack });