import union from '../images/Union1.svg';
import union2 from '../images/Union2.svg';

function InfoTooltip(props){

  const{ onClose, tooltipPopupOpen, registrIn, regAnsve} = props;

  return (
    <section className= {!tooltipPopupOpen ? ("popup") : ("popup popup_active")} aria-label="форма попапа">
    
      <div className="popup__eddit-form">
        <button className="popup__close-button animation-hover" onClick={onClose}  type="button" aria-label="кнопка закрыть попап"/>
    
        <img src={registrIn ? union : union2} alt={registrIn ? ('Регистрация прошла успешно.') : ('Регистрация не прошла.')} className='popup__infotooltip-image'/>
        
          <p className='popup__infotooltip-message'>
            {regAnsve}
          </p>
      </div>
    </section>
  );

}

export default InfoTooltip;