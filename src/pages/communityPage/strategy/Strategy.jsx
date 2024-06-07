import { useDispatch } from 'react-redux';
import StrategyFormat from '../../../components/community/StrategyFormat';
import { addStrategyInfo } from '../../../redux/slices/strategyInfoSlice';
import { StH3 } from '../../../styles/CommunityMainStyles';
import { StInput, StSection, StReviewBox, StTextarea, StButton } from '../../../styles/ReviewStyles';
import { useContext } from 'react';
import { UserContext } from '../../../api/UserProvider';
import CommunityLayout from '../../../shared/CommunityLayout';
import { useNavigate } from 'react-router-dom';

const Strategy = () => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddHandler = (e) => {
    if (user) {
      e.preventDefault();

      const data = new FormData(e.target);
      const gamename = data.get('gamename');
      const title = data.get('title');
      const content = data.get('content');
      const username = user.user_metadata.username;

      if (!gamename.trim())
        return Swal.fire({
          title: 'Failed',
          text: `게임 이름을 입력해주세요.`,
          icon: 'Failed'
        });
      else if (!title.trim())
        return Swal.fire({
          title: 'Failed',
          text: `제목을 입력해주세요.`,
          icon: 'Failed'
        });
      else if (!content.trim())
        return Swal.fire({
          title: 'Failed',
          text: `별점을 입력해주세요.`,
          icon: 'Failed'
        });
      else {
        const newStrategyInfo = { gamename, title, username, content };
        dispatch(addStrategyInfo(newStrategyInfo));
        Swal.fire({
          title: 'Good Job!',
          text: `게임 공략법이 등록되었습니다!`,
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
    }

    e.target.reset();
  };

  return (
    <CommunityLayout>
      <StSection>
        <StH3>게임 공략법 작성하기📝</StH3>
        <StReviewBox onSubmit={onAddHandler}>
          <label htmlFor="gamename">
            게임 이름&ensp;
            <StInput $width="300px" type="text" id="gamename" name="gamename" />
          </label>
          <label htmlFor="title">
            제목&ensp;
            <StInput $width="300px" type="text" id="title" name="title" />
          </label>
          <label htmlFor="content">
            <br />
            <StTextarea id="content" name="content"></StTextarea>
          </label>
          <StButton type="submit">작성</StButton>
        </StReviewBox>
      </StSection>
      <StrategyFormat isSliced={false} path="strategy" $detail={true} $isMain={false} $show={true} />
    </CommunityLayout>
  );
};

export default Strategy;
