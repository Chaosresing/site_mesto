
// класс для работы с api яндекс практикума
class ApiAuth {

  constructor({ headers, baseUrl }){
    this._headers = headers;
    this._baseUrl = baseUrl
  }

  _checkResponse(res){
    if(res.ok){
      return res.json();
    }
    return Promise.reject('Ошибка запроса');
  };

  // запроса для регистрации в сервисе яндекс
  postRegistrUser(email, password){
    return fetch(this._baseUrl + '/signup', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // запроса для авторизации в сервисе яндекс
  postAutoriseUser(email, password){
    return fetch(this._baseUrl + '/signin', {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {
      return this._checkResponse(res);
    })
  }

  // запрос для проверки валидности токена
  getCheakTokenUser(){

    return fetch(this._baseUrl + '/users/me', {
      credentials: 'include',
      method: 'GET',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
      })
  };

  // выход из учетной записи
  exitUser(){
    return fetch(this._baseUrl + '/exit', {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    })
    .then(res => {
      return this._checkResponse(res);
      })
    };
}

const apiAuth = new ApiAuth({ 
  baseUrl: 'http://localhost:4000',

  headers: {
    'Accept': "application/json",
    'Content-Type': 'application/json'
  }
});

export default apiAuth;
