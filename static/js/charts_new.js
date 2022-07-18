// color order ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#9b3745']

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container1', {
        chart: {
            type: 'pie',
            backgroundColor: '#272726',
            width: 700,
            style: {
                fontFamily: 'Poppins'
            }
        },

        credits: {
            enabled: false
        },

        title: {
            text: ['CHART_TITLE'],
            y: 120, 
            x: 176,
            style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '20px'
            }
        },

        colors: ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#9b3745'],

        legend: {
            // className: 'expertiseLegend',
            layout: 'vertical',
            symbolRadius: 0,
            symbolPadding: 13,
            symbolHeight: 15,
            labelFormatter: function() {
                    return `<div style="display: flex; justify-content: space-between; width: 190px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage) + "%"}</span></div>`;
                },
            useHTML: true,
            itemStyle: {
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'thin',
            },
            itemMarginTop: 10,
            margin: -10,
            x: 240,
            floating: true,
            y: -85        
        },

        tooltip: {
            pointFormat: '{data.name} ({point.percentage:.1f}%)'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },

        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: false
                },
                showInLegend: true,
                borderColor: '#000000',
                size: '60%'
            }
        },

        series: [{
            name: 'Fields',
            colorByPoint: true,
            data: ['DATA:dict']
            
            // [{
            //     name: 'HR',
            //     y: 52.0,
            //     sliced: true,
            //     selected: true
            // }, {
            //     name: 'Finance',
            //     y: 21.0
            // }, {
            //     name: 'Product Dev.',
            //     y: 17.0
            // }, {
            //     name: 'Technical/Eng.',
            //     y: 5.0
            // }, {
            //     name: 'Other',
            //     y: 5.0
            // }]

        }]
    });
})


// DELETE EVERYTHING ABOVE WHICH IS JUST COPY AND PASTED /////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container5', {
        chart: {
            type: 'bar',
            style: {
                fontFamily: 'Poppins'
            },
            width: 514
        },
        credits: {
            enabled: false
        },
        title: {
            text: 'Location',
            align: 'left',
            style: {
            fontWeight: 'bold',
            fontSize: '23px'
            }
        },
        xAxis: {
            categories: ['CATEGORIES:list'],
            lineWidth: 0,
            tickWidth: 0,
            labels: {
                style: {
                    color: '#5e5e5e',
                    fontSize: '18px',
                },
                align: 'left',
                x:0
            },
            offset: 175
        },
        legend: {
        enabled: false
        },
        yAxis: {
          title: {
          enabled: false
          },
          labels: {
          enabled: false
          },
          gridLineWidth: 0,
          width: 400
        },
        colors: ['#f5f5f5', '#2e8b57'],
        plotOptions: {
            series: {
                stacking: 'normal',
                borderWidth: null,
                pointWidth: 28
            },
        },
        series: [{
            enableMouseTracking: false,
            data: data['Location']['values'] --> [1, 2,3 ,4 , ]
        }, {
            name: 'Counted',
            data: [16, 4, 3, 2, 2, 2],
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '20px',
                    color: '#000000'
                },
                align: 'right',
                x: 30
            }
        }]
    });
})


