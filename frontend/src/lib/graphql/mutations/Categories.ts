import { gql } from "@apollo/client";

export const CREATE_CATEGORY = gql`
    mutation CreateCategory($data: CreateCategoryInput!) {
        createCategory(data: $data) {
            id
            name
            description
            color
            icon
        }
    }
`;

export const UPDATE_CATEGORY = gql`
    mutation UpdateCategory($id: String!, $data: UpdateCategoryInput!) {
        updateCategory(id: $id, data: $data) {
            id
            name
            description
            color
            icon
        }
    }
`;
