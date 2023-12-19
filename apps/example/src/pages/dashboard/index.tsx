import { withAuthState } from '@hanabira/auth';

const Dashboard = withAuthState(({ logout }: any) => {
  // console.log(__dirname);
  return (
    <div>
      Dashboard <button onClick={() => logout()}>Sign Out</button>
    </div>
  );
});

export default Dashboard;
