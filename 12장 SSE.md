---


---

<h1 id="장">12장</h1>
<h2 id="sse">SSE</h2>
<p>SSE모듈 - 서버센트 이벤트에 사용할 수 있는 모듈<br>
app.js에 sse(server);를 입력하여 사용한다.<br>
SSE 모듈을 불러와 new SSE로 서버 객체를 생성하면 된다.</p>
<pre><code>npm i sse
</code></pre>
<pre><code># sse.js
const SSE = require('sse');

module.exports = (server) =&gt; {
	const sse = new SSE(server);
	sse.on('connection',(cilent)=&gt;{
		setInterval(() =&gt; {
			client.send(Date.now().toString))
			}, 1000);//클라이언트와 연결된 후 1초마다 서버의 시간 전송
		});
};
</code></pre>
<p>라우터에서 sse를 사용하고 싶다면, sse모듈의 매개변수로 app을 전달해주고, app.set(‘client’,client)로 클라이언트객체를 등록하고, req.app.get메소드로 가져오면 된다.</p>
<h2 id="스케쥴링">스케쥴링</h2>
<pre><code>npm i node-schedule
</code></pre>
<pre><code>const end = new Date();
end.setDate(end.getDate() + 1);//하루 뒤
schedule.scheduleJob(end, ()=&gt;{
	//Callback
});
</code></pre>
<p>schedule객체의 scheduleJob메서드로 일정을 예약할 수 있다.<br>
첫 번째로 실행될 시각,</p>

