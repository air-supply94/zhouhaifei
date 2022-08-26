import './global.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RenderRoutes } from './routes';
import { Locale } from './utils';
import { webVitals } from './webVitals';

render();

function render() {
  ReactDOM.render(
    <Locale>
      <BrowserRouter>
        <RenderRoutes/>
      </BrowserRouter>
    </Locale>,
    document.getElementById('root')
  );
}

webVitals(console.log);

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept([
    './routes',
    './utils',
  ], render);
}
