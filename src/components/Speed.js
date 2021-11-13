import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';

function Speed(props) {
  return (
    <div className='badge'>
      <p>
        <FontAwesomeIcon icon={faClock} />
        СКОРОСТЬ
      </p>
      <p><span>{props.speed}</span> зн/мин</p>      
    </div>
  );
}

export default Speed;
