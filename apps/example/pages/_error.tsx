import { useRouteError } from "@hanabira/router";

export default function Error() {
  const error: any = useRouteError();
  console.log(error.status, 'error');

  return <div>Error</div>;
}
