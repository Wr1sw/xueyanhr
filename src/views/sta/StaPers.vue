<template>
  <div>
    <div class="dom">
      <div class="dom1" id = "school"/>
      <div class="dom1" id = "perCount"/>
      <div class="dom1" id = "topDegree"/>
    </div>
    <div class="dom">
      <div class="dom1" id = "major"/>
      <div class="dom1" id = "position"/>
      <div class="dom1" id = "wedlock"/>
    </div>
  </div>
</template>

<script>
import {postRequest,getRequest} from "@/utils/api";
export default {
  data(){
    return {
      info:[]
    }
  },
  methods:{
    drawChart(){
      let schoolInfo = this.$echarts.init(document.getElementById("school"));
      let perCountInfo = this.$echarts.init(document.getElementById("perCount"));
      let topDegreeInfo = this.$echarts.init(document.getElementById("topDegree"));
      let majorInfo = this.$echarts.init(document.getElementById("major"));
      let positionInfo = this.$echarts.init(document.getElementById("position"));
      let wedlockInfo = this.$echarts.init(document.getElementById("wedlock"));

      let schoolOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '学校信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.school
        }]
      }
      let perCountOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '部门信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.perCount,
          radius: ['40%', '70%'],
        }]
      }
      let topDegreeOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '学历信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.topDegree
        }]
      }
      let majorOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '专业信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.major,
          radius: ['40%', '70%'],
        }]
      }
      let positionOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '职称信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.position,
        }]
      }
      let wedlockOption = {
        color: [
          '#d5befd',
          '#f8fdaf',
          '#73efb4',
          '#c5d9f3',
          '#f18b87',
          '#87CEEB',
          '#9c9eff',
          '#ffb5f8',
          '#8dc1a9',
        ],
        title: {
          text: '婚姻信息',
          left: 'center'
        },
        //设置左边栏物品名称
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        tooltip:{
          trigger: 'item',
        },
        series: [{
          name: '人数',
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%'
          },
          data: this.info.wedlock,
          radius: ['40%', '70%'],
        }]
      }

      schoolInfo.setOption(schoolOption);
      perCountInfo.setOption(perCountOption);
      topDegreeInfo.setOption(topDegreeOption);
      majorInfo.setOption(majorOption);
      positionInfo.setOption(positionOption);
      wedlockInfo.setOption(wedlockOption);

    },
    async initData () {
      await getRequest("/statistics/personnel/personnelInfo").then(res=>{
        if (res) {
          this.info = res;
        }
      });
      this.drawChart();
    },
  },

  mounted() {
    this.initData();
  }
}
</script>

<style scoped>
.dom1{
  width: 360px;
  height: 250px;
  margin: 0 auto;
}
.dom{
  display: flex;
  height: 260px;
}
</style>