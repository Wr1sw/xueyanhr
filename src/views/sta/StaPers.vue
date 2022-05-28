<template>
  <div>
    <div class="dom">
      <div class="dom1" id = "bar"/>
      <div class="dom2" id = "pie"/>
    </div>
    <div class="dom_choice">
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" autofocus plain @click="onClick('schoolInfo')">学校信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="onClick('major')">专业信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="onClick('topDegree')">学历信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="onClick('title')">职称信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="onClick('departmentPerson')">部门人数</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="onClick('wedlock')">婚姻状况</el-button></div>
    </div>
  </div>
</template>

<script>
import {postRequest,getRequest} from "@/utils/api";
export default {
  data(){
    return {
      info: {
        items: [],
        chartTitle: '',
        chartSeries: '',
        barColor:'',
        labelColor: ''
      },
    }
  },
  methods:{
    drawChart(){
      let pieChart = this.$echarts.init(document.getElementById("pie"));
      let barChart = this.$echarts.init(document.getElementById("bar"));

      let pieOption = {
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
          text: this.info.chartTitle,
          left: 'center',
          textStyle:{
            color: '#f18b87',
            fontSize: 24,
          }
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
          name: this.info.chartSeries,
          type:'pie',
          //设置图表距离div左面边框60%，距离上面边框50%
          center:['65%', '50%'],
          //设置鼠标触摸显示详细数据
          label: {
            show: true,
            position: 'inner',
            formatter: '{d}%',
            fontSize: 16,
          },
          data: this.info.items,
          radius: ['35%', '70%']
        }]
      }
      let barOption = {
        title: {
          text: this.info.chartTitle,
          left: 'center',
          textStyle:{
            color: '#f18b87',
            fontSize: 24,
          }
        },
        legend:{
          orient: 'vertical',
          left: 'left'
        },
        //鼠标触碰显示数据
        tooltip:{
          trigger: 'axis',
        },
        //设置柱状图颜色
        color: [
            this.info.barColor
          // '#8dc1a9', //'#65cbc8'
          // '#87CEEB', //'#9c9eff'
          // '#d5befd', //'#9c9eff'
          // '#a5d951', //'#f18b87'
          // '#85e8b9', //'#f18b87'
          // '#c5d9f3', //'#87CEEB'
          // '#aaacf3', //#eb87aa
        ],
        xAxis: {
          type:'category',
          name: "分类",
          nameTextStyle:{
            color: '#c5d9f3',
            fontStyle: 'italic',
            fontSize:20,
          }
        },
        yAxis: {
          type:'value',
          name: this.info.chartSeries
        },
        series: [
            {
              type: 'bar',
              barMinHeight: 15,
              name: this.info.chartSeries,
              label: {
                show: true,
                position: 'top',
                formatter: '{a}: {c}',
                textStyle:{
                  color: this.info.labelColor,
                  fontSize: 14
              }
            },
              //鼠标触碰显示数据
              tooltip:{
                trigger: 'item'
              },
              data: this.info.items
          }
        ]
      };
      pieChart.setOption(pieOption);
      barChart.setOption(barOption);
    },
    async initData () {
      await getRequest("/statistics/personnel/schoolInfo").then(res=>{
        this.info = res;
      })
      this.drawChart();
    },
    onClick(url){
      getRequest("/statistics/personnel/"+url).then(res=>{
        this.info = res;
        console.log(this.info)
        this.drawChart();
      })
    }
  },

  mounted() {
    this.initData();
  }
}
</script>

<style scoped>
.dom1{
  width: 820px;
  height: 500px;
  margin: 0 auto;
}
.dom2{
  width: 620px;
  height: 500px;
  margin: 0 auto;
}
.dom{
  display: flex;
  height: 510px;
}
.dom_choice{
  height: 150px;
  display: flex;
}
.choice{
  width: 220px;
  height: 120px;
  margin: 0 auto;
}
</style>