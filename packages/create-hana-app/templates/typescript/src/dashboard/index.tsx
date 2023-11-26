import { useNavigate } from '@hanabira/router';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>This content can be found in pages/dashboard/index.tsx</p>

      <button onClick={() => navigate('/')}>
        Navigate to index
      </button>
    </div>
  );
};

export default Dashboard;
