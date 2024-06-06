import { useNavigate } from 'react-router-dom';
import {
  StBox,
  StBoxTop,
  StImg,
  StInfo,
  StContent,
  StLine,
  StBoxSection,
  StCommentBox
} from './../../styles/CommunityMainStyles';
import { deleteReviewInfo, fetchReviewInfo, updateReviewInfo } from '../../redux/slices/reviewInfoSlice';
import './../../styles/Loading.css';
import useFetch from '../../hooks/useFetch';
import { StButtonBox, StTextarea } from '../../styles/ReviewFormatStyles';
import useHandler from '../../hooks/useHandler';
import { useContext, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Loading from '../../shared/Loading';
import { UserContext } from '../../api/UserProvider';
import { fetchReviewComment } from '../../redux/slices/reviewCommentSlice';

const ReviewFormat = ({ isSliced, $isMain, $detail, $show }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const textareaRefs = useRef([]);

  const data = useFetch('reviewInfo', fetchReviewInfo, isSliced);
  const { onToggleHandler, onDeleteHandler } = useHandler($show, deleteReviewInfo);

  const commentData = useFetch('reviewComment', fetchReviewComment);

  const onUpdateHandler = (e, id) => {
    e.stopPropagation();
    if (user) {
      let content = null;
      textareaRefs.current.forEach((ref) => {
        if (ref.id == id) content = ref.value;
      });
      dispatch(updateReviewInfo({ id, content }));
      alert('수정이 완료되었습니다.');
    } else {
      alert('로그인 후 이용해주세요!');
      navigate('/login');
      return;
    }
  };

  return (
    <StBoxSection $isMain={$isMain}>
      {data.length === 0 ? (
        <Loading />
      ) : (
        data.map((info, index) => (
          <StBox key={info.id} onClick={() => navigate(`/review/${info.id}`)}>
            <StBoxTop>
              <StImg src="https://cdn.pixabay.com/photo/2018/03/30/15/11/deer-3275594_1280.jpg" alt="" />
              <StInfo>
                <p>🎮 {info.game_name}</p>
                <p>⭐️ {info.star_score}</p>
                <p>{info.user_name}</p>
              </StInfo>
            </StBoxTop>
            <StContent $detail={$detail} onClick={onToggleHandler}>
              <StTextarea
                id={info.id}
                defaultValue={info.content}
                ref={(e) => (textareaRefs.current[index] = e)}
                $show={$show}
              ></StTextarea>
            </StContent>
            <StButtonBox $show={$show}>
              <button
                onClick={(e) => {
                  onUpdateHandler(e, info.id);
                }}
              >
                수정
              </button>
              <button
                onClick={(e) => {
                  onDeleteHandler(e, info.id);
                }}
              >
                삭제
              </button>
            </StButtonBox>
            <StLine>
              <div>
                <p>{info.created_at.split('T')[0]}</p>
              </div>
              <StCommentBox>
                <p>{commentData.length}</p>
                <p>(댓글 아이콘)</p>
              </StCommentBox>
            </StLine>
          </StBox>
        ))
      )}
    </StBoxSection>
  );
};

export default ReviewFormat;
