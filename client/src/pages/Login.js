import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/v1/users/login",
            {
                ...values
            });

            const userdata= await response.data;
            if(response.status===200){
              setLoading(false);
              localStorage.setItem('shey-money',JSON.stringify(userdata.user));
              navigate('/');
            console.log(userdata);}
            else{
                console.log(userdata);
            }
        } catch (error) {

            console.log(error);
            setLoading(false);
        }
  };
  return (
    <div className="login-form">
      {loading && <Spinner />}
      <h1 className="reg-title">Shey money login</h1>
      <div className="login">
        <div className="row justify-content-center w-100 h-100">
          
          <div className="col-md-5">
            <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
              {/* Email */}
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input type="email" />
              </Form.Item>
              {/* Password */}
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input type="password" />
              </Form.Item>

              <div className="d-flex justify-content-around align-items-center">
                <Link to="/register">Not registered?, click here to Register</Link>

                <Form.Item label=" ">
                  <Button type="primary" htmlType="submit" className="primary">
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
          <div className="col-md-5">
            <div className="lottie">
              <lottie-player
                src="https://assets4.lottiefiles.com/packages/lf20_06a6pf9i.json"
                background="transparent"
                speed="1"
                loop
                autoplay
              ></lottie-player>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
