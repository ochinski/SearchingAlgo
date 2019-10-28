import React from 'react';
import './header.css';

function Header() {
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
          <button>
            start
            </button>
          </li>
          <li>
          <button>
            block
            </button>
          </li>
          <li>
            <button>
            goal
            </button>
          </li>
          <li>
            <button onClick={(e) => {clear}}>
            clear
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
