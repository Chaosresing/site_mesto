// НОС компонент для реализации защиты пути к страницам без
import { Navigate } from "react-router-dom";

export const ProtectedRoute = (props) => {

  const {element, loggenIn} = props;

  return (
    loggenIn ? element : <Navigate to ='/sign-up' replace/>
  );
}

export default ProtectedRoute; 