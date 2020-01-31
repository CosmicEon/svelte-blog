<script lang="ts">
    import apolloClient from '../graphql/apollo';
    import AddPost from './AddPost.svelte';
    import Posts from './Posts.svelte';
    import Paper, { Title, Content } from '@smui/paper';

    const topicOne: string = 'GraphQL';
    const topicTwo: string = 'Material-UI';
    const topicThree: string = 'TypeScirpt';

    apolloClient();
</script>

<style lang="scss">
    .app-main {
        max-width: 240px;
        margin: 0 auto;
    }

    @media (min-width: 640px) {
        .app-main {
            max-width: none;
        }
    }
</style>

<main class="app-main">
    <h1 class="g-header">{topicOne}, {topicTwo} and {topicThree} Svelte Blogger</h1>

    <AddPost />
    <Posts />
</main>
