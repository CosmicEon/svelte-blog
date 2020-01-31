import { getClient, query, mutate } from 'svelte-apollo';
import { gql } from 'apollo-boost';

const GET_POST = gql`
    query {
        posts {
            id
            title
            text
        }
    }
`;

const ADD_POST = gql`
    mutation($postEditTitle: String!, $postEditText: String!) {
        insert_posts(objects: { title: $postEditTitle, text: $postEditText }) {
            returning {
                id
            }
        }
    }
`;

const DELETE_POST = gql`
    mutation($postId: uuid!) {
        delete_posts(where: { id: { _eq: $postId } }) {
            affected_rows
        }
    }
`;

export const getAllPosts = () => query(getClient(), { query: GET_POST });

export const addPost = (client, params) => {
    return mutate(client, {
        mutation: ADD_POST,
        variables: {
            postEditTitle: params.title,
            postEditText: params.text,
        },
    });
};

export const deletePost = (client, postId) => {
    return mutate(client, {
        mutation: DELETE_POST,
        variables: {
            postId,
        },
    });
};
