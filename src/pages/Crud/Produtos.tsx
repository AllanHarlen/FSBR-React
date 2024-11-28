import React, { useState } from "react";
import { Button, Modal, Select, Spin, Alert } from "antd";
import {
  useGetProductsListQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetCategoriesListQuery,
} from "../../services/apiSlice";
import { Product } from "../../types/Product";
import EditableTable from "../../components/EditableTable";
import EditableModal from "../../components/EditableModal";
import isFetchBaseQueryError from "../../utils/Utilidades";

const Produtos: React.FC = () => {
  const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsListQuery();
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesListQuery();
  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [isEditingProduct, setIsEditingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; message: string; description: string } | null>(null);

  const onAddProduct = () => {
    setIsEditingProduct(true);
    setEditingProduct({ id: 0, name: "", price: 0, categories: [] });
  };

  const onEditProduct = (record: Product) => {
    setIsEditingProduct(true);
    setEditingProduct({ ...record });
  };

  const onSaveProduct = async (record: Product) => {
    try {
      if (record.id === 0) {
        const result = await createProduct(record);
        if ("data" in result && result.data) {
          setAlertInfo({
            type: "success",
            message: "Sucesso",
            description: "Produto criado com sucesso!",
          });
        } else if ("error" in result && isFetchBaseQueryError(result.error)) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: `Erro ao criar produto: ${result.error.data || "Tente novamente mais tarde."}`,
          });
        }
      } else if (record.id !== undefined) {
        const result = await updateProduct({ id: record.id, product: record });
        if ("data" in result && result.data) {
          setAlertInfo({
            type: "success",
            message: "Sucesso",
            description: "Produto atualizado com sucesso!",
          });
        } else if ("error" in result && isFetchBaseQueryError(result.error)) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: `Erro ao atualizar produto: ${result.error.data || "Tente novamente mais tarde."}`,
          });
        }
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        message: "Erro",
        description: "Erro desconhecido ao salvar o produto.",
      });
    } finally {
      setIsEditingProduct(false);
      setEditingProduct(null);
    }
  };

  const onDeleteProduct = async (record: Product) => {
    Modal.confirm({
      title: "Tem certeza que deseja deletar este produto?",
      okText: "Sim",
      okType: "danger",
      onOk: async () => {
        try {
          if (record.id !== undefined) {
            const result = await deleteProduct(record.id); // Chamada assíncrona à API
            
            if ("error" in result && isFetchBaseQueryError(result.error)) {
              setAlertInfo({
                type: "error",
                message: "Erro",
                description: `Erro ao deletar produto: ${result.error.data || "Tente novamente mais tarde."}`,
              });
            } else {
              setAlertInfo({
                type: "success",
                message: "Sucesso",
                description: "Produto deletado com sucesso!",
              });
            }
          }
        } catch (error) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: "Erro desconhecido ao deletar o produto.",
          });
        }
      },
    });
  };
  

  if (productsLoading || categoriesLoading) return <Spin tip="Carregando dados..." />;
  if (productsError || categoriesError) return <Alert message="Erro ao carregar dados" type="error" />;

  return (
    <div>
      {alertInfo && (
        <Alert
          message={alertInfo.message}
          description={alertInfo.description}
          type={alertInfo.type}
          showIcon
          closable
          afterClose={() => setAlertInfo(null)}
          style={{ marginBottom: 16 }}
        />
      )}
      <Button type="primary" onClick={onAddProduct} style={{ marginBottom: 16 }}>
        Adicionar Produto
      </Button>
      <EditableTable
        dataSource={(products || []).map((product) => ({ ...product, key: product.id }))}
        columns={[
          { title: "Nome", dataIndex: "name" },
          { title: "Preço", dataIndex: "price" },
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
          name: "Nome",
          price: "Preço",
        }}
      >
        <label>Selecione Categorias:</label>
        <Select
          mode="multiple"
          value={editingProduct?.categories?.map((category) => category.id) || []}
          onChange={(value) => {
            if (editingProduct) {
              const selectedCategories = value.map(
                (id) => categories?.find((category) => category.id === id)!
              );
              setEditingProduct({ ...editingProduct, categories: selectedCategories });
            }
          }}
          style={{ width: "100%" }}
        >
          {categories?.map((category) => (
            <Select.Option key={category.id} value={category.id}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </EditableModal>
    </div>
  );
};

export default Produtos;
