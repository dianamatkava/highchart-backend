jQuery.extend({
    getValues: function(url) {
        var result = null;
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'json',
            async: false,
            success: function(data, textStatus, jqXHR) {
                result = JSON.parse(data);
                alert(result)
            },
            error: function(data) {
                alert(error)
            }
        });
       return result;
    }
});

// data = {'Cohort Summary': {'Learners Invited': 55, 'Learners Activated': 51, 'Learners Licensed': 30, 'Learners Completed': 37, 'Compltion rate': 84, 'Certificatoin Rate': 81}, 'Confidence Summary': {'Skills Gain': 0.46, 'Confidence Gain': 0.54}, 'Location data': {'categories': ['Singapore'], 'Learners': [37]}, 'Bu Data': {'categories': ['Business Strategy', 'Cons - HQ', 'Cyber & Forensics', 'Deals - BRS', 'Deals - CPI', 'Deals - CPT', 'Deals - FDD', 'Deals VH', 'DS - Admin', 'FCS - HR', 'FCS - L&D', 'Finance Transformation', 'Financial Crime', 'Front Office Transformation', 'Productivity', 'Tax - \
// CTA', 'Tax - CTS', 'Tax - CTS DT', 'Tax - Deals', 'Tax - FS', 'Tax - GS'], 'Learners': [1, 1, 3, 3, 
// 1, 1, 4, 2, 1, 1, 2, 2, 2, 2, 1, 1, 3, 2, 1, 2, 1]}, 'Expertise': {'categories': ['Customer Management', 'Finance', 'HR', 'Marketing', 'Other', 'Sales', 'Technical/Engineering'], 'Learners': [1, 16, 4, 1, 12, 1, 2], 'Customer Management': 1, 'Finance': 16, 'HR': 4, 'Marketing': 1, 'Other': 12, 'Sales': 1, 'Technical/Engineering': 2}, 'Role': {'categories': ['Individual Contributor', 'Manager/Team \
// Lead'], 'Learners': [3, 34], 'Individual Contributor': 3, 'Manager/Team Lead': 34}, 'Gender': {'categories': ['Female', 'Male', 'Rather not say'], 'Learners': [21, 14, 2], 'Female': 21, 'Male': 14, 'Rather not say': 2}, 'Work Experience': {'categories': ['< 5 years', '15 years +', '5 - 10 Years'], 'Learners': [6, 1, 30], '< 5 years': 6, '15 years +': 1, '5 - 10 Years': 30}, 'Performance Summary': 
// {'categories': ['Cohort Average Score'], 'Value': [80], 'nan': ['nan']}, 'Module data': {'categories': ['Self-Awareness', 'Communication', 'Time Management', 'How to Sell', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning & Agility', 'Professionalism', 'Collaboration & Teamwork'], 'Cohort Average': [0.83, 0.76, 0.75, 0.69, 0.78, 0.75, 0.55, 0.68, 0.69, 0.69], 'Global Average': [0.76, 0.74, 0.78, 0.66, 0.72, 0.77, 0.58, 0.69, 0.7, 0.67]}, 'Certification Level': {'categories': ['None', 'Completion', 'Merit', 'Distinction'], 'Learners': [7, 5, 20, 5], '%': [19, 14, 54, 14]}, 'Feedback Summary': {'categories': ['Average Course Rating', 'Average Course Relevance'], 'Value': [8.23, 8.87], 'nan': ['nan', 'nan']}, 'Module Rating & Relevance': {'categories': ['Self-Awareness', 'Communication', 'Time Management', 'How to Sell', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning & Agility', 'Professionalism', 'Collaboration & Teamwork'], 'Rating': [7.92, 8.22, 8.81, 
// 8.08, 8.34, 8.24, 7.62, 8.21, 8.57, 8.47], 'Relevance': [8.72, 9.16, 9.08, 8.69, 9.09, 8.85, 8.79, 8.52, 8.96, 8.74]}, 'Gap to Goal Data': {'categories': ['Self Awareness', 'Communication', 'Time Management', 'How to Sell', 'How to Say No', 'Effective Meetings', 'Critical Thinking', 'Planning & Agility', 'Professionalism', 'Collaboration & Teamwork', 'Average'], 'Module/Stage': {'PRE': {'Current': [], 'Goal': [], 'Gap': []}, 'POST': {'Current': [], 'Goal': [], 'Gap': []}}, 'Self Awareness': {'PRE': {'Current': 3.57, 'Goal': 4.35, 'Gap': 0.78}, 'POST': {'Current': 4.11, 'Goal': 4.46, 'Gap': 0.35}}, 'Communication': {'PRE': {'Current': 3.24, 'Goal': 4.41, 'Gap': 1.16}, 'POST': {'Current': 4.05, 'Goal': 4.49, 'Gap': 0.43}}, 'Time Management': {'PRE': {'Current': 3.35, 'Goal': 4.51, 'Gap': 1.16}, 'POST': {'Current': 4.03, 'Goal': 4.49, 'Gap': 0.46}}, 'How to Sell': {'PRE': {'Current': 2.54, 
// 'Goal': 4, 'Gap': 1.46}, 'POST': {'Current': 3.78, 'Goal': 4.38, 'Gap': 0.59}}, 'How to Say No': {'PRE': {'Current': 2.68, 'Goal': 4.22, 'Gap': 1.54}, 'POST': {'Current': 4.03, 'Goal': 4.43, 'Gap': 0.41}}, 'Effective Meetings': {'PRE': {'Current': 3.11, 'Goal': 4.38, 'Gap': 1.27}, 'POST': {'Current': 4.03, 'Goal': 4.49, 'Gap': 0.46}}, 'Critical Thinking': {'PRE': {'Current': 3.46, 'Goal': 4.38, 'Gap': 0.92}, 'POST': {'Current': 4, 'Goal': 4.49, 'Gap': 0.49}}, 'Planning & Agility': {'PRE': {'Current': 3.51, 'Goal': 4.49, 'Gap': 0.97}, 'POST': {'Current': 4.11, 'Goal': 4.51, 'Gap': 0.41}}, 'Professionalism': {'PRE': {'Current': 3.7, 'Goal': 4.54, 'Gap': 0.84}, 'POST': {'Current': 4.11, 'Goal': 4.51, 'Gap': 0.41}}, 'Collaboration & Teamwork': {'PRE': {'Current': 3.84, 'Goal': 4.59, 'Gap': 0.76}, 'POST': {'Current': 4.27, 'Goal': 4.51, 'Gap': 0.24}}, 'Average': {'PRE': {'Current': 3.51, 'Goal': 4.49, 'Gap': 0.97}, 'POST': {'Current': 4.11, 'Goal': 4.51, 'Gap': 0.41}}}}


