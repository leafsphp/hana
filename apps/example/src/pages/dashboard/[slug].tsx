import { useParams } from "@hanabira/router";

const Dashboard = () => {
  const slug = useParams<{ slug: string }>().slug;

  return <div>Dashboard {slug}</div>;
};

export default Dashboard;
