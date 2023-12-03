import { useNavigate } from '@hanabira/router';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Home</h1>
      <p>This content can be found in pages/index.tsx</p>

      <button onClick={() => navigate('/dashboard')}>
        Navigate to /dashboard
      </button>
    </div>
  );
};

export default Home;
