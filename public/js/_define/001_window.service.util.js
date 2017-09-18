//--------------------------------------------------;
// UTIL;
//--------------------------------------------------;

//-------------------------;
// PACKAGE;
//-------------------------;


window.service.util = {};
window.service.util.MATH = {};

//-------------------------;
// FUNCTION;
//-------------------------;

/**
 * 랜덤한 숫자를 자리수에 맞게 만들어내는 함수
 * @param {Number} min
 * @param {Number} max
 * @return {Number} ???
 */
window.service.util.MATH.getRandomArbitrary = function(min, max) {
  return Math.random() * (max - min) + min;
};

/**
 * 자바스크립트 파일 임포트 함수;
 * @param  {String} url
 * @param  {String} el
 <exmaple>
	"body" or "head"
 </example>
 * @param  {Function} callback
 */
window.service.util.loadScript = function(url, el, callback)
{
    var _el = document.getElementsByTagName( el )[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    script.onreadystatechange = callback;
    script.onload = callback;

    _el.appendChild(script);
};
