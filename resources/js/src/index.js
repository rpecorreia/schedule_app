import React from 'react';
import ReactDOM from 'react-dom';
import Schedule from './schedule/Schedule';
import reportWebVitals from './reportWebVitals';

//get element from home.blade.php where the React component will be shown
if(document.getElementById('user')){

  var data = document.getElementById('user').getAttribute('data');

  ReactDOM.render(
    <React.StrictMode>
      <Schedule name = {data} />
    </React.StrictMode>,
    document.getElementById('user')
  );
  
}

  // To measure the app's performance
reportWebVitals(console.log);
