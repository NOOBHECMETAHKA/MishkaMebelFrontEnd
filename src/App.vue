<template>
  <div>
    <mishka-mebel-header></mishka-mebel-header>
    <router-view/>
    <mishka-mebel-footer></mishka-mebel-footer>
  </div>
</template>

<script>
import header from "@/components/Header.vue";
import footer from "@/components/Footer.vue";
export default {
  components:{
    "MishkaMebelHeader": header,
    "MishkaMebelFooter": footer
  },
}
</script>