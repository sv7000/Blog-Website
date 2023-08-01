import { React, useState, useContext } from "react";
import { Box, TextField, Button, styled, Typography } from "@mui/material";
import { API } from "../../services/api";
import { DataContext } from "../../context/DataProvider";
import { useNavigate } from "react-router-dom";

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
  & > div,
  & > button {
    margin-top: 40px;
  }
`;

const LoginButton = styled(Button)`
  height: 50px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  height: 50px;
  border-radius: 2px;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;

const Typo = styled(Typography)`
  margin-top: 30px;
  text-align: center;
  color: #878787;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signUpInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [toggle, setToggle] = useState("login");
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signUpInitialValues);
  const [error, setError] = useState("");

  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const getSignupValue = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
    console.log(signup);
  };

  const getLoginValue = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    console.log(login);
  };

  // api call on button click
  const signUpUser = async () => {
    console.log(signup);
    let response = await API.userSignup(signup);
    if (response.isSuccess) {
      setError("");
      setSignup(signUpInitialValues);
      setToggle("login");
    } else {
      console.log("here");
      setError("Something went wrong");
      console.log(error);
    }
  };

  //login api call
  const loginInUser = async () => {
    let response = await API.userLogin(login);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.data.accessToken}`
      );
      sessionStorage.setItem(
        "refreshToken",
        `Bearer ${response.data.refreshToken}`
      );
      setAccount({
        name: response.data.name,
        username: response.data.username,
      });

      isUserAuthenticated(true);
      // setLogin(loginInitialValues);
      navigate("/");
    } else {
      setError("Something went wrong");
    }
  };

  const Image =
    "https://fontmeme.com/permalink/230715/79e1c2adec809f36bce96a6017ceb703.png";
  return (
    <Component>
      <Box>
        <ImageComp src={Image} alt="Login" />
        {toggle === "login" ? (
          <Wrapper>
            <TextField
              id="outlined-basic"
              label="Enter Username"
              value={login.username}
              name="username"
              onChange={(e) => getLoginValue(e)}
              variant="outlined"
            />

            <TextField
              id="outlined-basic"
              label="Enter Password"
              value={login.password}
              name="password"
              onChange={(e) => getLoginValue(e)}
              variant="outlined"
            />

            <LoginButton onClick={() => loginInUser()} variant="contained">
              Login
            </LoginButton>
            <Typo>OR</Typo>
            <SignupButton onClick={() => setToggle("signup")}>
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              id="outlined-basic"
              label="Enter Name"
              name="name"
              variant="outlined"
              onChange={(e) => getSignupValue(e)}
            />
            <TextField
              id="outlined-basic"
              label="Enter Username"
              name="username"
              variant="outlined"
              onChange={(e) => getSignupValue(e)}
            />
            <TextField
              id="outlined-basic"
              label="Enter Password"
              name="password"
              variant="outlined"
              onChange={(e) => getSignupValue(e)}
            />

            {error && <Error>{error}</Error>}
            <SignupButton onClick={() => signUpUser()}>Sign Up</SignupButton>

            <Typo>OR</Typo>
            <LoginButton variant="contained" onClick={() => setToggle("login")}>
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
