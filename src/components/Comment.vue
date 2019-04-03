<template>
  <div>
    <div v-if="email && comment" id="comment-content">
      <img :src="avatar"/>
      <div id="comment-detail">
        <p>{{ email }}</p>
        <p>{{ comment }}</p>
      </div>
    </div>
    <div v-else>
      <p>All fields required</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  props: ['comment', 'email', 'avatar'],
}
</script>

<style type="text/css">
  #comment-content{
    display: flex;
    flex-direction: row;
  }
</style>

