

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
  
    const [login] = useLoginMutation();
  
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
  
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
  
        const res = await login(userInfo).unwrap();
        // const user = verifyToken(res.data.accessToken);
  
        const user = verifyToken(res.data.accessToken) as TUser;
        dispatch(setUser({ user: user, token: res.data.accessToken }));
        toast.success("Logged In");
        setLoading(false);
        if(user.role === 'user'){
          navigate('/auth/new-user-cart')
        }else{
  
          navigate(`/${user?.role}/dashboard`);
        }
      } catch (error) {
        toast.error((error as any)?.data?.message || "An error occurred");
      }
    };
    return (
        <div className="w-full flex justify-center p-10">
      <div className="max-w-[500px] p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Now</h2>
        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
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
              Already registered? <Link to="/auth/login">Login</Link>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
    );
};

export default Login;