document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container7', {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Poppins'
            },
            inverted: 'true',
            height: 970,
            marginTop: 70
        },
        credits: {
            enabled: false
        },

        title: {
            text: 'Gap-to-Goal by Module',
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '20px'
            }
        },

        xAxis: {
            categories: ['Self Awareness', 'Communication', 'Time Management', 'How to Sell', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning and Agility', 'Professionalism', 'Collaboration'],
            offset: 200,
            lineColor: 'transparent',
            labels: {
                style: {
                    color: '#36454F',
                    fontSize: '16px'
                },
                align: 'left',
                x: 0
            }
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 5.5,
            gridLineWidth: 0,
            title: {
                text: null
            },
            width: 800,
            labels: {
                enabled: false,
            },
            stackLabels: {
                enabled: true,
                formatter: function() {
                    return this.stack
                },
                style: {
                    fontSize: '10px',
                    color: '#a9a9a9',
                    textOutline: 'none'
                },
                
                x:-40,
                align: 'left',
                overflow: "allow",
                crop: false
            }
        },

        tooltip: {
            formatter: function () {
                return '<b>' + this.x + '</b><br/>' +
                    this.series.name + ': ' + this.y + '<br/>' +
                    'Total: ' + this.point.stackTotal;
            }
        },

        plotOptions: {
            column: {
                stacking: 'normal',
                //size: 700
            },
            series: {
            borderWidth: 0,
            //pointWidth: 30,
            pointPadding: 0.13, 
            groupPadding: 0.12
            }
            },
        legend: {
            enabled: false,
            width: 500,
            verticalAlign: 'top',
            floating: true,
            y: -4,
            x: -20,
            //labelFormat: "60",
            symbolRadius: 0,
            itemStyle: {
                color: '#36454F',
                fontWeight: 'thin'
            },
            alignColumns: true
            
        },
        series: [{
            name: 'Remainder',
            showInLegend: false,
            enableMouseTracking: false,
            data: [1.02, 0.85, 0.85, 1.26, 1.26, 0.98, 0.95, 0.85, 0.85, 0.74],
            stack: 'PRE',
            color: '#f5f5f5',
            dataLabels: {
                enabled: false,
                color: '#000000',
                align: 'left',
                x: -3,
                formatter: function () {
                    return 5 - this.y
                },
                style: {
                    fontSize: '10px',
                    textOutline: 0
                }
            },
            
        }, {
            name: 'tailEnd',
            showInLegend: false,
            data: [0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03],
            stack: 'PRE',
            color: '#cc5500'

        },{
            name: 'Pre-Course Gap-to-Goal',
            data: [1.24, 1.17, 1.38, 1.69, 1.76, 1.28, 1.28, 1.14, 1.21, 0.90],
            stack: 'PRE',
            color: '#f5f5f5',
            dataLabels: {
                enabled: true,
                color: '#000000',
                align: 'right',
                verticalAlign: 'center',
                x: 55,
                formatter: function () {
                    return "+" + this.y
                },
                style: {
                    fontSize: '13px',
                    textOutline: 0
                },
            },
            legendIndex: 2
        }, {
            name: 'Pre-Course Average',
            showInLegend: true,
            data: [3.21, 3.45, 3.24, 2.52, 2.45, 3.21, 3.24, 3.48, 3.41, 3.83],
            stack: 'PRE',
            color: '#a9a9a9',
            dataLabels: {
                enabled: false,
                color: '#ffffff',
                align: 'right',
                x: 0,
                style: {
                    fontSize: '13px',
                    textOutline: 0
                },
            },
            legendIndex: 1
        }, {
            name: 'Remainder',
            showInLegend: false,
            data: [0.78, 0.85, 0.78, 0.95, 0.95, 0.92, 0.82, 0.88, 0.85, 0.71],
            stack: 'POST',
            color: '#f5f5f5',
            dataLabels: {
                enabled: false,
                color: '#000000',
                align: 'left',
                x: -3,
                formatter: function () {
                    return 5 - this.y
                },
                style: {
                    fontSize: '10px',
                    textOutline: 0
                }
            }
        }, {
            name: 'tailEnd',
            showInLegend: false,
            data: [0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03, 0.03],
            stack: 'POST',
            color: '#cc5500'

        },{
            name: 'Post-Course Gap-to-Goal',
            data: [0.55, 0.34, 0.24, 0.62, 0.45, 0.41, 0.48, 0.45, 0.52, 0.38],
            stack: 'POST',
            color: '#f5f5f5',
            dataLabels: {
                enabled: true,
                color: '#000000',
                align: 'right',
                verticalAlign: 'center',
                x: 55,
                formatter: function () {
                    return "+" + this.y
                },
                style: {
                    fontSize: '13px',
                    textOutline: 0
                }
            },
            legendIndex: 4
        }, {
            name: 'Post-Course Average',
            showInLegend: true,
            data: [4.14, 4.28, 4.45, 3.90, 4.07, 4.14, 4.17, 4.14, 4.10, 4.38],
            stack: 'POST',
            color: '#2e8b57',
            dataLabels: {
                enabled: false,
                color: '#ffffff',
                align: 'right',
                x: 0,
                style: {
                    fontSize: '13px',
                    textOutline: 0
                }
            },
            legendIndex: 3
        }, 
        ]
    },
    function(chart){    
        chart.renderer.path(['M', 600, 99, 'L',802, 99])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 760, 133, 'L',834, 133])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 668, 187, 'L',825, 187])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 779, 220, 'L',825, 220])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 640, 276, 'L',825, 276])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 801, 310, 'L',834, 310])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 544, 364, 'L',770, 364])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 728, 397, 'L',812, 397])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 535, 453, 'L',770, 453])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 735, 487, 'L',812, 487])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 540, 'L',808, 540])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 573, 'L',816, 573])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 629, 'L',812, 629])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 663, 'L',829, 663])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 716, 'L',825, 716])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 751, 'L',821, 751])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 807, 'L',825, 807])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 841, 'L',825, 841])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 895, 'L',840, 895])
            .attr({
                'stroke-width': 2,
                stroke: '#a9a9a9',
                zIndex: 5
            })
            .add();
            chart.renderer.path(['M', 635, 928, 'L',845, 928])
            .attr({
                'stroke-width': 2,
                stroke: '#2e8b57',
                zIndex: 5
            })
            .add();
});
})


