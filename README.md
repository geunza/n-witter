# 트위터 클론코딩(2022.10.04 ~ ing)

리액트 트위터 클론코딩

## firebase를 통한 로그인 및 데이터 저장

9.6.1v를 사용해 아주 애를 먹음. 왜 버전에 집착하는지 알게됨.

### 2022.10.07 ~ 2022.10.10

firebase auth의 user를 끌고 오는 과정에서 아주 고생을 함.

```javascript
const [userObj, setUserObj] = useState(null);
useEffect(() => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserObj(auth.currentUser);
      console.log(auth.currentUser);
      console.log(userObj);
    } else {
      setIsLoggedIn(false);
    }
    setInit(true);
  });
}, []);
```

라고 작성을 했을 때에, auth.currentUser는 출력이 잘 됨.
바로 위에서 분명 setUserObj에 해당 값을 넣었고, 바로 콘솔에 출력을 했을 때에 출력이 되지 않는 상황이 발생. 계속 null이 출력된다.
상식적으로 안 될 이유가 없는데 아무튼 안 됨. 약 3일동안 삽질을 열심히 함.
결론은 useState에서 반환된 함수인 setState()를 사용해 state 변경 후 console.log(state)를 하면 변경 전의 값이 출력된다는 것.
리액트 함수 컴포넌트는 클로저와 유사한 방식으로 동작한다고 한다.
클로저가 무엇인지는 개념은 알지만 정확한 사용이유는 모른다.
공부를 더 해야겠다.

```javascript
///입력
const [a, b] = useState("Hello");
useEffect(() => {
  console.log(a);
  b("Hi");
  console.log(a);
}, []) +
  ///출력
  "Hello" +
  "Hello";
```

아래와 같이 진행해서 확인을 해보니 정상적으로 출력이 된다.

```
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(auth.currentUser);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  useEffect(()=>{
    console.log(userObj);
  }, [userObj])
```
