import React, { useState } from "react";
import { Steps, Form, Input, Button, Select, DatePicker, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CourseCreation.css";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const CourseCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append("courseName", values.courseName);
      formData.append("courseCategory", values.courseCategory);
      formData.append("courseAdress", values.courseAdress);
      formData.append("courseCity", values.courseCity);
      formData.append("courseDescription", values.courseDescription);
      formData.append("startCourseTime", values.startCourseTime);
      formData.append("endCourseDateTime", values.endCourseDateTime);

      if (fileList[0]) {
        formData.append("courseImage", fileList[0].originFileObj);
      }

      await axios.post("/api/courses", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Kurs başarıyla oluşturuldu!");
      navigate("/benim-kurslarim");
    } catch (error) {
      message.error("Kurs oluşturulurken bir hata oluştu!");
      console.error(error);
    }
  };

  const steps = [
    {
      title: "Genel Bilgi",
      content: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Kurs Adı"
            name="courseName"
            rules={[{ required: true, message: "Lütfen kurs adını girin!" }]}
          >
            <Input placeholder="Kurs adını girin" />
          </Form.Item>
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
            </Select>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Zamanlama",
      content: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Başlangıç Zamanı"
            name="startCourseTime"
            rules={[{ required: true, message: "Başlangıç zamanını girin!" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
          <Form.Item
            label="Bitiş Zamanı"
            name="endCourseDateTime"
            rules={[{ required: true, message: "Bitiş zamanını girin!" }]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm" />
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Konum",
      content: (
        <Form layout="vertical" form={form}>
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
        </Form>
      ),
    },
    {
      title: "Görsel Yükleme",
      content: (
        <Form layout="vertical">
          <Form.Item label="Kurs Görseli" name="courseImage">
            <Upload
              beforeUpload={() => false}
              fileList={fileList}
              onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              accept="image/*"
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: "Açıklama",
      content: (
        <Form layout="vertical" form={form}>
          <Form.Item
            label="Açıklama"
            name="courseDescription"
            rules={[{ required: true, message: "Lütfen açıklama girin!" }]}
          >
            <TextArea
              rows={6}
              placeholder="Kurs açıklamasını girin"
              style={{
                fontSize: "16px",
                padding: "10px",
                borderRadius: "8px",
                width: "100%",
              }}
            />
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="course-creation-wrapper">
      <Button className="back-button" type="link" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <h1 className="course-creation-title">Kurs Oluşturma</h1>
      <div className="course-creation-container">
        <div className="course-creation-card">
          <Steps current={currentStep}>
            {steps.map((item, index) => (
              <Step key={index} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[currentStep].content}</div>
          <div className="steps-action">
            {currentStep > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={prev}>
                Önceki
              </Button>
            )}
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Sonraki
              </Button>
            )}
            {currentStep === steps.length - 1 && (
              <Button type="primary" onClick={() => form.submit()}>
                Bitir
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCreation;
