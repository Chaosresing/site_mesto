import {useState} from 'react';

function Login (props){

  const{name, title, buttonTitle, handleLogin} = props;

  // данные из формы регистрации
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  
  // получить имя из формы
  function handleName(evt){
    setRegisterName(evt.target.value);
  }

  // получить пароль из формы
  function handlePassword(evt){
    setRegisterPassword(evt.target.value);
  }

  // отправка данных из формы в апи для регистрации
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    handleLogin(registerName, registerPassword);
  }

  return (
    <section className= "aut" id={`popup_${name}`} aria-label="форма попапа">
    
      <h2 className="aut__title">{title}</h2>

      <form className="aut__form" id={`aut_form-${name}`} name={`aut_${name}`} onSubmit={handleSubmit}>

        <input className="aut__form-input"  type="Email"  name="aut_login"  placeholder="Email" onChange={handleName}/>
        <span className="popup__input-error" id="popup_name-profile-error"></span>
        <input className="aut__form-input"  type="password" placeholder="Пароль" onChange={handlePassword}/>
        <span className="popup__input-error" id="popup_work-profile-error"></span>

        <button className="aut__form-button aut-batton" type="submit" aria-label="Кнопка регистрации"> {buttonTitle} </button>

      </form>

    </section>
  );

}

export default Login;