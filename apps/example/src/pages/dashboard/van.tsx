import { useNavigate } from '@hanabira/router';

export default function Van() {
  const navigate = useNavigate();

  return (
    <div>
      Van
      <button onClick={() => navigate('/app')}>Navigate</button>
    </div>
  );
}
