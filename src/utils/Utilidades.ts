import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

// Função auxiliar para verificar o tipo de erro
const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
    return typeof error === "object" && error != null && "status" in error;
};

export default isFetchBaseQueryError;