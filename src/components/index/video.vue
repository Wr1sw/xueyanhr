<template>
  <div id="app">
    <div class="player-container">
      <vue-core-video-player
              :src="videoSource"
              :cover="cover"
              :autoplay="false"
              :title= "title"
              :loop="false"
      />
    </div>
  </div>
</template>

<script>

export default {
  name: "vedio",
  props: {},
  data() {
    return {
      videoSource: [{
        src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
        resolution: 360,
      }, {
        src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
        resolution: 720,
      }, {
        src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
        resolution: 1080
      }],
      cover : "https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png",
      title : "你的名字"
    }
  }
};
</script>

<style scoped lang="scss">
.my_video {
  width: 1000px;
  height: 800px;
  margin: 0 auto;
  text-align: center;
}
</style>