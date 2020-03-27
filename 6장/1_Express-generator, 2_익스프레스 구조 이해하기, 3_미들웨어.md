---


---

<h1 id="express-generator로-빠르게-설치하기">6.1 Express-generator로 빠르게 설치하기</h1>
<p>npm install express-generator 로 설치<br>
express &lt;프로젝트명&gt; 으로 프로젝트 실행</p>
<p><code>express learn-express --view=pug</code><br>
처럼 입력하여 시작한다. <strong>—view=pug</strong> 옵션을 사용하는 이유는, 익스프레스는 기본적으로 jade 템플릿 엔진을 사용하는데, 이는 pug의 구형 버젼이므로 신형을 사용하기 위해 입력한다.</p>
<h1 id="익스프레스-구조-이해하기">6.2 익스프레스 구조 이해하기</h1>
<p>익스프레스 코드는 여러 개의 파일로 분리되어 있다.<br>
가장 큰 뿌리는 app.js와 bin/www 파일이다.</p>
<p>bin/www파일은 http모듈에 express모듈을 연결하고, 포트를 지정하는 부분이다.</p>
<p>app.js 모듈은 express 패키지를 호출하여 app객체를 만들고, 그 객체에 각종 기능을 연결한다.<br>
이후 app.use를 통해 미들웨어를 연결해주고, bin/www 등에서 사용하기 위해 app객체를 모듈로 만들었다.</p>
<p>우선 app.js에서 모든 세팅을 마치고 bin/www로 app모듈을 넘겨주면, bin/www에서 이 모듈과 http모듈을 연결하여 서버를 열어 준다.</p>
<h1 id="미들웨어">6.3 미들웨어</h1>
<p><strong>미들웨어는 익스프레스의 핵심이다</strong><br>
요청과 응답에 중간에 위치하고 있어 미들웨어라고 부른다.<br>
미들웨어는 요청과 응답을 조작하여 기능을 추가하기도 하고, 나쁜 요청을 걸러내기도 한다.<br>
미들웨어는 <em>app.use</em> 메소드와 함께 사용한다.<br>
app.use메소드의 인자로 들어 있는 함수가 미들웨어이다.<br>
여러 미들웨어들을 순차적으로 거친 후, 라우터에서 클라이언트로 응답을 보낸다.<br>
<strong>라우터</strong>와 <strong>에러 핸들러</strong>도 미들웨어의 일종이므로, app.use를 사용하여 연결한다.</p>
<h3 id="커스텀-미들웨어-만들기">커스텀 미들웨어 만들기</h3>
<p>현재 미들웨어는 ES5 문법의 코드를 생성한다. 9장 이후부터는 Express Generator없이 ES2015+문법을 사용한다.</p>
<pre><code># app.js에서 logger보다 위에 다음 코드를 작성

app.use((req, res, next)=&gt;{
	console.log('저도 미들웨어입니다');
	next();
});
</code></pre>
<p><strong>반드시 미들웨어 안에서 next()를 호출해야 다음 미들웨어로 넘어갈 수 있다</strong><br>
우리가 사용하는 여러 미들웨어들도 내부적으로 next()를 호출한다.</p>
<ul>
<li>next() : 다음 미들웨아로 이동</li>
<li>next(‘route’) : 다음 라우터로 이동</li>
<li>next(error) : 에러 핸들러로 이동</li>
</ul>
<p>예시로 express가 생성해주는 에러 핸들링 미들웨어는 다음과 같이 동작한다.</p>
<pre><code># 404 처리 미들웨어
app.use(function(req, res, next){
	next(createError(404));
});

# 에러 핸들러
app.use(function(err, req, res, next) {
  res.locals.message = err.message;  
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);  
  res.render('error');  
});
</code></pre>
<p>app.use에 인자로 미들웨어를 여러 개 추가할 수도 있다.</p>
<h2 id="익스프레스에-사용되는-다른-미들웨어들">익스프레스에 사용되는 다른 미들웨어들</h2>
<h3 id="morgan">morgan</h3>
<p>현재 콘솔에 기록되는<br>
<code>GET /users 200 0.855 ms - 23</code>등은 전부 morgan 미들웨어에서 나오는 것이다.<br>
요청에 대한 정보를 콘솔에 기록해준다.</p>
<pre><code>...
const logger  = require('morgan');
...
app.use(logger('dev'));
...
</code></pre>
<p>위와 같이 적용한다.<br>
logger의 인자로 개발시에는 <em>dev</em>, <em>short</em>,  배포시에는 <em>common</em>, <em>combined</em>를 많이 사용한다.</p>
<h3 id="body-parser">body-parser</h3>
<p>요청의 본문을 해석해주는 미들웨어이다. 폼 데이터나 AJAX 요청의 데이터를 처리한다.<br>
익스프레스 4.16.0 이상부터 body-parser의 일부 기능이 익스프레스에 내장되어서,</p>
<pre><code>app.use(express.json());
app.use(express.urlencoded({ extended: false }));
</code></pre>
<p>등은 body-parser등을 설치하지 않고도 사용할 수 있다.</p>
<p>다만 Raw나 Text 형식의 본문을 해석할 때는 설치하여야 하며, 다음과 같은 옵션을 추가한다.</p>
<pre><code>app.use(bodyParser.raw());
app.use(bodyParser.text());
</code></pre>
<p><em>express.urlencoded</em>의 옵션을 보면, <em>{ extended: false }</em> 라는 옵션이 들어있는다.<br>
이 옵션이 false면 노드의 <em>queryString</em> 모듈을 이용하여 쿼리스트링을 해석하고, ture면 <em>qs</em> 라는 npm 패키지 모듈을 이용하여 쿼리스트링을 해석한다.</p>
<h3 id="cookie-parser">cookie-parser</h3>
<p>쿠키파서는, 요청에 동봉된 쿠키를 해석해준다.<br>
<code>const cookieParser = require('cookie-paresr)</code><br>
<code>app.use(cookieParser());</code><br>
를 통해 사용할 수 있다.<br>
해석된 쿠키들은 <strong>req.cookies</strong> 객체에 들어간다.<br>
예를 들어 name=shoon100 쿠키를 보냈다면, cookies객체는 { name: ‘shoon100’ }이 된다.</p>

