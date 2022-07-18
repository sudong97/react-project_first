import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import MyButton from "../components/MyButton";
import MyHeader from "../components/MyHeader";
import DiaryList from "../components/DiaryList";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curdate, setCurdate] = useState(new Date());
  const headText = `${curdate.getFullYear()}년 ${curdate.getMonth() + 1}월`;

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curdate.getFullYear(),
        curdate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curdate.getFullYear(),
        curdate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curdate]);

  useEffect(() => {}, [data]);

  const increaseMonth = () => {
    setCurdate(
      new Date(curdate.getFullYear(), curdate.getMonth() + 1, curdate.getDate())
    );
  };
  const decreaseMonth = () => {
    setCurdate(
      new Date(curdate.getFullYear(), curdate.getMonth() - 1, curdate.getDate())
    );
  };

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 홈`;
  }, []);

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};
export default Home;