document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container8', {
        chart: {
            type: 'column',
            style: {
                fontFamily: 'Poppins'
            },
            inverted: true,
            height: 600,
            marginTop: null
        },
        title: {
            text: 'Score by module',
            align: 'left',
            style: {
                fontWeight: 790,
                fontSize: '22px'
            }
        },
        legend: {
            verticalAlign: 'top',
            x: 93,
            y: 0,
            floating: true,
            symbolRadius: 0,
            symbolHeight: 15,
            symbolPadding: 10,
            itemDistance: 50,
            itemStyle: {
                fontWeight: 'thin',
                fontSize: '14px',
                color: '#404040'
            }
        },
        xAxis: {
            categories: ['Self Awareness', 'Communication', 'Time Management', 'How to Sell', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning and Agility', 'Professionalism', 'Collaboration'],
            lineColor: 'transparent',
            offset: 200,
            labels: {
                align: 'left',
                x: 0,
                style: {
                    color: '#404040',
                    fontWeight: 540,
                    fontSize: '17px'
                }
            }
        },
        
        yAxis: [{ // Primary yAxis
            min: 0,
            max: 100,
            width: 725,
            title: {
                enabled: false
            },
            labels: {
                enabled: false
            },
            gridLineWidth: 0
		}],        
        plotOptions: {
            series: {
                borderWidth: 0,
                groupPadding: 0.2,
                pointPadding: 0.1
            }
        },
        series: [{
            showInLegend: false,
            stacking: 'normal',
            data: [16, 17, 19, 30, 24, 24, 41, 26, 24, 33],
            color: '#f5f5f5'
        }, {
            name: 'Cohort Average',
            stacking: 'normal',
            data: [84, 83, 81, 70, 76, 76, 59, 74, 76, 67],
            color: '#2e8b57',
            dataLabels: {
                enabled: true,
                align: 'right',
                x: 45,
                style: {
                    color: '#5e5e5e',
                    fontSize: '16px'
                },
                formatter: function () {
                    return this.y + "%"
                }
            },
            legendIndex: 2
        }, {    
            name: 'Global Average',
            type : 'spline',
            data: [73, 71, 66, 56, 59, 51, 54, 65, 61, 63],
            marker: {
            enabled: false
            },
            color: '#ffbf00',
            lineWidth: 3,
            crisp: false,
            style: {
                
            },
            legendIndex: 1
        }]
    });
})

