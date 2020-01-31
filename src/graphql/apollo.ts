import ApolloClient from 'apollo-boost';
import { setClient } from 'svelte-apollo';

const apolloClient = () => {
    const client = new ApolloClient({
        uri: 'http://localhost:8080/v1/graphql',

        request: fetchOptions => {
            console.log('fetchOptions', fetchOptions);
        },

        onError: ({ networkError, graphQLErrors, response, operation }) => {
            console.log('graphQLErrors', graphQLErrors);
            console.log('networkError', networkError);
            console.log('response', response);
            console.log('operation', operation);
        },
    });

    setClient(client);
};

export default apolloClient;
