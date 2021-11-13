import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import Speed from './Speed';
import Precision from './Precision';

function Result(props) {
  const { speed, current, errors } = props;

  let record = JSON.parse(localStorage.getItem('record'));
  let newRecord = false;
  if (!record || record.speed <= speed) {
    newRecord = true;
    record = { speed, current, errors };
    localStorage.setItem('record', JSON.stringify(record));
  }

  return (
    <div className='text result'>
      {newRecord
        ? <p>
            <FontAwesomeIcon icon={faTrophy} />
            Поздравляем, это новый рекорд!
          </p>
        : <p>Поздравляем, хороший результат!</p>}
      <div className='record'>
        <p>
        <FontAwesomeIcon icon={faTrophy} />
          Текущий рекорд:
        </p>
        <div className='performance'>
          <Speed speed={record.speed} />
          <Precision current={record.current} errors={record.errors} />
        </div>
      </div>
    </div>
  );
}

export default Result;
