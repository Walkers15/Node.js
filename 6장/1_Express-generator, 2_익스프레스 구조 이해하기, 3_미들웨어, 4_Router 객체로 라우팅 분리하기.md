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
<h3 id="static">static</h3>
<p>정적인 파일들을 제공함<br>
<code>app.use(express.static(path.join(__dirname, 'public')));</code><br>
실제 서버의 폴더 경로에는 public이 들어 있지만, 요청 주소에는 들어 있지 않음<br>
보안에 큰 도움이 됨<br>
정적 파일들을 알아서 제공해주므로, fs.readFile로 파일을 직접 읽어서 전송할 필요가 없음<br>
<code>app.use('/img',express.static(path.join(__dirname, 'public')));</code><br>
처럼 정적 파일을 제공할 주소를 지정할 수도 있음.<br>
이렇게 static으로 파일을 제공할 경우, 응답에 대한 요청으로 파일을 전송함.<br>
따라서, 다른 미들웨어보다 최대한 앞쪽에 배치하는 것이 좋음.</p>
<h3 id="express-session">express-session</h3>
<p>npm install express-session 으로 직접 설치해줘야 함</p>
<pre><code>var session = require('express-session);
//&lt;1.5에는 cookie-parser미들웨어보다 이전에 존재했어야 함. 요즘은 상관 X
...
app.use(cookieParser('세션에 사용할 비밀번호 직접 입력'));
app.use(session({
	resave: false,
	saveUninitialized: false,
	secret: '아까 입력한 비밀번호',
	cookie: {
		httpOnly: true,
		secure: false
	},
}));
...
</code></pre>
<ul>
<li>resave: 요청이 왔을 때 세선에 수정사항이 생기지 않더라도 세션을 다시 저장하는지 여부</li>
<li>saveUninitialized: 세션에 저장할 내역이 없더라도 세션을 생성하는지에 대한 여부</li>
<li>secret: <strong>필수 항목</strong>, cookie-parser의 비밀 키와 같은 역할을 함</li>
</ul>
<p>express-session은 세션 관리 시 클라이언트에 쿠키를 보내는데, 이를 세션 쿠키라고 부름<br>
쿠키를 서명하는 데 secret값이 필요하다.<br>
세션 쿠키에 대한 설정을 session 객체 내의 cookie 옵션을 통해 설정한다.<br>
maxAge, domain, path, expires, sameSite, httpOnly, secure등이 있다.<br>
<strong>store</strong>라는 옵션도 있다. 현재는 메모리에 세션을 저장하지만, 이는 서버를 재시작하면 초기화되므로, 저장할 공간이 필요하다. Redis데이터베이스를 자주 사용한다.<br>
나는 mySQL써서 저장했었다.<br>
express-session은 req 객체 안에 <em>req.session</em> 객체를 만든다. 이 객체에 값을 대입하거나 삭제하여 세션을 변경할 수 있다.<br>
삭제할 때는 req.session.destory() 를 사용한다.<br>
현제 세션의 아이디는 req.sessionID로 확인할 수 있다.</p>
<h3 id="connect-flash">connect-flash</h3>
<p>일회성 메세지들을 웹 브라우저에 나타낼 때 좋다.<br>
npm install connect-flash<br>
cookie-parser와 express-session을 사용하므로, 이 두 미들웨어 뒤에 위치시킨다.<br>
flash 미들웨어는 req객체에 req.flash 메서드를 추가한다. req.flash(key, value)로 해당 키에 대한 값을 설정하고, req.flash(키)로 해당 키에 대한 값을 불러온다.</p>
<pre><code>router.get('/flash', function(req, res) {
	req.session.message = '세션 메시지';
	req.flash('message',' flash로 생성한 일회용 메시지');
	res.redirect('/users/flash/result');
});

router.get('flash/result', function(req, res){
	res.send(`${req.session.messge} ${req.flash('message')}`);
});

module.exports = router;
</code></pre>
<p>위와 같은 라우터가 있을 때, /users/flash GET요청을 보내면, 서버에서는 세션과 flash에 메시지를 설정하고, /users/flash/result로 리다이렉팅한다. 그러면 첫 번째 result 접속 시에는 세션 메시지와 flash 메시지가 모두 보인다. 하지만 새로고침하면, flash 메시지는 보이지 앟는다.<br>
로그인 오류 등의 일회성 메세지는 flash를 사용하면 편리하다.</p>
<p>매 요청마다 연결한 모든 미들웨어가 실행되므로, 앱에 너무 많은 미들웨어를 연결하면 응답이 느려질 수도 있다.</p>
<h1 id="router-객체로-라우팅-분리하기">6.4 Router 객체로 라우팅 분리하기</h1>
<p>if등의 조건문들 통해 라우터를 분기하면, 가독성도 떨어지고 확장하기도 어렵다.<br>
익스프레스를 사용하는 이유 중 하나가, 라우팅을 깔끔하게 관리할 수 있다는 점이다.</p>
<pre><code>#app.js
...
var indexRouter = require('./routes/index');  
var usersRouter = require('./routes/users');
...
app.use('/', indexRouter);  
app.use('/users', usersRouter);
...
</code></pre>
<p>익스프레스 앱과는 app.use(’/’,indexRouter) 처럼 연결되어 있다.<br>
app.use를 사용하므로, 라우터도 일종의 미들웨어라고 할 수 있다.<br>
다른 미들웨어와는 다르게 앞에 주소가 붙어있다.<br>
이와 같이 <strong>라우팅 미들웨어</strong>는 첫 번째 인자로 주소를 받아서, 특정 주소에 해당하는 요청이 왔을 때만 미들웨어가 동작하게 할 수도 있다.<br>
/이면 routes/index.js, /users로 시작하면 routes/users.js 로 사용하는 식이다.<br>
use대신 <em>get, post, put, patch, delete</em> 같은 HTTP메서드를 사용할 수도 있다.<br>
위 메소드들은 주소뿌난 아니라 HTTP 메서드까지 일치하는 요청일 때만 실행된다.</p>
<pre><code>#routes/index.js
var express = require('express');  
var router = express.Router();  
  
/* GET home page. */  
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'Express' });  
});  
  
