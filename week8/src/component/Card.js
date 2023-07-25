import "./Card.css";

const Card = ({ value, onClick, isHidden, isRemoved }) => {
  const toggleHandler = () => {
    if (isHidden) {
      onClick();
    }
  };

  return (
    //클릭됐을 때 카드를 숨기고, 삭제
    <div
      className={`card ${isHidden ? "flipped" : ""} ${
        isRemoved ? "removed" : ""
      }`}
      onClick={toggleHandler}
    >
      {!isRemoved && <div>{!isHidden && <h1>{value}</h1>}</div>}
    </div>
  );
};

export default Card;
