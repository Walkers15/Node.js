---


---

<h1 id="cli">14 CLI</h1>
<p>CLI은 Command Line Interface의 약자이다.<br>
CLI프로그램은 그 커맨드라인 인터페이스를 기반으로 동작하는 노데몬, npm, express-generator등을 말한다.</p>
<h2 id="간단한-콘솔-명령어-만들기">14.1 간단한 콘솔 명령어 만들기</h2>
<p>14장 node-cli/template참고</p>
<h2 id="commander-inquirer-사용하기">14.2 Commander, Inquirer 사용하기</h2>
<p>책 552페이지 참고</p>
<h2 id="chalk-패키지-사용하기">chalk 패키지 사용하기</h2>
<p>터미널에 색과 스타일을 추가할 수 있다.<br>
chalk객체의 메서드들로 문자열을 감싸면 된다.</p>
<pre><code>console.error(chalk.bold.red('html 또는 express-router 둘 중 하나를 입력하세요.'));

console.log(chalk.green(pathToFile, '생성 완료'));

...
</code></pre>
<p>유명한 색이 추가되어 있다.<br>
chalk.rab(111,121,13)(텍스트)<br>
혹은<br>
chalk.hex(#1cd111)(텍스트)처럼 할 수 있다.</p>
<p>배경색을 추가하려면<br>
bgGreen, bgYellow, bgRgb 등을 사용하면 된다.</p>
<p>그 외에도<br>
bold, underline 등을 사용할 숟 있다.</p>
<p>글씨색, 배경색, 스타일을 동시에 지정하려면,<br>
<strong>chalk.red.bgBlue.bold(텍스트)</strong><br>
처럼 사용할 수 있다.</p>

