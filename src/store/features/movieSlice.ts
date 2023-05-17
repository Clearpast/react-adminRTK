import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { increment } from './counterSlice';

export interface MovieState {
  list:Array<any>;
  totals: number,
}
const initialState: MovieState = {
  list: [],
  totals: 0
};

// 请求电影列表
const getMovieListApi = ()=> 
  fetch(
    'https://pcw-api.iqiyi.com/search/recommend/list?channel_id=1&data_type=1&mode=24&page_id=1&ret_num=48'
  ).then(res => res.json())

// thunk函数允许执行异步逻辑, 通常用于发出异步请求。
// createAsyncThunk 创建一个异步action，方法触发的时候会有三种状态：
// pending（进行中）、fulfilled（成功）、rejected（失败）
// createAsyncThunk:第一个参数用作生成的 action 类型的前缀的字符串 
// 例：type(pin):"movie/getMovie/fulfilled"（fulfilled指的是哪一种状态，此处是成功。）
export const getMovieData = createAsyncThunk( 'movie/getMovie', //第一个参数是actionType,自定义规则：createSlice==>name 例：movie/getmovie
  async () => {
    const res= await getMovieListApi();
    return res;
  }
);
// 创建一个 Slice 
export const movieSlice = createSlice({
  name: 'movie',
  initialState,
  // Reducer 函数不能执行异步代码，它们可以执行代码并更新状态，
  reducers: {
    // 数据请求完触发
    // 同步方法
    loadDataEnd: (state, {payload}) => {
        // console.log(payload,'>>>>>>>');
      // state.list = payload;
      // state.totals = payload.length;
      state.totals++
    },
    // 异步方法不能写在reducers里面
    // testAwait:(state)=>{
    //   setTimeout(() => {
    //     state.totals++
    //     console.log('我是异步方法');
    //   }, 1000);
    // }
  },
  // extraReducers 方法让 slice 处理在别处定义的 actions， 
  // 包括由 createAsyncThunk 或其他slice生成的actions。
  // 异步方法
  extraReducers(builder) {
    builder
    .addCase(increment, (state, {payload})=>{ //使用别的文件的方法increment
      // increment方法触发时的处理
      // state.list.push(payload.value)
      state.totals = state.list.length
    })
    .addCase(getMovieData.pending, (state) => {
      console.log("🚀 ~ 进行中！")
    })
    .addCase(getMovieData.fulfilled, (state, {payload}) => {
      console.log("🚀 ~ fulfilled", payload);
      state.list = payload.data.list
      state.totals = payload.data.list.length
    })
    .addCase(getMovieData.rejected, (state, err) => {
      console.log("🚀 ~ rejected", err)
    });
  },
});
// 导出方法(同步方法)
export const { loadDataEnd } = movieSlice.actions;

// 默认导出
export default movieSlice.reducer;
