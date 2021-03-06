import React from "react";
import { RouteProps, Redirect, Route, useLocation } from "react-router-dom";

export interface ProtectedRouteProps extends RouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
  // redirectPathOnAuthentication: string;
  // setRedirectPathOnAuthentication: (path: string) => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = (props) => {
  const currentLocation = useLocation();
  let redirectPath = currentLocation.pathname;

  if (!props.isAuthenticated) {
    redirectPath = props.authenticationPath;
  }

  if (redirectPath !== currentLocation.pathname) {
    return <Redirect to={{ pathname: redirectPath }} />;
  } else {
    return <Route {...props} />;
  }
};
