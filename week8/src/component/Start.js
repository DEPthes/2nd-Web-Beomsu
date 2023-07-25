import "./Start.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cardNumberAction } from "../store/cardNumber-slice";
import { authAction } from "../store/auth-slice";

const Start = () => {
  //입력받은 숫자 저장.
  const [cardNumber, setCardNumber] = useState();

  const dispatch = useDispatch();

  const inputChangeHandler = (event) => {
    setCardNumber(event.target.value);
  };

  //입력 받은 숫자가 유호할 경우에만 auth를 true로 설정해 본 게임 화면으로 넘어가고, 이 수를 cardNumber-Slice에 저장.
  const setCardNumberHandler = () => {
    if (cardNumber > 20 && cardNumber !== "") {
      alert("20이하의 숫자만 입력해주십시오.");
    } else {
      //입력된 카드 개수를 redux의 저장
      dispatch(cardNumberAction.setCardNumber(cardNumber));
      //auth를 true로
      dispatch(authAction.start());
    }
  };

  return (
    <div className="start_div">
      <h1>카드 개수 선택</h1>
      <div>
        <input
          className="select_input"
          type="number"
          value={cardNumber}
          onChange={inputChangeHandler}
        ></input>
        <span>쌍</span>
      </div>
      <button className="start_button" onClick={setCardNumberHandler}>
        시작
      </button>
    </div>
  );
};

export default Start;