var data1 = [{
    low: 3.7,
    high: 4.94
}, {

    low: 3.1,
    high: 4.34
}, {

    low: 2.9,
    high: 4.14
}, {

    low: 3.9,
    high: 3.9
}, {

    low: 0,
    high: 5
}, {

    low: 2.8,
    high: 3.54
}, {

    low: 2.9,
    high: 4.14
}, {

    low: 3.2,
    high: 4.44
}, {

    low: 3.1,
    high: 4.34
}, {

    low: 3.5,
    high: 4.74
}  
];
var data2 = [{
    low: 3.8,
    high: 4.35
}, {

    low: 3.9,
    high: 4.3
}, {

    low: 4.0,
    high: 4.35
}, {

    low: 3.6,
    high: 4.29
}, {

    low: 3.7,
    high: 4.25
}, {

    low: 3.7,
    high: 4.25
}, {

    low: 3.6,
    high: 4.15
}, {

    low: 3.6,
    high: 4.15
}, {

    low: 3.65,
    high: 4.10
}, {

    low: 3.8,
    high: 4.2
}  
];
document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container9', {

        chart: {
            type: 'dumbbell',
            inverted: true,
            height: 750,
            width: 950,
            marginTop: 70,
            style: {
                fontFamily: 'Poppins'
            }
        },

        legend: {
            enabled: false
        },

        title: {
            text: 'Gap-to-Goal by Module',
            style: {
                fontWeight: 900,
                fontSize: '20px'
            },
            align: 'left'
        },

        tooltip: {
            shared: true
        },


    xAxis: [{
        categories: ['PRE','PRE','PRE','PRE','PRE','PRE','PRE','PRE','PRE','PRE'],
        labels: {
            y:-7,
            style: {
                color: '#808080',
                fontWeight: 500
            }
        },
        plotBands: [
        {
        color: '#f5f5f5',
        from: -0.34,
        to: 0.34
        },
        {
        color: '#f5f5f5',
        from: 0.66,
        to: 1.34
        }, 
        {
        color: '#f5f5f5',
        from: 1.66,
        to: 2.34
        },
        {
        color: '#f5f5f5',
        from: 2.66,
        to: 3.34
        },
        {
        color: '#f5f5f5',
        from: 3.66,
        to: 4.34
        },
        {
        color: '#f5f5f5',
        from: 4.66,
        to: 5.34
        },
        {
        color: '#f5f5f5',
        from: 5.66,
        to: 6.34
        },
        {
        color: '#f5f5f5',
        from: 6.66,
        to: 7.34
        },
        {
        color: '#f5f5f5',
        from: 7.66,
        to: 8.34
        },
        {
        color: '#f5f5f5',
        from: 8.66,
        to: 9.34
        }],
        lineColor: '#e6e6e6' 
        },
        {
            categories: ['POST','POST','POST','POST','POST','POST','POST','POST','POST','POST'],
            labels: {
                y:14,
                x: 20,
                style: {
                    color: '#808080',
                    fontWeight: 500
                }
            },
            linkedTo: 0,
            lineColor: 'transparent'
            },
        {
        //tickWidth: 0,
        categories: ['Self Awareness', 'Communication', 'Time Management', 'How to Sell & Influence', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning and Agility', 'Professionalism', 'Collaboration & Teamwork'
        ],
        labels: {
            align: 'left',
            x:0,
            style: {
                fontSize: '16px',
                color: '#4d4d4d'
            }
        },
        lineColor: 'transparent',
        linkedTo: 0,
        offset: 285
            },
            {
            categories: ['+1.24','+1.24','+1.24','+1.24','+1.24','+1.24','+1.24','+1.24','+1.24','+1.24'],
                linkedTo: 0,
                opposite: true,
                labels: {
                useHTML: true,
                x: -36,
                y: -7,
                style: {
                    color: '#cc5500',
                    fontWeight: 600
                }
            },
            lineColor: 'transparent'
            },
        {
            categories: ['+0.55','+0.55','+0.55','+0.55','+0.55','+0.55','+0.55','+0.55','+0.55','+0.55'],
            linkedTo: 0,
            opposite: true,
            lineColor: 'transparent',
            labels: {
                x: -40,
                y:14,
                style: {
                    color: '#cc5500',
                    fontWeight: 600
                }
            }
        }],


    

    //categories: ['Self Awareness', 'Communication', 'Time Management', 'How to Sell & Influence', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning and Agility', 'Professionalism', 'Collaboration and Teamwork'],

        yAxis: {
            width: 600,
            title: {
            enabled: false
            },
            labels: {
            enabled: false
            },
            min: 0,
            max: 5
        },

        series: [{
            name: 'Pre-Course Gap to Goal',
            data: data1,
            lowColor: '#a9a9a9',
            color: '#cc5500',
            marker: {
                radius: 4.5
            },
            connectorWidth: 1.1
        },
        {
            name: 'Post-Course Gap to Goal',
        data: data2,
        marker: {
        symbol: 'circle',
        radius: 4.5
        },
        lowColor: '#2e8b57',
        connectorColor: 'red',
        connectorWidth: 1.1,
        color:{
            linearGradient: {x1:1, x2:0, y1:0, y2:1},
            stops: [
            [0, '#2e8b57'],
            [1, '#cc5500']
            ]
        },
        dataLabels: {
        enabled: false,
        },

        }]

    });
})