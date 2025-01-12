import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, Select, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const EventCreation = () => {
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

  const onFinish = () => {
    message.success("Etkinlik başarıyla oluşturuldu!");
    navigate("/benim-etkinliklerim");
  };

  const steps = [
    {
      title: "Genel Bilgi",
      content: (
        <div>
          <h3>Etkinlik Bilgileri</h3>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Etkinlik Adı"
              name="eventName"
              rules={[{ required: true, message: "Lütfen etkinlik adını girin!" }]}
            >
              <Input placeholder="Etkinlik adını girin" />
            </Form.Item>
            <Form.Item
              label="Kategori"
              name="category"
              rules={[{ required: true, message: "Lütfen kategori seçin!" }]}
            >
              <Select placeholder="Bir kategori seçin">
                <Option value="Konferans">Konferans</Option>
                <Option value="Workshop">Workshop</Option>
                <Option value="Seminer">Seminer</Option>
                <Option value="Eğitim">Eğitim</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Maksimum Katılımcı Sayısı"
              name="maxParticipants"
              rules={[{ required: true, message: "Lütfen maksimum katılımcı sayısını girin!" }]}
            >
              <Select placeholder="Katılımcı sayısını seçin">
                <Option value="10-20">10-20</Option>
                <Option value="20-30">20-30</Option>
                <Option value="30-40">30-40</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Zamanlama",
      content: (
        <div>
          <h3>Etkinlik Zamanlaması</h3>
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Başlangıç Zamanı"
              name="startTime"
              rules={[{ required: true, message: "Başlangıç zamanını girin!" }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item
              label="Bitiş Zamanı"
              name="endTime"
              rules={[{ required: true, message: "Bitiş zamanını girin!" }]}
            >
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Konum",
      content: (
        <div>
          <h3>Etkinlik Konumu</h3>
          <Form layout="vertical" form={form}>
            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                label="İl"
                name="city"
                rules={[{ required: true, message: "Lütfen bir şehir seçin!" }]}
                style={{ flex: 1 }}
              >
                <Select placeholder="Bir il seçin">
                  <Option value="İstanbul">İstanbul</Option>
                  <Option value="Ankara">Ankara</Option>
                  <Option value="İzmir">İzmir</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Adres"
                name="address"
                rules={[{ required: true, message: "Lütfen adres girin!" }]}
                style={{ flex: 2 }}
              >
                <Input placeholder="Etkinlik adresini girin" />
              </Form.Item>
            </div>
          </Form>
        </div>
      ),
    },
    {
      title: "Görsel Yükleme",
      content: (
        <div>
          <h3>Etkinlik Görseli</h3>
          <Form layout="vertical">
            <Form.Item label="Görsel Yükle">
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
        </div>
      ),
    },
    {
      title: "Açıklama",
      content: (
        <div>
          <h3>Etkinlik Açıklaması</h3>
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Açıklama"
              name="description"
              rules={[{ required: true, message: "Lütfen açıklama girin!" }]}
            >
              <TextArea
                rows={6}
                placeholder="Etkinlik açıklamasını girin"
                style={{
                  fontSize: "16px",
                  padding: "10px",
                  borderRadius: "8px",
                  width: "100%",
                }}
              />
            </Form.Item>
          </Form>
        </div>
      ),
    },
  ];

  return (
    <div className="event-creation-wrapper">
      <Button className="back-button" type="link" onClick={() => navigate(-1)}>
        ← Geri
      </Button>
      <h1 className="event-creation-title">Etkinlik Oluşturma</h1>
      <div className="event-creation-container">
        <div className="event-creation-card">
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
      {/* Avatar Alt Sol Kısım */}
      <div className="cute-avatar-wrapper">
        <img src="/assets/cute-avatar.png" alt="Cute Avatar" className="cute-avatar" />
        <div className="cute-avatar-text">
          <p className="line1">👋 Merhaba!</p>
          <p className="line2">Haydi birlikte harika bir etkinlik oluşturalım! 🌟🎉</p>
        </div>
      </div>
    </div>
  );
};

export default EventCreation;
