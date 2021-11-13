import React, { useState, useEffect, useRef } from "react";
import Text from './Text';
import BtnRestart from './BtnRestart';
import Speed from './Speed';
import Precision from './Precision';
import Result from './Result';

const defaultText = 'We successfully applied the direct quantitative monitoring of resistance genes in meat, which generally might aid as a useful and rapid additional tool for risk assessment. We know that bacteria provide a large pool of resistance genes, which are widely shared between each other. Thus, in terms of resistance gene monitoring, we should sometimes overcome the restricted view on single bacteria and look at the gene pool, instead.';

function Trainer() {
  const [current, setCurrent] = useState(0);
  const [errors, setErrors] = useState(0);
  const [text, setText] = useState('');
  const [start, setStart] = useState(false);

  /*
   * Получение текста через API при первой загрузке
  */
  useEffect(() => fetchText(), []);

  async function fetchText() {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=5');
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
   * Привязка листенера при получении текста и обработка нажатий клавиш
  */
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key.length !== 1) return; // проверка, что клавиша "символьная"
      setCurrent(c => {
        if (c === 0) setStart(true);
        if (e.key === text[c]) {
          if (c >= length - 1) {
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
  const [speed, setSpeed] = useState(0);
  const time = useRef(0);
  const countSpeed = useRef();

  useEffect(() => {
    let id;
    if (start) id = setInterval(() => countSpeed.current(), 1000);
    return () => {
      clearInterval(id);
      time.current = 0;
    }
  }, [start]);
  
  useEffect(() => {
    function callback() {
      time.current += 1;
      setSpeed(Math.round(current * 60 / time.current) || 0);
    }
    countSpeed.current = callback;
  }, [current]);

  /*
   * Функционал кнопки Restart
  */
  const btnRestart = useRef(null);

  function handleRestart() {    
    setText('');
    setStart(false);
    setCurrent(0);
    setErrors(0);
    setSpeed(0);
    fetchText();
    btnRestart.current.blur();
  }

  /*
   * Проверка окончания текста для рендеринга результатов
  */
  const finish = (!start && current !== 0) ? true : false;

  return (
    <main ref={main}>
      <div className={finish ? 'performance result' : 'performance'}>
        <Speed speed={speed} />
        <Precision current={current} errors={errors} />
      </div>
      {finish 
        ? <Result speed={speed} current={current} errors={errors} />
        : <Text text={text} />}
      <BtnRestart ref={btnRestart} handleRestart={handleRestart} />
    </main>
  );
}

export default Trainer;
