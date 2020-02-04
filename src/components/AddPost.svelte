<script lang="ts">
    import { onMount } from 'svelte';
    import { getClient } from 'svelte-apollo';
    import Button, { Label } from '@smui/button';
    import Paper, { Title, Content } from '@smui/paper';
    import Textfield from '@smui/textfield';
    import { addPost, getAllPosts } from '../graphql/posts';
    import * as types from '../types/types';

    let client;
    let postData: types.Post = { title: '', text: '' };

    onMount(() => {
        client = getClient();
    });

    const handleAddPost = () => {
        addPost(client, { ...postData })
            .then(() => {
                postData.title = '';
                postData.text = '';
                getAllPosts().refetch();
            })
            .catch(e => {
                console.error(e);
            });
    };
</script>

<style lang="scss" scoped>
    .add-post-container {
        width: 400px;
        margin: 0 auto;
        .add-post-form {
            display: flex;
            flex-direction: column;
        }
    }
</style>

<section class="add-post-container">
    <Paper elevation={5}>
        <Title class="g-header">Create Post</Title>
        <Content>
            <form class="add-post-form" on:submit|preventDefault={handleAddPost}>
                <Textfield class="mt-20" label="Title" bind:value={postData.title} />
                <Textfield textarea class="mt-20" label="Text" bind:value={postData.text} />
                <Button class="mt-20" type="submit">
                    <Label>Add</Label>
                </Button>
            </form>
        </Content>
    </Paper>
</section>
