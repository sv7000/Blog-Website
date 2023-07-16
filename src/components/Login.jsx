import {React, useState} from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../services/api";

const Component = styled(Box)`
  width: 500px;
  margin: auto;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const ImageComp = styled("img")({
  height: 50,
  width: 300,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div, & >  button{
    margin-top: 40px;
  }
 
`;

const LoginButton = styled(Button)`
     height: 50px;
     border-radius: 2px;

`

const SignupButton = styled(Button)`
    text-transform: none;
     height: 50px;
     border-radius: 2px;
     box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;

`

const Typo = styled(Typography)`
    margin-top: 30px;
    text-align: center;
    color: #878787;
`

const Error = styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height: 0;
    margin-top: 10px;
    font-weight: 600;
`


const loginValues = {
  username: '',
  password: '',
}

const signUpValues = {
  name: '',
  username: '',
  password: '',
}




const Login = () => {

   const [toggle, setToggle] = useState("login");
   const [login, setLogin] = useState(loginValues);
   const [signup, setSignup] = useState(signUpValues);
   const [error, setError] = useState('');

   const getInputValue = (e) => {
    setSignup({...signup, [e.target.name]: e.target.value});
    console.log(signup);
   }

  // api call on button click
   const signUpUser = async () => {
    console.log(signup);
      let response = await API.userSignup(signup);
      if(response.isSuccess){
        setError('');
        setSignup(signUpValues);
        setToggle('login');
      }else{
        setError('Something went wrong');
      }
   } 


  const Image =
    "https://fontmeme.com/permalink/230715/79e1c2adec809f36bce96a6017ceb703.png";
  return (
    <Component>
      <Box>
      <ImageComp src={Image} alt="Login" />
      { toggle === "login" ? (
        <Wrapper>
          <TextField id="outlined-basic" label="Enter Username" name="username" onChange={(e) => getInputValue(e)}   variant="outlined" />

          <TextField id="outlined-basic" label="Enter Password" name="password" onChange={(e) => getInputValue(e)} variant="outlined" />

          <LoginButton variant="contained">Login</LoginButton>
          <Typo >OR</Typo>
          <SignupButton onClick={() => (setToggle("signup"))}>Create an account</SignupButton>
        </Wrapper>

      ): (
        <Wrapper>
          <TextField id="outlined-basic" label="Enter Name" name="name" variant="outlined" onChange={(e) => getInputValue(e)}/>
          <TextField id="outlined-basic" label="Enter Username" name="username" variant="outlined" onChange={(e) => getInputValue(e)}/>
          <TextField id="outlined-basic" label="Enter Password" name="password" variant="outlined" onChange={(e) => getInputValue(e)}/>

          {error && <Error>{error}</Error>}
          <SignupButton onClick={()=> signUpUser()}>Sign Up</SignupButton>

          <Typo >OR</Typo>
          <LoginButton variant="contained" onClick={()=> (setToggle("login"))}>Already have an account</LoginButton>

        </Wrapper>

      )}
        
    
      </Box>
    </Component>

    
  );
};

export default Login;
