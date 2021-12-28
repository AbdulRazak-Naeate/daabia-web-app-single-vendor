import './login.css'
import axios from 'axios';
import {useState} from'react';
import { Link,useHistory } from 'react-router-dom';
import {Typography,Button}  from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


function Signin({handleCloseModal}) {
          const [email,setEmail]=useState('');
          const [password,setPassword]=useState('');
          const [error,setError]=useState(false);
          const history=useHistory();

          const onFormSubmit=(e)=>{

            e.preventDefault();
      
            LogIn().then((response)=>{
              const user = response.data;
              localStorage.setItem('_id', user._id);
              localStorage.setItem('user', JSON.stringify(user));
              localStorage.setItem('loggedin',true);

             // localStorage.setItem('auth-token',response.headers)
      
              //console.log(response.headers[2]);
               
              handleCloseModal();
             history.push("/account");
            }).catch((error) =>{
               setError(true);
              console.log(error)
            });
            
          }
         
      
        const LogIn = () =>{
          
          const url ='http://localhost:3001/api/user/login';
      
          return  axios.post(url, {
           email: email ,
           password: password,
         });
          
         };

        
  return (
    <div className="login">
      <div className="logInLeft"></div>
      <div className="logInMiddle">
                    <div className="loginFormWrapper">
                  <div className="logInTitle">
                    <h1 className="title">LogIn</h1>
                  </div>
                    <form  className="loginForm" onSubmit={onFormSubmit}>
                        <div className="loginItem">
                            <label>UserName/Email</label>
                            <input type="text"  className="loginInput" required onChange={(e)=>{setEmail(e.target.value)}}/>
                        </div>
                       
                        <div className="loginItem">
                            <label>Password</label>
                            <input type="password"  className="loginInput" required onChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <div className="loginItem">
                        <label className="error">{!error?'':'email or password incorrect'}</label>
                        </div>
                         <div className="signUpLoginItem">
                         <Button type="submit" fullWidth variant="contained" color="primary" className="btnLogIn">LogIn</Button>
                      {/*  <Link to="/signup" className="link">
                       <button className="btnSignUp">SignUp</button>
                       </Link>
 */}
                         </div>
                    </form>
                    </div>
              
      </div>
      <div className="logInRight"></div>
    </div>
  )
}

export default Signin
