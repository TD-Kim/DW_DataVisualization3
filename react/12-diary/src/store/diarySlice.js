import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addDatas, deleteDatas, getDatas, updateDatas } from '../api/firebase';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    items: [],
    error: null,
    status: 'welcome',
  },
  reducers: {},
  extraReducers: (builder) => {
    // 비동기작업은 actionCreator 를 자동으로 만들어주지 못한다.
    builder
      .addCase(fetchItems.pending, (state, action) => {
        console.log(action);
        state.status = 'Loading';
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        console.log(action);
        state.items = action.payload;
        state.status = 'complete';
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'fail';
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = 'complete';
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        // state.items = state.items.map(item => {
        //   item.id === action.payload.id ? action.payload : item
        // })
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );
        state.items[index] = action.payload;
        state.status = 'complete';
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.docId !== action.payload
        );
      });
  },
});

const fetchItems = createAsyncThunk(
  'items/fetchAllItems',
  async ({ collectionName, queryOptions }) => {
    try {
      const resultData = await getDatas(collectionName, queryOptions);
      return resultData;
    } catch (error) {
      console.log('FETCH Error: ', error);
    }
  }
);

const addItem = createAsyncThunk(
  'items/addItem',
  async ({ collectionName, addObj }) => {
    try {
      const resultData = await addDatas(collectionName, addObj);
      return resultData;
    } catch (error) {
      console.log('ADD Error: ', error);
    }
  }
);

const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ collectionName, docId, updateObj }) => {
    try {
      const resultData = await updateDatas(collectionName, docId, updateObj);
      return resultData;
    } catch (error) {
      console.log('UPDATE Error: ', error);
    }
  }
);

const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ collectionName, docId }) => {
    try {
      const resultData = await deleteDatas(collectionName, docId);
      return docId;
    } catch (error) {
      console.log('DELETE Error: ', error);
    }
  }
);

export default diarySlice;
export { fetchItems, addItem, updateItem, deleteItem };
