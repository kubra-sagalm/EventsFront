import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  Upload,
  message,
  Card,
} from "antd";
import { UploadOutlined, LeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./EventCreation.css";

const { TextArea } = Input;
const { Option } = Select;

const EventCreation = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const onFinish = async (values) => {
    try {
      if (!values.startTime || !values.endTime) {
        message.error("Lütfen başlangıç ve bitiş zamanlarını doldurun!");
        return;
      }

      const startTime = values.startTime.toISOString();
      const endTime = values.endTime.toISOString();

      const formData = new FormData();
      formData.append("eventName", values.eventName);
      formData.append("description", values.description);
      formData.append("startEventTime", startTime);
      formData.append("endventDateTime", endTime);
      formData.append("adress", values.address);
      formData.append("city", values.city);
      formData.append("category", values.category);
      formData.append("maxEventParticipantNumber", values.maxParticipants);

      if (fileList[0]) {
        formData.append("photo", fileList[0].originFileObj);
      }

      const response = await fetch("http://localhost:5287/api/Event", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        message.success("Etkinlik başarıyla oluşturuldu!");
        navigate("/benim-etkinliklerim");
      } else {
        const errorData = await response.json();
        message.error(errorData.message || "Etkinlik oluşturulamadı!");
      }
    } catch (error) {
      message.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="event-creation-wrapper">
<Button 
  className="back-button" 
  type="link" 
  onClick={() => navigate(-1)} 
>
  <LeftOutlined /> Geri
</Button>

      <h1 className="event-creation-title">Etkinlik Oluşturma</h1>

      <Card className="info-card">
        <div className="info-header">
          <h2>Etkinlik Oluşturma Kuralları</h2>
        </div>
        <ul className="info-list">
          <li>✓ Etkinlik adı ve açıklaması detaylı olmalıdır</li>
          <li>✓ Etkinlik tarihi bugünden sonra olmalıdır</li>
          <li>✓ Katılımcı sayısı en az 10 kişi olmalıdır</li>
          <li>✓ Etkinlik görseli yüksek kalitede olmalıdır</li>
          <li>✓ Adres bilgileri eksiksiz girilmelidir</li>
        </ul>
      </Card>
      <Form
  layout="vertical"
  form={form}
  onFinish={onFinish}
  initialValues={{
    startTime: null,
    endTime: null,
  }}
  style={{ width: "100%", maxWidth: "800px" }}
>
  {/* Ad ve Kategori */}
  <div className="form-row">
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
        <Option value="Spor">Spor</Option>
        <Option value="Sanat ve Eğlence">Sanat ve Eğlence</Option>
        <Option value="Eğitim ve Atölyeler">Eğitim ve Atölyeler</Option>
        <Option value="Teknoloji ve Bilim">Teknoloji ve Bilim</Option>
        <Option value="Topluluk ve Sosyal">Topluluk ve Sosyal</Option>
        <Option value="Yeme-İçme">Yeme-İçme</Option>
        <Option value="Doğa ve Gezi">Doğa ve Gezi</Option>
        <Option value="Sağlık ve Wellness">Sağlık ve Wellness</Option>
        <Option value="Kültür ve Geleneksel">Kültür ve Geleneksel</Option>
      </Select>
    </Form.Item>
  </div>

  {/* Katılımcı Sayısı ve Şehir */}
  <div className="form-row">
    <Form.Item
      label="Maksimum Katılımcı Sayısı"
      name="maxParticipants"
      rules={[{ required: true, message: "Lütfen katılımcı sayısını girin!" }]}
    >
      <Input type="number" placeholder="Katılımcı sayısını girin" />
    </Form.Item>
    <Form.Item
      label="Şehir"
      name="city"
      rules={[{ required: true, message: "Lütfen şehir seçin!" }]}
    >
      <Select placeholder="Bir şehir seçin">
        <Option value="Adana">Adana</Option>
        <Option value="Adıyaman">Adıyaman</Option>
        <Option value="Afyonkarahisar">Afyonkarahisar</Option>
        <Option value="Ağrı">Ağrı</Option>
        <Option value="Aksaray">Aksaray</Option>
        <Option value="Amasya">Amasya</Option>
        <Option value="Ankara">Ankara</Option>
        <Option value="Antalya">Antalya</Option>
        <Option value="Ardahan">Ardahan</Option>
        <Option value="Artvin">Artvin</Option>
        <Option value="Aydın">Aydın</Option>
        <Option value="Balıkesir">Balıkesir</Option>
        <Option value="Bartın">Bartın</Option>
        <Option value="Batman">Batman</Option>
        <Option value="Bayburt">Bayburt</Option>
        <Option value="Bilecik">Bilecik</Option>
        <Option value="Bingöl">Bingöl</Option>
        <Option value="Bitlis">Bitlis</Option>
        <Option value="Bolu">Bolu</Option>
        <Option value="Burdur">Burdur</Option>
        <Option value="Bursa">Bursa</Option>
        <Option value="Çanakkale">Çanakkale</Option>
        <Option value="Çankırı">Çankırı</Option>
        <Option value="Çorum">Çorum</Option>
        <Option value="Denizli">Denizli</Option>
        <Option value="Diyarbakır">Diyarbakır</Option>
        <Option value="Düzce">Düzce</Option>
        <Option value="Edirne">Edirne</Option>
        <Option value="Elazığ">Elazığ</Option>
        <Option value="Erzincan">Erzincan</Option>
        <Option value="Erzurum">Erzurum</Option>
        <Option value="Eskişehir">Eskişehir</Option>
        <Option value="Gaziantep">Gaziantep</Option>
        <Option value="Giresun">Giresun</Option>
        <Option value="Gümüşhane">Gümüşhane</Option>
        <Option value="Hakkâri">Hakkâri</Option>
        <Option value="Hatay">Hatay</Option>
        <Option value="Iğdır">Iğdır</Option>
        <Option value="Isparta">Isparta</Option>
        <Option value="İstanbul">İstanbul</Option>
        <Option value="İzmir">İzmir</Option>
        <Option value="Kahramanmaraş">Kahramanmaraş</Option>
        <Option value="Karabük">Karabük</Option>
        <Option value="Karaman">Karaman</Option>
        <Option value="Kars">Kars</Option>
        <Option value="Kastamonu">Kastamonu</Option>
        <Option value="Kayseri">Kayseri</Option>
        <Option value="Kırıkkale">Kırıkkale</Option>
        <Option value="Kırklareli">Kırklareli</Option>
        <Option value="Kırşehir">Kırşehir</Option>
        <Option value="Kilis">Kilis</Option>
        <Option value="Kocaeli">Kocaeli</Option>
        <Option value="Konya">Konya</Option>
        <Option value="Kütahya">Kütahya</Option>
        <Option value="Malatya">Malatya</Option>
        <Option value="Manisa">Manisa</Option>
        <Option value="Mardin">Mardin</Option>
        <Option value="Mersin">Mersin</Option>
        <Option value="Muğla">Muğla</Option>
        <Option value="Muş">Muş</Option>
        <Option value="Nevşehir">Nevşehir</Option>
        <Option value="Niğde">Niğde</Option>
        <Option value="Ordu">Ordu</Option>
        <Option value="Osmaniye">Osmaniye</Option>
        <Option value="Rize">Rize</Option>
        <Option value="Sakarya">Sakarya</Option>
        <Option value="Samsun">Samsun</Option>
        <Option value="Şanlıurfa">Şanlıurfa</Option>
        <Option value="Siirt">Siirt</Option>
        <Option value="Sinop">Sinop</Option>
        <Option value="Şırnak">Şırnak</Option>
        <Option value="Sivas">Sivas</Option>
        <Option value="Tekirdağ">Tekirdağ</Option>
        <Option value="Tokat">Tokat</Option>
        <Option value="Trabzon">Trabzon</Option>
        <Option value="Tunceli">Tunceli</Option>
        <Option value="Uşak">Uşak</Option>
        <Option value="Van">Van</Option>
        <Option value="Yalova">Yalova</Option>
        <Option value="Yozgat">Yozgat</Option>
        <Option value="Zonguldak">Zonguldak</Option>
      </Select>
    </Form.Item>
  </div>


  {/* Başlangıç ve Bitiş Zamanı */}
  <div className="form-row">
    <Form.Item
      label="Başlangıç Zamanı"
      name="startTime"
      rules={[{ required: true, message: "Lütfen başlangıç zamanını seçin!" }]}
    >
      <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
    </Form.Item>
    <Form.Item
      label="Bitiş Zamanı"
      name="endTime"
      rules={[{ required: true, message: "Lütfen bitiş zamanını seçin!" }]}
    >
      <DatePicker showTime format="YYYY-MM-DD HH:mm" style={{ width: "100%" }} />
    </Form.Item>
  </div>

  {/* Adres */}
  <Form.Item
    label="Adres"
    name="address"
    rules={[{ required: true, message: "Lütfen adres girin!" }]}
    className="form-item-wide"
  >
    <Input placeholder="Etkinlik adresini girin" />
  </Form.Item>

  {/* Görsel Yükleme */}
  <Form.Item label="Görsel Yükle" className="form-item-wide">
    <Upload
      beforeUpload={() => false}
      fileList={fileList}
      onChange={({ fileList: newFileList }) => setFileList(newFileList)}
      accept="image/*"
      maxCount={1}
      showUploadList={true}
    >
      <Button icon={<UploadOutlined />} className="upload-button">
        Etkinlik Görseli Yükle
      </Button>
    </Upload>
  </Form.Item>

  {/* Açıklama */}
  <Form.Item
    label="Açıklama"
    name="description"
    rules={[{ required: true, message: "Lütfen açıklama girin!" }]}
    className="form-item-wide"
  >
    <TextArea rows={6} placeholder="Etkinlik açıklamasını girin" />
  </Form.Item>

  <Button type="primary" htmlType="submit">
    Kaydet
  </Button>
</Form>

    </div>
  );
};

export default EventCreation;
