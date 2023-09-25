import logo from '../images/logo.svg';
import { useNavigate, useLocation } from 'react-router-dom';
import { Routes, Route} from 'react-router-dom'; // импортируем Routes

function Header(props){

  const {userData, onSignOut} = props;

  // подписка на новигацию
  const navigate = useNavigate();
  const location = useLocation();

  // обработчик переход на регистрацию
  function  registrOut(){
    navigate('/sign-up');
  }

  // обработчик выхода из профиля
  function signOut(){
    onSignOut();
    navigate('/sign-in');
  }

  // обработчик перехода на авторизацию
  function signIt(){
    navigate('/sign-in');
  }

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="логотип Mesto"/>
      <nav className="header__menu">
        {location.pathname === "/" && <p className="header__menu-login"> { userData }</p>}
        <Routes>

          <Route path="/sign-up" element={ <button onClick={signIt} className="header__menu-link animation-hover"> Войти </button>}/>
          <Route path="/sign-in" element={ <button onClick={registrOut} className="header__menu-link animation-hover"> Регистрация </button>}/>
          <Route path="/" element={ <button onClick={signOut} className="header__menu-link animation-hover"> Выйти </button>}/>

        </Routes>
      </nav>
    </header>
  );
}

export default Header;