module.exports = router;
</code></pre>
<p>router객체는 express.Router()로 만든다. 마지막에는 module.exports = router;로 라우터를 모듈로 만든다. router에도 get, post 같은 HTTP메서드를 붙일 수 있다. use를 제외하고는 각 HTTP 요청 메서드와 상응한다.</p>
<p>app.use 처럼, router 하나에 미들웨어를 여러 개 장착할 수도 있다.<br>
<code>router.get('/',middleware1, middleware2, middleware3);</code><br>
처럼 실제 라우터 로직이 실행되는 미들웨어 전에 로그인 여부, 관리자 여부 등을 체크하는 미들웨어를 중간에 넣을 수 있다는 뜻이다.</p>
<p>users.js에도 router.get(’/’)부분이 있는데, app.js에서 app.use(’/users’, usersRouter)로 연결했기 때문에, /users와 /이 합쳐져 /users/로 GET 요청을 했을 때 이 라우터의 콜백 함수가 실행된다.</p>
<p>사실 라우터(express.Router())를 사용할 필요 없이<br>
app.get(’/’, 미들웨어), app.get(’/users’, 미들웨어) 를 해도 기능은 동일하지만, 코드 관리를 위해 분리하는 것이다.</p>
<p>라우터에는 반드시 요청에 대한 응답을 남기거나, 에러 핸들러로 요청을 넘겨야 한다. 응답을 보내지 않으면, 브라우저는 계속 응답을 기다린다.</p>
<p>next함수에는 라우터에서만 동작하는 특수 기능이 있다.<br>
next(‘route’)를 사용하면, 라우터에 연결된 나머지 미들웨어를 건너뛸 수 있다.</p>
<pre><code>router.get('/',function(req, res, next) {
	next('route');
},function(res,res,next){
	console.log('실행되지 않습니다');
},function(res,res,next){
	console.log('실행되지 않습니다');
	next();
});

router.get('/', function(req,res) {
	console.log('실행됩니다');
	res.render('index', { titile: 'Express'});
});
</code></pre>
<p>같은 주소의 라우터를 두 개 만들고, 첫 번째 라우터에서 <em>next(‘route’)</em> 를 실행하였다. 그러면 두, 세 번째 미들웨어는 실행되지 않는다. 대신 주소와 일치하는 다음 라우터로 넘어간다.</p>
<p><code>router.get('/users/:id',CallBack)</code><br>
위의 형태로 만들면, 쿼리스트링 없이 정보를 주고받을 수 있다.<br>
데이터는 req.params 객체 안에 들어 있다.<br>
:id면 <a href="http://req.params.id">req.params.id</a>, :type면 req.params.type으로 조회할 수 있는 것이다.<br>
위 패턴을 사용할 때는, 일반 라우터보다 뒤에 위치하여야 한다.<br>
다양한 라우터를 아우르는 와일드카드 역할을 하기 때문이다.</p>
<p>에러가 발생하지 않았다면, 라우터는 요청을 보낸 클라이언트에게 응답을 보내 주어야 한다. 응답 메소드로는 주로 <em>send, sendFile, json, redirect, render</em>등을 사용한다.</p>
<ul>
<li>send: 만능 메서드. 버퍼 데이터, 문자열, HTML코드, JSON데이터 등 대부분의 데이터를 전송할 수 있다. res.send(위에 말한 데이터)</li>
<li>sendFile: 응답으로 파일을 보내준다.  res.sendFile(파일 경로)</li>
<li>json: JSON 데이터를 보낸다. res.json(JSON 데이터)</li>
<li>redirect: 응답을 다른 라우터로 보냄.  res.redirect(주소)</li>
<li>render: 템플릿 엔진을 렌더링할 때 사용. res.render(‘템플릿 파일 경로’, { 변수 });</li>
</ul>
<p>res에 status메서드를 사용하여 HTTP 상태 코드를 변경할 수도 있다.<br>
<code>res.status(404).send('Not Found')</code>와 같이 사용한다.</p>
<p>라우터가 요청을 처리하지 못하면, 404상태 코드를 보내주어야 한다.<br>
보통 마지막 미들웨어로 둔다. 마지막 미들웨어에서 새로운 에러를 만들고, 에러의 상태코드를 404로 설정한 뒤, 에러 처리 미들웨어로 넘겨 버린다.</p>

