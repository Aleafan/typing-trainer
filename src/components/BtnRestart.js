import React from "react";

const BtnRestart = React.forwardRef((props, ref) => {
  return (
    <button ref={ref} type='button' onClick={props.handleRestart}>
      ЗАНОВО
    </button>
  );
});

export default BtnRestart;