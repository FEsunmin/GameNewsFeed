import { useContext } from 'react';
import { UserContext } from '../api/UserProvider';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useDetailHandler = (addComment) => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddHandler = (e) => {
    if (user) {
      e.preventDefault();

      const data = new FormData(e.target);
      const username = user.user_metadata.username;
      const comment = data.get('comment');

      if (!comment.trim())
        return Swal.fire({
          title: 'Failed',
          text: `내용을 입력해주세요.`,
          icon: 'Failed'
        });
      else {
        const newReviewComment = { username, comment };
        dispatch(addComment(newReviewComment));
        Swal.fire({
          title: 'Good Job!',
          text: `리뷰가 등록되었습니다!`,
          icon: 'success'
        });
      }
    } else {
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

  return { onAddHandler };
};

export default useDetailHandler;
