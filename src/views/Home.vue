<template>
  <div>
    <div id="main" style="width: 500px;height:400px;"></div>
    <div id="pie" style="width: 500px;height:400px;"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:"Home",
  data(){
    return{

    }
  },
  mounted() {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title:{
        text:'ECharts 入门示例',
        subtext: 'Hello World',
        left:'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        },
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'bar'
        }
      ]
    };
    option && myChart.setOption(option);


    //扇形统计图

    var chartDom = document.getElementById('pie');
    var myChart = echarts.init(chartDom);
    var pieoption;

    pieoption = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Fake Data',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    pieoption && myChart.setOption(pieoption);
  }
}
</script>
