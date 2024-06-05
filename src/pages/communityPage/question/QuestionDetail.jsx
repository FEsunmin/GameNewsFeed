import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchQuestionInfo } from './../../../redux/slices/questionInfoSlice';
import {
  StBox,
  StBoxSection,
  StBoxTop,
  StContent,
  StImg,
  StInfo,
  StLiked,
  StLikedBox,
  StLine
} from '../../../styles/CommunityMainStyles';
import { StButton, StCommentBox, StForm, StTextarea } from '../../../styles/ReviewDetailStyles';
import './../../../styles/Loading.css';
import ReviewComment from '../../../components/community/ReviewComment';

const QuestionDetail = () => {
  const dispatch = useDispatch();

  const param = useParams();

  const { questionInfo, status, error } = useSelector((state) => state.questionInfo);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchQuestionInfo());
  }, [status, dispatch]);

  if (status === 'loading')
    return (
      <StBoxSection>
        <div className="loader"></div>
      </StBoxSection>
    );
  if (status === 'failed') console.log('에러: ', error);

  const filteredData = questionInfo.find((info) => info.id === parseInt(param.id));

  return (
    <StBox $detail={true}>
      <StBoxTop>
        <StImg src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_1280.jpg" alt="" />
        <StInfo>
          <p>{filteredData.game_name}</p>
          <p>{filteredData.title}</p>
          <p>{filteredData.user_name}</p>
        </StInfo>
        <StLikedBox $detail={true}>
          {/* <p>(좋아요 아이콘)</p> */}
          <StLiked src="../../../../src/images/liked.png" alt="" />
          <p>66</p>
        </StLikedBox>
      </StBoxTop>
      <StContent $detail={true}>{filteredData.content}</StContent>
      <StLine>
        <p>(댓글 개수)</p>
        <p>(댓글 아이콘)</p>
      </StLine>
      <StCommentBox>
        <StForm>
          <div>
            <label htmlFor="name">
              이름: <input type="text" id="name" name="username" />
            </label>
            <StTextarea name="comment"></StTextarea>
          </div>
          <StButton type="submit">작성</StButton>
        </StForm>
        <ReviewComment />
      </StCommentBox>
    </StBox>
  );
};

export default QuestionDetail;
