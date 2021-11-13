import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs } from '@fortawesome/free-solid-svg-icons';

function Precision(props) {
  const { current, errors } = props;
  const precision = current
    ? Math.round(current * 100 / (current + errors))
    : 100;
  return (
    <div className='badge'>
      <p>
        <FontAwesomeIcon icon={faCrosshairs} />
        ТОЧНОСТЬ
      </p>
      <p><span>{precision}%</span></p>
    </div>
  );
}

export default Precision;
