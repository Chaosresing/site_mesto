import PopupWithForm  from './PopupWithForm';
import {useState, useContext, useEffect} from 'react';

// Импортируем объект контекста
import CurrentUserContext from './../contexts/CurrentUserContext';

function EditProfilePopup(props){

  const{onUpdateUser, isOpen, onClose, isLoading} = props;

  const [name, setName] = useState('');
  const [description , setDescription] = useState('');

  // Подписываемся на контекст TranslationContext 
  const currentUser = useContext(CurrentUserContext);

  // изменение имени из формы
  function handleName(evt){
    setName(evt.target.value);
  }

  // изменение о работе из формы
  function handleDescription(evt){
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description
    });
  }

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); 

  return(
    <PopupWithForm 
      onClose = {onClose} 
      name='profile'  
      title='Редактировать профиль' 
      isOpen = {isOpen} 
      isLoading={isLoading}
      onSubmit={handleSubmit}>
        <input className="popup__input" onChange={handleName} id="popup_name-profile" type="text" value={name || ''} name="popup_name" minLength={2} maxLength={40} required placeholder=""/>
        <span className="popup__input-error" id="popup_name-profile-error"></span>
        <input className="popup__input" onChange={handleDescription} id="popup_work-profile" type="text" value={description || ''} minLength={2} maxLength={200} name="popup_work" required placeholder=""/>
        <span className="popup__input-error" id="popup_work-profile-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;