import { useSelector, useDispatch } from "react-redux";
import { cardAction } from "../store/card-slice";
import { useEffect, useState } from "react";

import Card from "./Card";
import "./CardGame.css";

const CardGame = () => {
  const cardNumber = useSelector((state) => state.cardNumber.cardNumber);
  const cardArray = useSelector((state) => state.card.cardArray);
  const removedCard = useSelector((state) => state.card.removedCard);

  const dispatch = useDispatch();

  const [selectedCard, setSelectedCard] = useState([]);
  const [counter, setCounter] = useState(0);

  //처음 설정한 카드를 배열에 담아 이를 redux에 저장함.
  useEffect(() => {
    let updatedCardArray = [];

    for (let i = 1; i <= cardNumber; i++) {
      updatedCardArray.push(i);
      updatedCardArray.push(i);
    }

    //배열 셔플
    updatedCardArray = updatedCardArray.slice().sort(() => Math.random() - 0.5);

    //배열 저장
    dispatch(cardAction.setCard(updatedCardArray));
  }, [cardNumber, dispatch]);

  const cardClickHandler = (index) => {
    // 이미 두 개의 카드가 선택되었으면 클릭 무시
    if (selectedCard.length >= 2) {
      return;
    }

    // 이미 선택된 카드면 클릭 무시
    if (selectedCard.includes(index)) {
      return;
    }

    // 선택한 카드의 index를 새로운 배열에 담음
    setSelectedCard([...selectedCard, index]);

    if (selectedCard.length === 1) {
      //횟수 추가
      setCounter((preCounter) => preCounter + 1);
      //일치할 경우
      if (cardArray[selectedCard[0]] === cardArray[index]) {
        setTimeout(() => {
          //삭제 카드 배열에 추가.
          dispatch(cardAction.removedCard(cardArray[selectedCard[0]]));
          dispatch(cardAction.removedCard(cardArray[index]));
          setSelectedCard([]);
        }, 100);
      } else {
        setTimeout(() => {
          setSelectedCard([]);
        }, 500);
      }
    }
  };

  //카드 개수별로 추가
  const components = cardArray.map((cardValue, index) => (
    <Card
      key={index}
      value={cardValue}
      onClick={() => cardClickHandler(index)}
      isHidden={!selectedCard.includes(index)}
      isRemoved={removedCard.includes(cardValue)}
    />
  ));

  const cardNumberString = cardNumber - removedCard.length / 2;

  return (
    <div className="layout">
      <span className="card_Number">남은 개수: {cardNumberString}쌍</span>
      <div>
        <span className="card_Number">총 시도 횟수: {counter}번</span>
      </div>
      <div className="cardLayout">{components}</div>
      {cardNumberString === 0 && (
        <div className="finish">
          축하합니다. 무려 {counter}번 만에 게임을 끝내셨군요!
        </div>
      )}
    </div>
  );
};

export default CardGame;
