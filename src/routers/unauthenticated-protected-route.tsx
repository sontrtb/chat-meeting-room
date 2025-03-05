import { useGetUser } from "@/redux/hooks/user";
import { JSX } from "react";
import { Navigate } from "react-router-dom";

function UnauthenticatedProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const user = useGetUser()
  const isLogin = !!user?.token

  if (!isLogin) {
    return <Navigate to={"/welcome"} />;
  }
  return children;
}

export default UnauthenticatedProtectedRoute;
