import React from 'react';
import './header.css';


const Header = (props) => {
  return (
    <header className="App">
      <nav>
        <ul>
          <li>
            <button>
            Algo
            </button >
          </li>
          <li>
          <button
            onClick={props.HandleButtonClick}
            name="isStartSelected"
            className={props.isStartSelected ? 'selected' : ''}
          >
            start
            </button>
          </li>
          <li>
          <button
            onClick={props.HandleButtonClick}
            name="isBlockSelected"
            className={props.isBlockSelected ? 'selected' : ''}
          >
            block
            </button>
          </li>
          <li>
            <button
              onClick={props.HandleButtonClick}
              name="isEndSelected"
              className={props.isEndSelected ? 'selected' : ''}
            >
            goal
            </button>
          </li>
          <li>
            <button>
            clear
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
