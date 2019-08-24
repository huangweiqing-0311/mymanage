<template>
  <div>
    <!-- 面包屑导航 -->
    <bread first="数据统计" second="数据报表"></bread>

    <!-- 为Echarts准备一个具备大小的DOM -->
    <div ref="myChart" id="my-echarts" style="width: 900px; height: 500px;"></div>
  </div>
</template>

<script>
//下载并导入echarts
import echarts from "echarts";
import { http } from "../api/http";
export default {
  name: "reports",
  data() {
    return {
      option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },

  //基于准备好的dom,初始化echarts实例
  //mounted是找到元素的最早一个钩子
  mounted() {},

  created() {
    //发送axios请求, 异步请求要等同步任务完成后,才会去执行调用
    http.tuReports().then(res => {
      console.log(res);
      //遍历添加四个属性
      for (let key in res.data.data) {
        this.option[key] = res.data.data[key];
      }
         
         //修改 x 轴的对齐方式
         this.option.xAxis[0].boundaryGap = false

         //获取到数据立马赋值给图表
         const myChart = echarts.init(this.$refs.myChart);
       //使用指定的配置项和数据显示图表
       myChart.setOption(this.option);
    });
    
  }
};
</script>

<style>
#my-echarts {
  margin-top: 20px;
  background-color: #fff;
}
</style>
