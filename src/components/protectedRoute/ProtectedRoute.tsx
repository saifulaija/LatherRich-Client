import { ReactNode } from "react";

import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, useCurrentToken } from "../../redux/features/auth/authSlice";

import { JwtPayload } from "jwt-decode";
import { verifyToken } from "../../utils/verifiToken";
interface MyJwtPayload extends JwtPayload {
  role: string;
}
type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);

  let user;

  if (token) {
    user = verifyToken(token) as MyJwtPayload  ;
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
