import React from 'react'; 
import {render} from 'react-dom';
import {BrowserRouter, Match, Miss} from 'react-router';

import './css/style.css';

import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

// GitHub static page 要加上 repo name 到 router basename, local開發則不用
const repo = (window.location.hostname.split(".")[1] === 'github') ? `/${window.location.pathname.split('/')[1]}`:"";

const Root = () => {
 return(
    <BrowserRouter basename={repo}>
        <div>
            <Match exactly pattern="/" component={StorePicker} />
            <Match exactly pattern="/store/:storeId" component={App} />
            <Miss component={NotFound} />
        </div>
    </BrowserRouter>

 )
}

render(<Root/>, document.querySelector('#main'));
// render(<App/>, document.querySelector('#main'));
// render(<StorePicker/>, document.querySelector('#main'));

