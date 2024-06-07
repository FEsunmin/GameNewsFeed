import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { UserContext } from '../api/UserProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const useHandler = ($show, deleteInfo, updateInfo, textareaRefs) => {
  const { user } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onToggleHandler = (e) => {
    if ($show) e.stopPropagation();
  };

  const onDeleteHandler = (e, id) => {
    e.stopPropagation();
    if (!user) {
      Swal.fire({
        title: 'Failed',
        text: `로그인 후 이용해주세요!`,
        icon: 'Failed'
      });
      navigate('/login');
      return;
    } else {
      let isRightUser = false;
      textareaRefs.current.forEach((ref) => {
        if (user.user_metadata.username === ref.name && ref.id == id) {
          isRightUser = true;
        }
      });
      if (isRightUser === true) {
        const yes = Swal.fire({
          title: 'confirm',
          text: `정말 댓글을 삭제하시겠습니까?`,
          icon: 'confirm'
        });
        if (yes) {
          dispatch(deleteInfo({ id }));
          Swal.fire({
            title: 'Good Job!',
            text: `삭제가 완료되었습니다!`,
            icon: 'success'
          });
        }
      } else
        Swal.fire({
          title: 'Failed',
          text: `본인이 쓴 글만 삭제 할 수 있습니다.`,
          icon: 'Failed'
        });
    }
  };

  const onUpdateHandler = (e, id) => {
    e.stopPropagation();
    if (!user) {
      Swal.fire({
        title: 'Failed',
        text: `로그인 후 이용해주세요.`,
        icon: 'Failed'
      });
      navigate('/login');
      return;
    } else {
      let content = null;
      textareaRefs.current.forEach((ref) => {
        if (user.user_metadata.username === ref.name && ref.id == id) content = ref.value;
      });
      dispatch(updateInfo({ id, content }));
      if (content)
        Swal.fire({
          title: 'Good Job!',
          text: `수정이 완료되었습니다!`,
          icon: 'success'
        });
      else
        Swal.fire({
          title: 'Failed',
          text: `본인이 쓴 글만 수정할 수 있습니다.`,
          icon: 'Failed'
        });
    }
  };

  return { onToggleHandler, onDeleteHandler, onUpdateHandler };
};

export default useHandler;
