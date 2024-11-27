// src/components/EditableModal.tsx
import React from "react";
import { Modal, Input, Select } from "antd";

// Tornamos os tipos mais explícitos e forçamos a tipagem de campos para strings
interface EditableModalProps<T> {
  visible: boolean;
  record: T | null;
  onCancel: () => void;
  onSave: (record: T) => void;
  onFieldChange: (field: keyof T, value: string) => void; // Especificando que o valor deve ser uma string
  fields: { [key in keyof T]: string }; // Para garantir que cada campo seja tratado como string
  children?: React.ReactNode; // Para permitir campos adicionais como Select, Checkboxes, etc.
}

const EditableModal = <T extends object>({
  visible,
  record,
  onCancel,
  onSave,
  onFieldChange,
  fields,
  children, // Adicionando children para campos adicionais
}: EditableModalProps<T>) => {
  return (
    <Modal
      title="Edit Record"
      visible={visible}
      okText="Save"
      onCancel={onCancel}
      onOk={() => record && onSave(record)}
    >
      {record &&
        Object.keys(fields).map((field) => (
          <Input
            key={field}
            value={String(record[field as keyof T] || "")} // Garantir que o valor seja sempre uma string
            onChange={(e) => onFieldChange(field as keyof T, e.target.value)} // Aqui 'value' é do tipo string
            placeholder={fields[field as keyof T]}
          />
        ))}

      {/* Renderizando qualquer outro campo adicional (como um campo Select) */}
      {children}
    </Modal>
  );
};

export default EditableModal;
