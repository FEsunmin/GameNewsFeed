// 회원가입을 누르면 이 창으로 이동

import React from 'react';
import '../../styles/SignUpCss.css';
import styled from 'styled-components';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import githubLogo from '../../images/github.png';
import supabase from '../../shared/supabaseClient';
import Swal from 'sweetalert2';

const SignUpInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 120px;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem;
  label {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
  span {
    display: flex;
    align-items: center;
  }
`;

const SignUp = () => {
  // 회원가입에만 쓰는 용도
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [username, setUserName] = useState('');

  const navigate = useNavigate();

  //이메일 회원가입
  const signUpNewUser = async () => {
    if (!email || !password || !pwCheck || !username) {
      Swal.fire({
        title: 'Failed',
        text: `내용을 모두 기입해주세요.`,
        icon: 'Failed'
      });
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username
        }
      }
    });

    const user_id = await getId();

    if (data) {
      const { data: insertData, error: insertError } = await supabase
        .from('Users')
        .insert([{ user_id, user_email: email, user_name: username }]);
      await Swal.fire({
        title: 'Good Job!',
        text: `${username}님 Today's Playground의 가입을 축하합니다! 이메일을 인증해주세요!`,
        icon: 'success'
      });
    }

    if (error) {
      return await (<h1>Error!</h1>);
    }
    navigate('/');
  };

  const getId = async () => {
    const {
      data: {
        session: {
          user: { id }
        }
      },
      error
    } = await supabase.auth.getSession();
    return id;
  };

  // 깃헙 회원가입
  const signInWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        data: {
          username
        }
      }
    });
    if (data) {
      return await Swal.fire({
        title: 'Good Job!',
        text: `${data.user.user_metadata.username}님 Today's Playground의 가입을 축하합니다!`,
        icon: 'success'
      });
    }
    if (error) {
      return await (<h1>Error!</h1>);
    }

    navigate('/');
  };

  // 비밀번호 확인
  const isPWSame = (password, pwCheck) => {
    return password === pwCheck;
  };

  return (
    <div className="sign-up-layout">
      <div className="sign-up-contain">
        {/* 로고 가져오기 */}
        <div className="switch-to-login">
          <span>회원가입</span>
          <span>
            이미 Today's Playground 의 회원이신가요?{' '}
            <Link to="/login" style={{ fontWeight: 'bold' }}>
              로그인
            </Link>
          </span>
        </div>
        <SignUpInputGroup>
          <label htmlFor="email">이메일</label>
          <input
            id="email"
            name="id"
            type="text"
            placeholder="인증받을 수 있는 이메일을 입력해주세요."
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </SignUpInputGroup>
        <SignUpInputGroup>
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="비밀번호는 6자리 이상 입력해주세요."
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          {/* 보안 관련 설정 수정하기 */}
          {/* 이거저거 섞는 법 알아보기 */}
        </SignUpInputGroup>
        <SignUpInputGroup>
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <input
            id="passwordCheck"
            name="password"
            type="password"
            placeholder="비밀번호 확인"
            value={pwCheck}
            onChange={(event) => setPwCheck(event.target.value)}
            required
          />
          {isPWSame(password, pwCheck) ? '' : <span className="password-isnt-same">비밀번호가 다릅니다.</span>}
        </SignUpInputGroup>
        <SignUpInputGroup>
          <label htmlFor="username">닉네임</label>
          <input
            id="username"
            type="text"
            placeholder="닉네임"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </SignUpInputGroup>
        <div>
          <div className="social-account">소셜 계정으로 로그인하기</div>
          <img src={githubLogo} alt="" onClick={signInWithGithub} className="githubLogo" />
        </div>
        <div>약관</div>
        <div className="terms-contain">
          제 1 조 (목적)이 약관은 `{`Today’s Playground`}`(이하 "사이트"라 합니다)에서 제공하는 인터넷서비스(이하
          "서비스"라 합니다)의 이용 조건 및 절차에 관한 기본적인 사항을 규정함을 목적으로 합니다. 제 2 조 (약관의 효력
          및 변경)① 이 약관은 서비스 화면이나 기타의 방법으로 이용고객에게 공지함으로써 효력을 발생합니다.② 사이트는 이
          약관의 내용을 변경할 수 있으며, 변경된 약관은 제1항과 같은 방법으로 공지 또는 통지함으로써 효력을 발생합니다.
          제 3 조 (용어의 정의)이 약관에서 사용하는 용어의 정의는 다음과 같습니다.① 회원 : 사이트와 서비스 이용계약을
          체결하거나 이용자 아이디(ID)를 부여받은 개인 또는 단체를 말합니다.② 신청자 : 회원가입을 신청하는 개인 또는
          단체를 말합니다.③ 아이디(ID) : 회원의 식별과 서비스 이용을 위하여 회원이 정하고 사이트가 승인하는 문자와
          숫자의 조합을 말합니다.④ 비밀번호 : 회원이 부여 받은 아이디(ID)와 일치된 회원임을 확인하고, 회원 자신의 비밀을
          보호하기 위하여 회원이 정한 문자와 숫자의 조합을 말합니다.⑤ 해지 : 사이트 또는 회원이 서비스 이용계약을
          취소하는 것을 말합니다. 제 2 장 서비스 이용계약 제 4 조 (이용계약의 성립)① 이용약관 하단의 동의 버튼을 누르면
          이 약관에 동의하는 것으로 간주됩니다.② 이용계약은 서비스 이용희망자의 이용약관 동의 후 이용 신청에 대하여
          사이트가 승낙함으로써 성립합니다. 제 5 조 (이용신청)① 신청자가 본 서비스를 이용하기 위해서는 사이트 소정의
          가입신청 양식에서 요구하는 이용자 정보를 기록하여 제출해야 합니다.② 가입신청 양식에 기재하는 모든 이용자
          정보는 모두 실제 데이터인 것으로 간주됩니다. 실명이나 실제 정보를 입력하지 않은 사용자는 법적인 보호를 받을 수
          없으며, 서비스의 제한을 받을 수 있습니다. 제 6 조 (이용신청의 승낙)① 사이트는 신청자에 대하여 제2항, 제3항의
          경우를 예외로 하여 서비스 이용신청을 승낙합니다.② 사이트는 다음에 해당하는 경우에 그 신청에 대한 승낙
          제한사유가 해소될 때까지 승낙을 유보할 수 있습니다.가. 서비스 관련 설비에 여유가 없는 경우나. 기술상 지장이
          있는 경우다. 기타 사이트가 필요하다고 인정되는 경우③ 사이트는 신청자가 다음에 해당하는 경우에는 승낙을 거부할
          수 있습니다.가. 다른 개인(사이트)의 명의를 사용하여 신청한 경우나. 이용자 정보를 허위로 기재하여 신청한
          경우다. 사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우라. 기타 사이트 소정의 이용신청요건을
          충족하지 못하는 경우 제 7 조 (이용자정보의 변경)회원은 이용 신청시에 기재했던 회원정보가 변경되었을 경우에는,
          온라인으로 수정하여야 하며 변경하지 않음으로 인하여 발생되는 모든 문제의 책임은 회원에게 있습니다. 제 3 장
          계약 당사자의 의무 제 8 조 (사이트의 의무)① 사이트는 서비스 제공과 관련하여 취득한 회원의 개인정보를 회원의
          동의없이 타인에게 누설, 공개 또는 배포할 수 없으며, 서비스관련 업무 이외의 상업적 목적으로 사용할 수 없습니다.
          단, 다음 각 호의 1에 해당하는 경우는 예외입니다.가. 전기통신기본법 등 법률의 규정에 의해 국가기관의 요구가
          있는 경우나. 범죄에 대한 수사상의 목적이 있거나 정보통신윤리 위원회의 요청이 있는 경우다. 기타 관계법령에서
          정한 절차에 따른 요청이 있는 경우 제 9 조 (회원의 의무)① 회원은 서비스 이용 시 다음 각 호의 행위를 하지 않아야
          합니다.가. 다른 회원의 ID를 부정하게 사용하는 행위나. 서비스에서 얻은 정보를 사이트의 사전승낙 없이 회원의
          이용 이외의 목적으로 복제하거나 이를 변경, 출판 및 방송 등에 사용하거나 타인에게 제공하는 행위다. 사이트의
          저작권, 타인의 저작권 등 기타 권리를 침해하는 행위라. 공공질서 및 미풍양속에 위반되는 내용의 정보, 문장, 도형
          등을 타인에게 유포하는 행위마. 범죄와 결부된다고 객관적으로 판단되는 행위바. 기타 관계법령에 위배되는 행위②
          회원은 관계법령, 이 약관에서 규정하는 사항, 서비스 이용 안내 및 주의 사항을 준수하여야 합니다.③ 회원은
          내용별로 사이트가 서비스 공지사항에 게시하거나 별도로 공지한 이용 제한 사항을 준수하여야 합니다. 제 4 장
          서비스 제공 및 이용 제 10 조 (회원 아이디(ID)와 비밀번호 관리에 대한 회원의 의무)① 아이디(ID)와 비밀번호에
          대한 모든 관리는 회원에게 책임이 있습니다. 회원에게 부여된 아이디(ID)와 비밀번호의 관리소홀, 부정사용에 의하여
          발생하는 모든 결과에 대한 전적인 책임은 회원에게 있습니다.② 자신의 아이디(ID)가 부정하게 사용된 경우 또는 기타
          보안 위반에 대하여, 회원은 반드시 사이트에 그 사실을 통보해야 합니다. 제 11 조 (서비스 제한 및 정지)① 사이트는
          이력서 포트폴리오 전시물으로써 서비스의 전부 또는 일부를 잠정적으로 제한하거나 정지할 수 있습니다. 제5장
          손해배상 제 12 조 (면책조항)① 사이트는 회원이 서비스 제공으로부터 기대되는 이익을 얻지 못하였거나 서비스
          자료에 대한 취사선택 또는 이용으로 발생하는 손해 등에 대해서는 책임이 면제됩니다.② 사이트는 회원의 귀책사유나
          제3자의 고의로 인하여 서비스에 장애가 발생하거나 회원의 데이터가 훼손된 경우에 책임이 면제됩니다.③ 사이트는
          회원이 게시 또는 전송한 자료의 내용에 대해서는 책임이 면제됩니다.④ 상표권이 있는 도메인의 경우, 이로 인해
          발생할 수도 있는 손해나 배상에 대한 책임은 구매한 회원 당사자에게 있으며, 사이트는 이에 대한 일체의 책임을
          지지 않습니다. 제 13 조 (관할법원) 서비스와 관련하여 사이트와 회원간에 분쟁이 발생할 경우 사이트의 본사
          소재지를 관할하는 법원을 관할법원으로 합니다. [부칙] (시행일) 이 약관은 2024년 06월부터 시행합니다.
        </div>
        <button className="signup-button" onClick={signUpNewUser}>
          회원가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
