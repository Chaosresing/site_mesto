import {useContext} from 'react';
import Card  from './Card';

// Импортируем объект контекста
import CurrentUserContext from './../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete, cards }){

  // Подписываемся на контекст TranslationContext
  const currentUser = useContext(CurrentUserContext);

  return (

    <main id="main">
  
      <section className="profile">
  
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" aria-label="кнопка изменение аватара профиля" >
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар автора"/>
        </button>
  
        <div className="profile-info">
          <h1 className="profile-info__title">{currentUser.name}</h1>
          <button className="profile-info__button-edit animation-hover" onClick={onEditProfile} type="button" aria-label="кнопка изменение информации профиля" ></button>
          <p className="profile-info__subtitle">{currentUser.about}</p>
        </div>
    
        <button className="profile__button-add animation-hover" onClick={onAddPlace} type="button" aria-label="кнопка добавления места"></button>
      </section>
    
      <section className="plases" aria-label="Карточки мест">
        
        {cards.map((card) => (
          <Card 
            key = {card._id}
            card={card} 
            onCardClick = {onCardClick}
            onCardLike = {onCardLike}
            onCardDelete = {onCardDelete}
          />
        ))}
        
      </section>

    </main>
  );
}

export default Main;