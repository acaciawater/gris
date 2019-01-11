<template>
    <div>
        <!-- <h2>{{title}}</h2> -->
        <!-- <hr class="col-xs-12"> -->
        <ul>
            <li v-for="(comment,index) in comments" :key="index+1">{{comment}}</li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'Comments',
  props: ['comments', 'title']
}
</script>

<style scoped>

</style>
