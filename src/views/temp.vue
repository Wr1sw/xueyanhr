<template>
    <div>
        123
    </div>
</template>

<script>
export default {
    name: "PageTemp",
    data() {
        return {

        }
    },
    mounted() {
        // console.log("111");
        var info = JSON.parse(this.$route.query.result)
        this.$store.commit('init_currentHr', info.obj);
        window.sessionStorage.setItem("user", JSON.stringify(info.obj));
        let path = this.$route.query.redirect;
        this.$router.replace((path == '/' || path == undefined) ? '/home' : path);
    },
}
</script>

<style>
</style>