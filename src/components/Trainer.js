import React, { useState, useEffect, useRef } from "react";
import Text from './Text';
import BtnRestart from './BtnRestart';
import Speed from './Speed';
import Precision from './Precision';
import Result from './Result';

const defaultText = 'Однажды весною, в час небывало жаркого заката, в Москве, на Патриарших прудах, появились два гражданина. Первый из них, одетый в летнюю серенькую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке, а на хорошо выбритом лице его помещались сверхъестественных размеров очки в черной роговой оправе. Второй – плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке – был в ковбойке, жеваных белых брюках и в черных тапочках.';

function Trainer() {
  const [current, setCurrent] = useState(0);
  const [errors, setErrors] = useState(0);
  const [text, setText] = useState('');
  const [start, setStart] = useState(false);
  const [finish, setFinish] = useState(false);

  /*
   * Получение текста через API при первой загрузке
  */
  useEffect(() => fetchText(), []);

  async function fetchText() {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=1'); // 6!!!!!!!!!!!
      if (!response.ok) throw new Error('Network response was not OK');
      const [text] = await response.json();
      setText(text);
    }
    catch(err) {
      console.error(err);
      setText(defaultText);
    }
  }

  /*
   * Функционал кнопки Restart
  */
  const btnRestart = useRef(null);

  function handleRestart() {    
    setText('');
    setStart(false);
    setFinish(false);
    setCurrent(0);
    setErrors(0);
    setTime(0);
    fetchText();
    btnRestart.current.blur();
  }

  /*
   * Привязка листенера при получении текста и обработка нажатий клавиш
  */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key.length !== 1) return; // проверка, что клавиша "символьная"
      setCurrent(c => {
        if (c === 0) setStart(true);
        if (e.key === text[c]) {
          if (c >= length - 1) {
            setFinish(true);
            setStart(false);
            setText('');
          }
          return c + 1;
        }
        setErrors(e => e + 1);
        return c;
      });
    }
    let length = text.length;
    if (text) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [text]);

  /*
   * Изменение CSS-классов символов в процессе печати
  */
  const main = useRef(null);

  useEffect(() => {
    let id;
    if (start) id = setInterval(() => main.current.classList.toggle('cursor-blink'), 600);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    const currSymbol = document.getElementById(`${current}`);
    if (currSymbol) currSymbol.classList.add('current');
    const prevSymbol = document.getElementById(`${current - 1}`);
    if (prevSymbol) prevSymbol.classList.replace('current', 'complete');
    main.current.classList.remove('cursor-blink');
  }, [current, text]);

  useEffect(() => {
    if (errors) document.getElementById(`${current}`).classList.add('error');
  }, [errors]);

  /*
   * Мониторинг скорости печати
  */
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let id;
    if (start) id = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => setSpeed(Math.round(current * 60 / time) || 0), [time]);

  return (
    <main ref={main}>
      <div className={finish ? 'performance result' : 'performance'}>
        <Speed speed={speed} />
        <Precision current={current} errors={errors} />
      </div>
      {finish 
        ? <Result />
        : <Text text={text} />}
      <BtnRestart ref={btnRestart} handleRestart={handleRestart} />
    </main>
  );
}

export default Trainer;
