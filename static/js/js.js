$(document).ready(function() {

    $.ajax({
        url: "/get_data", // Flask 路由
        type: "GET",
        success: function(response) {
            var data = response.data;
            var names = [];
            var nl = [];
            var sf = [];
            var dbz = [];
            //第二张图使用数组
            var zf = [];
            var ksbf = [];
            var ssxw =[];
            var tshw = [];
            var n =[];
            var g =[];
            var t =[];
            var wssa =[];
            var wssb1 =[];
            var wssb2 =[];
            var wssb3 =[];
            var wsse =[];
            var wssc =[];
            var dgc =[];
            var sortedDbz = [];
            var sortedNames = [];
            var combinedData = [];
            for (var i = 0; i < data.length; i++) {
                names.push(data[i].名称); // 提取名称数据
                nl.push(data[i]["能量(千卡)"]); // 提取能量(千卡)
                sf.push(data[i]["水分(克)"]);
                dbz.push(data[i]["蛋白质(克)"]);
                zf.push(data[i]["脂肪(克)"]);
                ksbf.push(data[i]["可食部分(%)"]);
                ssxw.push(data[i]["膳食纤维(克)"]);
                tshw.push(data[i]["碳水化物(克)"]);
                n.push(data[i]["钠(毫克)"]);
                g.push(data[i]["钙(毫克)"]);
                t.push(data[i]["铁(毫克)"]);

                wssa.push(data[i]["维生素A"]);
                wssb1.push(data[i]["维生素B1(毫克)"]);
                wssb2.push(data[i]["维生素B2(毫克)"]);
                wssb3.push(data[i]["烟酸(毫克)"]);
                wsse.push(data[i]["维生素E"]);
                wssc.push(data[i]["维生素C(毫克)"]);
                dgc.push(data[i]["胆固醇(毫克)"])
                combinedData.push({
                    name: data[i].名称,
                    dbz: data[i]["蛋白质(克)"]
                });
            }
            combinedData.sort(function(a, b) {
                return b.dbz - a.dbz;
            });

            combinedData.forEach(function(item) {
                sortedNames.push(item.name);
                sortedDbz.push(item.dbz);
            });

            console.log(dgc);
            echarts_1(names,nl,tshw,zf,dbz); // 将名称和能量数据传递给echarts_1函数
            echarts_2(names,ksbf,sf,ssxw,tshw);
            echarts_3(names,n,g,t);
            echarts_4(names,wssa,wssb1,wssb2,wssb3,wsse,wssc);
            echarts_5(sortedNames,sortedDbz);
            echarts_6(names,zf,ssxw,dgc)

            // 其他echarts函数...
        },
        error: function(xhr) {
            console.log("Error:", xhr.responseText);
        }
    });

echarts_1();
echarts_2();
echarts_3();
echarts_4();
echarts_5();
echarts_6();
function echarts_1(names,nl, tshw,zf,dbz) {
    
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));

       option = {
        
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
		top:'25px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
        
      		data: names,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
                rotate: -80,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [
        {
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    },
    {
        type: 'value', // 右侧坐标轴配置
        position: 'right', // 设置坐标轴位置在右侧
        // 右侧坐标轴样式配置...
        axisLabel: {
            //formatter: '{value} %'
             show:true,
              textStyle: {
                      color: "rgba(255,255,255,.6)",
                     fontSize: '12',
                 },
         },
         axisTick: {
             show: false,
         },
         axisLine: {
             show: true,
             lineStyle: {
                 color: "rgba(255,255,255,.1	)",
                 width: 1,
                 type: "solid"
             },
         },
         splitLine: {
             lineStyle: {
                color: "rgba(255,255,255,.1)",
             }
         }
    }
],
    legend: {
        data: ['能量(千卡)','碳水化物(克)','脂肪(克)','蛋白质(克)'], // 图例的名称，与 series 中的 name 对应
        textStyle: {
            color: 'white' // 图例文字颜色
        },
    },
    series: [
		{
        type: 'bar',
        name:'能量(千卡)',
        data: nl,
        barWidth:'20%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    },
    {
        type: 'line', // 设置为折线图
        name: '碳水化物(克)', // 系列名称
        data: tshw, // 折线图数据
        yAxisIndex: 1,
        // 其他样式配置
        lineStyle: {
            normal: {
                color: 'green' // 折线颜色
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'green' // 图例颜色
            }
        }
        // 更多样式配置...
    },
    {
        type: 'line',
        name: '脂肪(克)', // 系列名称
        data: zf,
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color:'red',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'red' // 图例颜色
            }
        }
    },
    {
        type: 'line',
        name: '蛋白质(克)', // 系列名称
        data: dbz,
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color:'purple',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'purple' // 图例颜色
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_2(names,ksbf,sf,ssxw,tshw) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow'}
    },
    grid: {
        left: '0%',
		top:'25px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: names,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
                rotate:-80,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
            formatter: '{value} %', // 注意两个大括号
            show: true,
            textStyle: {
                color: "rgba(255,255,255,.6)",
                fontSize: '12',
            },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    },
    {
        type: 'value', // 右侧坐标轴配置
        position: 'right', // 设置坐标轴位置在右侧
        // 右侧坐标轴样式配置...
        axisLabel: {
            //formatter: '{value} %'
             show:true,
              textStyle: {
                      color: "rgba(255,255,255,.6)",
                     fontSize: '12',
                 },
         },
         axisTick: {
             show: false,
         },
         axisLine: {
             show: true,
             lineStyle: {
                 color: "rgba(255,255,255,.1	)",
                 width: 1,
                 type: "solid"
             },
         },
         splitLine: {
             lineStyle: {
                color: "rgba(255,255,255,.1)",
             }
         }
    },
],
    legend: {
    data: ['可食部分(%)','水分(克)','膳食纤维(克)','碳水化物(克)'], // 图例的名称，与 series 中的 name 对应
    textStyle: {
        color: 'white' // 图例文字颜色
    },
},
    series: [
		{
       
        type: 'bar',
        name : '可食部分(%)',
        data: ksbf,
        barWidth:'20%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#27d08a',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: '#27d08a' // 图例颜色
            }
        }
    },
    {
        type: 'line', // 设置为折线图
        name: '水分(克)', // 系列名称
        data: sf, // 折线图数据
        yAxisIndex: 1,
        // 其他样式配置
        lineStyle: {
            normal: {
                color: 'blue' // 折线颜色
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'blue' // 图例颜色
            }
        }
        // 更多样式配置...
    },
    {
        type: 'line', // 设置为折线图
        name: '膳食纤维(克)', // 系列名称
        data: ssxw, // 折线图数据
        yAxisIndex: 1,
        // 其他样式配置
        lineStyle: {
            normal: {
                color: 'red' // 折线颜色
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'red' // 图例颜色
            }
        }
        // 更多样式配置...
    },
	{
        type: 'line', // 设置为折线图
        name: '碳水化物(克)', // 系列名称
        data: tshw, // 折线图数据
        yAxisIndex: 1,
        // 其他样式配置
        lineStyle: {
            normal: {
                color: 'orange' // 折线颜色
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'orange' // 图例颜色
            }
        }
        // 更多样式配置...
    }
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_3(names,n,g,t) {
    
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart3'));

       option = {
        
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
		top:'25px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
        
      		data: names,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
                rotate: -80,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [
        {
        type: 'value',
        axisLabel: {
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    },

],
    legend: {
        data: ['钠(毫克)','钙(毫克)','铁(毫克)'], // 图例的名称，与 series 中的 name 对应
        textStyle: {
            color: 'white' // 图例文字颜色
        },
    },
    series: [
    {
        type: 'line', // 设置为折线图
        name: '钠(毫克)', // 系列名称
        data: n, // 折线图数据
        // yAxisIndex: 1,
        // 其他样式配置
        lineStyle: {
            normal: {
                color: 'green' // 折线颜色
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'green' // 图例颜色
            }
        }
        // 更多样式配置...
    },
    {
        type: 'line',
        name: '钙(毫克)', // 系列名称
        data: g,
        itemStyle: {
            normal: {
                color:'red',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'red' // 图例颜色
            }
        }
    },
    {
        type: 'line',
        name: '铁(毫克)', // 系列名称
        data: t,
        itemStyle: {
            normal: {
                color:'#ffd700',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: '#ffd700' // 图例颜色
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
function echarts_4(names,wssa,wssb1,wssb2,wssb3,wsse,wssc) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart4'));

    option = {
	    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#dddc6b'
            }
        }
    },
		    legend: {
    top:'0%',
        data:['维生素A','维生素B1(毫克)','维生素B2(毫克)','烟酸(毫克)','维生素E','维生素C(毫克)"'],
                textStyle: {
           color: 'rgba(255,255,255,.5)',
			fontSize:'12',
        }
    },
    grid: {
        left: '10',
		top: '30',
        right: '10',
        bottom: '10',
        containLabel: true
    },

    xAxis: [{
        type: 'category',
        boundaryGap: false,
axisLabel:  {
    rotate: -80,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },
        axisLine: {
			lineStyle: { 
				color: 'rgba(255,255,255,.2)'
			}

        },

   data:names,

    }, {

        axisPointer: {show: false},
        axisLine: {  show: false},
        position: 'bottom',
        offset: 20,

       

    }],

    yAxis: [{
        type: 'value',
        axisTick: {show: false},
        axisLine: {
            lineStyle: {
                color: 'rgba(255,255,255,.1)'
            }
        },
       axisLabel:  {
                textStyle: {
 					color: "rgba(255,255,255,.6)",
					fontSize:12,
                },
            },

        splitLine: {
            lineStyle: {
                 color: 'rgba(255,255,255,.1)'
            }
        }
    }],
    series: [
		{
        name: '维生素A',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#0184d5',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(1, 132, 213, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(1, 132, 213, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#0184d5',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wssa,

    }, 
{
        name: '维生素B1(毫克)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#00d887',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#00d887',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wssb1,

    }, 
    {
        name: '维生素B2(毫克)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: 'red',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: 'red',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wssb2,

    }, 
    {
        name: '烟酸(毫克)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: '#ffd700',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: '#ffd700',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wssb3,

    }, 
    {
        name: '维生素E',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: 'purple',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: 'purple',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wsse,

    },
    {
        name: '维生素C(毫克)',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        showSymbol: false,
        lineStyle: {
			
            normal: {
				color: 'cyan',
                width: 2
            }
        },
        areaStyle: {
            normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(0, 216, 135, 0.4)'
                }, {
                    offset: 0.8,
                    color: 'rgba(0, 216, 135, 0.1)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
            }
        },
			itemStyle: {
			normal: {
				color: 'cyan',
				borderColor: 'rgba(221, 220, 107, .1)',
				borderWidth: 12
			}
		},
        data: wssc,

    },
		 ]

};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }

function echarts_5(sortedNames,sortedDbz) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));

       option = {
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    
    grid: {
        left: '0%',
		top:'10px',
        right: '0%',
        bottom: '2%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
      		data: sortedNames,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
               rotate:-80,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [{
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    }],
    series: [{
        type: 'bar',
        name:'蛋白质（克）',
        data: sortedDbz,
        barWidth:'35%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    }
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
	

function echarts_6(names,zf,ssxw,dgc) {
    
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart6'));

       option = {
        
  //  backgroundColor: '#00265f',
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        left: '0%',
		top:'25px',
        right: '0%',
        bottom: '4%',
       containLabel: true
    },
    xAxis: [{
        type: 'category',
        
      		data: names,
        axisLine: {
            show: true,
         lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 1,
                type: "solid"
            },
        },
		
        axisTick: {
            show: false,
        },
		axisLabel:  {
                interval: 0,
                rotate: -80,
               // rotate:50,
                show: true,
                splitNumber: 15,
                textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
            },
    }],
    yAxis: [
        {
        type: 'value',
        axisLabel: {
           //formatter: '{value} %'
			show:true,
			 textStyle: {
 					color: "rgba(255,255,255,.6)",
                    fontSize: '12',
                },
        },
        axisTick: {
            show: false,
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "rgba(255,255,255,.1	)",
                width: 1,
                type: "solid"
            },
        },
        splitLine: {
            lineStyle: {
               color: "rgba(255,255,255,.1)",
            }
        }
    },
    {
        type: 'value', // 右侧坐标轴配置
        position: 'right', // 设置坐标轴位置在右侧
        // 右侧坐标轴样式配置...
        axisLabel: {
            //formatter: '{value} %'
             show:true,
              textStyle: {
                      color: "rgba(255,255,255,.6)",
                     fontSize: '12',
                 },
         },
         axisTick: {
             show: false,
         },
         axisLine: {
             show: true,
             lineStyle: {
                 color: "rgba(255,255,255,.1	)",
                 width: 1,
                 type: "solid"
             },
         },
         splitLine: {
             lineStyle: {
                color: "rgba(255,255,255,.1)",
             }
         }
    }
],
    legend: {
        data: ['脂肪(克)','膳食纤维(克)','胆固醇(毫克)'], // 图例的名称，与 series 中的 name 对应
        textStyle: {
            color: 'white' // 图例文字颜色
        },
    },
    series: [
		{
        type: 'bar',
        name:'脂肪(克)',
        data: zf,
        barWidth:'20%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'blue',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    },
    {
        type: 'bar',
        name:'膳食纤维(克)',
        data: ssxw,
        barWidth:'20%', //柱子宽度
       // barGap: 1, //柱子之间间距
        itemStyle: {
            normal: {
                color:'#2f89cf',
                opacity: 1,
				barBorderRadius: 5,
            }
        }
    },
    {
        type: 'line',
        name: '胆固醇(毫克)', // 系列名称
        data: dgc,
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color:'red',
                opacity: 1,
				barBorderRadius: 5,
            }
        },
        itemStyle: { // 设置图例颜色
            normal: {
                color: 'red' // 图例颜色
            }
        }
    }
		
	]
};
      
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        window.addEventListener("resize",function(){
            myChart.resize();
        });
    }
				
	
})



		
		
		


		









