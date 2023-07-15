import {React, useState} from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";

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



const Login = () => {

   const [toggle, setToggle] = useState("login");


  const Image =
    "https://fontmeme.com/permalink/230715/79e1c2adec809f36bce96a6017ceb703.png";
  return (
    <Component>
      <Box>
      <ImageComp src={Image} alt="Login" />
      { toggle === "login" ? (
        <Wrapper>
          <TextField id="outlined-basic" label="Enter Username" variant="outlined" />

          <TextField id="outlined-basic" label="Enter Password" variant="outlined" />

          <LoginButton variant="contained">Login</LoginButton>
          <Typo >OR</Typo>
          <SignupButton onClick={() => (setToggle("signup"))}>Create an account</SignupButton>
        </Wrapper>

      ): (
        <Wrapper>
          <TextField id="outlined-basic" label="Enter Name" variant="outlined" />
          <TextField id="outlined-basic" label="Enter Username" variant="outlined" />
          <TextField id="outlined-basic" label="Enter Password" variant="outlined" />
          <SignupButton>Sign Up</SignupButton>

          <Typo >OR</Typo>
          <LoginButton variant="contained" onClick={()=> (setToggle("login"))}>Already have an account</LoginButton>

        </Wrapper>

      )}
        
    
      </Box>
    </Component>

    
  );
};

export default Login;
