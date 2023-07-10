import useInput from "./hooks/use-input";

const isValid = (value) =>
  /^[a-zA-Z0-9]*[a-zA-Z][0-9][a-zA-Z0-9]*$/.test(value);
const isLength = (value) => value.length >= 8;

const Form = () => {
  const {
    value: idValue,
    isValid: idIsValid,
    hasError: idHasError,
    valueChangeHandler: idChangeHandler,
    inputBlurHandler: idBlurHandler,
    reset: resetId,
  } = useInput(isValid);

  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput(isLength);

  const {
    value: rePasswordValue,
    isValid: rePasswordIsValid,
    hasError: rePasswordHasError,
    valueChangeHandler: rePasswordChangeHandler,
    inputBlurHandler: rePasswordBlurHandler,
    reset: resetRePassword,
  } = useInput((value) => value === passwordValue);

  let formIsValid = false;

  if (idIsValid && passwordIsValid && rePasswordIsValid) {
    formIsValid = true;
  }

  const submitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log(passwordSecurity);

    resetId();
    resetPassword();
    resetRePassword();
  };

  let passwordSecurity = "init";
  
  if (/^[a-zA-Z]+$/.test(passwordValue)) {
    passwordSecurity = "red";
  } else if (/^[a-zA-Z0-9]*[a-zA-Z][0-9][a-zA-Z0-9]*$/.test(passwordValue)) {
    passwordSecurity = "orange";
  } else if (
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
      passwordValue
    )
  ) {
    passwordSecurity = "green";
  }

  return (
    <form onSubmit={submitHandler}>
      <div className="control-group">
        <div className="form-control">
          <label htmlFor="name">아이디</label>
          <input
            type="text"
            id="name"
            value={idValue}
            onChange={idChangeHandler}
            onBlur={idBlurHandler}
          />
          {idHasError && (
            <p className="error-text">반드시 영문과 숫자를 포함시켜 주세요.</p>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="name">비밀번호</label>
          <div>
            <input
              type="text"
              id="name"
              value={passwordValue}
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
            />
            <div className={passwordSecurity}> </div>
          </div>
          {passwordHasError && (
            <p className="error-text">
              비밀번호는 반드시 8자리 이상이어야 합니다.
            </p>
          )}
        </div>
      </div>
      <div className="form-control">
        <label htmlFor="name">비밀번호 재입력</label>
        <input
          type="text"
          id="name"
          value={rePasswordValue}
          onChange={rePasswordChangeHandler}
          onBlur={rePasswordBlurHandler}
        />
        {rePasswordHasError && (
          <p className="error-text">비밀번호가 일치하지 않습니다.</p>
        )}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
