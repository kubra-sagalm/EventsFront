import React, { useState, useEffect } from "react";
import { Steps, Form, Input, Button, Select, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";
import { useLocation } from "react-router-dom";

const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;

const EventCreation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); // Düzenleme verilerini almak için
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  // Düzenleme modunu kontrol edin
  const editingEvent = location.state || null; // Eğer düzenleme için veri gelmezse null
  const isEditing = !!editingEvent; // Düzenleme modunda olup olmadığını kontrol edin

  useEffect(() => {
    if (isEditing) {
      // Gelen düzenleme verilerini form alanlarına set edin
      form.setFieldsValue({
        eventName: editingEvent.eventName,
        category: editingEvent.category,
        maxParticipants: editingEvent.maxEventParticipantNumber,
        startTime: editingEvent.startEventTime ? DatePicker.format(editingEvent.startEventTime) : null,
        endTime: editingEvent.endventDateTime ? DatePicker.format(editingEvent.endventDateTime) : null,
        city: editingEvent.city,
        address: editingEvent.adress,
        description: editingEvent.description,
      });

      // Eğer görsel varsa fileList'e ekleyin
      if (editingEvent.photoUrl) {
        setFileList([
          {
            uid: "-1",
            name: "Etkinlik Görseli",
            status: "done",
            url: editingEvent.photoUrl,
          },
        ]);
      }
    }
  }, [isEditing, editingEvent, form]);

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onFinish = async (values) => {
    try {
      if (!values.startTime || !values.endTime) {
        message.error("Lütfen başlangıç ve bitiş zamanlarını girin!");
        return;
      }

      const startTime = values.startTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const endTime = values.endTime.utc().format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      const formData = new FormData();
      formData.append("eventName", values.eventName);
      formData.append("description", values.description);
      formData.append("startEventTime", startTime);
      formData.append("endventDateTime", endTime);
      formData.append("adress", values.address);
      formData.append("city", values.city);
      formData.append("category", values.category);
      formData.append("maxEventParticipantNumber", values.maxParticipants);

      if (fileList.length > 0) {
        formData.append("photo", fileList[0].originFileObj || fileList[0].url);
      }

      const url = isEditing
        ? `http://localhost:5287/api/Event/${editingEvent.id}`
        : "http://localhost:5287/api/Event";

      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        message.success(
          isEditing ? "Etkinlik başarıyla güncellendi!" : "Etkinlik başarıyla oluşturuldu!"
        );
        navigate("/benim-etkinliklerim");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "İşlem başarısız oldu!");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      message.error("Bir hata oluştu!");
    }
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
          {/* Tarih formunu buraya yerleştiriyoruz */}
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Başlangıç Zamanı"
              name="startTime"
              rules={[{ required: true, message: "Başlangıç zamanını girin!" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              label="Bitiş Zamanı"
              name="endTime"
              rules={[{ required: true, message: "Bitiş zamanını girin!" }]}
            >
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Kaydet
              </Button>
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
