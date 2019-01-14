import React from 'react'
import { render } from 'react-dom'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css';
import App from './App'
import WebFont from 'webfontloader';

WebFont.load({
  google: {
    families: ['Noto Sans KR:400,500', 'sans-serif']
  }
});

render(<App />, document.getElementById('root'));
