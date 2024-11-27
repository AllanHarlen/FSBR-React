// src/pages/Crud/Categorias.tsx
import React, { useState } from "react";
import { Button, Modal } from "antd";
import { Category } from "../../types/Category"; // Corrigindo a importação
import EditableTable from "../../components/EditableTable"; // Corrigindo a importação
import EditableModal from "../../components/EditableModal"; // Corrigindo a importação

// Dados de exemplo de Categorias
const sampleCategories: Category[] = [
  { id: 1, name: "Category 1", description: "Description 1" },
  { id: 2, name: "Category 2", description: "Description 2" },
  { id: 3, name: "Category 3", description: "Description 3" },
];

const Categorias: React.FC = () => {
  const [categoryDataSource, setCategoryDataSource] = useState<Category[]>(sampleCategories);
  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Abrir modal para adicionar nova categoria
  const onAddCategory = () => {
    setIsEditingCategory(true); // Abre o modal para adicionar
    setEditingCategory({ id: 0, name: "", description: "" }); // Limpa os campos
  };

  const onEditCategory = (record: Category) => {
    setIsEditingCategory(true);
    setEditingCategory({ ...record });
  };

  const onSaveCategory = (record: Category) => {
    if (record.id === 0) {
      const newCategory: Category = { ...record, id: Math.random() * 1000 };
      setCategoryDataSource((prev) => [...prev, newCategory]);
    } 
    else {
      setCategoryDataSource((prev) =>
        prev.map((item) => (item.id === record.id ? record : item))
      );
    }
    setIsEditingCategory(false);
    setEditingCategory(null);
  };

  const onDeleteCategory = (record: Category) => {
    Modal.confirm({
      title: "Are you sure you want to delete this category?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setCategoryDataSource((prev) => prev.filter((item) => item.id !== record.id));
      },
    });
  };

  return (
    <div>
      <Button onClick={onAddCategory}>Add New Category</Button>

      <EditableTable
        dataSource={categoryDataSource}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Description", dataIndex: "description" },
        ]}
        onEdit={onEditCategory}
        onDelete={onDeleteCategory}
      />

      <EditableModal
        visible={isEditingCategory}
        record={editingCategory}
        onCancel={() => setIsEditingCategory(false)}
        onSave={onSaveCategory}
        onFieldChange={(field, value) => {
          if (editingCategory) {
            setEditingCategory({ ...editingCategory, [field]: value });
          }
        }}
        fields={{
          name: "Name",
          description: "Description",
        }}
      />
    </div>
  );
};

export default Categorias;
