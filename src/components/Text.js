import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

function Text(props) {
  const {text} = props;
  return (
    <div className={text ? 'text' : 'text mes-prepare'}>
      <p>
        {text
          ? text.split('').map((symbol, i) => <span key={i} id={i}>{symbol}</span>)
          : 'Приготовьтесь, загружается текст...'}
      </p>
      {!text && 
        <FontAwesomeIcon icon={faRobot} />}
    </div>
  );
}

export default React.memo(Text);
