// src/pages/Crud/Produtos.tsx
import React, { useState } from "react";
import { Button, Modal, Select } from "antd";
import { Product } from "../../types/Product";
import { Category } from "../../types/Category"; // Importando o tipo Category
import EditableTable from "../../components/EditableTable";
import EditableModal from "../../components/EditableModal";

// Dados de exemplo de Produtos
const sampleProducts: Product[] = [
  { id: 1, name: "Product A", price: 100, categories: [{ id: 1, name: "Category 1", description: "Description 1" }] },
  { id: 2, name: "Product B", price: 150, categories: [{ id: 2, name: "Category 2", description: "Description 2" }] },
  { id: 3, name: "Product C", price: 200, categories: [{ id: 3, name: "Category 3", description: "Description 3" }] },
];

// Dados de exemplo de Categorias
const sampleCategories: Category[] = [
  { id: 1, name: "Category 1", description: "Description 1" },
  { id: 2, name: "Category 2", description: "Description 2" },
  { id: 3, name: "Category 3", description: "Description 3" },
];

const Produtos: React.FC = () => {
  const [productDataSource, setProductDataSource] = useState<Product[]>(sampleProducts);
  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const onAddProduct = () => {
    setIsEditingProduct(true);
    setEditingProduct({ id: 0, name: "", price: 0, categories: [] });
  };

  const onEditProduct = (record: Product) => {
    setIsEditingProduct(true);
    setEditingProduct({ ...record });
  };

  const onSaveProduct = (record: Product) => {
    if (record.id === 0) {
      const newProduct: Product = { ...record, id: Math.floor(Math.random() * 1000) };
      setProductDataSource((prev) => [...prev, newProduct]);
    } else {
      setProductDataSource((prev) =>
        prev.map((item) => (item.id === record.id ? record : item))
      );
    }
    setIsEditingProduct(false);
    setEditingProduct(null);
  };

  const onDeleteProduct = (record: Product) => {
    Modal.confirm({
      title: "Are you sure you want to delete this product?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setProductDataSource((prev) => prev.filter((item) => item.id !== record.id));
      },
    });
  };

  return (
    <div>
      <Button onClick={onAddProduct}>Add New Product</Button>

      <EditableTable
        dataSource={productDataSource}
        columns={[
          { title: "Name", dataIndex: "name" },
          { title: "Price", dataIndex: "price" },
        ]}
        onEdit={onEditProduct}
        onDelete={onDeleteProduct}
      />

      <EditableModal
        visible={isEditingProduct}
        record={editingProduct}
        onCancel={() => setIsEditingProduct(false)}
        onSave={onSaveProduct}
        onFieldChange={(field, value) => {
          if (editingProduct) {
            setEditingProduct({ ...editingProduct, [field]: value });
          }
        }}
        fields={{
          name: "Name",
          price: "Price",
        }}
      >
        <div>
          <label>Select Categories:</label>
          <Select
            mode="multiple"
            value={editingProduct?.categories?.map((category) => category.id) || []}
            onChange={(value) => {
              if (editingProduct) {
                const selectedCategories = value.map(
                  (id) => sampleCategories.find((category) => category.id === id)!
                );
                setEditingProduct({ ...editingProduct, categories: selectedCategories });
              }
            }}
            style={{ width: "100%" }}
          >
            {sampleCategories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </EditableModal>
    </div>
  );
};

export default Produtos;
