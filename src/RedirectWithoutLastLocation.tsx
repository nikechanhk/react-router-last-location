import * as React from 'react';
import { Navigate, NavigateProps } from 'react-router-dom';

const RedirectWithoutLastLocation: React.FC<NavigateProps> = (props) => {
  // eslint-disable-next-line react/prop-types
  const { to, state } = props;

  return <Navigate {...props} state={typeof to === 'string' ? { preventLastLocation: true } : { preventLastLocation: true, ...state }} replace />;
};

export default RedirectWithoutLastLocation;
