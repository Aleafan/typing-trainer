import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';

const BtnRestart = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} className='btn-restart' type='button' onClick={props.handleRestart}>
      <FontAwesomeIcon icon={faRedoAlt} />
      ЗАНОВО
    </button>
  );
});

export default BtnRestart;