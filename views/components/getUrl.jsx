import React, {useState} from 'react';

const Date = ({setResult, history}) => {
  
  const [number, setNumber] = useState('');
  
  const url = '/api/shorturl/'
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(number)
    
    fetch(url + number)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      if(!data.success) {
        document.getElementById('output').scrollIntoView();
        return setResult(data)
      }
      window.location.href = data.redirectUrl
    })
    .catch(error => console.error('Error:', error));
  }
  
  return (
    <div className="submit-url">
      <h3>Go to Website by shortcut</h3>
      
      <div className="form-container">
          <form className="submit-url-form" onSubmit={handleSubmit}>
            <input 
              className="form-url"  
              type="number" 
              placeholder="example: 1" 
              name="number" 
              onChange={e => setNumber(e.target.value)}  
              required
            />
            <input className="form-submit" type="submit" value="Submit"/>
          </form>
      </div>
 
      <table >
        <thead>
        <tr>
          <th>Shortcuts</th>
          <th>Websites</th> 
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>https://www.freecodecamp.org/</td> 
        </tr>
        <tr>
          <td>2</td>
          <td>https://glitch.com/</td> 
        </tr>
        <tr>
          <td>3</td>
          <td>https://learn.freecodecamp.org/</td> 
        </tr>
        <tr>
          <td>...</td>
          <td>...</td> 
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Date;