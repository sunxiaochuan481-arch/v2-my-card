// 首页
import RevealImage from '../components/Media/RevealImage';
import './Home.css';

const avatarImage = '/avatar/avatar.png';

function Home() {
  return (
    <div className="home-page">
      <div className="home-avatar-container" aria-label="个人头像">
        <RevealImage
          src={avatarImage}
          alt="个人头像"
          className="home-avatar-placeholder"
        />
      </div>
    </div>
  );
}

export default Home;
