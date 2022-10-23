## 프로젝트 생성
- $npx create-react-app
- react버전 : 18.2.0
  
## 변경내용 
1. createBrowserRouter사용하여 라우팅페이지 구조를 한눈에 보기 쉽고, 관리하게 쉽도록 처리.
2. 

## React Router Dom v6
react 버전 16.8 이상의 버전과 호환되는 React Router Dom v6.   
프로젝트 진행 당시에는 버전에 대한 이해 없이 사용했었는데 프로젝트를 마이그레이션 하는 과정에서 react router dom의 v6와 이전 버전 v5와의 사용상의 차이점을 확인해 보았다. 
```
기존의 react-router-dom ver5 를 ver6로 업데이트
$ yarn add history@5 react-router-dom@6
```  
- React Router Dom v5_라우팅처리
```javascript
 <BrowserRouter>
      <Switch>
        <Route path="/" component={() => <Home />} />
        <Route exact path="/write" component={() => <Write />} />
        <Route component={() => <div>Page Not Found</div>} />
      </Switch>
    </BrowserRouter>
```
- React Router Dom v6_라우팅처리
```javascript
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/page1/*" element={<Page1 />} />
        <Route path="/page2/*" element={<Page2 />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
```