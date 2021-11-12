import React, { useState, useEffect } from "react";
import Text from './Text';
import BtnRestart from './BtnRestart';

const defaultText = 'Однажды весною, в час небывало жаркого заката, в Москве, на Патриарших прудах, появились два гражданина. Первый из них, одетый в летнюю серенькую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке, а на хорошо выбритом лице его помещались сверхъестественных размеров очки в черной роговой оправе. Второй – плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке – был в ковбойке, жеваных белых брюках и в черных тапочках.';

function Trainer() {
  const [current, setCurrent] = useState(0);
  
  const [text, setText] = useState('');
  useEffect(() => fetchText(), []);

  function handleRestart() {
    setText('');
    setCurrent(0);
    fetchText();
  }

  async function fetchText() {
    try {
      const response = await fetch('https://baconipsum.com/api/?type=meat-and-filler&sentences=7');
      if (!response.ok) throw new Error('Network response was not OK');
      const [text] = await response.json();
      setText(text);
    }
    catch(err) {
      console.error(err);
      setText(defaultText);
    }
  }
  
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key.length !== 1) return; // проверка, что клавиша "символьная"
      setCurrent(c => {
        if (e.key === text[c]) {
          return c + 1;
        } else {
          document.getElementById(`${c}`).classList.add('error');
          return c;
        }
      });
    }
    if (text) {
      console.log('add listener!');
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [text]);

  useEffect(() => {
    const currSymbol = document.getElementById(`${current}`);
    if (currSymbol) currSymbol.classList.add('current');
    const prevSymbol = document.getElementById(`${current - 1}`);
    if (prevSymbol) prevSymbol.classList.replace('current', 'complete');
  });

  return (
    <main>
      <Text text={text} />
      <BtnRestart handleRestart={handleRestart} />
    </main>
  );
}

export default Trainer;
