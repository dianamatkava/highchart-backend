// bar_chart, can be reusable for representing BU, Location and whatever charts

document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('container6', {
        chart: {
            type: 'bar',
            style: {
                fontFamily: 'Poppins'
            },
            marginTop: 67,
                    // dynamic <LENGTH>
            height: 60*data['Bu Data']['categories'].length + 100,
        },
        credits: {
            enabled: false
        },
        title: {
                    // dynamic <TITLE_NAME>
            text: 'Business unit',
            align: 'left',
            style: {
                fontWeight: 'bold',
                fontSize: '23px'
            }
        },
        xAxis: {
                        // dynamic <CETEGORIES>
            categories: data['Bu Data']['categories'],
            lineColor: 'transparent',
            labels: {
                style: {
                    color: '#4b4b4e',
                    fontSize: '18px'
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
          gridLineWidth: 0
        },
        colors: ['#f6f6f6', '#3b844e'],
        plotOptions: {
            series: {
                stacking: 'normal',
                borderWidth: 0,
                maxPointWidth: 32
            },
        },
        series: [
            {
            name: 'Blank',
                    // Add func here
            data: generate_remnant('Bu Data'),
            dataLabels: {
                enabled: true,
                formatter: function() {              // dynamic <DATA_TRAINEE>
                    return Math.max.apply(Math, data['Bu Data']['Learners']) * 1.2 - this.y
                },
                style: {
                    fontSize: '20px',
                    color: '#282828',
                    textOutline: 0
                },
                align: 'left'
            }
        },
         {
            name: 'Participants',
                    // dynamic <DATA_TRAINEE>
            data: data['Bu Data']['Learners'],
            dataLabels: {
                enabled: false,
            }
        }]
    });

})


// pie_chart, can be reusable for representing Expertice, Role  and whatever charts
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
            text: null
        },
                // need to add more colors
        colors: ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#9b3745'],
        legend: {
            title: {
                    // dymanic <TITLE_NAME>
                text: 'Expertise',
                style: {
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    fontSize: '22px',
                }
            },
                // need to check if we can bind css as a callback
            className: 'expertiseLegend',
            layout: 'vertical',
            symbolRadius: 0,
            labelFormatter: function() {
                        // this.percentage
                return `<div style="display: flex; justify-content: space-between; width: 215px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage)}</span></div>`;
            },
            useHTML: true,
            itemStyle: {
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: 'thin',
            },
            itemMarginTop: 10,
            floating: true,
                    // dynamic <CATEGORIES>
            y: -215 + 30*(data['Expertise']['categories'].length - 1),
            x: 95,
        },

        plotOptions: {
            series: {
                slicedOffset: 0
            },
            pie: {
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true,
                borderColor: '#272726',
                size: '60%',
            }
        },
        series: [{
            name: 'Fields',
            colorByPoint: true,
                    // <DATA_TRAINEE>
            data: generate_data_series('Expertise')
        }],
        
    });
})