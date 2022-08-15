## Project Setup

```bash
npm install or yarn install
```

## Compiles and hot-reloads for development

```bash
npm run start or yarn start
```

## Compiles and minifies for production

```bash
npm run build or yarn build
```

## Test

```bash
npm run test or yarn test
```

## Node Version

```bash
v16.14.2
```

## Project 

```
├── public  → index.html
│
└── src   → Frontend Code(React)
     │
     ├──── assets → images, icons
     │ 
     ├──── components → number-input, button, loading, scroll-to-top
     │
     ├──── constans → app-paths, percent
     │
     ├──── hooks → useLessThenHalf, useTimer
     │
     ├──── pages → ready(게임 준비 화면), play(게임 화면), result(결과화면), ranking(순위화면)
     │
     ├──── router → 1.React Router HashRouter 방식, 2. Suspense, lazy 를 활용한 Page Loading 처리
     │
     ├──── stores → play , ready
     │
     ├──── styles(SASS)
     │      │
     │      ├─────── components → 컴포넌트 공통 스타일
     │      │                
     │      ├─────── pages → page style code
     │      │                
     │      ├─────── _common → 공통 스타일 
     │      │                
     │      └───────_variables → 공통 스타일 사용을 위한 변수 선언 
     │
     ├──── tests → utils / custom hooks test case 
     │
     └──── utils → cookie, format-date, string
```

## 요구사항 및 해결전략  

### 1. 준비 화면 (src > pages > ready)  
→  index.tsx : 페이지를 표시 하기 위한 html rendering   
→  useReady.ts : 준비 화면 에서 필요한 함수들을 custom hook을 통해 작성  

- 두더지 굴을 표시 하기 위한 열과 행을 입력 받고, 출현할 두더지의 갯수를 입력 받은 후 시작버튼 클릭시 게임페이지로 이동  

  - 행 , 열, 두더지의 갯수, 두더지가 등장할 구멍의 갯수등을 store에 state로 생성하였습니다. 그 이유는 게임 준비 화면에서 게임 화면으로 이동하였다가, 다시 게임 준비 화면으로 돌아 왔을때, 또는 게임을 마치고 종료 된 뒤에도 다시 게임화면으로 돌아 왔을때도 사용자가 입력 하였던, 행, 열, 두더지의 갯수가 유지 되어야 하며, 두더지가 등장할 구멍의 갯수 또한 게임 준비 화면에서 사용이 가능해야 하기 때문입니다.

    ```jsx
    // store > ready > slice
    export const ReadySlice: StateCreator<ReadyStateSlice> = set => ({
      ...INITIAL_STATE,

      mutateRowState: (row: number) => {
  	    set(() => ({ row }));
      },
      // ...  
    });
    ```

    ```jsx
    // useReady.ts
    const onChangeRow = useCallback((value: number) => {
      mutateRowState(value);
      // ... 
    },[mutateRowState]);
    ```

  - 행과 열이 바뀔때 등장할 수 있는 두더지의 갯수가 달라지므로 useLessThenHalf 라는 custom hook을 통해 행과 열이 변화할때마다 최대 설정 가능한 두더지의 값이 바뀔 수 있도록 처리 하였습니다.

    ```jsx
    // hooks > useLessThenHalf.ts
    const useLessThenHalf = (props: UseLessThenHalfProps) => {
      const { row, col } = props;
	  const [half, setHalf] = useState<number>(1);

	  useEffect(() => {
	    const divide = (row * col) / 2;
	    const value = Number.isInteger(divide) === true ? divide - 1 : Math.floor(divide);
	    setHalf(value);
	  }, [row, col]);

	  return half;
    };
    ```
---
### 2. 게임 화면 (src > pages > play)
→ index.tsx : 페이지를 표시 하기 위한 html rendering   
→ usePlay.ts : 게임 화면 에서 필요한 함수들을 custom hook을 통해 작성  
→ hole-event folder : 두더지가 나타나거나 / 사라질때 필요한 event에 대한 함수 작성  

