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
    setEditingProduct({ name: "", price: 0, categoryid: 0 });
  };

  const onEditProduct = (record: Product) => {
    setIsEditingProduct(true);
    // Ajusta o estado do produto para incluir o ID da categoria
    setEditingProduct({
      ...record,
      categoryid: record.category?.id ?? 0,  // Preenche o campo categoryid com o id da categoria do produto
    });
  };

  const onSaveProduct = async (record: Product) => {
    // Validações
    if (!record.name || record.name.trim() === "") {
      setAlertInfo({
        type: "error",
        message: "Erro",
        description: "O nome do produto é obrigatório.",
      });
      return;
    }
    if (record.price <= 0) {
      setAlertInfo({
        type: "error",
        message: "Erro",
        description: "O preço do produto deve ser maior que 0.",
      });
      return;
    }
    if (!record.categoryid) {
      setAlertInfo({
        type: "error",
        message: "Erro",
        description: "A categoria é obrigatória.",
      });
      return;
    }

    try {
      if (record.id !== undefined) {
        const result = await updateProduct({ id: record.id, product: { ...record } });
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
      } else {
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
            const result = await deleteProduct(record.id);

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
        dataSource={(products || []).map((product) => ({
          ...product,
          key: product.id,
        }))}
        columns={[
          { title: "Nome", dataIndex: "name" },
          { title: "Preço", dataIndex: "price" },
          {
            title: "Categoria",
            dataIndex: ["category", "name"],
            render: (_: unknown, record: Product) => record.category?.name || "Sem categoria",
          },
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
        <label>Selecione uma Categoria:</label>
        <Select
          value={editingProduct?.categoryid || undefined}
          onChange={(value) => {
            if (editingProduct) {
              setEditingProduct({ ...editingProduct, categoryid: value });
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
