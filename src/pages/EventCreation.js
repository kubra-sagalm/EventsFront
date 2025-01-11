import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, Select, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const EventCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Animasyonu başlatmak için CSS sınıfını ekleyin
    const text = document.querySelector(".cute-avatar-text");
    text.classList.add("animated-text");
  }, []);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Genel Bilgi",
      content: (
        <div>
          <h3>Etkinlik Bilgileri</h3>
          <Form layout="vertical">
            <Form.Item label="Etkinlik Adı" name="eventName" required>
              <Input placeholder="Etkinlik adını girin" />
            </Form.Item>
            <Form.Item label="Kategori" name="category" required>
              <Input placeholder="Etkinlik kategorisini girin" />
            </Form.Item>
            <Form.Item label="Maksimum Katılımcı Sayısı" name="maxParticipants" required>
              <Select placeholder="Katılımcı sayısını seçin">
                <Option value="10-20">10-20</Option>
                <Option value="20-30">20-30</Option>
                <Option value="30-40">30-40</Option>
                <Option value="40-50">40-50</Option>
                <Option value="50-100">50-100</Option>
                <Option value="100-150">100-150</Option>
                <Option value="150-200">150-200</Option>
                <Option value="200-300">200-300</Option>
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
          <Form layout="vertical">
            <Form.Item label="Başlangıç Zamanı" name="startTime" required>
              <DatePicker showTime format="YYYY-MM-DD HH:mm" />
            </Form.Item>
            <Form.Item label="Bitiş Zamanı" name="endTime" required>
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
          <Form layout="vertical">
            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item label="İl" name="city" style={{ flex: 1 }} required>
                <Select placeholder="Bir il seçin">
                  <Option value="istanbul">İstanbul</Option>
                  <Option value="ankara">Ankara</Option>
                  <Option value="izmir">İzmir</Option>
                  <Option value="antalya">Antalya</Option>
                  <Option value="bursa">Bursa</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Adres" name="address" style={{ flex: 2 }} required>
                <Input placeholder="Etkinlik adresini girin" />
              </Form.Item>
            </div>
          </Form>
        </div>
      ),
    },
    {
      title: "Açıklama",
      content: (
        <div>
          <h3>Etkinlik Açıklaması</h3>
          <Form layout="vertical">
            <Form.Item label="Açıklama" name="description" required>
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
            {currentStep === steps.length - 1 && <Button type="primary">Bitir</Button>}
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
