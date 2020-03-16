---


---

<h1 id="repl-사용하기">3.1 REPL 사용하기</h1>
<h4 id="repl">REPL?</h4>
<p>스크립트 언어가 가지는 특성 중 하나.<br>
미리 컴파일을 하지 않아도 즉석에서 코드를 실행할 수 있도록 하는 기능.<br>
입력한 코드를 읽고(Read) 해석하고(Eval) 결과물을 반환하고(Print) 반복(Loop)<br>
한다고 해서 REPL이라고 부름.</p>
<h4 id="사용법">사용법</h4>
<p>도스창 열고 <strong>node</strong>입력<br>
한 두 줄짜리 코드 입력 &amp; 테스트<br>
종료 : <em>.exit</em></p>
<h1 id="js-파일-실행하기">3.2 JS 파일 실행하기</h1>
<p>콘솔창에서 REPL 실행하지 않은 상태에서,<br>
<strong>node [자바스크립트 파일 경로]</strong> 로 실행함.</p>
<h1 id="모듈로-만들기">3.3 모듈로 만들기</h1>
<h3 id="모듈이란">모듈이란?</h3>
<p>특정한 기능을 하는 함수나 변수들의 집합<br>
모듈로 만들어두면 여러 프로그램에 해당 모듈을 재사용할 수 있음.</p>
<pre><code># var.js
const odd = '홀수입니다';
const even = '짝수입니다';

module.exports = {
	odd,
	even,
};
</code></pre>
<p>var.js 에서 변수 두 개를 선언하고, module.exports에 변수들을 담은 객체를 대입했다. 이제 이 파을은 변수들을 모아둔 모듈이 되었다.</p>
<pre><code># func.js
const { odd, even } = require('./var');
//es2015+ 문법, 변수명=데려올놈이면 하나만 써도 된다!

function checkOddOrEven(num) {
	if(num % 2) {
		return odd;
	} else {
		return even;
	}
}

module.exports = checkOddOrEven;
</code></pre>
<p>require 함수 안에 불러올 모듈의 경로를 적어준다.<br>
이번에는 module.exports 에 객체가 아닌 함수를 대입했는데, 이 exports에는 객체, 함수, 변수 모두 대입 가능하다.</p>
<pre><code># index.js
const { odd, even } = require('./var');
const checkNumber = require('/func');

function checkStringOddOrEven(str) {
	if(str.length % 2){
		return odd;
	}
	return even;
}

console.log(checkNumber(10));
console.log(checkStringOddOrEven('hello');
</code></pre>
<p>모듈 하나가 여러 개의 모듈에 쓰일 수도 있다(var.js)<br>
모듈로부터 값을 불러올 때 변수 이름을 다르게 지정할 수도 있다.(func.js)</p>

