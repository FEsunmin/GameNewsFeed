import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../api/UserProvider';
import axios from 'axios';
import { Search, SearchContainer, StFooter, StHeader } from '../styles/LayoutStyles';
import { useDispatch } from 'react-redux';
import { setSearchInput, setSearchResults } from '../redux/slices/searchSlice';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Layout = ({ children }) => {
  const { user, signOutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchInput } = useSelector((state) => state.search);

  const onClicktoLogin = () => {
    Swal.fire({
      title: 'Failed',
      text: `로그인 후 이용해주세요`,
      icon: 'Failed'
    });
    navigate('/login');
  };

  const getValue = (e) => {
    dispatch(setSearchInput(e.target.value.toLowerCase()));
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=cb6e513d181149ba97231f7307069426&search=${searchInput}`
      );
      dispatch(setSearchResults(response.data.results));

      const filteredResults = response.data.results.filter((game) => game.name.toLowerCase().includes(searchInput));
      dispatch(setSearchResults(filteredResults));
      dispatch(setSearchInput(''));
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  return (
    <>
      <StHeader>
        <Link to="/">👾 Today's Playground 🎮</Link>
        <div className="section">
          <Link to="/" className="store-name">
            Store
          </Link>
          <Link to="/community" className="community-name">
            Community
          </Link>
          {user ? (
            <Link to="/my" className="mypage-name">
              Mypage
            </Link>
          ) : (
            <div onClick={onClicktoLogin} className="mypage-name">
              MyPage
            </div>
          )}
        </div>
        <div className="login">
          <SearchContainer>
            <Search placeholder="검색" value={searchInput} onChange={getValue} onKeyPress={handleKeyPress} />
            <img
              src="https://www.freeiconspng.com/uploads/search-icon-png-21.png"
              alt="searchIcon"
              onClick={handleSearchSubmit}
            />
          </SearchContainer>
          {user ? (
            <div className="logout-name" onClick={signOutUser}>
              로그아웃
            </div>
          ) : (
            <Link to="/login" className="login-name">
              로그인
            </Link>
          )}
          <div> |</div>
          {user ? (
            <span className="login-name" onClick={() => navigate('/my')}>
              {user.user_metadata.username} 님
            </span>
          ) : (
            <Link to="/signup" className="signup-name">
              회원가입
            </Link>
          )}
        </div>
      </StHeader>
      {children}
      <StFooter>
        <div>팀스파르타주식회사 내일배움캠프</div>
        <div>
          <span>5늘만놀조(A05조) </span>
          <span> 김선민 김현진 최혜미 홍성빈</span>
        </div>
      </StFooter>
    </>
  );
};

export default Layout;
