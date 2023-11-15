<template>
    <div class="content">
       <h1 class="font-bold"> ERROR: 404</h1>
        <p>Sorry, the page <code  class="font-bold">{{ $route.params.notFound }}</code> you're looking for is not found</p>
        <router-link to="/" class="font-bold">Back to the main page</router-link>
    </div>
</template>

<script setup>

</script>