<script lang="ts">
    import { getClient } from 'svelte-apollo';
    import Button, { Label } from '@smui/button';
    import Card, { Content, Actions } from '@smui/card';
    import { deletePost, getAllPosts } from '../graphql/posts';

    let client = getClient();
    let posts = getAllPosts();

    const handleDeletePost = (e, post) => {
        e.preventDefault();
        deletePost(client, post.id)
            .then(data => {
                posts.refetch();
            })
            .catch(e => {
                console.error(e);
            });
    };
</script>

<style lang="scss" scoped>
    .posts-container {
        padding: 20px;
        background: rgba(0, 110, 180, 0.2);
        border-radius: 10px;
        .posts-all {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
        }
    }
    .pl-5 {
        padding-left: 5px;
    }
</style>

<section class="mt-20 posts-container">
    {#await $posts}

        <h2 class="pl-5">Loading</h2>

    {:then result}
        <h2 class="pl-5">Posts</h2>
        <div class="posts-all">
            {#if result.data.posts.length > 0}
                {#each result.data.posts as post, i}
                    <Card class="posts-card">
                        <Content>
                            <h3 class="g-header">{post.title}</h3>
                            <p>{post.text}</p>
                        </Content>
                        <Actions>
                            <Button on:click={e => handleDeletePost(e, post)}>
                                <Label>Delete</Label>
                            </Button>
                        </Actions>
                    </Card>
                {/each}
            {:else}
                <h3>No items</h3>
            {/if}
        </div>
    {:catch e}
        {e}
    {/await}
</section>
