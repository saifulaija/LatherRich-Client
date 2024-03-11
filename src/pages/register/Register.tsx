/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "sonner";


import { TResponse, TUser } from "../../types/global.type";
import { useCreateUserMutation } from "../../redux/features/user/userApi";

const Register = () => {
 

  const [register,{isLoading}] = useCreateUserMutation();
  const navigate = useNavigate();

  const onFinish = async (values: {
    userName: string;
    email: string;
    password: string;
   
   
  }) => {
    const userInfo = {
      userName: values.userName,
      email: values.email,
      password: values.password,
      role: "user",
    };





    try {
      const res = (await register(userInfo)) as TResponse<TUser>;
      console.log(res);
      if (res?.error) {
        toast.error(res?.error?.data?.message);
      } else {
        navigate("/login");
        toast.success("user  created successfully");
      }
    } catch (err) {
      toast.error("something went wrong");
    }
  };

  return (
   

    <div className="w-full flex justify-center p-10">
      <div className="max-w-[500px] p-8 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Now</h2>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            label="Your Name"
            name="userName"
            rules={[
              { required: true, message: "Please input your userName" },
              { type: "string", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input your email" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please input your password" },
              {
                min: 6,
                message: "Password must be at least 6 characters long",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <p className="text-gray-600 text-sm">
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our privacy policy.
          </p>

          <Form.Item>
            <Button loading={isLoading} htmlType="submit" block>
              Submit
            </Button>
            <div className="text-center mt-4">
              Already registered? <Link to="/login">Login</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