function generate_charts() {

    function generate_data_series(table_name) {

        const series_data = [];
        let max = new Array(0, 0);
        let index = 0;
        for (let key in data[table_name]) {
            
            if (!Array.isArray(data[table_name][key])) {
                if (data[table_name][key]>max[0]) {
                    max[0] = data[table_name][key];
                    max[1] = index
                }
                index++
                series = {
                    name: key,
                    y: data[table_name][key]
                }
                series_data.push(series);
            }
        }
        series_data[max[1]]['sliced'] = true;
        series_data[max[1]]['selected'] = true;
            
        return series_data
    }

    function generate_remnant (table_name) {
        let array = []
        let max = Math.max.apply(Math, data[table_name]['Learners']) * 1.2

        for (const num of data[table_name]['Learners']) {
            array.push(max-num)
        }
        return array
    }

    function generate_remnant2 (table_name) {
        let array = []
        let max = Math.max.apply(Math, data[table_name]['Learners']) * 1.3

        for (const num of data[table_name]['Learners']) {
            array.push(max-num)
        }
        return array
    }
    function generate_gap_subcategories(text, length=null) {let list = []; for (let i=1; i<=10; i++){list.push(text) } return list}


    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container1', {
            chart: {
            type: 'pie',
            backgroundColor: '#272726',
            width: 700,
            marginLeft: -100,
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
            colors: ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#9b3745'],
            legend: {
                title: {
                    text: 'Expertise',
                    style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '22px',
                //letterSpacing: 1000
            }
                },
                className: 'expertiseLegend',
                layout: 'vertical',
                symbolRadius: 0,
                symbolPadding: 13,
                symbolHeight: 15,
                labelFormatter: function() {
                    return `<div style="display: flex; justify-content: space-between; width: 215px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage)}</span></div>`;
                },
                useHTML: true,
                itemStyle: {
                    //lineHeight: '17px',
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 'thin',
                    display: 'inline-block',
                    verticalAlign: 'middle'
            
                },
                itemMarginTop: 10,
                margin: -10,
                x: 200,
                floating: true,
                y: -215 + 30*(data['Expertise']['categories'].length - 1)        },
            tooltip: {
            pointFormat: '{data.name} ({point.percentage:.1f}%)'
            },
            accessibility: {
            point: {
                valueSuffix: '%'
            }
            },
            plotOptions: {
            series: {
                slicedOffset: 0
            },
            pie: {
                allowPointSelect: true,
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
            data: generate_data_series('Expertise')
            }],
            
        });
    })
    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container2', {
            chart: {
            type: 'pie',
            backgroundColor: '#272726',
            width: 700,
            marginLeft: -100,
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
            colors: ['#3b844e', '#3984bc', '#9b3745'],
            legend: {
                title: {
                    text: 'Gender',
                    style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '22px'
            }
                },
                className: 'genderLegend',
                layout: 'vertical',
                symbolRadius: 0,
                symbolPadding: 13,
                symbolHeight: 15,
                labelFormatter: function() {
                    return `<div style="display: flex; justify-content: space-between; width: 215px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage)}</span></div>`;
                },
                useHTML: true,
                itemStyle: {
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 'thin'
                },
                itemMarginTop: 10,
                margin: -10,
                x: 200,
                floating: true,
                y: -215 + 30*(data['Gender']['categories'].length - 1)
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
            point: {
                valueSuffix: '%'
            }
            },
            plotOptions: {
            series: {
                slicedOffset: 0
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: false
                },
                showInLegend: true,
                borderColor: '#272726',
                size: '60%'
            }
            },
            series: [{
            name: 'Fields',
            colorByPoint: true,
            data: generate_data_series('Gender')
            }]
        });
    })
    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container3', {
            chart: {
            type: 'pie',
            style: {
                fontFamily: 'Poppins'
            },
            backgroundColor: '#272726',
            width: 700,
            marginLeft: -300,
            },
            credits: {
                enabled: false
            },
            title: {
            text: null
            },
            colors: ['#3b844e', '#3984bc', '#9b3745'],
            legend: {
                title: {
                    text: 'Role',
                    style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '22px'
            }
                },
                className: 'roleLegend',
                layout: 'vertical',
                symbolRadius: 0,
                symbolPadding: 13,
                symbolHeight: 15,
                labelFormatter: function() {
                    return `<div style="display: flex; justify-content: space-between; width: 215px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage)}</span></div>`;
                },
                useHTML: true,
                itemStyle: {
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 'thin'
                },
                itemMarginTop: 10,
                margin: -10,
                x: 95,
                floating: true,
                y: -215 + 30*(data['Role']['categories'].length - 1)
            },
            tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
            point: {
                valueSuffix: '%'
            }
            },
            plotOptions: {
            series: {
                slicedOffset: 0
            },
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: false
                },
                showInLegend: true,
                borderColor: '#272726',
                size: '60%'
            }
            },
            series: [{
            name: 'Fields',
            colorByPoint: true,
            data: generate_data_series('Role')
            }]
        });
    })

    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container4', {
        chart: {
            type: 'pie',
            style: {
                fontFamily: 'Poppins'
            },
            backgroundColor: '#272726',
            width: 700,
            marginLeft: -300
            },
            credits: {
                enabled: false
            },
            title: {
            text: null
            },
            colors: ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#9b3745'],
            legend: {
                title: {
                    text: 'Work Experience',
                    style: {
                color: '#FFFFFF',
                fontWeight: 'bold',
                fontSize: '22px'
            }
                },
                className: 'experienceLegend',
                layout: 'vertical',
                symbolRadius: 0,
                symbolPadding: 13,
                symbolHeight: 15,
                labelFormatter: function() {
                    return `<div style="display: flex; justify-content: space-between; width: 215px"><span style="color:#a9a9a9;">${this.name}</span> <span>${Math.round(this.percentage)}</span></div>`;
                },
                useHTML: true,
                itemStyle: {
                    color: '#ffffff',
                    fontSize: '16px',
                    fontWeight: 'thin',
                },
                itemMarginTop: 10,
                margin: -10,
                x: 95,
                floating: true,
                y: -215 + 30*(data['Work Experience']['categories'].length - 1)        },
            tooltip: {
            pointFormat: '{data.name} ({point.percentage:.1f}%)'
            },
            accessibility: {
            point: {
                valueSuffix: '%'
            }
            },
            plotOptions: {
            series: {
                 slicedOffset: 0
             },
            pie: {
                allowPointSelect: true,
                
                cursor: 'pointer',
                dataLabels: {
                enabled: false
                },
                showInLegend: true,
                borderColor: '#272726',
                size: '60%'
            }
            },
            series: [{
            name: 'Fields',
            colorByPoint: true,
            data: generate_data_series('Work Experience')
            }]
        });
    })
    
    // if (data['Location data']['categories'].length == 1) {
    //     h = 140
    // }
    // else {
    //     h = 60*data['Location data']['categories'].length + 140
    // }
    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container5', {
            chart: {
                backgroundColor: 'transparent',
                type: 'bar',
                style: {
                    fontFamily: 'Poppins'
                },
                height: 60*data['Location data']['categories'].length + 100,
                marginTop: 67,
                // marginBottom: -12
                //width: 514
            },
            // responsive: {
            //     rules: [{
            //         condition: {
            //             maxHeight: 200
            //         }
            //     }]
            // },
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
                categories: data['Location data']['categories'],
                lineColor: 'transparent',
                labels: {
                    style: {
                        color: '#4b4b4e',
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
            colors: ['#f6f6f6', '#3b844e'],
            plotOptions: {
                series: {
                    stacking: 'normal',
                    borderWidth: 0,
                    // groupPadding: 0.15, 
                    // pointPadding: 0.15,
                    maxPointWidth: 32
                    //pointWidth: 28
                    
                },
            },
            series: [{
                name: 'Blank',
                data: generate_remnant('Location data'),
                enableMouseTracking: false,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.max.apply(Math, data['Location data']['Learners']) * 1.2 - this.y
                    },
                    style: {
                        fontSize: '20px',
                        color: '#282828',
                        textOutline: 0
                    },
                    align: 'left',
                    y: 2
                }
            }, {
                name: 'Participants',
                data: data['Location data']['Learners'],
                dataLabels: {
                    enabled: false,
                }
            }]
        });
    })

    // if (data['Bu Data']['categories'].length == 1) {
    //     heig = 140
    // }
    // else {
    //     heig = 60*data['Bu Data']['categories'].length + 140
    // }
    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container6', {
            chart: {
                type: 'bar',
                style: {
                    fontFamily: 'Poppins'
                },
                marginTop: 67,
                height: 60*data['Bu Data']['categories'].length + 100,
                // maxHeight: 400
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Business unit',
                align: 'left',
                style: {
                fontWeight: 'bold',
                fontSize: '23px'
                }
            },
            xAxis: {
                categories: data['Bu Data']['categories'],
                lineColor: 'transparent',
                labels: {
                    style: {
                        color: '#4b4b4e',
                        fontSize: '18px',
                        marginRight: 20,
                        width: 200,
                        overflowWrap: 'anywhere'
                    },
                    align: 'left',
                    x:0
                },
                offset: 250
            },
            legend: {
            enabled: false
            },
            yAxis: {
            type: 'logarithmic',
              title: {
              enabled: false
              },
              labels: {
              enabled: false
              },
              gridLineWidth: 0,
              width: 400
            },
            colors: ['#f6f6f6', '#3b844e'],
            plotOptions: {
                series: {
                    stacking: 'normal',
                    borderWidth: 0,
                    groupPadding: 0.15,
                    pointPadding:0.15,
                    maxPointWidth: 32
                },
            },
            series: [
                {
                name: 'Blank',
                data: generate_remnant('Bu Data'), // data['Bu Data']['Learners'].map(function (x) {return Math.max(data['Bu Data']['Learners']) + 3 - x }),
                enableMouseTracking: false,
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                        return Math.max.apply(Math, data['Bu Data']['Learners']) * 1.2 - this.y
                    },
                    style: {
                        fontSize: '20px',
                        color: '#282828',
                        textOutline: 0
                    },
                    align: 'left',
                    y: 2
                }
            },
             {
                name: 'Participants',
                data: data['Bu Data']['Learners'],
                dataLabels: {
                    enabled: false,
                }
            }]
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
                marginTop: 60
            },
            credits: {
                enabled: false
            },
            title: {
                text: 'Score by module',
                align: 'left',
                style: {
                    fontWeight: 900,
                    fontSize: '22px',
                    color: '#000000'
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
                categories: data['Module data']['categories'],
                lineColor: 'transparent',
                offset: 230,
                labels: {
                    align: 'left',
                    x: 0,
                    style: {
                        color: '#4b4b4e',
                        fontWeight: 540,
                        fontSize: '16px'
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
                data:  data['Module data']['Cohort Average'].map(function (x) {return Math.round(100-x*100)}),
               
                color: '#f6f6f6',
                enableMouseTracking: false
            }, {
                name: 'Cohort Average',
                stacking: 'normal',
                data: data['Module data']['Cohort Average'].map(function (x) {return Math.round(x * 100)}),
                color: '#3b844e',
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
                data: data['Module data']['Global Average'].map(function(x){return Math.round(x * 100)}),
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

    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container7', {
            chart: {
                backgroundColor: '#f5f5f5',
                type: 'column',
                style: {
                    fontFamily: 'Poppins'
                },
                inverted: 'true',
                height: 250,
    //             width: 952,
    //             marginTop: 70
            },
            credits: {
                enabled: false
            },
    
            title: {
                text: 'Certification Level',
                align: 'left',
                style: {
                    fontWeight: 'bold',
                    fontSize: '20px'
                }
            },
    
            xAxis: {
                categories: data['Certification Level']['categories'],
                offset: 150,
                lineColor: 'transparent',
                labels: {
                    style: {
                        color: '#36454F',
                        fontSize: '16px'
                    },
                    align: 'left',
                    x: 0
                },
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
    
            // tooltip: {
            //     formatter: function () {
            //         return '<b>' + this.x + '</b><br/>' +
            //             this.series.name + ': ' + this.y + '<br/>' +
            //             'Total: ' + this.point.stackTotal;
            //     }
            // },
            colors: ['#df182d', '#9d9d9c', '#3b844e', '#fab634'],
    
            plotOptions: {
                column: {
                    stacking: 'normal',
                    //colorByPoint: false
                    
                },
                series: {
                borderWidth: 0,
                //pointWidth: 30,
                pointPadding: 0.15, 
                groupPadding: 0.12
                }
                },
            legend: {
                enabled: false,        
            },
            series: [
            {
                name: 'Remainder',
                showInLegend: false,
                data: generate_remnant2('Certification Level'),
                enableMouseTracking: false,
                color: '#ffffff',
                dataLabels: {
                    enabled: true,
                    align: 'left',
                    verticalAlign: 'center',
                    color: '#5e5e5e',
                    formatter: function () {
                        return (Math.max.apply(Math, data['Certification Level']['Learners'])*1.3) - this.y + " (" + Math.round(((Math.max.apply(Math, data['Certification Level']['Learners'])*1.3) - this.y)/data['Certification Level']['Learners'].reduce((a, b) => a + b, 0)*100) + "%)"
                    },
                    style: {
                        fontSize: '15px',
                        textOutline: 0
                    },
                    //y:2
                }
    
            },{
                name: 'Learners',
                data: data['Certification Level']['Learners'],
                colors: ['#df182d', '#9d9d9c', '#3b844e', '#fab634'],
                colorByPoint: true,
            
                dataLabels: {
                    enabled: false,
                //     color: '#5e5e5e',
                //     align: 'right',
                //     verticalAlign: 'center',
                //     formatter: function () {
                //          return this.y + " (" + Math.round((this.y/data['Certification Level']['Learners'].reduce((a, b) => a + b, 0))*100) + "%)"
                //         // "(" + this.y/Math.sum.apply(Math, data['Certification Level']['Learners'])*100 + " )"
                //     },
                //     align: 'right',
                //     x: 65,
                //     style: {
                //         fontSize: '15px',
                //         textOutline: 0
                //     },
                },
            }
            ]
        },
    );
    })

    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container9', {
            chart: {
                type: 'bar',
                height: 750,
                width: 965,
                marginTop: 70,
                style: {
                    fontFamily: 'Poppins'
                },
            },
            credits: {
                enabled: false
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
                formatter: function () {
                    return this.series.name + ': ' + '<b>' + this.y + '</b>' 
                        
                },
                shared: false
            },
    
    
        xAxis: [{
            categories: generate_gap_subcategories('PRE'),
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
                categories: generate_gap_subcategories('POST'),                //function() {let list = []; for (let i=1; i<=10; i++){list.push('PRE') } return list},
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
            categories: data['Gap to Goal Data']['categories'],
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
                categories: data['Gap to Goal Data']['Module/Stage']['PRE']['Gap'].map(function(x) {return `+${Highcharts.numberFormat(x,2)}`}),
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
                categories: data['Gap to Goal Data']['Module/Stage']['POST']['Gap'].map(function(x) {return `+${Highcharts.numberFormat(x,2)}`}),
                linkedTo: 0,
                opposite: true,
                lineColor: 'transparent',
                labels: {
                    x: -36,
                    y:14,
                    style: {
                        color: '#cc5500',
                        fontWeight: 600
                    }
                }
            }],
    
            yAxis: {
                width: 600,
                title: {
                enabled: false
                },
                labels: {
                enabled: true
                },
                min: 0,
                max: 5
            },
    
            plotOptions: {
                series: {
                    states: {
                        hover: {
                            enabled: true,
                        },
                        inactive: {
                            opacity: 1
                        }
                        }
                    },
                bar: {
                    stacking: 'normal',
                    pointWidth: 2,
                    borderWidth: 0
                },
            },
    
            series: [{
                name: 'Pre-Course Gap to Goal',
                data: data['Gap to Goal Data']['Module/Stage']['PRE']['Gap'],
                stack: '0',
                color:{
                linearGradient: {x1:0, x2:0, y1:1, y2:0},
                stops: [
                [0, '#2e8b57'],
                [0.15, '#2e8b57'],
                [0.85, '#cf6f49'],
                [1, '#cf6f49']
                ]
            },
            dataLabels: {
                enabled: true,
                backgroundColor: '#cf6f49',
                zIndex: 3,
                shape: 'circle',
                align: 'right',
                allowOverlap: true,
                x: 5.4,
                style: {
                    textOutline: 'transparent',
                    fontSize: '0px'
                },
                useHTML: true,
                // formatter () {
                //     if (this.y==0) {
                //         return '<div style="width: 10px; height: 10px; overflow: hidden; border-radius: 50%; margin-left: 0px">' +
                // '<img src="http://127.0.0.1:8000/media/img/dot.png" ' +
                // 'style="width: 30px; margin-left: -5px; margin-top: -2px"></div>'
                //         // function (chart) {
                //         //         chart.renderer.image('https://www.highcharts.com/samples/graphics/sun.png',100,190,30,30)
                //         //             .add();
                                    
                //         //     }
                //         // return '<img src="http://127.0.0.1:8000/media/img/dot.png"></img>'
                //     }
                //     return 1
                    
                // }
            }
            
            },
            {
                name: 'Pre-Course Current Score',
                data: data['Gap to Goal Data']['Module/Stage']['PRE']['Current'],
                stack: '0',
                color: 'transparent',
                enableMouseTracking: false,
                showInLegend: false,
            
            
                dataLabels: {
                    zIndex: 2,
                    enabled: true,
                    backgroundColor: '#2e8b57',
                    shape: 'circle',
                    align: 'right',
                    x: 5.5,
                    crop: false, 
                    overflow: 'none',
                    //floating: true,
                    //allowOverlap: true,
                    style: {
                        textOutline: 'transparent',
                        fontSize: '0px'
                    }
                },
                allowPointSelect: false
        },
        {
            name: 'Post-Course Gap to Goal',
            data: data['Gap to Goal Data']['Module/Stage']['POST']['Gap'],
            stack:'1',
            color:{
                linearGradient: {x1:0, x2:0, y1:1, y2:0},
                stops: [
                [0, '#2e8b57'],
                [0.15, '#2e8b57'],
                [0.85, '#cf6f49'],
                [1, '#cf6f49']
                ],
            },
            dataLabels: {
                zIndex: 3,
                enabled: true,
                backgroundColor: '#cf6f49',
                shape: 'circle',
                align: 'right',
                allowOverlap: true,
                x: 5.4,
                style: {
                    textOutline: 'transparent',
                    fontSize: '0px'
                }
            }
        },
        {
            name: 'Post-Course Current Score',
            data: data['Gap to Goal Data']['Module/Stage']['POST']['Current'],
            stack: '1',
            color: 'transparent',
            enableMouseTracking: false,
            showInLegend: false,
            dataLabels: {
                zIndex: 2,
                enabled: true,
                backgroundColor: '#2e8b57',
                shape: 'circle',
                align: 'right',
                x: 5.5,
                crop: false, 
                overflow: 'none',
                //floating: true,
                //allowOverlap: true,
                style: {
                    textOutline: 'transparent',
                    fontSize: '0px'
                }
            },
        }
    
            ]
    
        
        });
    })
    
    document.addEventListener('DOMContentLoaded', function () {
        Highcharts.chart('container10', {
            chart: {
                type: 'column',
                style: {
                    fontFamily: 'Poppins'
                },
                inverted: 'true',
                height: 770,
                //width: 952,
                marginTop: 70
            },
            credits: {
                enabled: false
            },
    
            title: {
                text: 'Module Rating and Relevance',
                align: 'left',
                style: {
                    fontWeight: 'bold',
                    fontSize: '20px'
                }
            },
    
            xAxis: {
                categories: data['Module Rating & Relevance']['categories'],
                offset: 230,
                lineColor: 'transparent',
                labels: {
                    style: {
                        color: '#36454F',
                        fontSize: '16px'
                    },
                    align: 'left',
                    x: 0
                },
            },
    
            yAxis: {
                allowDecimals: false,
                min: 0,
                max: 10,
                gridLineWidth: 0,
                title: {
                    text: null
                },
                width: 700,
                labels: {
                    enabled: false,
                },
            },
    
            tooltip: {
                formatter: function () {
                    return '<b>' + this.x + '</b><br/>' +
                        this.series.name + ': ' + this.y 
                        // + '<br/>' +
                        // 'Total: ' + this.point.stackTotal;
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
                pointPadding: 0.15, 
                groupPadding: 0.095
                }
                },
            legend: {
                enabled: true,
                // width: 500,
                verticalAlign: 'top',
                floating: true,
                y: -4,
                x: 85,
                 //labelFormat: "60",
                symbolRadius: 0,
                itemStyle: {
                    color: '#36454F',
                    fontWeight: 'thin'
                },
                itemDistance: 60
                // alignColumns: true
                
            },
            series: [
            {
                name: 'Remainder',
                showInLegend: false,
                data: data['Module Rating & Relevance']['Rating'].map(function (x) {return (10-x)}),
                stack: 'moduleRating',
                color: '#f6f6f6',
                enableMouseTracking: false
    
            }, {
                name: 'Module Rating',
                showInLegend: true,
                data: data['Module Rating & Relevance']['Rating'],
                stack: 'moduleRating',
                color: '#2e8b57',
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y,2);
                    },
                    color: '#4b4b4e',
                    align: 'right',
                    x: 35,
                    style: {
                        fontSize: '13px',
                        textOutline: 0
                    },
                },
                legendIndex: 1
            }, 
            {
                name: 'Remainder',
                showInLegend: false,
                data: data['Module Rating & Relevance']['Relevance'].map(function (x) {return (10-x)}),
                stack: 'moduleRelevance',
                color: '#f6f6f6',
                enableMouseTracking: false
    
            }, {
                name: 'Module Relevance',
                showInLegend: true,
                data: data['Module Rating & Relevance']['Relevance'],
                stack: 'moduleRelevance',
                color: '#3984bc',
                dataLabels: {
                    enabled: true,
                    formatter: function () {
                        return Highcharts.numberFormat(this.y,2);
                    },
                    color: '#4b4b4e',
                    align: 'right',
                    x: 35,
                    style: {
                        fontSize: '13px',
                        textOutline: 0
                    }
                },
                legendIndex: 2
            }, 
            ]
        },
    );
    })

}

var data = $.getValues("/generate-data");




if (data !==null) {
    console.log(data['Bu Data']['categories'].length)
    generate_charts()
}

