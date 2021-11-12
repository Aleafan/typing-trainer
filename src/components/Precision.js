function Precision(props) {
  const { current, errors } = props;
  const precision = current
    ? Math.round(current * 100 / (current + errors))
    : 100;
  return (
    <p>
      Точность: <span>{precision}</span>%
    </p>
  );
}

export default Precision;
