import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import AppTitle from './common/appTitle.jsx';

const CodeSolution = () => {
  
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>URL Shortener Microservice</h1>} />
      <div className="code-solution">
        <h2>Code Solution</h2>
        <ol>
   
          <li>I can <b>POST</b> a URL to <code>[project_url]/api/shorturl/new</code> and I will receive a shortened URL in the <b>JSON</b> response. Example : <code>{'{'}"original_url":"www.google.com","short_url":1{'}'}</code></li>

          <li>If I pass an invalid URL that doesn't follow the valid <i>http(s)://www.example.com(/more/routes)</i> format, the <b>JSON</b> response will contain an error like <code>{'{'}"error":"invalid URL"{'}'}</code>. HINT: to be sure that the submitted url points to a valid site you can use the function dns.lookup(host, cb) from the dns core module.</li>
    
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q1}
          </SyntaxHighlighter>
          
          <li>When I visit the shortened URL, it will redirect me to my original link.</li>

          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q2}
          </SyntaxHighlighter>
          
        </ol>
      </div>   
      
    </div>
  );
}


const q1 = `app.post("/api/shorturl/new", setUrl);


function setUrl(req, res, next) {
  const regUrl = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;
  const regHostname = /\//;
  const regHttp = /(http(s)?):\/\//;
  let {url} = req.body;
  const hostname = url.split(regHostname);
  let tmpUrl = url;
        
  // check if valide url
  if(!regUrl.test(url)) return next(new Error("invalid Url"));

  // get hostname
  if(regHttp.test(tmpUrl)) tmpUrl = hostname[2]
  else tmpUrl = hostname[0]
  
  // check if url exist
  dns.resolve4(tmpUrl, function (err) {
    if(err) return next(new Error("invalid Hostname: " + url))
    
    // remove trailing '/'
    if (url.match(/\/$/)) url = url.slice(0,-1);
    
    // check if already exist in db
    Url.findOne({url: url}, (err, data) => {
      if(err) return next(err);
      
      // url already in db
      if(data) return res.json({original_url: url, short_url: data.urlId});
      
      // add url to db
      const newUrl = new Url({url: url})

      newUrl.save((err, data) => {
        if (err) return next(err);
        res.json({original_url: url, short_url: data.urlId});
      });
      
    })
    
  });
  
}
`
  const q2 = `app.get("/api/shorturl/:urlId", getUrl);


function getUrl(req, res, next) {
  let {urlId} = req.params;
  
  // check if NaN
  if(isNaN(parseInt(urlId, 10))) return next(new Error("Wrong Format"))
  
  Url.findOne({urlId}, (err, data) => {
    if(err) return next(err);
    if(data) res.json({
            success: true,
            redirectUrl: data.url
        })
    else next(new Error('No url found')) 
  })
}`


export default CodeSolution;