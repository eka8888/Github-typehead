import { useState } from 'react';
import './App.css';

function App() {
    const [userName, setUserName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [visitProfile, setVisitProfile] = useState('');
    const [userInput, setUserInput] = useState('');
    const [loading,setLoading]=useState(false);
  

    const axios = require('axios');  
    const setData = ({ login, avatar_url, html_url }) => {
        setUserName(login);
        setAvatar(avatar_url);
        setVisitProfile(html_url);
    };

    const handleSearch = (e) => {
        setUserInput((e.target.value).trim().toLowerCase());
    }

    const handleSubmit = (e) => {
      e.preventDefault()
        setLoading(true);
        axios({
          method:"get",
          url:`https://api.github.com/users/${userInput}`,
        }).then(res=>{
          console.log(res)
          setLoading(false);
          setData(res.data)
        }).catch(error=>error)
      }

    return(
 
    <div className='main'>
     
      
           <div className='search'>
              <form onSubmit={handleSubmit} > 
              
              <h1 className='title'>Github Typehead</h1>
                  <input className='search' type="text" placeholder="Search Username"  onChange={handleSearch}/>
                  
                  <br></br>
                  <button  type='submit' className='btn'>{loading ? "Searching...":"Search"}</button>
              </form>
            </div>
           
               
            {userName && <div  className='detail'>
                <img  className='image' src={avatar} alt='img'/>
                <h3 className='heading'>UserName:  {userName}</h3>
                <a className='link' href={visitProfile} target="_blank"  rel="noreferrer" >Profile Link</a>         
        </div> }    

    </div>
    )

}

export default App;
