const body = document.body;
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const key = 'sADCAp5KTAsBnP0AZ/ahAnoz8/tQh6ihzNLJYUANgPx4YBREDRZWCMSRRDtKoZL7XWgJvsqh2wacWtWGw/johw==';

var req = new XMLHttpRequest();
var url = new URL('http://api.seibro.or.kr/openapi/service/StockSvc/getKDRSecnInfo');
var par = url.searchParams;
par.set('serviceKey', key);
par.set('caltotMartTpcd', '12');

req.open('GET', url);
req.onreadystatechange = function() {
    console.log(req.responseXML)
    if (this.readyState == 4) {
        body.append('Status: ' + this.status + '\nnHeaders: ' + JSON.stringify(this.getAllResponseHeaders()) + '\nnBody: ' + this.responseText);
    }
};

req.send('');