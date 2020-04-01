---


---

<h1 id="데이터베이스란">7.1 데이터베이스란?</h1>
<p><strong>데이터베이스</strong>란 관련성을 가지며 중복이 없는 데이터들의 집합을 말한다.<br>
이러한 데이터베이스를 DBMS(데이터베이스 관리 시스템)이라고 한다.<br>
보통 하드,  SSD, 클라우드 등에 정보를 저장한다.<br>
DB관리 DBMS중에서는 RDBMS라는 관계형 데이터베이스 관리 시스템이 있다.<br>
그 중에서도 MySQL을 사용할 예정이다.</p>
<h1 id="mysql--워크벤치-설치">7.2&amp;3 MySQL &amp; 워크벤치 설치</h1>
<p>책 231페이지 참고</p>
<h1 id="데이터베이스-및-테이블-생성하기">7.4 데이터베이스 및 테이블 생성하기</h1>
<p><a href="https://github.com/Walkers15/StudyNote/blob/master/MySQL%20%EC%9A%94%EC%A0%90%EC%A0%95%EB%A6%AC.md">StudyNote/MySQL요점정리</a><br>
위 링크와 함께 보면 될 듯?</p>
<h3 id="데이터베이스-생성하기">데이터베이스 생성하기</h3>
<pre><code>CREATE SCHEMA nodejs
</code></pre>
<ul>
<li>UNSIGNED 는 부호 없는 숫자를 위해 사용된다. FLOAT와 DOUBLE에는 적용할 수 없다. 나이처럼 음수가 들어올 수 없는 컬럼에 쓰는 것이 좋다.</li>
<li>ZEROFILL은 숫자의 자릿수가 고정되어 있을 때 사용할 수 있다. 자료형으로 INT(4)등을 사용할 때, ZEROFILL을 설정하고 값에 1을 넣으면 값이 0001이 된다. 즉 비어 있는 자릿수에 모두 0을 넣는다는 뜻이다.</li>
<li>DATETIME 자료형에 DEFAULT값으로 now()혹은 CURRENT_TIMESTAMP를 쓰면 현재 시작이 기록된다.</li>
<li>로우를 대표하는 고유 값으로 사용할 컬럼에 <strong>PRIMARY KEY</strong>옵션을 설정한다. NOT NULL인 동시에 UNIQUE INDEX이다.</li>
<li>UNIQUE INDEX는 해당 값이 고유해야 하는지에 대한 옵션이다.</li>
</ul>
<pre><code>UNIQUE INEX name_UNIQUE(name ASC)
</code></pre>
<p>위와 같이 사용하면 name컬럼을 오름차순으로 기억하겠다는 뜻이며, PRIMARY KEY 나 UNIQUE INDEX의 경우에는 데이터베이스가 따로 컬럼을 관리하므로, 조회 시 속도가 빨라진다.</p>
<p>테이블 자체에 대한 설정을 적용할 수 있다.<br>
CREATE TABLE tablename( … ) 작성 후 작성한다.</p>
<ul>
<li>COMMENT는 테이블에 대한 보충 설명이다. 이 테이블이 무슨 역할을 하는지 적어두면 된다.(필수 아님)</li>
<li>DEFAULT CHARSET을 utf8로 설정하지 않으면 한글이 입력되지 않는다.(되던데?)</li>
<li>ENGINE은 여러 가지가 있지만, InnoDB를 엔진으로 사용한다.</li>
</ul>
<pre><code>CREATE TABLE nodejs.comments (
...
commenter INT NOT NULL,
...
CONSTRAINT commenter
FOREIGN KEY (commenter)
REFERENCES nodejs.users (id)
ON DELETE CASCADE
ON UPDATE CASCADE)
...
</code></pre>
<p>다른 테이블의 기본 키를 저장하는 컬럼을 <strong>FOREIGN KEY</strong>(외래 키)라고 부른다.</p>
<pre><code>CONSTRAINT 제약조건명 FOREIGN KET 컬럼명 REFERENCE 참고 컬럼명
</code></pre>
<p>으로 외래 키를 지정할 수 있다.<br>
ON UPDATE와 ON DELETE를 CASCADE로 설정하면, 사용자 정보가 수정되거나 삭제되면 연결된 댓글 정보도 같이 수정되거나 삭제됨을 뜻한다.</p>
<h1 id="crud">7.5 CRUD</h1>
<p>위 링크 참고<br>
<code>SELECT * FROM table OFFSET 건너뛸 숫자</code><br>
숫자만큼 건너 뛰고 출력</p>
<h2 id="사용한-쿼리문들">사용한 쿼리문들</h2>
<p>CREATE TABLE nodejs.users (<br>
id INT NOT NULL AUTO_INCREMENT,<br>
name VARCHAR(20) NOT NULL,<br>
age INT UNSIGNED NOT NULL,<br>
married TINYINT NOT NULL,<br>
comment TEXT NULL,<br>
created_at DATETIME NOT NULL DEFAULT now(),<br>
PRIMARY KEY(id),<br>
UNIQUE INDEX name_UNIQUE (name ASC))<br>
COMMENT = ‘사용자 정보’<br>
DEFAULT CHARSET=utf8<br>
ENGINE=InnoDB;</p>
<p>CREATE TABLE nodejs.comments (<br>
id INT NOT NULL AUTO_INCREMENT,<br>
commenter INT NOT NULL,<br>
comment VARCHAR(100) NOT NULL,<br>
created_at DATETIME NOT NULL DEFAULT now(),<br>
PRIMARY KEY(id),<br>
INDEX commenter_idx (commenter ASC),<br>
CONSTRAINT commenter<br>
FOREIGN KEY (commenter)<br>
REFERENCES nodejs.users (id)<br>
ON DELETE CASCADE<br>
ON UPDATE CASCADE)<br>
COMMENT = ‘댓글’<br>
DEFAULT CHARSET=utf8<br>
ENGINE=InnoDB;</p>
<p>INSERT INTO nodejs.users (name, age, married, comment) VALUES (‘zero’, 24, 1, ‘자기소개1’);<br>
INSERT INTO users(name, age, married, comment) VALUES(‘hoon’,22, 0, ‘자기소개2’);</p>
<p>INSERT INTO nodejs.comments (commenter, comment) VALUES(2,‘안녕하세요. 승훈의 댓글입니다’);</p>

