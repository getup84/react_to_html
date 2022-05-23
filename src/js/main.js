import log from './log';
import React from 'react';
import ReactDOM from 'react-dom';
import '../scss/main.scss';

const App = () => {
  return (
    <>
      <div>Reactで動的に出力するコンポーネント</div>
    </>
  )
};
ReactDOM.render(<App />, document.getElementById('app'));

log();