import PopupWithForm  from './PopupWithForm';
import {useEffect, useRef} from 'react';

function EditAvatarPopup(props){

  const{onUpdateAvatar, isOpen, onClose, isLoading} = props;

  const refAvatar = useRef(); // записываем объект, возвращаемый хуком, в переменную

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({avatar: refAvatar.current.value});
  }

  useEffect(() => {
    refAvatar.current.value = '';
  }, [isOpen]);
  
  return (
    <PopupWithForm 
      onClose = {onClose} 
      name ='avatar' 
      title ='Обновить аватар' 
      isOpen = {isOpen} 
      isLoading={isLoading}
      onSubmit={handleSubmit}
      >
        <input ref={refAvatar} className="popup__input" id="popup__link-avatar" type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
        <span className="popup__input-error" id="popup__link-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;