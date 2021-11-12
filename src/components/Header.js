import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

function Header() {
  return (
    <header>
      <h1>
        <FontAwesomeIcon icon={faKeyboard} />
        Клавиатурный тренажер
      </h1>
    </header>
  );
}

export default Header;
