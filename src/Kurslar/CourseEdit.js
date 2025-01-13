import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Form, Input, Button, Select, message } from "antd";
import "./CourseEdit.css";

const { Option } = Select;
const { TextArea } = Input;

const CourseEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state;

  const [form] = Form.useForm();

  useEffect(() => {
    if (course) {
      form.setFieldsValue({
        title: course.title,
        category: course.category,
        lessons: course.lessons,
        description: course.description,
      });
    }
  }, [course, form]);

  const handleSave = async (values) => {
    try {
      // API Çağrısı ile düzenleme işlemi
      const response = await fetch(`http://localhost:5287/api/Course/${course.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success("Kurs başarıyla güncellendi!");
        navigate("/benim-kurslarim");
      } else {
        message.error("Kurs güncellenemedi!");
      }
    } catch (error) {
      console.error("Hata oluştu:", error);
      message.error("Bir hata oluştu!");
    }
  };

  return (
    <div className="course-edit-container">
      <h1>Kursu Düzenle</h1>
      <Form form={form} layout="vertical" onFinish={handleSave}>
        <Form.Item
          label="Kurs Adı"
          name="title"
          rules={[{ required: true, message: "Lütfen kurs adını girin!" }]}
        >
          <Input placeholder="Kurs adını girin" />
        </Form.Item>
        <Form.Item
          label="Kategori"
          name="category"
          rules={[{ required: true, message: "Lütfen kategori seçin!" }]}
        >
          <Select placeholder="Bir kategori seçin">
            <Option value="Development">Development</Option>
            <Option value="Design">Design</Option>
            <Option value="Marketing">Marketing</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Dersler"
          name="lessons"
          rules={[{ required: true, message: "Lütfen ders sayısını girin!" }]}
        >
          <Input placeholder="Ders sayısını girin" />
        </Form.Item>
        <Form.Item
          label="Açıklama"
          name="description"
          rules={[{ required: true, message: "Lütfen açıklama girin!" }]}
        >
          <TextArea rows={4} placeholder="Kurs açıklamasını girin" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CourseEdit;
