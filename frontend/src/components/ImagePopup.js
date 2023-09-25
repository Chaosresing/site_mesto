function ImagePopup(props){

  const{link, name} = props.card;

  return (

    <section className= {!link ? ("popup") : ("popup popup_active")} id="popup_img" aria-label="карточка просмотра фотографии">
      <figure className="popup__figure">
        <button className="popup__close-button popup__close-button_rigth animation-hover" onClick={props.onClose} id="popup_img-close" type="button" aria-label="кнопка закрыть попап"></button>
        <img className="popup__image" src={link} alt={name}/>
        <figcaption className="popup__caption"> {name} </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;