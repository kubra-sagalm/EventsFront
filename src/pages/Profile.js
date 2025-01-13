import React, { useState, useEffect } from "react";
import { Form, Input, Button, Upload, Select, message } from "antd";
import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import "./Profile.css"; 

const { Option } = Select;

const cities = [
  "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Aksaray", "Amasya", "Ankara",
  "Antalya", "Ardahan", "Artvin", "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt",
  "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa", "Çanakkale", "Çankırı",
  "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ", "Erzincan", "Erzurum",
  "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkâri", "Hatay", "Iğdır", "Isparta",
  "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri",
  "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya",
  "Manisa", "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye",
  "Rize", "Sakarya", "Samsun", "Şanlıurfa", "Siirt", "Sinop", "Sivas", "Şırnak", "Tekirdağ",
  "Tokat", "Trabzon", "Tunceli", "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

const Profile = () => {
  const [form] = Form.useForm();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // Düzenleme modunu kontrol eder

  useEffect(() => {
    // LocalStorage'dan kullanıcı bilgilerini yükleme
    const savedData = JSON.parse(localStorage.getItem("userProfile"));
    if (savedData) {
      form.setFieldsValue(savedData);
      setProfilePhoto(savedData.profilePhoto);
    }
  }, [form]);

  const handleFinish = (values) => {
    // Profil fotoğrafını ekle ve bilgileri kaydet
    const profileData = { ...values, profilePhoto };
    localStorage.setItem("userProfile", JSON.stringify(profileData));
    message.success("Profil bilgileri başarıyla kaydedildi!");
    setIsEditing(false); // Düzenleme modunu kapat
  };

  const handlePhotoUpload = (info) => {
    if (info.file.status === "done") {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target.result);
        message.success("Profil fotoğrafı başarıyla yüklendi!");
      };
      reader.readAsDataURL(info.file.originFileObj);
    }
  };

  const toggleEdit = () => {
    setIsEditing(true); // Düzenleme modunu aç
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">Profil Bilgileri</h2>
      
      {!isEditing ? (
        <div className="profile-view-mode">
          <p><strong>Kullanıcı Adı:</strong> {form.getFieldValue("username") || "—"}</p>
          <p><strong>E-posta:</strong> {form.getFieldValue("email") || "—"}</p>
          <p><strong>Telefon:</strong> {form.getFieldValue("phone") || "—"}</p>
          <p><strong>Şehir:</strong> {form.getFieldValue("city") || "—"}</p>
          {profilePhoto && (
            <div className="profile-photo-container">
              <img src={profilePhoto} alt="Profil" className="profile-photo" />
            </div>
          )}
          <Button
            icon={<EditOutlined />}
            type="primary"
            onClick={toggleEdit}
            className="edit-button"
          >
            Düzenle
          </Button>
        </div>
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            username: "",
            email: "",
            phone: "",
            city: "",
          }}
          className="profile-form"
        >
          <Form.Item
            label="Kullanıcı Adı"
            name="username"
            rules={[{ required: true, message: "Lütfen kullanıcı adınızı girin!" }]}
          >
            <Input placeholder="Kullanıcı adı" />
          </Form.Item>
          <Form.Item
            label="E-posta"
            name="email"
            rules={[
              { required: true, message: "Lütfen e-posta adresinizi girin!" },
              { type: "email", message: "Geçerli bir e-posta adresi girin!" },
            ]}
          >
            <Input placeholder="E-posta" />
          </Form.Item>
          <Form.Item
            label="Telefon"
            name="phone"
            rules={[{ required: true, message: "Lütfen telefon numaranızı girin!" }]}
          >
            <Input placeholder="Telefon" />
          </Form.Item>
          <Form.Item
            label="Şehir"
            name="city"
            rules={[{ required: true, message: "Lütfen bir şehir seçin veya girin!" }]}
          >
            <Select
              showSearch
              placeholder="Bir şehir seçin"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear
            >
              {cities.map((city) => (
                <Option key={city} value={city}>
                  {city}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Profil Fotoğrafı">
            <Upload
              accept="image/*"
              showUploadList={false}
              customRequest={({ file, onSuccess }) => setTimeout(() => onSuccess("ok"), 0)}
              onChange={handlePhotoUpload}
            >
              <Button icon={<UploadOutlined />}>Fotoğraf Yükle</Button>
            </Upload>
            {profilePhoto && (
              <div className="profile-photo-container">
                <img src={profilePhoto} alt="Profil" className="profile-photo" />
              </div>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="save-button">
              Kaydet
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default Profile;
