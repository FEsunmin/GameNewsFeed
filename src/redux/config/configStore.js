import { configureStore } from '@reduxjs/toolkit';
import reviewInfoSlice from '../slices/reviewInfoSlice';
import strategyInfoSlice from '../slices/strategyInfoSlice';
import questionInfoSlice from '../slices/questionInfoSlice';
import reviewCommentSlice from '../slices/reviewCommentSlice';
import strategyCommentSlice from '../slices/strategyCommentSlice';
import questionCommentSlice from '../slices/questionCommentSlice';

const store = configureStore({
  reducer: {
    reviewInfo: reviewInfoSlice,
    strategyInfo: strategyInfoSlice,
    questionInfo: questionInfoSlice,
    reviewComment: reviewCommentSlice,
    strategyComment: strategyCommentSlice,
    questionComment: questionCommentSlice
  }
});

export default store;
