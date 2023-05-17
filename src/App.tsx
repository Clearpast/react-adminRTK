import React,{ useState,ChangeEvent } from 'react';
// import { Counter } from './features/counter/Counter';
// 引入相关的hooks
import { useSelector, useDispatch } from 'react-redux';
// 引入对应的方法
import { increment, decrement } from './store/features/counterSlice';
import { getMovieData,loadDataEnd } from './store/features/movieSlice';

import './App.css'
import { useColorMode,Button } from '@chakra-ui/react'
function App() {
  const {colorMode, toggleColorMode} = useColorMode();
   // 通过useSelector直接拿到counterSlice模块中store中定义的value
   const {value} = useSelector((store:any)=>store.counter)
    // 通过useSelector直接拿到movie模块中store中定义的list
  const {list} = useSelector((store:any)=>store.movie)
   // 通过useDispatch 派发事件
   const dispatch = useDispatch()
     // 变量
  // const [amount, setAmount] = useState(1);
  const [amount, setUsernameVal] = useState(1);
  const setAmountccc = (e:ChangeEvent<HTMLInputElement>)=>{
    // +e.target.value
    setUsernameVal(Number(e.target.value))
  }
// 同步方法测试
  const { totals } = useSelector((store:any)=>store.movie)
  return (
    <div className="App">
      <div>
      <Button onClick={toggleColorMode}>
			<p>{colorMode}</p>
   			 {/* {colorMode==='light' ? 'Dark' : 'Light'} */}
		</Button>
      </div>
      <header className="App-header">
        {/* <Counter /> */}
        <p>{value}</p>
        <p>movie：{totals}</p>
        {/* <input value={amount} onChange={(e) => setAmount(+e.target.value)}/> */}
        <input value={amount} onChange = {setAmountccc}/>
        <button onClick={()=>{dispatch(increment({value: amount}))}}>加</button>
        <button onClick={()=>{dispatch(decrement())}}>减</button>
        <button onClick={()=>{dispatch(getMovieData() as any)}}>获取数据</button>
        {/* movie模块 */}
        <button onClick={()=>{dispatch(loadDataEnd({}))}}>同步方法</button>
        <ul>
          {
            list.map((item:any)=>{ return <li key={item.tvId}> {item.name}</li> })
          }
        </ul>
      </header>
    </div>
  );
}

export default App;
