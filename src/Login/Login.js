import React from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const { Link } = Typography;

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await fetch("http://localhost:5287/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        message.success("Giriş başarılı!");
        navigate("/home");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Giriş başarısız!");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
      message.error("Bir hata oluştu!");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      {/* Arka plandaki yazı */}
      <div className="background-text">
       <br />
        <span style={{ fontSize: "40px", fontWeight: "normal" }}>
          Hayalindeki etkinlikleri oluştur ve paylaş!
        </span>
      </div>

      {/* Login Kartı */}
      <Card className="login-card">
        <Typography.Title
          level={3}
          style={{ textAlign: "center", marginBottom: "20px", color: "#7b61ff" }}
        >
          Giriş Yap
        </Typography.Title>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Lütfen e-posta adresinizi girin!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="E-posta"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Lütfen şifrenizi girin!" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Şifre"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: "100%",
                background: "#7b61ff",
                borderColor: "#7b61ff",
              }}
            >
              Giriş Yap
            </Button>
          </Form.Item>
        </Form>
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <Link onClick={goToRegister} style={{ color: "#7b61ff", cursor: "pointer" }}>
            Henüz hesabınız yok mu? Kayıt Ol
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default Login;
