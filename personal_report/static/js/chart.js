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
            },
            error: function(data) {
                result = JSON.parse(data);
            }
        });
       return result;
    }
});


(function (H) {
    H.wrap(H.Legend.prototype, 'handleOverflow', function (p, h) {
        return h;
    });
}(Highcharts));


  function generate_charts(data) {

    function enableDownload () {
        const params = new URLSearchParams(window.location.search);
      
        const download = params.get("download");
      
        if (download == 'true') {
            return true
        }
        return false
      }
      
      
      (function (H) {
        H.wrap(H.Legend.prototype, 'handleOverflow', function (p, h) {
                return h;
            });
        }(Highcharts));
      
      
      
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


        function generateLineSeriesScoreByModule() {
            res_data = {};
            for (key of Object.keys(data['SCORE_BY_MODULE'])) {
                console.warn(key)
                if (typeof(data['SCORE_BY_MODULE'][key]) == 'object') {
                    res_data[key] = data['SCORE_BY_MODULE'][key]; 
                };
            };

            barKey = Object.keys(res_data)[1];
            lineKeys = Object.keys(res_data).slice(2);
            series = []
            barSeries = {
                name: 'Cohort Average',
                stacking: 'normal',
                data: res_data[barKey],
                color: '#3b844e',
                dataLabels: {
                    enabled: true,
                    align: 'right',
                    x: 45,
                    y: 2,
                    style: {
                        fontFamily: 'Poppins',
                        color: '#4b4b4b',
                        fontSize: '16px',
                        fontWeight: 600,
                        textOutline: 0
                    },
                    formatter: function () {
                        return this.y + "%"
                    }
                },
                legendIndex: 2
            };
            series.push(barSeries)
            for (let key of lineKeys.slice(0, 5)) {
                sum = res_data[key].reduce((a, b) => a + b, 0);
                if (sum != 0) {
                    lineSeries = {
                        name: 'Global Average',
                        type : 'spline',
                        data: res_data[key],
                        marker: {
                            enabled: false
                        },
                        lineWidth: 3,
                        crisp: false,
                        legendIndex: 1
                    };
                    series.push(lineSeries)
                };
            }
                
            return series
        };

        
        function generate_persent_array(array, is_remnant=false, extra_gap=null) {
            const sum = array.reduce((accumulator, value) => {
                return accumulator + value;
            }, 0);
            let result_array = [];
            if (is_remnant == true) {
                result_array = array.map(function(x) { return 100 - (x * 100/sum) + extra_gap} );
            } else {
                result_array = array.map(function(x) { return (x * 100/sum) } );
            }
            
            return result_array
        }

        
        function generate_gap_subcategories(text, length=null) {let list = []; for (let i=1; i<=10; i++){list.push(text) } return list}
            if (data['EXPERTISE']['EXPERTISE'].length > 9) {
                y = -240 + 30*(data['EXPERTISE']['EXPERTISE'].length - 1)-10
            }
            else {
                y = -220 + 30*(data['EXPERTISE']['EXPERTISE'].length - 1)-10
            }
        
            var colorCycle = ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#a9d18e', '#76d6ff', '#ffd579', '#ff9300', '#9969c7', '#9b3745']
            var colors = []
            for (let x = 0; x < data['EXPERTISE']['EXPERTISE'].length; x++) {
                if (data['EXPERTISE']['EXPERTISE'][x] == "Other" || data['EXPERTISE']['EXPERTISE'][x] == "Data Not Provided") {
                    colors.push('#9b3745');
                }
                else{
                    colors.push(colorCycle[x]);
                }
            }
        
            Highcharts.chart('container1', {
                chart: {
                type: 'pie',
                backgroundColor: '#272726',
                width: 460,
                height: 320,
                marginLeft: -258,
                marginTop: -108,
                style: {
                    fontFamily: 'Poppins'
                }
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    menuItemDefinitions: {
                        downloadSVG: {
                            onclick: function () {
                                var svg = Highcharts.charts[8].getSVG();
                            }
                        }
                    },
                    filename: "06 - Expertise"
                },
                navigation: {
                    buttonOptions: {
                        y: 20,
                    }
                },
                credits: {
                    enabled: false
                },
                title: {
                text: null
        
                },
                colors: colors,
                legend: {
                    title: {
                        text: 'Expertise',
                        style: {
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    fontSize: '23px',
                }
                    },
                    layout: 'vertical',
                    symbolRadius: 0,
                    symbolPadding: 13,
                    symbolHeight: 15,
                    labelFormatter: function() {
                        if (this.index + 1 == data['EXPERTISE']['EXPERTISE'].length){
                            return `<div style="display: flex; justify-content: space-between; width: 220px;margin-top: -3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage)}%</span></div>`;
                        }
                        else {
                            return `<div style="display: flex; justify-content: space-between; width: 220px; border-bottom: 1px solid #4b4b4e;margin-top: -3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage)}%</span></div>`;
                        }
        
                    },
                    useHTML: true,
                    itemStyle: {
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 'thin',
                        display: 'inline-block',
                        verticalAlign: 'middle'
        
                    },
                    itemMarginTop: 9,
                    margin: -10,
                    x: 185,
                    floating: true,
                    align: "top",
                    y: -255+data['EXPERTISE']['EXPERTISE'].length*27
                  //   {1: -228,  2: -201, 10: ?}
        
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
                    size: '44%',
                }
                },
                series: [{
                name: 'Fields',
                colorByPoint: true,
                data: generate_data_series('EXPERTISE')
                }],
        
            },
            );
            colorCycle = ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#a9d18e', '#76d6ff', '#ffd579', '#ff9300', '#9969c7', '#9b3745']
            colors = []
            for (let x = 0; x < data['GENDER']['GENDER'].length; x++) {
                if (data['GENDER']['GENDER'][x] == "Other" || data['GENDER']['GENDER'][x] == "Data Not Provided") {
                    colors.push('#9b3745')
                }
                else{
                    colors.push(colorCycle[x])
                }
            }
        
        
            Highcharts.chart('container2', {
                  chart: {
                      type: 'pie',
                      backgroundColor: '#272726',
                      width: 460,
                      height: 193,
                      marginLeft: -258,
                      marginTop: 15,
                      style: {
                          fontFamily: 'Poppins'
                      }
                  },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    filename: "08 - Gender"
                },
                credits: {
                    enabled: false
                },
                title: {
                  text: null
                },
                  colors: colors,
                  legend: {
                      title: {
                          text: 'Gender',
                          style: {
                              color: '#FFFFFF',
                              fontWeight: 600,
                              fontFamily: 'Poppins',
                              fontSize: '23px'
                          }
                      },
                      className: 'genderLegend',
                      layout: 'vertical',
                      symbolRadius: 0,
                      symbolPadding: 13,
                      symbolHeight: 15,
                      labelFormatter: function() {
                          if (this.index + 1 == data['GENDER']['GENDER'].length){
                              return `<div style="display: flex; justify-content: space-between; width: 220px;margin-top:-3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                          }
                          else {
                              return `<div style="display: flex; justify-content: space-between; width: 220px;border-bottom: 1px solid #4b4b4e;margin-top:-3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                          }
                        },
                      useHTML: true,
                      itemStyle: {
                          color: '#ffffff',
                          fontSize: '16px',
                          fontWeight: 'thin'
                      },
                      itemMarginTop: 10,
                      margin: -10,
                      x: 185,
                      align: "top",
                      floating: true,
                      verticalAlign: "middle",
                      layout: "vertical",
                      y: -75+data['GENDER']['GENDER'].length*15
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
                      size: '112%'
                  }
                },
                series: [{
                  name: 'Fields',
                  colorByPoint: true,
                  data: generate_data_series('GENDER')
                }]
            });
        
        
        
            colorCycle = ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#a9d18e', '#76d6ff', '#ffd579', '#ff9300', '#9969c7', '#9b3745']
            colors = []
            for (let x = 0; x < data['ROLE']['ROLE'].length; x++) {
                if (data['ROLE']['ROLE'][x] == "Other" || data['ROLE']['ROLE'][x] == "Data Not Provided") {
                    colors.push('#9b3745')
                }
                else{
                    colors.push(colorCycle[x])
                }
            }
        
            Highcharts.chart('container3', {
              chart: {
                  type: 'pie',
                  style: {
                      fontFamily: 'Poppins'
                  },
                  backgroundColor: '#272726',
                  width: 460,
                  height: 193,
                  marginLeft: -258,
                  marginTop: 15,
              },
        
              exporting: {
                  allowHTML: true,
                  enabled: enableDownload(),
                  scale: 8,
                  filename: "07 - Role"
              },
        
              credits: {
                  enabled: false
              },
        
              title: {
              text: null
              },
        
              colors: colors,
              legend: {
                  title: {
                      text: 'Role',
                      style: {
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontFamily: 'Poppins',
                      fontSize: '23px'
                  }
                  },
                  className: 'roleLegend',
                  layout: 'vertical',
                  symbolRadius: 0,
                  symbolPadding: 13,
                  symbolHeight: 15,
                  labelFormatter: function() {
                      if (this.index + 1 == data['ROLE']['ROLE'].length) {
                          return `<div style="display: flex; justify-content: space-between; width: 220px;margin-top:-3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                      }
                      else {
                          return `<div style="display: flex; justify-content: space-between; width: 220px;border-bottom: 1px solid #4b4b4e;margin-top:-3.5px;"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                      }
        
                  },
                  useHTML: true,
                  itemStyle: {
                      color: '#ffffff',
                      fontSize: '16px',
                      fontWeight: 'thin'
                  },
                  itemMarginTop: 10,
                  margin: -10,
                  x: 185,
                  align: "top",
                  floating: true,
                  verticalAlign: "middle",
                  layout: "vertical",
                  y: -75+data['ROLE']['ROLE'].length*15
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
                  size: '112%'
              }
              },
              series: [{
                  name: 'Fields',
                  colorByPoint: true,
                  data: generate_data_series('ROLE')
              }]
          });
        
        
        
            colorCycle = ['#3b844e', '#3984bc', '#ddd64e', '#cf6f4a', '#a9d18e', '#76d6ff', '#ffd579', '#ff9300', '#9969c7', '#9b3745']
            colors = []
            for (let x = 0; x < data['WORK_EXPERIENCE']['WORK_EXPERIENCE'].length; x++) {
                if (data['WORK_EXPERIENCE']['WORK_EXPERIENCE'][x] == "Other" || data['WORK_EXPERIENCE']['WORK_EXPERIENCE'][x] == "Data Not Provided") {
                    colors.push('#9b3745')
                }
                else{
                    colors.push(colorCycle[x])
                }
            }
            Highcharts.chart('container4', {
            chart: {
                type: 'pie',
                style: {
                    fontFamily: 'Poppins'
                },
                  backgroundColor: '#272726',
                  width: 460,
                  height: 193,
                  marginLeft: -258,
                  marginTop: 15,
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    filename: "09 - Work Experience"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                colors: colors,
                legend: {
                    title: {
                        text: 'Work Experience',
                        style: {
                    color: '#FFFFFF',
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                    fontSize: '23px'
                }
                    },
                    className: 'experienceLegend',
                    layout: 'vertical',
                    symbolRadius: 0,
                    symbolPadding: 13,
                    symbolHeight: 15,
                    labelFormatter: function() {
                        if (this.index + 1 == data['WORK_EXPERIENCE']['WORK_EXPERIENCE'].length){
                            return `<div style="display: flex; justify-content: space-between; width: 220px;margin-top:-3.5px"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                        }
                        else {
                            return `<div style="display: flex; justify-content: space-between; width: 220px;border-bottom: 1px solid #4b4b4e;margin-top:-3.5px"><span style="color:#a9a9a9;">${this.name}</span> <span style='float: right;'>${Math.round(this.percentage) + "%"}</span></div>`;
                        }
        
                    },
                    useHTML: true,
                    itemStyle: {
                        color: '#ffffff',
                        fontSize: '16px',
                        fontWeight: 'thin',
                    },
                      itemMarginTop: 10,
                      margin: -10,
                      x: 185,
                      align: "top",
                      floating: true,
                      verticalAlign: "middle",
                      layout: "vertical",
                      y: -75+data['WORK_EXPERIENCE']['WORK_EXPERIENCE'].length*15
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
                    size: '112%'
                }
                },
                series: [{
                name: 'Fields',
                colorByPoint: true,
                data: generate_data_series('WORK_EXPERIENCE')
                }]
            });
        
            Highcharts.chart('container5', {
                chart: {
                    type: 'bar',
                    style: {
                        fontFamily: 'Poppins'
                    },
                    height: 50*data['LOCATION']['LOCATION'].length + 40,
                    marginTop: 0,
                    width: 590,
                    spacingBottom: 0,
                    spacingLeft:0,
                    spacingTop:0,
        
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 10,
                    buttons: {
                        contextButton: {
                            menuItems: ['downloadPNG', 'downloadSVG']
                        }
                    },
                    filename: "05 - Location"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null,
                    },
                xAxis: {
                    categories: data['LOCATION']['LOCATION'],
                    lineColor: 'transparent',
                    labels: {
                        style: {
                            color: '#4b4b4e',
                            fontSize: '18px',
                            width: 175,
                            overflowWrap: 'anywhere'
                        },
                        align: 'left',
                        x:0
                    },
                    offset: 210
                },
                legend: {
                    enabled: false
                },
                yAxis: {
                  max: 100,
                  title: {
                    enabled: false
                  },
                  labels: {
                    enabled: false
                  },
                  gridLineWidth: 0,
                  width: 377
                },
                colors: ['#f6f6f6', '#3b844e'],
                plotOptions: {
                    series: {
                        stacking: 'normal',
                        borderWidth: 0,
                        maxPointWidth: 32
        
                    },
                },
                series: [{
                    name: 'Blank',
                    data: generate_persent_array(data['LOCATION']['LEARNERS'], true),
                    enableMouseTracking: false,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return data['LOCATION']['LEARNERS'][this.point.index]
                        },
                        style: {
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#282828',
                            textOutline: 0
                        },
                        align: 'left',
                        y: 2
                    }
                }, {
                    name: 'Participants',
                    data: generate_persent_array(data['LOCATION']['LEARNERS'], false),
                    dataLabels: {
                        enabled: false,
                    }
                }]
            });
        
        
            Highcharts.chart('container6', {
                chart: {
                    type: 'bar',
                    style: {
                        fontFamily: 'Poppins'
                    },
                    height: 50*data['BUSINESS_UNIT']['BUSINESS_UNIT'].length + 40,
                    marginTop: 0,
                    width: 590,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingTop:0
        
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    buttons: {
                        contextButton: {
                            menuItems: ['downloadPNG', 'downloadSVG']
                        }
                    },
                    filename: "04 - BU"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null,
                    align: 'left',
                    style: {
                        fontFamily: 'Poppins',
                        fontWeight: 'bold',
                        fontSize: '25px',
                    }
                },
                xAxis: {
                    categories: data['BUSINESS_UNIT']['BUSINESS_UNIT'],
                    lineColor: 'transparent',
                    labels: {
                        style: {
                            color: '#4b4b4e',
                            fontSize: '18px',
                            marginRight: 20,
                            marginLeft: 5,
                            width: 200,
                            overflowWrap: 'anywhere'
                        },
                        align: 'left',
                        x:0
                    },
                    offset: 210
                },
                legend: {
                enabled: false
                },
                yAxis: {
                  max: 100,
                  width: 377,
                  title: {
                  enabled: false
                  },
                  labels: {
                  enabled: false
                  },
                  gridLineWidth: 0,
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
                    data: generate_persent_array(data['BUSINESS_UNIT']['LEARNERS'], true),
                    enableMouseTracking: false,
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            return data['BUSINESS_UNIT']['LEARNERS'][this.point.index]
                        },
                        style: {
                            fontFamily: 'Poppins',
                            fontWeight: 500,
                            fontSize: '18px',
                            color: '#282828',
                            textOutline: 0
                        },
                        align: 'left',
                        y: 2
                    }
                },
                 {
                    name: 'Participants',
                    data: generate_persent_array(data['BUSINESS_UNIT']['LEARNERS'], false),
                    dataLabels: {
                        enabled: false,
                    }
                }]
            });
        
        
            Highcharts.chart('container8', {
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'Poppins'
                    },
                    inverted: true,
                    height: 460,
                    width: 943,
                    marginTop: 0,
                    spacingBottom: 0,
                    spacingLeft: 0,
        
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    filename: "12 - Score by Module"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null,
                    },
                legend: {
                    enabled: false,
                },
                xAxis: {
                    categories: data['SCORE_BY_MODULE']['MODULE'],
                    lineColor: 'transparent',
                    offset: 237,
                    labels: {
                        align: 'left',
                        x: 0,
                        style: {
                            fontFamily: 'Poppins',
                            color: '#4b4b4e',
                            fontWeight: 500,
                            fontSize: '16px'
                        }
                    }
                },
        
                yAxis: [{ // Primary yAxis
                    min: 0,
                    max: 100,
                    width: 703,
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
                        groupPadding: 0.17,
                        pointPadding: 0.1
                    }
                },
                colors: ['#ffbf00',  '#3984bc', '#cf6f4a', '#76d6ff', '#ff9300'],         
                series: generateLineSeriesScoreByModule()
            });
        
        
            if (data['CERTIFICATION_LEVEL']['MODULE'].length == 4) {
                labelpos = -1
            }
            else {
                labelpos = 3
            }
            colors = []
            for (let x = 0; x < data['CERTIFICATION_LEVEL']['MODULE'].length; x++) {
                if (data['CERTIFICATION_LEVEL']['MODULE'][x] == "None") {
                    colors.push('#df182d')
                }
                else if (data['CERTIFICATION_LEVEL']['MODULE'][x] == "Completion") {
                    colors.push('#9d9d9c')
                }
                else if (data['CERTIFICATION_LEVEL']['MODULE'][x] == "Merit") {
                    colors.push('#3b844e')
                }
                else if (data['CERTIFICATION_LEVEL']['MODULE'][x] == "Distinction") {
                    colors.push('#fab634')
                }
            }
                Highcharts.chart('container7', {
                chart: {
                    backgroundColor: '#f5f5f5',
                    type: 'column',
                    style: {
                        fontFamily: 'Poppins'
                    },
                    inverted: 'true',
                    height: 200,
                    width: 480,
                    spacingBottom: 0,
                    spacingLeft: 0,
                    spacingTop: 0
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    filename: "13 - Certification Level"
                },
                credits: {
                    enabled: false
                },
        
                title: {
                    text: null,
                    align: 'left',
                    style: {
                        fontFamily: 'Poppins',
                        fontWeight: 600,
                        fontSize: '22px'
                    }
                },
        
                xAxis: {
                    categories: data['CERTIFICATION_LEVEL']['MODULE'],
                    offset: 120,
                    max: 3,
                    lineColor: 'transparent',
                    labels: {
                          formatter: function() {
                              if (Number(this.value)) return
                              return this.value
                          },
                        style: {
                            color: '#36454F',
                            fontSize: '16px'
                        },
                        align: 'left',
                        x: 0
                    },
                },
        
                yAxis: {
                    max: 120,
                    title: {
                    enabled: false
                    },
                    labels: {
                    enabled: false
                    },
                    gridLineWidth: 0,
                    width: 357
                  },
        
                plotOptions: {
                    column: {
                        stacking: 'normal',
                    },
                    series: {
                    borderWidth: 0,
                    maxPointWidth: 32,
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
                    data: generate_persent_array(data['CERTIFICATION_LEVEL']['LEARNERS'], true, 40),
                    enableMouseTracking: false,
                    color: '#ffffff',
                    dataLabels: {
                        enabled: true,
                        useHTML: true,
                        align: 'left',
                        verticalAlign: 'center',
                        y: labelpos,
                        color: '#4b4b4b',
                        formatter: function () {
                            console.log(this.y) 
                            return `<div style='height: 27.5px; background-color: #ffffff; margin-top: -8px; line-height: 30px; padding-left: 5px'>
                                        ${data['CERTIFICATION_LEVEL']['LEARNERS'][this.point.index] + " (" + (100 - this.y + 40).toFixed(0) + "%)"}
                                    </div>`
                        },
                        style: {
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            fontSize: '15px',
                            textOutline: 0
                        },
                    }
        
                },{
                    name: 'LEARNERS',
                    data: generate_persent_array(data['CERTIFICATION_LEVEL']['LEARNERS'], false),
                    colors: colors,
                    colorByPoint: true,
        
                    dataLabels: {
                        enabled: false,
                    },
                }
                ]
            },
        );
        
        
            //NEED TO CENTER CIRCLES ON THE LINES
            Highcharts.chart('container9', {
                chart: {
                    type: 'bar',
                    height: 850,
                    width: 967,
                    marginTop: 5,
                    marginRight: 3,
                    spacingLeft: 0,
                    spacingBottom:0,
                    style: {
                        fontFamily: 'Poppins'
                    },
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    filename: "15 - Gap to Goal by Module"
                },
                credits: {
                    enabled: false
                },
        
                legend: {
                    enabled: false
                },
        
                title: {
                    text: null,
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
                lineColor: '#e0e0e0',
                lineWidth: 0.8
                },
                {
                    categories: generate_gap_subcategories('POST'),
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
                categories: data['GAP_TO_GOAL']['MODULE/STAGE'].slice(0, data['GAP_TO_GOAL']['MODULE/STAGE'].length - 1),
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
                offset: 295
                    },
                    {
                    categories: data['GAP_TO_GOAL']['PRE']['GAP'].slice(0, data['GAP_TO_GOAL']['PRE']['GAP'].length - 1).map(function(x) {return `+${Highcharts.numberFormat(x,2)}`}),
                        linkedTo: 0,
                        opposite: true,
                        labels: {
                        useHTML: true,
                        x: -43,
                        y: -8,
                        style: {
                            fontFamily: 'Poppins',
                            color: '#cf6f49',
                            fontSize: '13px',
                            fontWeight: 500
                        }
                    },
                    lineColor: 'transparent'
                    },
                {
                    categories: data['GAP_TO_GOAL']['POST']['GAP'].map(function(x) {return `+${Highcharts.numberFormat(x,2)}`}),
                    linkedTo: 0,
                    opposite: true,
                    lineColor: 'transparent',
                    labels: {
                        x: -43,
                        y:15,
                        style: {
                            fontFamily: 'Poppins',
                            color: '#cf6f49',
                            fontSize: '13px',
                            fontWeight: 500
                        }
                    }
                }],
        
                yAxis: {
                    gridLineWidth: 0.8,
                    gridLineColor: '#e0e0e0',
        
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
        
                series: [
                    {
                    name: 'Pre-Course Gap to Goal',
                    data: data['GAP_TO_GOAL']['PRE']['GAP'].slice(0,data['GAP_TO_GOAL']['PRE']['GAP'].length -1 ),
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
                dataLabels: [{
                    enabled: true,
                    align: 'left',
                    allowOverlap: true,
                    crop: false,
                    overflow: 'none',
                    useHTML: true,
                    x: -11,
                    formatter () {
                        return '<img src="http://40.68.93.242/assets/images/charts/greendot.svg" style="width: 12px">'
                    }
                },
                {
                    enabled: true,
                    align: 'right',
                    allowOverlap: true,
                    useHTML: true,
                    x: 11,
                    formatter () {
                        if (this.y==0) {
                            return '<img src="http://40.68.93.242/assets/images/charts/halfdot.svg" style="width: 12px">'
                            }
                        return '<img src="http://40.68.93.242/assets/images/charts/orangedot.svg" style="width: 12px">'
        
                    }
                }]
        
                },
                {
                    name: 'Pre-Course Current Score',
                    data: data['GAP_TO_GOAL']['PRE']['CURRENT'].slice(0,data['GAP_TO_GOAL']['PRE']['CURRENT'].length -1 ),
                    stack: '0',
                    color: 'transparent',
                    enableMouseTracking: false,
                    showInLegend: false,
        
                    dataLabels: {
                        enabled: false,
                    },
                    allowPointSelect: false
        
            },
            {
                    name: 'Post-Course Gap to Goal',
                    data: data['GAP_TO_GOAL']['POST']['GAP'].slice(0,data['GAP_TO_GOAL']['POST']['GAP'].length -1 ),
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
                    dataLabels: [{
                        enabled: true,
                        align: 'left',
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        x: -11,
                        formatter () {
                            return '<img src="http://40.68.93.242/assets/images/charts/greendot.svg" style="width: 12px">'
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        allowOverlap: true,
                        useHTML: true,
                        x: 11,
                        formatter () {
                            if (this.y==0) {
                                return '<img src="http://40.68.93.242/assets/images/charts/halfdot.svg" style="width: 12px">'
                                }
                            return '<img src="http://40.68.93.242/assets/images/charts/orangedot.svg" style="width: 12px">'
        
                        }
                    }]
                },
            {
                name: 'Post-Course Current Score',
                data: data['GAP_TO_GOAL']['POST']['CURRENT'].slice(0,data['GAP_TO_GOAL']['POST']['CURRENT'].length -1 ),
                stack: '1',
                color: 'transparent',
                enableMouseTracking: false,
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
            },
        
                ]
            });
        
        
            Highcharts.chart('container17', {
                chart: {
                    type: 'bar',
                    height: 130,
                    marginTop: 20,
                    marginRight: 2,
                    width: 750,
                    spacingLeft: 0,
                    backgroundColor: '#272726',
                    style: {
                        fontFamily: 'Poppins'
                    },
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    scale: 8,
                    buttons: {
                        contextButton: {
                            menuItems: ['downloadPNG', 'downloadSVG']
                        }
                    },
                    filename: "14 - Average Gap to Goal"
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: null
                },
                xAxis: [{
                    plotBands: [{
                        from: -0.5,
                        to: 10,
                        color: '#323232'
                    }],
                    categories: ['PRE', 'POST'],
                    labels: {
                        useHTML: true,
                        style: {
                            fontFamily: 'Poppins',
                          color: '#b9b9b9',
                          fontSize: '11px',
                          fontWeight: 500
        
                      }
                    },
                    lineColor: 'transparent',
                    height: 55,
                    min: -0.4,
                    startOnTick: false
                },
                {
                categories: [
                  data['GAP_TO_GOAL']['PRE']['GAP'][data['GAP_TO_GOAL']['PRE']['GAP'].length-1],
                  data['GAP_TO_GOAL']['POST']['GAP'][data['GAP_TO_GOAL']['POST']['GAP'].length-1]
              ],
                labels: {
                    formatter: function () {
                        return '+' + Highcharts.numberFormat(this.value,2)
                    },
                    style: {
                        color: '#cf6f49',
                        fontFamily: 'Poppins',
                        fontSize: '12px',
                        fontWeight: 500
                    },
                    x: -10,
                    y: -7,
                    align: 'right'
        
                },
                linkedTo: 0,
                opposite: true,
                lineColor: 'transparent'
                }
                ],
                yAxis: {
                    // plotBands: [{
                    //     from: -0.5,
                    //     to: 10,
                    //     color: '#323232'
                    // }],
                    labels: {
                        style: {
                            fontFamily: 'Poppins',
                            color:'#878787',
                            fontSize: 12,
                            fontWeight: 500
                        }
                    },
                    width: 625,
                    min: 0,
                    max: 5,
                    tickInterval: 1,
                    gridLineColor: '#878787',
                    gridLineWidth: 0.5,
        
                    title: {
                        text: null
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        stacking: 'normal',
                    },
                    bar: {
                        pointWidth: 2.5,
                        borderWidth: 0
                    }
                },
                series: [{
                    name: 'PRE Gap-to-Goal',
                    data: [[0,data['GAP_TO_GOAL']['PRE']['GAP'][data['GAP_TO_GOAL']['PRE']['GAP'].length-1]]],
                    color:{
                        linearGradient: {x1:0, x2:0, y1:1, y2:0},
                        stops: [
                        [0, '#2e8b57'],
                        [0.15, '#2e8b57'],
                        [0.85, '#cf6f49'],
                        [1, '#cf6f49']
                        ],
                    },
                    dataLabels: [{
                        enabled: true,
                        align: 'left',
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        x: -11,
                        formatter () {
                            return '<img src="http://40.68.93.242/assets/images/charts/greendot.svg" style="width: 11px; margin-top: -4">'
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        x: 11,
                        formatter () {
                            if (this.y==0) {
                                return '<img src="http://40.68.93.242/assets/images/charts/halfdot.svg" style="width: 11px; margin-top: -4">'
                                }
                            return '<img src="http://40.68.93.242/assets/images/charts/orangedot.svg" style="width: 11px; margin-top: -4">'
        
                        }
                    }]
                }, {
                    name: 'PRE Current',
                    data: [[0,data['GAP_TO_GOAL']['PRE']['CURRENT'][data['GAP_TO_GOAL']['PRE']['CURRENT'].length-1]]],
                    color: 'transparent',
                enableMouseTracking: false,
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
        
                }, {
                    name: 'POST Gap-to-Goal',
                    data: [[1,data['GAP_TO_GOAL']['POST']['GAP'][data['GAP_TO_GOAL']['POST']['GAP'].length-1]]],
                    color:{
                        linearGradient: {x1:0, x2:0, y1:1, y2:0},
                        stops: [
                        [0, '#2e8b57'],
                        [0.15, '#2e8b57'],
                        [0.85, '#cf6f49'],
                        [1, '#cf6f49']
                        ],
                    },
                    dataLabels: [{
                        enabled: true,
                        align: 'left',
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        x: -11,
                        formatter () {
                            return '<img src="http://40.68.93.242/assets/images/charts/greendot.svg" style="width: 11px; margin-top: -4">'
                        }
                    },
                    {
                        enabled: true,
                        align: 'right',
                        allowOverlap: true,
                        crop: false,
                        overflow: 'none',
                        useHTML: true,
                        x: 11,
                        formatter () {
                            if (this.y==0) {
                                return '<img src="http://40.68.93.242/assets/images/charts/halfdot.svg" style="width: 11px; margin-top: -4">'
                                }
                            return '<img src="http://40.68.93.242/assets/images/charts/orangedot.svg" style="width: 11px; margin-top: -4">'
                        }
                    }]
                },{
                        name: 'POST Current',
                    data: [[1,data['GAP_TO_GOAL']['POST']['CURRENT'][data['GAP_TO_GOAL']['POST']['CURRENT'].length-1]]],
                    color: 'transparent',
                enableMouseTracking: false,
                showInLegend: false,
                dataLabels: {
                    enabled: false,
                },
                }]
            });
        
        
        
            Highcharts.seriesType('column2', 'column', {});
            // Module Rating and Relevance
            Highcharts.chart('container10', {
                chart: {
                    type: 'column',
                    style: {
                        fontFamily: 'Poppins'
                    },
                    inverted: 'true',
                    height: 605,
                    width: 1000,
                    marginTop: 0,
                    marginRight: -11,
                    height: 535,
                    spacingTop: 0,
                    spacingLeft:0,
                    spacingBottom: 0
                },
                exporting: {
                    allowHTML: true,
                    enabled: enableDownload(),
                    // scale: 8,
                    filename: "20 - Module Rating and Relevance"
                },
                credits: {
                    enabled: false
                },
        
                title: {
                    text: null,
                },
        
                xAxis: [
                {
                    categories: data['MODULE_RATING_&_RELEVANCE']['MODULE'],
                    offset: 220,
                    lineColor: 'transparent',
                    labels: {
                        style: {
                            color: '#36454F',
                            fontSize: '16px',
                        },
                        align: 'left',
                        x: 0
                    },
                },
                {
                    categories: data['MODULE_RATING_&_RELEVANCE']['RATING'].slice(0, data['MODULE_RATING_&_RELEVANCE']['RATING'].length-1),// removing the average value
                    linkedTo: 0,
                    opposite: true,
                    labels: {
                    useHTML: true,
                    x: -40,
                    y: -7,
                    style: {
                        color: '#4b4b4e',
                        fontWeight: 600,
                        fontSize: '13px',
                        textOutline: 0
                    }
                },
                lineColor: 'transparent'
                },
                {
                    categories: data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'].slice(0, data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'].length-1),// removing the average value
                    linkedTo: 0,
                    opposite: true,
                    labels: {
                    useHTML: true,
                    x: -40,
                    y: 11,
                    style: {
                        color: '#4b4b4e',
                        fontWeight: 600,
                        fontSize: '13px',
                        textOutline: 0
                    }
                },
                lineColor: 'transparent'
                }],
        
                yAxis: {
                    allowDecimals: false,
        
                    max: 10,
                    gridLineWidth: 0,
                    title: {
                        text: null
                    },
                    width: 715,
                    labels: {
                        enabled: false,
                    },
                },
        
                tooltip: {
                    formatter: function () {
                        return '<b>' + this.x + '</b><br/>' +
                            this.series.name + ': ' + this.y
                    }
                },
        
                plotOptions: {
                    column: {
                        stacking: 'normal',
                    },
                    series: {
                    borderWidth: 0,
                    borderRadius: 5,
                    pointPadding: 0.26,
                    groupPadding: 0.15
                    }
                    },
                legend: {
                    enabled: false,
                },
                series: [
                {
                    name: 'Remainder',
                    type: 'column2',
                    showInLegend: false,
                    data: Array(10).fill(10),
                    color: '#e1e1e1',
                    enableMouseTracking: false,
                    xAxis: 1
        
                }, {
                    name: 'Module Rating',
                    showInLegend: true,
                    data: data['MODULE_RATING_&_RELEVANCE']['RATING'].slice(0, data['MODULE_RATING_&_RELEVANCE']['RATING'].length-1),// removing the average value
                    stack: 'moduleRating',
                    color: '#2e8b57',
                    dataLabels: {
                        enabled: false,
                    },
                    legendIndex: 1
                },
                {
                    name: 'Remainder',
                    type: 'column2',
                    showInLegend: false,
                    data: Array(10).fill(10),
                    stack: 'moduleRelevance',
                    color: '#e1e1e1',
                    enableMouseTracking: false,
                    xAxis: 1
        
                }, {
                    name: 'Module Relevance',
                    showInLegend: true,
                    data: data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'].slice(0, data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'].length-1), // removing the average value
                    stack: 'moduleRelevance',
                    color: '#3984bc',
                    dataLabels: {
                        enabled: false,
                    },
                    legendIndex: 2
                },
                ]
            },
        );
        
        //}
        
        
        Highcharts.chart('container11', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 20,
                filename: "01 - Completion Rate"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#f6f6f6',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                name: 'Completion Rate',
                enableMouseTracking: false,
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Completion Rate'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            textOutline: 0,
                            fontWeight: 600,
                            color: '#282828',
                            fontSize: '40px'
                        }
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container12', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "02 - Cohort Average Score"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#f6f6f6',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Cohort Average Score',
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Cohort Average Score'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            textOutline: 0,
                            fontSize: '40px',
                            color: '#282828',
                            fontWeight: 600
                        }
        
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container13', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "03 - Certification Rate"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#f6f6f6',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Certification Rate',
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Certification Rate'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            fontFamily: 'Poppins',
                            textOutline: 0,
                            fontSize: '40px',
                            color: '#282828',
                            fontWeight: 600
                        }
        
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container15', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
                backgroundColor: '#272726'
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "10 - Cohort Average Score - Grey"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#323232',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Cohort Average Score',
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Cohort Average Score'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            fontSize: '40px',
                            fontFamily: 'Poppins',
                            color: '#ffffff',
                            textOutline: 0,
                            fontWeight: 600
                        }
        
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container16', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
                backgroundColor: '#272726'
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "11 - Certification Rate - Grey"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#323232',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Certification Rate',
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Certification Rate'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            fontWeight: 600,
                            fontSize: '40px',
                            color: '#ffffff',
                            textOutline: 0
                        }
        
                    }
                }]
            }]
        });
        
        Highcharts.chart('container18', {
        
            chart: {
                type: 'solidgauge',
                height: 220,
                width: 220,
                spacing: [-15,-15,-15,-15],
                style: {
                    fontFamily: 'Poppins'
                },
                backgroundColor: '#272726'
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "16 - Recommendation Score - Grey"
            },
            navigation: {
                buttonOptions: {
                    y: 20,
                    x: -20
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '99%',
                    innerRadius: '90%',
                    backgroundColor: '#323232',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Recommendation Score',
                data: [{
                    color: '#3b844e',
                    radius: '99%',
                    innerRadius: '90%',
                    y: data['SUMAMRY_METRICS']['Recommendation Score'],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y + '%'
                        },
                        y: -30,
                        borderColor: 'none',
                        style: {
                            fontSize: '40px',
                            fontWeight: 600,
                            color: '#ffffff',
                            textOutline: 0
                        }
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container19', {
            chart: {
        
                type: 'solidgauge',
                style: {
                    fontFamily: 'Poppins'
                },
                backgroundColor: '#f5f5f5',
                height: 152,
                width: 152,
                spacing: [-75,-75,-75,-75]
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 15,
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadSVG']
                    }
                },
                filename: "18 - Average Course Rating"
            },
            navigation: {
                buttonOptions: {
                    y: 80,
                    x: -80
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
                style: {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#ffffff'
                }
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '57%',
                    innerRadius: '50%',
                    backgroundColor: '#e1e1e1',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 10,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Average Module Rating',
                data: [{
                    color: '#3b844e',
                    radius: '57%',
                    innerRadius: '50%',
                    y: data['MODULE_RATING_&_RELEVANCE']['RATING'][data['MODULE_RATING_&_RELEVANCE']['RATING'].length-1],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y
                        },
                        y: -20,
                        x: -2,
                        borderColor: 'none',
                        style: {
                            fontSize: '26px',
                            fontWeight: 600,
                            color: '#000000',
                            textOutline: 0
                        }
                    }
                }]
            }]
        });
        
        
        Highcharts.chart('container20', {
        
            chart: {
                type: 'solidgauge',
                style: {
                    fontFamily: 'Poppins'
                },
                backgroundColor: '#f5f5f5',
                height: 152,
                width: 152,
                spacing: [-75,-75,-75,-75]
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                buttons: {
                    contextButton: {
                        menuItems: ['downloadPNG', 'downloadSVG']
                    }
                },
                filename: "19 - Average Course Relevance"
            },
            navigation: {
                buttonOptions: {
                    y: 80,
                    x: -80
                }
            },
            credits: {
                    enabled: false
                },
        
            title: {
                text: null,
                style: {
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#ffffff'
                }
            },
        
            pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{
                    outerRadius: '57%',
                    innerRadius: '50%',
                    backgroundColor: '#e1e1e1',
                    borderWidth: 0
                },  ]
            },
        
            yAxis: {
                min: 0,
                max: 10,
                lineWidth: 0,
                tickPositions: []
            },
        
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        enabled: false
                    },
                    linecap: 'round',
                    stickyTracking: false,
                    rounded: true
                }
            },
        
            series: [{
                enableMouseTracking: false,
                name: 'Average Module Relevance',
                data: [{
                    color: '#3984bc',
                    radius: '57%',
                    innerRadius: '50%',
                    y: data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'][data['MODULE_RATING_&_RELEVANCE']['RELEVANCE'].length-1],
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return this.y
                        },
                        y: -20,
                        x: -1,
                        borderColor: 'none',
                        style: {
                            fontSize: '26px',
                            fontWeight: 600,
                            color: '#000000',
                            textOutline: 0
                        }
                    }
                }]
            }]
        });
        
        
        
        
        max = Math.max.apply(Math, data['RECOMMENDATION_SCORE_DISTRIBUTION']['SCORE'])*1.1
        
        function generateColor () {
            let colorSequence = []
            for (const [index, value] of data['RECOMMENDATION_SCORE_DISTRIBUTION']['SCORE'].entries()) {
                if (value == 0) {
                    colorSequence.push('transparent')
                }  else if (index < 7){
                    colorSequence.push('#9d9d9c')
                } else {
                    colorSequence.push('#3b844e')
                }
            }
        
        
            return colorSequence
        }
        //NEED TO FIX WIDTH AND HEIGHT --> CHANGES DEPENDING ON DATA
        Highcharts.chart('container14', {
            chart: {
                type: 'column',
                inverted: true,
                backgroundColor: '#272726',
                height: 295,
                width: 590,
                spacingRight: 60,
                spacingLeft: -20,
                style: {
                    fontFamily: 'Poppins'
                },
            },
            exporting: {
                allowHTML: true,
                enabled: enableDownload(),
                scale: 8,
                filename: "17 - Score Distribution"
            },
            title: {
                text: null
            },
            credits: {
                enabled: false
            },
            legend: {
                enabled: false
            },
            yAxis: {
                //type: 'logarithmic',
                labels: {
                  enabled: false
              },
              gridLineWidth: 0,
              title: {
                  text: null
              },
              min: -1,
              width: 570,
              //softMin: -2.1,
              //startOnTick: false,
              max: max,
              //tickInterval: 0.01,
              //minPadding: 0.2,
        
        
            },
        
            xAxis: [{
                categories: data['RECOMMENDATION_SCORE_DISTRIBUTION']['RECOMMENDATION_SCORE'],
                lineWidth: 0,
                startOnTick: true,
                labels: {
                    style:{
                        color: '#9d9d9c',
                        fontSize: '16px'
                    },
                    align: 'left',
                    x: 25,
                    //x: x,
                    y:6,
                    //offset: 1000
                }
            },
            {
                categories: data['RECOMMENDATION_SCORE_DISTRIBUTION']['SCORE'],
                linkedTo: 0,
                opposite: true,
                lineWidth: 0,
                labels: {
                    useHTML: true,
                    style:{
                        color: '#9d9d9c',
                        fontSize: '16px'
                        },
                    formatter: function() {
        
                            if (this.pos > 6) {
                                return `<span style="color: #3b844e">${this.value}</span>`
                        }
                            else {
                                return `<span style="color: #9d9d9c">${this.value}</span>`
                        }
                    },
        
                    align: 'right',
                    x: 55,
                    y:3,
                    zIndex: 100
                },
                zIndex: 200
        
            }],
        
            colors: generateColor(),
        
            plotOptions: {
                column: {
                  grouping: false
                },
                series: {
                    borderWidth: 0,
                    borderRadius: 5,
                    pointWidth: 10,
                }
            },
            series: [
                {
                name: 'Background',
                data: Array(11).fill(max),
                color: '#323232',
                enableMouseTracking: false
            },
        
            {
                name: 'LEARNERS',
                data: data['RECOMMENDATION_SCORE_DISTRIBUTION']['SCORE'],
                colorByPoint: true,
            }
            ]
        
        });
        
        }
        
      
  
  

var data = $.getValues("/generate-data");

if (data != null) {
    generate_charts(data)

}
