import React, {useState} from 'react';

const Date = ({setResult}) => {
  
  const [url, setUrl] = useState('');
  
  const apiUri = '/api/shorturl/new'
  
  const handleSubmit = e => {
    e.preventDefault();
    
    console.log({url})
 
    fetch(apiUri, {
      method: 'POST', 
      body: JSON.stringify({url}),
      headers: {
          'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then((data) => {
      
      setResult(data)

    })
    .catch(error => console.error('Error:', error));

    // e.target.reset();
    
    document.getElementById('output').scrollIntoView();

  }
  
  return (
    <div className="submit-url">
      <h3>Short URL Creation</h3>
      
      <div className="form-container">
          <form className="submit-url-form" onSubmit={handleSubmit}>
            <input 
              className="form-url"  
              type="text" 
              placeholder="example: https://www.freecodecamp.com" 
              name="url" 
              onChange={e => setUrl(e.target.value)}  
              required
            />
            <input className="form-submit" type="submit" value="Submit"/>
          </form>
      </div>
      
    </div>
  )
}

export default Date;