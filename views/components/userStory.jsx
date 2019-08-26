import React from 'react';
import AppTitle from './common/appTitle.jsx';

const UserStory = () => {
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>URL Shortener Microservice</h1>} />
      
      <div className="user-story" >
        <h2>User Story</h2>
        <ol>
          
          <li>I can <b>POST</b> a URL to <code>[project_url]/api/shorturl/new</code> and I will receive a shortened URL in the <b>JSON</b> response. Example : <code>{'{'}"original_url":"www.google.com","short_url":1{'}'}</code></li>

          <li>If I pass an invalid URL that doesn't follow the valid <i>http(s)://www.example.com(/more/routes)</i> format, the <b>JSON</b> response will contain an error like <code>{'{'}"error":"invalid URL"{'}'}</code>. HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.</li>
    
          <li>When I visit the shortened URL, it will redirect me to my original link.</li>

        </ol>
      </div>      
      
    </div>
  );
}

export default UserStory;