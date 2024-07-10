import { useContext } from 'react';
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { AuthContext } from '../provider/AuthProvider';

const PrivateRoute = ({children}) => {
  const {user, loading} = useContext(AuthContext);
  const location = useLocation();

  if(loading){
    return <div className='w-full h-[300px] flex justify-center items-center text-3xl'>
      <span className="loading loading-bars loading-lg h-[250px]"></span>
    </div>
  }

  if (user) {
    return children;
  } return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node,
}