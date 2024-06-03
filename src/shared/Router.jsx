import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Home from './../pages/mainPage/Home';
import StoreMain from './../pages/storePage/StoreMain';
import CommunityMain from './../pages/communityPage/CommunityMain';
import Review from './../pages/communityPage/review/Review';
import ReviewDetail from './../pages/communityPage/review/ReviewDetail';
import Strategy from './../pages/communityPage/strategy/Strategy';
import StrategyDetail from './../pages/communityPage/strategy/StrategyDetail';
import Question from './../pages/communityPage/question/Question';
import QuestionDetail from './../pages/communityPage/question/QuestionDetail';
import Recruit from './../pages/communityPage/recruit/Recruit';
import RecruitDetail from './../pages/communityPage/recruit/RecruitDetail';
import Chat from './../pages/communityPage/chat/Chat';
import ChatDetail from './../pages/communityPage/chat/ChatDetail';
import MyMain from './../pages/myPage/MyMain';

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* 홈 페이지(메인 페이지) 경로 설정 */}
          <Route path="/" element={<Home />} />

          {/* 스토어 페이지 경로 설정 */}
          <Route path="/store" element={<StoreMain />} />

          {/* 커뮤니티 페이지 경로 설정 */}
          <Route path="/community" element={<CommunityMain />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<ReviewDetail />} />
          <Route path="/strategy" element={<Strategy />} />
          <Route path="/strategy/:id" element={<StrategyDetail />} />
          <Route path="/question" element={<Question />} />
          <Route path="/question/:id" element={<QuestionDetail />} />
          <Route path="/recruit" element={<Recruit />} />
          <Route path="/recruit/:id" element={<RecruitDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:id" element={<ChatDetail />} />

          {/* 마이페이지 경로 설정 */}
          <Route path="/my" element={<MyMain />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;