- 입력된 행과 열의 숫자만큼 두더지 굴을 화면에 배치(일정시간 간격으로 나타났다 사라짐, 클릭시 두더지 숨김, 애니메이션 효과적용, 변칙요소 적용)  
화면 상단에는 남은 시간과 점수를 배치(게임 시간 60초, 두더지 1마리 -> score +1 / 폭탄 1개 -> score -1), 0초가 되면 결과 화면으로 이동
화면 하단 버튼 (시작하기, 일시정지, 그만하기, 재개하기)   
  - store에 정의된 holes state를 통해 게임 준비 화면에서 입력받은 행과 열을 개산하여 화면에 rendering 하였습니다. 게임 시작 버튼을
  클릭하면 useTimer hooks의 start 함수를 통해 60초 동안 매 1초 마다 handleRendomHole 함수를 실행합니다.
  handleRendomHole 함수는 구멍해서 두더지가 나타날지 또는 폭탄이 나타날지에 대한 실행 여부를 제어 하며, levelTime으로 정의된
  시간이 지날때 마다 두더지의 등장 시간이 짧아집니다. 두더지가 나타났을때 두더지를 클릭한 경우, 점수에 1점을 더하고, 폭탄을 클릭할 경우
  기존 점수에서 1점을 빼는데, 이때 store에 정의된 score state에  mutateScoreStateIncrease, mutateScoreStateDecrease action 함수를 통해 스토어의 score 값을 dispatch 합니다.

    ```jsx
    // pages > usePlay.ts
    const handleRendomHole = useCallback(() => {  
	  const eventHoleList = holes.flat().slice();
      let moleNumber = 0;
      while (moleNumber < mole) {
        const selectMoleIndex = Math.floor(Math.random() * eventHoleList.length);
        eventHoleList.splice(selectMoleIndex, 1, selectMoleIndex);
        moleNumber += 1;
      }

      visibleHoleEvent(
        eventHoleList,
        levelTime,
        holesAreaElementRef.current,
        holesEventListRef.current,
        handleHolesEventList
      )
    }, [mole, holes, levelTime]);
    
    const { time, start, end, pouse } = useTimer(60, levelTime, handleRendomHole);
    
    //... 중략
    
    // 두더지 또는 폭탄 클릭시
    const handleButtonElement = useCallback(buttonRef: HTMLButtonElement | null) => {
      const buttonElementIndex = buttonRef?.id.replace('hole-button-', '');
      const moleElementClassList = buttonRef?.querySelector(`#mole-${buttonElementIndex}`)?.classList;
      const bombElementClassList = buttonRef?.querySelector(`#bomb-${buttonElementIndex}`)?.classList;
      
      // ...  중략

      if (buttonRef) {
        buttonRef.classList.add('active');
        // 두더지를 클릭한 경우 score + 1
        if (!moleElementClassList?.contains('hidden')) {
          mutateScoreStateIncrease();
          moleElementClassList?.add('hidden');
        }
        // 폭탄 클릭한 경우
        if (!bombElementClassList?.contains('hidden')) {
          // 만약 현재 score가 0 이라면, 게임을 종료하고 게임 결과 하면으로 이동
          if (score === 0) {
            handleGamveOver();
            return;
          }
          // 만약 현재 score가 0이 아니라면 score -1
          mutateScoreStateDecrease();
          bombElementClassList?.add('hidden');
        }
        buttonRef.setAttribute('disabled', '');
      }
      
      clearHoleEvent('button', holesEventListRef.current, holesAreaElementRef.current);

    }, [mutateScoreStateDecrease, score, handleGamveOver, mutateScoreStateIncrease]);
    
    useEffect(() => {
      // 시간이 지날때마다 폭탄 또는 두더지의 등장 타이밍을 빠르게 바꿔주는 변칙 요소 적용
      // 0 초가 되면 게임 종료 / 게임 결과 화면으로 이동 / 1초마다 반복되던 interval timer clear
      switch (time) {
        case 45:
          setLevelTime(1250);
          break;
        
        case 30:
          setLevelTime(1000);
          break;
      
        case 15:
          setLevelTime(500);
          break;

        case 0:
          handleGamveOver();
          break;
  
        default:
          break;
      }
    }, [time, end, navigate]);

    ```
---
### 3. 결과 화면 (src > pages > result)
→ index.tsx : 페이지를 표시 하기 위한 html rendering   
→ useResult.ts : 결과 화면 에서 필요한 함수들을 custom hook을 통해 작성  

- 두더지를 잡아 획득한 점수 보여주기, 다시하기 처음으로 버튼 추가
  - 획득한 점수는 store에 score state를 통해 값을 fetch 하고 화면에 표출 합니다. 다시 하기 버튼 클릭시 store에 저장된 score state를 0첨으로 초기화 하며, play 화면으로 이동합니다. 게임이 완료되기 이전 상태의 행과, 열, 두더지의 값 그대로 다시 게임이 시작되며, 처음으로 버튼 클릭시 게임 시작 화면으로 돌아갑니다. 또한 랭킹 버튼 클릭시 순위 화면으로 이동합니다. 랭킹 화면이 처음 rendering 되는 순간, 게임의 score가 1점 이상인 경우 cookie에 ranking이 저장 됩니다.

    ```jsx
    useEffect(() => {
      if (score > 0) {
        const ranking = getCookie('ranking');
        const parseRanking: Ranks[] = JSON.parse(ranking ?? '[]');
        const newRecords = { score, date: new Date().toISOString() };
      
        const equalDateTime = parseRanking.findIndex(prev => {
          const prevRankDate = formatDate(prev.date, 'YYYYMMDDHHmm');
          const newRecordDate = formatDate(newRecords.date, 'YYYYMMDDHHmm');
          const prevRankScore = prev.score;
          const newRecordScore = newRecords.score;
            return prevRankDate === newRecordDate && prevRankScore === newRecordScore
        });

        if (equalDateTime === -1) parseRanking.push(newRecords);

        parseRanking
          .sort((a, b) => {
            const rules = b.score - a.score;
            if (rules > 0) {
              return 1;
            }
            if (rules === 0) {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            }
            return -1;
          })
        .slice(0, 10);
      
        setCookie('ranking', JSON.stringify(rankList), 30);
      }
    } , [score]);
    ```

---
### 4. 순위 화면 (src > pages > ranking)
→ index.tsx : 페이지를 표시 하기 위한 html rendering   
→ useRanking.ts : 순위 화면 에서 필요한 함수들을 custom hook을 통해 작성  
-  게임 결과에 따른 순위를 제공하고, 게임의 점수를 기준으로 정렬하며 일시와 함꼐 화면에 표출, 순위는 최대 열개 까지만 노출, 순위를 초기화 하는 기능을 제공  
    - 쿠키에 저장된 ranking에 접근 하여, 저장된 ranking을 화면에 표출하고, 순위를 초기화 하는 함수를 제공

      ```jsx
      const useRanking = () => {
        const navigate = useNavigate();
        const [ranking, setRanking] = useState<Ranks[]>([]);

        const onClickResetRanking = useCallback(() => {
          setRanking([]);
          deleteCookie('ranking');
      }, []);

      // ...
      
        useEffect(() => {
          const getRanking = getCookie('ranking');
          if (getRanking) {
            const rankList: Ranks[] = JSON.parse(getRanking);
            setRanking(rankList);
          }
        }, []);
      
        return {
          ranking,
          onClickResetRanking,
          onClickGameStart
        };
      };
      ```




## 추가한 라이브러리

```
1. react-router-dom
2. sass (mark-up을 위함)
3. zustand (확장 가능한 store 사용을 위함)
4. stylelint (scss 코드 컨벤션 유지와/ 코드 스타일 일관성 유지를 위함)
5. prettier (코드 스타일 일관성 유지를 위함)
6. eslint (코드 컨벤션 체크를 위함)
```

## Copyright icon

<div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
<div>Icons made by <a href="" title="Adib Sulthon">Adib Sulthon</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>  
  
## Copyright background image

```
leehy77629@gmail.com
```