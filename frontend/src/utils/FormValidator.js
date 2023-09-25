export class FormValidator {

  constructor(setings, validForm) {
    this._inputSelector = setings.inputSelector;
    this._submitButtonSelector = setings.submitButtonSelector;
    this._hoverButton = setings.hoverButton;
    this._inputErrorBorder = setings.inputErrorBorder;
    this._errorClass = setings.errorClass;
    this._validForm = validForm;
  }

  // Найдём форму и поля для валидации
  enableValidation() {

    this._formValid = document.querySelector(this._validForm);
    this._inputList = Array.from(this._formValid.querySelectorAll(`.${this._inputSelector}`));
    this._buttonElement = this._formValid.querySelector(`.${this._submitButtonSelector}`);

    this._enableValidationListener(); // добавили слушатель события
  };

  // добавить класс с ошибкой полю ввода
  _showInputError(formInput, errorMessage) {

    // Находим элемент ошибки внутри самой функции
    this._errorElement = this._formValid.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(this._inputErrorBorder);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  };

  // убрать класс с ошибкой полю ввода
  _hideInputError(formInput) {

    this._errorElement = this._formValid.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(this._inputErrorBorder);
    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);
  };

  // очистить поля ошибки при открытии попап добавить место
  resetValidation() {
    this._toggleButtonState(); 

    this._buttonElement.disabled = true;
    this._buttonElement.classList.remove(this._hoverButton);

    this._inputList.forEach((inputElement) => {
      inputElement.value = '';
      this._hideInputError(inputElement);
    });
  };

  //добавить слушатели обработчики
  _addListenersValid() {
    this._inputList.forEach((formInput) => {
      formInput.addEventListener('input', () => {
        
        if (!formInput.validity.valid) {
          this._showInputError(formInput, formInput.validationMessage);
        } else {
          this._hideInputError(formInput);
        }
        
        this._toggleButtonState(); // активация кнопки формы
      });
    });
  };

  // слушатель события валидации
  _enableValidationListener() {
    this._toggleButtonState(); // деактивация при первом выводе попап окна
    this._addListenersValid();
  };

  // проверка можно ли активировать кнопку или нет
  _hasInvalidInput() {

      // проходим по этому массиву методом some
      return this._inputList.some((inputElement) => {

      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся функция
      // hasInvalidInput вернёт true_hideError
      return !inputElement.validity.valid;
    })
  }; 

  // активировать и  деактивировать кнопку
  _toggleButtonState() {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput()) {
      // сделай кнопку неактивной
      this._buttonElement.disabled = true;
      this._buttonElement.classList.remove(this._hoverButton);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.disabled = false;
      this._buttonElement.classList.add(this._hoverButton);
    }
  };

}  
