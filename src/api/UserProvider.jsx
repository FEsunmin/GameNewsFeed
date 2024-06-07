import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../shared/supabaseClient';
import Swal from 'sweetalert2';

// Context 생성
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  const userDataUserName = async () => {
    const user_id = await getId();
    const { data: UsersData, error: UsersError } = await supabase
      .from('Users')
      .select('user_name')
      .eq('user_id', user_id)
      .single();

    if (UsersError) {
      throw UsersError;
    }
    return UsersData.user_name;
  };
  // const userName = await userDataUserName();

  // 로그인, 로그아웃 추적
  useEffect(() => {
    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // 로그인
  const signInUser = async (email, password) => {
    const { user, data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      Swal.fire({
        title: 'Failed',
        text: '로그인 실패하였습니다. 아이디와 비밀번호를 확인해주세요.',
        icon: 'Failed'
      });
    } else if (data) {
      const userName = await userDataUserName(); // 이 부분은 로그인 성공 후 실행됩니다.
      Swal.fire({
        title: 'Good job!',
        text: `${userName}님 Today's playground에 오신 걸 환영합니다!`,
        icon: 'success'
      });
      navigate('/');
    }
  };

  // 로그아웃
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      navigate('/');
    } else {
      Swal.fire({
        title: 'Failed',
        text: `로그아웃 실패하였습니다. ${error.message}`,
        icon: 'Failed'
      });
    }
    Swal.fire({
      title: 'Good job!',
      text: `로그아웃되었습니다.`,
      icon: 'success'
    });
  };

  return <UserContext.Provider value={{ user, signInUser, signOutUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
