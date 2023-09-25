import PopupWithForm  from './PopupWithForm';
import {useEffect, useState} from 'react';

function AddPlacePopup (props){

  const{onAddPlace, isOpen, onClose, isLoading} = props;

  const [name, setName] = useState(''); // название карточки
  const [link, setLink] = useState(''); // ссылка карточки

  function nameChange(evt) {
    setName(evt.target.value);
  }

  function linkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name: name,
      link: link
    });
  }

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);
  
  return (
    <PopupWithForm 
      onClose = {onClose} 
      name='mesto' 
      title='Новое место' 
      isOpen = {isOpen}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <input className="popup__input" id="popup__name-place" type="text" name="popup_name" value={name} onChange={nameChange} minLength={2} maxLength={30} required placeholder="Название"/>
      <span className="popup__input-error" id="popup__name-place-error"></span>
      <input className="popup__input" id="popup__link-place" type="url" name="popup_link" value={link} onChange={linkChange} required  placeholder="Ссылка на картинку"/>
      <span className="popup__input-error" id="popup__link-place-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;