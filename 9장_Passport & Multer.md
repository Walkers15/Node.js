---


---

<h1 id="passport-미들웨어">Passport 미들웨어</h1>
<pre><code>npm i passport
</code></pre>
<pre><code>로컬 저장소 사용
npm i passport-local

다른 startegy 사용

ex.카카오
npm i express-kakao
</code></pre>
<p><a href="http://www.passportjs.org/">Passport 홈페이지</a> 참고</p>
<pre><code>미들웨어 선언부
const passport = require('passport');

앱 선언부
passportConfig(passport);

app에 미들웨어 등록
app.use(passport.initialize());  
app.use(passport.session()); // 세션 사용이므로 세션 미들웨어 뒤에 올것
</code></pre>
<blockquote>
<p>passport/index.js</p>
</blockquote>
<p>serializeUser는 처음 회원 정보 등록시 회원 아이디당 한번</p>
<p>그리고 deserializeUser는 매 로그인 시마다 작동한다.<br>
deserializeUser후 req.session에 저장된 아이디를 디비에서 조회하고, req.user에 저장함으로써 라우터에서 아이디 정보를 사용할 수 있게 한다.</p>
<h3 id="라우터에-접근-권한을-제어하는-메서드">라우터에 접근 권한을 제어하는 메서드</h3>
<blockquote>
<p>routes/middlewares.js</p>
</blockquote>
<p>passport는 req에  isAuthenticated 메서드를 추가한다. 위 메서드를 통해 로그인 여부를 확인할 수 있다.</p>
<h3 id="로컬-로그인-구현하기">로컬 로그인 구현하기</h3>
<blockquote>
<p>routes/auth.js<br>
routes/localStrategy.js</p>
</blockquote>
<p>auth,js의 passport.authenticte 가 로컬 로그인 전략을 수행하는 미들웨어이다. 이렇게 라우터 만에 미들웨어가 들어 있을 때는, 내부 미들웨어에 (req, res, next)를 인자로 제공하여 호출한다.</p>
<h1 id="multer">Multer</h1>
<p>multipart/form-data형식의 데이터를 처리하기 위한 모듈</p>
<pre><code>npm i multer
</code></pre>
<blockquote>
<p>routes/post의 메소드 확인할 것</p>
</blockquote>

