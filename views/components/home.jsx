import React, {useState} from 'react';

import SubmitUrl from './submitUrl.jsx';
import GetUrl from './getUrl.jsx';
import Output from './output.jsx';
import AppTitle from './common/appTitle.jsx';

const Home = ({history}) => {
  
  const [result, setResult] = useState('');
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>URL Shortener Microservice</h1>} />
      <SubmitUrl setResult={setResult} />
      <GetUrl setResult={setResult} history={history} />
      <Output result={result} />
      
    </div>
  );
  
}

export default Home;