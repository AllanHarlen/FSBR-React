import React, { useState } from "react";
import { Button, Modal, Spin, Alert } from "antd";
import {
  useGetCategoriesListQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} from "../../services/apiSlice"; // Importando hooks gerados
import EditableTable from "../../components/EditableTable";
import EditableModal from "../../components/EditableModal";
import { Category } from "../../types/Category";
import isFetchBaseQueryError from "../../utils/Utilidades";

const Categorias: React.FC = () => {
  const { data: categories, error: categoriesError, isLoading: categoriesLoading } = useGetCategoriesListQuery();
  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();

  const [isEditingCategory, setIsEditingCategory] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [alertInfo, setAlertInfo] = useState<{ type: "success" | "error"; message: string; description: string } | null>(null);

  const onAddCategory = () => {
    setIsEditingCategory(true);
    setEditingCategory({ id: 0, name: "", description: "" });
  };

  const onEditCategory = (record: Category) => {
    setIsEditingCategory(true);
    setEditingCategory({ ...record });
  };

  const onSaveCategory = async (record: Category) => {
    try {
      if (record.id === 0) {
        const result = await createCategory(record);
        if ("data" in result && result.data) {
          setAlertInfo({
            type: "success",
            message: "Sucesso",
            description: "Categoria criada com sucesso!",
          });
        } else if ("error" in result && isFetchBaseQueryError(result.error)) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: `Erro ao criar categoria: ${result.error.data || "Tente novamente mais tarde."}`,
          });
        }
      } else if (record.id !== undefined) {
        const result = await updateCategory({ id: record.id, category: record });
        if ("data" in result && result.data) {
          setAlertInfo({
            type: "success",
            message: "Sucesso",
            description: "Categoria atualizada com sucesso!",
          });
        } else if ("error" in result && isFetchBaseQueryError(result.error)) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: `Erro ao atualizar categoria: ${result.error.data || "Tente novamente mais tarde."}`,
          });
        }
      }
    } catch (error) {
      setAlertInfo({
        type: "error",
        message: "Erro",
        description: "Erro desconhecido ao salvar a categoria.",
      });
    } finally {
      setIsEditingCategory(false);
      setEditingCategory(null);
    }
  };

  const onDeleteCategory = async (record: Category) => {
    Modal.confirm({
      title: "Tem certeza que deseja deletar esta categoria?",
      okText: "Sim",
      okType: "danger",
      onOk: async () => {
        try {
          if (record.id !== undefined) {
            const result = await deleteCategory(record.id);
            if ("error" in result && isFetchBaseQueryError(result.error)) {
              setAlertInfo({
                type: "error",
                message: "Erro",
                description: `Erro ao deletar categoria: ${result.error.data || "Tente novamente mais tarde."}`,
              });
            } else {
              setAlertInfo({
                type: "success",
                message: "Sucesso",
                description: "Categoria deletada com sucesso!",
              });
            }
          }
        } catch (error) {
          setAlertInfo({
            type: "error",
            message: "Erro",
            description: "Erro desconhecido ao deletar a categoria.",
          });
        }
      },
    });
  };

  if (categoriesLoading) return <Spin tip="Carregando categorias..." />;
  if (categoriesError) return <Alert message="Erro ao carregar categorias" type="error" />;

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
      <Button type="primary" onClick={onAddCategory} style={{ marginBottom: 16 }}>
        Adicionar Categoria
      </Button>
      <EditableTable
        dataSource={(categories || []).map((category) => ({ ...category, key: category.id }))}
        columns={[
          { title: "Nome", dataIndex: "name" },
          { title: "Descrição", dataIndex: "description" },
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
          name: "Nome",
          description: "Descrição",
        }}
      />
    </div>
  );
};

export default Categorias;
