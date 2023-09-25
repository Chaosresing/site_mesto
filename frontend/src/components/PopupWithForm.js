
function PopupWithForm (props){

  const{isOpen, onClose, name, title, children, onSubmit, isLoading} = props;

  return (

  <section className= {!isOpen ? ("popup") : ("popup popup_active")}  id={`popup_${name}`} aria-label="форма попапа">
    
    <div className="popup__eddit-form">
      <button className="popup__close-button animation-hover" onClick={onClose} id={`popup_${name}-close`} type="button" aria-label="кнопка закрыть попап"/>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" id={`popup_form-${name}`} name={`popup_${name}`} onSubmit={onSubmit}>

        {children}

        <button className="popup__button hover-batton" id="popup_button-profile" type="submit"> {isLoading? 'Сохранение...' : 'Сохранить'} </button>
      </form>
    </div>

  </section>

  );
}

export default PopupWithForm ;
