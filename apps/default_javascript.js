//Default JavaScript
console.log("load default_javascript.js");

var BASE_URL = window.location.protocol+"//localhost/myweb/NiagaGarut88/apps/";
var URL_API_SERVER = BASE_URL+"API/";
//var $jq = $.noConflict();

function loadViewNg($location,view){
	try{document.removeEventListener("backbutton", onBackKeyDownTemp, false);}catch(err){null;}
	$location.path(view);
}
function loadUrlNG(str){
	try{document.removeEventListener("backbutton", onBackKeyDownTemp, false);}catch(err){ null; }
	window.location.assign(encodeURI("#!"+str));
}
function session_user(key){
	var dataJSON = localStorage.getItem("session_user");
	var obj = JSON.parse(dataJSON);
	return obj[key];
}
function numberWithCommas(x){
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatRupiah(x){
	return "Rp "+numberWithCommas(x)+",-";
}
function getDateNow(){
	var x = new Date();
	var Y = x.getFullYear();
	var M = (x.getMonth() + 1);
	var D = x.getDate();
	var datenow = Y+""+M+""+D;
	return datenow;
}
function strReplace(str, xa, xb){
	//return str.replace(/xa/g, "xb");
}
function ucWord(str){
	var str = str.toString();
	str = str.toLowerCase().replace(/\b[a-z]/g, function(letter) {
		return letter.toUpperCase();
	});
	return str;
}
function DecimalHexTwosComplement(decimal) {
  var size = 6;

  if (decimal >= 0) {
    var hexadecimal = decimal.toString(16);

    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    return hexadecimal;
  } else {
    var hexadecimal = Math.abs(decimal).toString(16);
    while ((hexadecimal.length % size) != 0) {
      hexadecimal = "" + 0 + hexadecimal;
    }

    var output = '';
    for (i = 0; i < hexadecimal.length; i++) {
      output += (0x0F - parseInt(hexadecimal[i], 16)).toString(16);
    }

    output = (0x01 + parseInt(output, 16)).toString(16).toUpperCase();
    return output;
  }
}
function encObjParam(x){
	return btoa(JSON.stringify(x));
}
/*
document.addEventListener("backbutton", onBackKeyDown, false);
function onBackKeyDown(){
	return false;
}
*/