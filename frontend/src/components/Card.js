// импорт хука для контекста
import {useContext} from 'react';

// Импортируем объект контекста
import CurrentUserContext from './../contexts/CurrentUserContext';

// компонент принимат props
function Card(props){

  const {name, likes, link, owner} = props.card;

  // Подписываемся на контекст TranslationContext  {isOwn && 
  const currentUser = useContext(CurrentUserContext);

  const isOwn = owner === currentUser._id;

  const cardDellButtonClassName = ( 
    `plases-card__del animation-hover ${!isOwn && 'plases-card__del_opasiti'}` 
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i === currentUser._id);
  // Создаём переменную, для отображения класса кнопки лайков
  const cardLikeButtonClassName = ( 
    `plases-card__like-button hover-like ${isLiked && 'plases-card__like_active'}` 
  );

  // функция открытия карточки место
  function handleClick() {
    props.onCardClick(props.card);
  }  

  // функция обработки лайка
  function handleLikeClick() {
    props.onCardLike(props.card);
  }  

  // функция удаления карточки
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }  

  // возвращаем разметку jsx 
  return (
    <article className="plases-card" aria-label="места России">
      <img className="plases-card__img" onClick={handleClick} src={link} alt={name}/>
      <button  className={cardDellButtonClassName} onClick={handleDeleteClick} type="button" aria-label="кнопка удалить" ></button>
      <div className="plases-card__card-title">
        <h2 className="plases-card__title">{name}</h2>
        <div className="plases-card__like">
          <button className={cardLikeButtonClassName} onClick={ handleLikeClick } type="button" aria-label="кнопка лайк"></button>
          <div className="plases-card__like-count">{likes.length}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;