import React from "react";

function Text(props) {
  return (
    <p>
      {props.text
        ? props.text.split('').map((symbol, i) => <span key={i} id={i}>{symbol}</span>)
        : 'Приготовьтесь, загружается текст...'}
    </p>
  );
}

export default React.memo(Text);
