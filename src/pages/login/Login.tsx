/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { verifyToken } from "../../utils/verifiToken";
import { setUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/global.type";
import { toast } from "sonner";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const from  = location.state?.from.pathname || "/";

  const dispatch = useAppDispatch();


  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    // const toastId = toast.loading("Logging......");
    try {
      const userInfo = {
        email: values.email,
        password: values.password,
      };
      console.log("login page", userInfo);
      login(userInfo);

      // return null;
      const res = await login(userInfo).unwrap();
      console.log(res)

      // const user = verifyToken(res.data.accessToken);

      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Logged In");
      setLoading(false);
      if (user.role === "user") {
        navigate(from, { replace: true });
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error((error as any)?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="w-full flex justify-center p-10">
      <div className="max-w-[800px] px-10 py-2 rounded-lg border border-gray-200 shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Login Now</h2>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4 w-full"
        >
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

          <Form.Item>
            <Button className="btn" loading={isLoading} htmlType="submit" block>
              Login Now
            </Button>
            <div className="text-center mt-4">
              First time here? <Link to="/register">Register</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
