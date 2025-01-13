import React from "react";
import { Form, Input, Button, Select, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Link } = Typography;
const { Option } = Select;

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      age: parseInt(values.age, 10),
      phoneNumber: values.phoneNumber,
      gender: values.gender === "male", // true for male, false for female
    };

    try {
      const response = await fetch("http://localhost:5287/api/User", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Kayıt başarılı:", data);
        message.success("Kayıt başarılı!");
        navigate("/login"); // Giriş sayfasına yönlendirme
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Kayıt başarısız!");
      }
    } catch (error) {
      console.error("Kayıt hatası:", error);
      message.error("Bir hata oluştu!");
    }
  };

  const goToLogin = () => {
    navigate("/login"); // Giriş sayfasına yönlendirme
  };

  return (
    <Card style={{ width: 400, margin: "100px auto", padding: "20px" }}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: "20px", color: "#7b61ff" }}
      >
        Kayıt Ol
      </Typography.Title>
      <Form name="register_form" onFinish={onFinish}>
        <Form.Item
          name="firstName"
          rules={[{ required: true, message: "Lütfen adınızı girin!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Ad" size="large" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Lütfen soyadınızı girin!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Soyad" size="large" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Lütfen e-posta adresinizi girin!" },
            { type: "email", message: "Geçerli bir e-posta girin!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-posta" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Lütfen şifrenizi girin!" },
            { min: 6, message: "Şifreniz en az 6 karakter olmalıdır!" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Şifre"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          rules={[{ required: true, message: "Lütfen telefon numaranızı girin!" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Telefon" size="large" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Lütfen yaşınızı girin!" }]}
        >
          <Input placeholder="Yaş" size="large" type="number" />
        </Form.Item>
        <Form.Item
          name="gender"
          rules={[{ required: true, message: "Lütfen cinsiyetinizi seçin!" }]}
        >
          <Select placeholder="Cinsiyet" size="large">
            <Option value="male">Erkek</Option>
            <Option value="female">Kadın</Option>
          </Select>
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
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: "center" }}>
        <Link onClick={goToLogin} style={{ color: "#7b61ff", cursor: "pointer" }}>
          Zaten bir hesabınız var mı? Giriş Yap
        </Link>
      </div>
    </Card>
  );
};

export default Register;
