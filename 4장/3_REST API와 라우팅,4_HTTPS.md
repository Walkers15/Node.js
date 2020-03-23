---


---

<h1 id="rest-api와-라우팅">4.3 REST API와 라우팅</h1>
<p>REST API(REpresentational State Transfer)란 네트워크 구조의 한 형식으로, 서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법을 가리킨다.<br>
<em>HTTP 요청 메소드</em> 라는 것을 사용하는데, 총 다섯 가지가 있다.</p>

<table>
<thead>
<tr>
<th>이름</th>
<th>설명</th>
</tr>
</thead>
<tbody>
<tr>
<td>GET</td>
<td>서버의 자원을 가져오고자 할 때 사용한다. 데이터를 서버로 보낼 때는 쿼리 스트링을 이용한다</td>
</tr>
<tr>
<td>POST</td>
<td>서버에 자원을 새로 등록하고자 할 때 사용한다. 요청의 본문에 서버에 새로 등록할 데이터를 넣어 보낸다</td>
</tr>
<tr>
<td>PUT</td>
<td>사버의 자원을 요청에 들어 있는 자원으로 치환할 때 사용한다.</td>
</tr>
<tr>
<td>PATCH</td>
<td>서버 자원의 일부만 수정하고자 할 때 사용한다</td>
</tr>
<tr>
<td>DELETE</td>
<td>서버의 자원을 삭제하고자 할 때 사용한다</td>
</tr>
</tbody>
</table><p>주소 하나가 여러 개의 요청을 가질 수도 있다.(GET - 정보 가져오기 / POST - 정보 등록하기)</p>
<blockquote>
<p>4장/restfulPage</p>
</blockquote>
<h1 id="section">4.4</h1>
<p>https 관련 내용</p>

