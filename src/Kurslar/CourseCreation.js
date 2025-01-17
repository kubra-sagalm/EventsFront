import React, { useState } from "react";
import { Form, Input, Button, Select, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./CourseCreation.css";
import axios from "axios";

const { TextArea } = Input;
const { Option } = Select;

const CourseCreation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();

      // Verileri formData'ya ekliyoruz
      formData.append("courseName", values.courseName);
      formData.append("courseCategory", values.courseCategory);
      formData.append("courseAdress", values.courseAdress);
      formData.append("courseCity", values.courseCity);
      formData.append("courseDescription", values.courseDescription);
      formData.append("startCourseTime", values.startCourseTime.toISOString());
      formData.append("endCourseDateTime", values.endCourseDateTime.toISOString());

      // Görsel varsa ekliyoruz
      if (fileList[0]) {
        formData.append("Photo", fileList[0].originFileObj);
      }

      // Backend'e giden verileri konsola yazdır
      console.group("Gönderilen Veriler");
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      console.groupEnd();

      // API'ye istek gönderiyoruz
      const response = await axios.post("http://localhost:5287/api/Course", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Başarılı Yanıt:", response.data);
      message.success("Kurs başarıyla oluşturuldu!");
      navigate("/benim-kurslarim");
    } catch (error) {
      // Hataları detaylı bir şekilde logla
      console.group("Hata Detayları");
      if (error.response) {
        console.error("Hata Cevabı:", error.response.data);
        console.error("Durum Kodu:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        console.error("Sunucudan cevap alınamadı:", error.request);
      } else {
        console.error("Hata Mesajı:", error.message);
      }
      console.groupEnd();

      message.error("Kurs oluşturulurken bir hata oluştu!");
    }
  };

  return (
    <div className="course-creation-wrapper">
      <Button className="back-button" type="link" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <h1 className="course-creation-title">KURS OLUŞTURMA</h1>
      <div className="course-creation-container">
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "20px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          {/* Kurs Adı */}
          <Form.Item
            label="Kurs Adı"
            name="courseName"
            rules={[{ required: true, message: "Lütfen kurs adını girin!" }]}
          >
            <Input placeholder="Kurs adını girin" />
          </Form.Item>

          {/* Kategori */}
          <Form.Item
            label="Kategori"
            name="courseCategory"
            rules={[{ required: true, message: "Lütfen kategori seçin!" }]}
          >
            <Select placeholder="Bir kategori seçin">
              <Option value="Yazılım">Yazılım</Option>
              <Option value="Tasarım">Tasarım</Option>
              <Option value="Pazarlama">Pazarlama</Option>
              <Option value="Kişisel Gelişim">Kişisel Gelişim</Option>
              <Option value="Eğitim ve Atölyeler">Eğitim ve Atölyeler</Option>
              <Option value="Teknoloji ve Bilim">Teknoloji ve Bilim</Option>
            </Select>
          </Form.Item>

          {/* Başlangıç ve Bitiş Tarihi */}
          <Form.Item
            label="Başlangıç Zamanı"
            name="startCourseTime"
            rules={[{ required: true, message: "Başlangıç zamanını girin!" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Bitiş Zamanı"
            name="endCourseDateTime"
            rules={[{ required: true, message: "Bitiş zamanını girin!" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
          </Form.Item>

          {/* Konum Bilgileri */}
          <Form.Item
            label="Şehir"
            name="courseCity"
            rules={[{ required: true, message: "Lütfen bir şehir seçin!" }]}
          >
            <Select placeholder="Bir şehir seçin">
              <Option value="İstanbul">İstanbul</Option>
              <Option value="Ankara">Ankara</Option>
              <Option value="İzmir">İzmir</Option>
              <Option value="Bursa">Bursa</Option>
              <Option value="Antalya">Antalya</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Adres"
            name="courseAdress"
            rules={[{ required: true, message: "Lütfen adres girin!" }]}
          >
            <Input placeholder="Kurs adresini girin" />
          </Form.Item>

          {/* Görsel Yükleme */}
          <Form.Item label="Kurs Görseli">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
            </Upload>
          </Form.Item>

          {/* Açıklama */}
          <Form.Item
            label="Açıklama"
            name="courseDescription"
            rules={[{ required: true, message: "Lütfen açıklama girin!" }]}
          >
            <TextArea rows={6} placeholder="Kurs açıklamasını girin" />
          </Form.Item>

          {/* Gönder Butonu */}
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Kaydet
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default CourseCreation;
