// src/components/EditableTable.tsx
import React from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

interface EditableTableProps<T> {
  dataSource: T[];
  columns: any[];
  onEdit: (record: T) => void;
  onDelete: (record: T) => void;
}

const EditableTable = <T extends object>({ dataSource, columns, onEdit, onDelete }: EditableTableProps<T>) => {
  // Verifica se alguma linha contém o campo 'categories'
  const hasCategories = dataSource.some((item: any) => item.categories);

  // Se o campo 'categories' estiver presente, adiciona a coluna na tabela
  const enhancedColumns = [
    ...columns,
    // Adiciona a coluna de categorias somente se necessário
    ...(hasCategories
      ? [
          {
            title: "Categories",
            dataIndex: "categories",
            render: (categories: any) => categories.map((category: any) => category.name).join(", "),
          },
        ]
      : []),
    {
      title: "Actions",
      render: (record: any) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => onDelete(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <Table
      dataSource={dataSource}
      columns={enhancedColumns}
      rowKey="id" // Certifique-se de que cada linha tem um ID único
      pagination={false} // Opcional: se quiser desabilitar a paginação
    />
  );
};

export default EditableTable;
