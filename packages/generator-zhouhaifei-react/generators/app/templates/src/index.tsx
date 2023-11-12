import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './global.less';
import { RenderRoutes } from './routes';
import { Locale } from './utils';
import NProgress from 'nprogress';

render();

function render() {
  NProgress.start();

  function Internal() {
    React.useLayoutEffect(() => {
      NProgress.done();
    }, []);

    return (
      <Locale>
        <BrowserRouter>
          <RenderRoutes/>
        </BrowserRouter>
      </Locale>
    );
  }

  createRoot(document.getElementById('root'))
    .render(<Internal/>);
}

if (process.env.NODE_ENV === 'development') {
  if (process.env.CLI_TOOL === 'vite') {
    // @ts-ignore1
    import.meta.hot.accept();
  } else if (process.env.CLI_TOOL === 'webpack') {
    // @ts-ignore
    module.hot.accept(render);
  }
}

