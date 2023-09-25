import {useState, useEffect} from 'react';
import { Routes, Route, useNavigate, useLocation, Link} from 'react-router-dom'; // импортируем Routes
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup  from './ImagePopup';
import Register  from './Register';
import Login   from './Login ';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup  from './EditAvatarPopup';
import AddPlacePopup   from './AddPlacePopup ';
import InfoTooltip   from './InfoTooltip';
import Api from '../utils/Api';
import ApiAuth from '../utils/ApiAuth';
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC

// Импортируем объект кloggenInsetUserDataонтекста
import CurrentUserContext from './../contexts/CurrentUserContext';

function App() {

  // открытие попапа
  const [isEditProfilePopupOpen, setleEditProfileClick] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [tooltipPopupOpen, setTooltipPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [cards, setCards] = useState([]); //карточки места
  const [currentUser , setCurrentUser ] = useState({}); // текущий пользователя
  const [isLoading, setIsLoading] = useState(false); // состояние кнопки при загрузки данных на сервер
  const [loggenIn, setLoggenIn] = useState(false); // стейт логина
  const [registrIn, setRegistrIn] = useState(false); // стейт регистрации
  const [userData, setUserData] = useState(''); // стейт информации о пользователе
  const [isPageLoading, setIsPageLoading] = useState(true); // стейт отвечающий за состояние загрузки страницы
  const [regAnsve, setRegAnsve] = useState(''); // стейт сообщения в попап регистрации

  const navigate = useNavigate();
  const location = useLocation();

  function handleEditProfileClick(){
    setleEditProfileClick(true);
  }

  function handleEditAvatarClick(){
    setEditAvatarClick(true);
  }

  function handleAddPlaceClick(){
    setAddPlaceClick(true);
  }

  function handleTooltipPopupOpen(result){
    setTooltipPopupOpen(result.popup);
    setRegistrIn(result.registr)
  }

  function handleCardClick (selectedCard){
    setSelectedCard(selectedCard);
  }

  // закрытие попапов на крестик
  function closeAllPopups(){
    setleEditProfileClick(false);
    setEditAvatarClick(false);
    setAddPlaceClick(false);
    setSelectedCard({name: '', link: ''})
    setTooltipPopupOpen(false);
  }

  //  обработчик закрытие попап на Escape
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link || tooltipPopupOpen

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) { // навешиваем только при открытии
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 

  // запрос пользователя с сервера
  useEffect(()=>{
    if (loggenIn){
      Api.getInfoUserForServer()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(err => {
          console.log(err);
        })
  }}, [loggenIn]);
    
  // запрос карточек с сервера
  useEffect(()=>{
    if (loggenIn){
      Api.getCardsForServer()
        .then((res) => {
          setCards(res);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() =>
         setIsPageLoading(false)); // завершаем загрузку 
  }}, [loggenIn]);

  // поставить, убрать лайк
  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);

    if (!isLiked) {
      Api.putLikeForServer(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });  
    } else {
      Api.deleteLikeForServer(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });  
    }
  }

  // добавить карточку
  function handleAddPlaceSubmit(card) {

    setIsLoading(true);
    Api.postCardsForServer(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });  
  }

  // удалить карточку
  function handleCardDelete(card) {

    Api.deleteCardForServer(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => (item._id !== card._id && item)));
    })
    .catch((err) => {
      console.error(err);
    });  
  }

  // обновить данные о пользователе
  function handleUpdateUser(date) {
    setIsLoading(true);
    Api.patchInfoUserForServer(date)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }

  // изменить аватар
  function handleUpdateAvatar(date){
    setIsLoading(true);
    Api.patchAvatarForServer(date)
    .then((avatar) => {
      setCurrentUser(avatar);
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }
  
  // запрос на регистрацию
  function handleRegistr(registerName, registerPassword){
    ApiAuth.postRegistrUser(registerName, registerPassword)
    .then(() =>{
      const result = {
        popup: true,
        registr: true
      };
      handleTooltipPopupOpen(result);
      navigate('/sign-in');
      setRegAnsve('Вы успешно зарегистрировались!');
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
    })
  }

  // запрос  на авторизацию
  function handleLogin(registerName, registerPassword){
    if (localStorage.getItem('isLoggedIn')) {
      navigate('/');
    } 
    ApiAuth.postAutoriseUser(registerName, registerPassword)
    .then(() =>{
    
      setLoggenIn(true);
      setUserData(registerName);
      navigate('/');
    })
    .catch(() => {
      const result = {
        popup: true,
        registr: false
      };
      handleTooltipPopupOpen(result);
      setRegAnsve('Что-то прошло не так! Попробуйте ещё раз.');
    })
  }

  // проверяем токен при первой загрузки
  // проверка идет на стороне бэка
  useEffect(()=>{

      ApiAuth.getCheakTokenUser()
      .then((data) =>{
        if(data){
          setLoggenIn(true);
          if (data.email){
            setUserData(data.email);
          };
          navigate(location.pathname);
        }
      })
      .catch((err) => {
        setLoggenIn(false);
        console.error(err);
      })
  }, []);


  // обработчик выхода из профиля
  function onSignOut(){
    ApiAuth.exitUser()
    .then(() =>{
      setLoggenIn(false);
    })
    .catch((err) => {
      console.error(err);
    })
  }

  return (

    <CurrentUserContext.Provider value={currentUser}>
    
      <Header userData={userData} onSignOut={onSignOut}/>

        <Routes>

          <Route path="/" element={

            <ProtectedRoute 
              // прием показывающий что страница перезагружается, а не просто страница "дергается при перерисовки"
              element={
                isPageLoading ? (
                  <div>Loading...</div>
                ) : (
                  <Main 
                    onEditProfile = {handleEditProfileClick}
                    onEditAvatar = {handleEditAvatarClick} 
                    onAddPlace = {handleAddPlaceClick}  
                    onCardClick = {handleCardClick}
                    onCardLike = {handleCardLike}
                    onCardDelete = {handleCardDelete}
                    cards = {cards}
                  />
                )
              } 
              loggenIn={loggenIn} 
            />
          }/>

          <Route path="/sign-up" element={ 
            <Register 
              name = 'register'
              title = 'Регистрация'
              buttonTitle = 'Зарегистрироваться'
              handleRegistr = {handleRegistr}
            />
          }/>

          <Route path="/sign-in" element={ 
            <Login 
              name = 'login'
              title = 'Вход'
              buttonTitle = 'Войти'
              handleLogin = {handleLogin}
            />
          }/>

        <Route path="*" element= {
          <>
            <h2 className="notPage"> Not found</h2> 
            <Link to="/" className="notPage__link animation-hover"> На главную страницу </Link>
          </>
        }/>

      </Routes>
              
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading}/>
      <AddPlacePopup  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading}/>
      <ImagePopup card = {selectedCard} onClose = {() => closeAllPopups()}/> 
      <InfoTooltip isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} tooltipPopupOpen={tooltipPopupOpen} registrIn={registrIn} regAnsve={regAnsve}/> 
      <Footer />  

    </CurrentUserContext.Provider>
  );
}

export default App;
