import ReviewFormat from '../../../components/community/ReviewFormat';
import { StH3 } from '../../../styles/CommunityMainStyles';
import { StButton, StInput, StReviewBox, StSection, StTextarea } from '../../../styles/ReviewStyles';
import { useDispatch } from 'react-redux';
import { addReviewInfo } from '../../../redux/slices/reviewInfoSlice';
import { useContext } from 'react';
import { UserContext } from '../../../api/UserProvider';
import CommunityLayout from '../../../shared/CommunityLayout';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Review = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddHandler = (e) => {
    if (user) {
      e.preventDefault();

      const data = new FormData(e.target);
      const gamename = data.get('gamename');
      const starscore = +data.get('starscore');
      const content = data.get('content');
      const username = user.user_metadata.username;

      if (!gamename.trim())
        return Swal.fire({
          title: 'Failed',
          text: `게임 이름을 입력해주세요.`,
          icon: 'Failed'
        });
      else if (!starscore)
        return Swal.fire({
          title: 'Failed',
          text: `별점을 입력해주세요.`,
          icon: 'Failed'
        });
      else if (starscore < 1 || starscore > 5)
        return Swal.fire({
          title: 'Failed',
          text: `별점은 1점 이상 5점 이하의 숫자여야 합니다.`,
          icon: 'Failed'
        });
      else if (!content.trim())
        return Swal.fire({
          title: 'Failed',
          text: `내용을 입력해주세요.`,
          icon: 'Failed'
        });
      else {
        const newReviewInfo = { gamename, starscore, content, username };
        dispatch(addReviewInfo(newReviewInfo));
        Swal.fire({
          title: 'Good Job!',
          text: `리뷰가 등록되었습니다!`,
          icon: 'success'
        });
      }
    } else {
      e.preventDefault();
      Swal.fire({
        title: 'Failed',
        text: `로그인 후 이용해주세요.`,
        icon: 'Failed'
      });
      navigate('/login');
      return;
    }

    e.target.reset();
  };

  return (
    <CommunityLayout>
      <StSection>
        <StH3>리뷰 작성하기📝</StH3>
        <StReviewBox onSubmit={onAddHandler}>
          <label htmlFor="gamename">
            게임 이름&ensp;
            <StInput $width="300px" type="text" id="gamename" name="gamename" />
          </label>
          <label htmlFor="starscore">
            별점&ensp;
            <StInput $width="100px" type="number" id="starscore" name="starscore" min="1" max="5" step="0.1" />
          </label>
          <label htmlFor="content">
            <br />
            <StTextarea id="content" name="content"></StTextarea>
          </label>
          <StButton type="submit">작성</StButton>
        </StReviewBox>
      </StSection>
      <ReviewFormat isSliced={false} $isMain={false} $detail={true} $show={true} />
    </CommunityLayout>
  );
};

export default Review;
