import React from 'react';
import './header.css';

const isSelected = (toCheck,buttonName) => {
  let selected = false;
  switch (buttonName){
    case 'isStartSelected' :
      if (toCheck === 'start') selected = true;
      break;
    case 'isEndSelected':
      if (toCheck === 'end') selected = true;
      break;
    case 'isBlockSelected':
      if (toCheck === 'block') selected = true;
      break;
    case 'isStartSearch':
      if (toCheck=== 'search')  selected = true;
      break;
  }
  console.log(selected)
  return selected;
}

const Header = (props) => {
  return (
    <header className="App">
      <nav>
        <ul>
          <li>
            <select onChange={props.HandleAlgoChange}>
              <option selected="selected" value = "astar">A Star</option>
              <option value = "dijkstra">Dijkstra</option>
            </select>
          </li>
          <li>
          <button
            onClick={props.HandleButtonClick}
            name="isStartSelected"
            className={isSelected(props.selected,'isStartSelected') ? 'selected' : ''}
          >
            start
            </button>
          </li>
          <li>
          <button
            onClick={props.HandleButtonClick}
            name="isBlockSelected"
            className={isSelected(props.selected,'isBlockSelected') ? 'selected' : ''}
          >
            block
            </button>
          </li>
          <li>
            <button
              onClick={props.HandleButtonClick}
              name="isEndSelected"
              className={isSelected(props.selected,'isEndSelected') ? 'selected' : ''}
            >
            goal
            </button>
          </li>
          <li>
            <button
            onClick={props.HandleButtonClick}
            name="isClearSelected"
            >
            clear
            </button>
          </li>
          <li>
            <button
            onClick={props.HandleButtonClick}
            name="isStartSearch"
            className={isSelected(props.selected,'isStartSearch') ? 'selected' : ''}
            >
            Start Search
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
