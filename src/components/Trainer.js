import React, { useState, useEffect } from "react";
import Text from './Text';

const defaultText = 'Однажды весною, в час небывало жаркого заката, в Москве, на Патриарших прудах, появились два гражданина. Первый из них, одетый в летнюю серенькую пару, был маленького роста, упитан, лыс, свою приличную шляпу пирожком нес в руке, а на хорошо выбритом лице его помещались сверхъестественных размеров очки в черной роговой оправе. Второй – плечистый, рыжеватый, вихрастый молодой человек в заломленной на затылок клетчатой кепке – был в ковбойке, жеваных белых брюках и в черных тапочках.';

function Trainer() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  function handleKeyDown(e) {
    setCurrent(current => current + 1);
  }

  useEffect(() => {
    const currSymbol = document.getElementById(`${current}`);
    currSymbol.classList.add('current');
    const prevSymbol = document.getElementById(`${current - 1}`);
    if (prevSymbol) prevSymbol.classList.replace('current', 'complete');
  });

  return (
    <Text text={defaultText} />
  );
}

export default Trainer;
