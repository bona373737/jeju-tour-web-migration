# migration project
팀프로젝트로 진행되고 미완성상태로 남아있던 "제주도여행지안내 모바일웹 사이트"를 개선시켜 완성해보자!

## 변경사항 
 1. 개발언어 : react --> react + typescript   
 동적언어인 자바스크립트를 사용해 개발을 진행하며 런타임에서 타입관련오류들을 자주 만날 수 있었는데
 그때마다 매번 typeof로 타입확인 후 타입을 변환해주는 코드를 추가해주는 작업을 반복 했었다. 
 이 부분은 typescript를 사용해 타입을 정의해주어 코드 표현력을 높히고 프로젝트의 안정성을 높혀보도록 하자.
 
 2. 상태관리라이브러리 : redux-toolkit --> react-query   
 상태관리에 대해 좀더 학습해나가면서 상태값을 server state, client state로 구분하여 관리하는 방식을 알게되었다.    
 기존에 store 안에 프로젝트의 모든 전역상태값이 구분없이 하나로 관리되었던 부분은 개선시켜 
 server state를 react-query를 사용해 분리해보도록 하겠다.
 
 3. 배포 : 네이버클라우드플랫폼 --> AWS EC2(ubuntu)   
 현업에서 AWS EC2배포환경을 경험해 보았던것을 토대로 개인프로젝트를 배포해보며 
 AWS와 리눅스 cli환경을 연습해 보자. 


