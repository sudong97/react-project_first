import React from "react";
const EmotionItem = ({
  emotion_id,
  emotion_img,
  emotion_description,
  onClick,
  isSelected,
}) => {
  return (
    <div
      onClick={() => onClick(emotion_id)}
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on${emotion_id}` : `EmotionItem_off`,
      ].join(" ")}
    >
      <img src={emotion_img} />
      <span>{emotion_description}</span>
    </div>
  );
};

export default React.memo(EmotionItem);
