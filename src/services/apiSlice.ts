import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../types/Product';
import { Category } from '../types/Category';
import { AuthResponse, Usuario, UsuarioRequest } from '../types/Usuario';

const baseUrl = 'https://pokemasterx.com/api/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  tagTypes: ['Product', 'Category', 'Usuario'],
  endpoints: (builder) => ({
    getProductsList: builder.query<Product[], void>({
      query: () => 'Produtos/ListarProdutos',
      providesTags: ['Product'],
    }),
    getProductById: builder.query<Product, number>({
      query: (id) => `Produtos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Product', id }],
    }),
    createProduct: builder.mutation<Product, Product>({
      query: (product) => ({
        url: 'Produtos',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    updateProduct: builder.mutation<Product, { id: number; product: Product }>({
      query: ({ id, product }) => ({
        url: `Produtos/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),
    deleteProduct: builder.mutation<void, number>({
      query: (id) => ({
        url: `Produtos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
    getCategoriesList: builder.query<Category[], void>({
      query: () => 'Categorias/ListarCategorias',
      providesTags: ['Category'],
    }),
    getCategoryById: builder.query<Category, number>({
      query: (id) => `Categorias/${id}`,
      providesTags: (result, error, id) => [{ type: 'Category', id }],
    }),
    createCategory: builder.mutation<Category, Category>({
      query: (category) => ({
        url: 'Categorias',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),
    updateCategory: builder.mutation<Category, { id: number; category: Category }>({
      query: ({ id, category }) => ({
        url: `Categorias/${id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Category'],
    }),
    deleteCategory: builder.mutation<void, number>({
      query: (id) => ({
        url: `Categorias/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),

    // Endpoints para Usuários
    adicionarUsuario: builder.mutation<Usuario, UsuarioRequest>({
      query: (usuario) => ({
        url: 'Usuario/AdicionarUsuario',
        method: 'POST',
        body: usuario,
      }),
      invalidatesTags: ['Usuario'], // Atualiza qualquer cache relacionado a usuários
    }),
    autorizarUsuario: builder.mutation<AuthResponse, UsuarioRequest>({
      query: (usuario) => ({
        url: 'Usuario/AutorizarUsuario',
        method: 'POST',
        body: usuario,
      }),
    }),
    getUsuariosList: builder.query<Usuario[], void>({
      query: () => 'Usuario/ListarUsuarios',
      providesTags: ['Usuario'],
    }),
    getUsuarioById: builder.query<Usuario, string>({
      query: (id) => `Usuario/${id}`,
      providesTags: (result, error, id) => [{ type: 'Usuario', id }],
    }),
    updateUsuario: builder.mutation<Usuario, { id: string; usuario: Usuario }>({
      query: ({ id, usuario }) => ({
        url: `Usuario/${id}`,
        method: 'PUT',
        body: usuario,
      }),
      invalidatesTags: ['Usuario'],
    }),
    deleteUsuario: builder.mutation<void, string>({
      query: (id) => ({
        url: `Usuario/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Usuario'],
    }),
  }),
});

export const {
  useGetProductsListQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesListQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useAdicionarUsuarioMutation,
  useAutorizarUsuarioMutation,
  useGetUsuariosListQuery,
  useGetUsuarioByIdQuery,
  useUpdateUsuarioMutation,
  useDeleteUsuarioMutation,
} = apiSlice;
