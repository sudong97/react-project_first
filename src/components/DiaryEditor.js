import { useNavigate } from "react-router-dom";
import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { DiaryDispatchContext } from "../App";

import MyButton from "./MyButton";
import MyHeader from "./MyHeader";
import EmotionItem from "./EmotionItem";

import { getstringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const DiaryEditor = ({ originData, isEdit }) => {
  const contentsRef = useRef();
  const [contents, setContents] = useState("");
  const [emotion, setEmotion] = useState(3);
  const [date, setDate] = useState(getstringDate(new Date()));

  const { onCreate, onEdit, onRemove } = useContext(DiaryDispatchContext);
  const handleClickEmotion = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (contents.length < 1) {
      contentsRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (isEdit) {
        onEdit(originData.id, date, contents, emotion);
      } else {
        onCreate(date, contents, emotion);
      }
    }
    navigate("/", { replace: true });
  };

  const handleRemove = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      onRemove(originData.id);
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getstringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContents(originData.content);
    }
  }, [isEdit, originData]);

  return (
    <div className="DiaryEditor">
      <MyHeader
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={
          <MyButton
            text={"< 뒤로가기"}
            onClick={() => {
              navigate(-1);
            }}
          />
        }
        rightChild={
          isEdit && (
            <MyButton
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />

      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmotion}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어떠셨나요?"
              ref={contentsRef}
              value={contents}
              name="contents"
              onChange={(e) => setContents(e.target.value)}
            />
          </div>
        </section>
        <section>
          <MyHeader
            leftChild={
              <MyButton
                text={"취소하기"}
                onClick={() => {
                  navigate(-1);
                }}
              />
            }
            rightChild={
              <MyButton
                type={"positive"}
                text={isEdit ? "수정완료" : "작성완료"}
                onClick={handleSubmit}
              />
            }
          />
        </section>
      </div>
    </div>
  );
};

export default React.memo(DiaryEditor);
