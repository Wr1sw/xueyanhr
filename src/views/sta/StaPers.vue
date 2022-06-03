<template>
  <div>
    <div class="dom">
      <div class="dom1" id = "bar" v-show="!isSalary"/>
      <div class="dom1" id = "line" v-show="isSalary"/>
      <div class="dom2" id = "pie"/>
    </div>
    <div class="dom_choice">
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="otherChart('workAge')">工龄信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="otherChart('title')">职称信息</el-button></div>
      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="otherChart('departmentPerson')">部门人数</el-button></div>
<!--      <div class="choice"><el-button type="success" icon="el-icon-s-promotion" plain @click="salaryChart('title')">工资</el-button></div>-->
    </div>
  </div>
</template>

<script>
import {getRequest} from "@/utils/api";
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
      xAxis: [5000, 10000, 15000, 20000,25000, 30000, 35000, 40000, 45000],
      testData:[22, 28, 23, 19,10, 22, 28, 23, 19],
      isSalary: false,
    }
  },
  methods:{
    drawChart(){
      let pieChart = this.$echarts.init(document.getElementById("pie"));
      let barChart = this.$echarts.init(document.getElementById("bar"));

      let pieOption = {
        color: [
          '#d5befd',
          '#73efb4',
          '#f8fdaf',
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
            barMinHeight: 2,
            name: this.info.chartSeries,
            // 柱状图顶部显示数据
            label: {
              show: true,
              position: 'top',
              formatter: '{c}',
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
    drawSalaryChart(){
      let lineChart = this.$echarts.init(document.getElementById("line"));
      let pieChart = this.$echarts.init(document.getElementById("pie"));
      let pieOption = {
        color: [
          '#d5befd',
          '#73efb4',
          '#f8fdaf',
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
      };
      let lineOption = {
        color: [
          // '#d5befd',
          // '#73efb4',
          // '#f8fdaf',
          // '#c5d9f3',
          // '#f18b87',
          // '#87CEEB',
          // '#9c9eff',
          // '#ffb5f8',
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
        xAxis: {
          data: this.xAxis,
          name: "等级",
          nameTextStyle:{
            color: '#c5d9f3',
            fontStyle: 'italic',
            fontSize:20,
          }
        },
        yAxis: {
          type:'value',
          name:"人数"
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
          type:'line',
          smooth:true,
          //设置鼠标触摸显示详细数据
          // label: {
          //   show: true,
          //   position: 'inner',
          //   formatter: '{d}%',
          //   fontSize: 16,
          // },
          data: this.testData,
        }]
      };
      pieChart.setOption(pieOption);
      lineChart.setOption(lineOption);
    },
    async initData () {
      await getRequest("/statistics/personnel/workAge").then(res=>{
        this.info = res.obj;
      })
      this.drawChart();
    },
    salaryChart(url){
      this.isSalary = true;
      this.onClick(url);
    },
    otherChart(url){
      this.isSalary = false;
      this.onClick(url);
    },
    onClick(url){
      getRequest("/statistics/personnel/"+url).then(res=>{
        this.info = res.obj;
        if(this.isSalary){
          this.drawSalaryChart();
        } else{
          this.drawChart();
        }
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