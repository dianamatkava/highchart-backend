function(chart) {
		var cohortAverage = [COHORT_AVERAGE_DATA];
		var yourScore = [YOUR_SCORE_DATA];
        var series = chart.series[0],
                xAxis = chart.xAxis[0],
                dataLabel = series.data[2].dataLabel,
                triangle1Size,
                triangle1X,
                triangle1Y,
                triangle1,
                lineX,
                lineY,
                lineHeight,
                line,
                labelX,
                labelX2;
          
          triangle1Size = 12;
          triangle1X = cohortAverage * 5 - triangle1Size - cohortAverage / 5;
          triangle1Y = dataLabel.y + chart.plotTop + 1;
          
          lineX = triangle1X + 12;
          lineY = triangle1Y - 56;
          lineHeight = series.itemHeight + 14;
          
          
          triangle1 = this.renderer.path([
                'M',
                triangle1X,
                triangle1Y,
                triangle1X + triangle1Size,
                triangle1Y - triangle1Size - 15,
                triangle1X + 2 * triangle1Size,
                triangle1Y,
                'z'])
          .attr({
                fill: '#787878'
          })
          .add();
          
          line = this.renderer.path(['M', lineX, lineY, 'v', lineHeight]).attr({
                stroke: '#787878',
                'stroke-width': '4px'
          }).add();
          
          line.toFront();
          triangle1.toFront();
          
          
          labelX = series.data[1].x;
          labelX2 = series.data[1].x2;
          
          if (cohortAverage <= 83 && cohortAverage >= 9) {
              this.renderer.text('Cohort Average', lineX - 104, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          } else if (cohortAverage <= 8) {
          		this.renderer.text('Cohort Average', chart.plotLeft, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          } else {
          		this.renderer.text('Cohort Average', 295, lineY + 80).css({
                'font-size': '24px',
                'font-family': 'Arial Black',
				'color': '#787878'
              }).add();
          }
          
          
          
          var series2 = chart.series[1],
                xAxis2 = chart.xAxis[0],
                dataLabel2 = series2.data[0].dataLabel,
                triangle2Size,
                triangle2X,
                triangle2Y,
                triangle2;
          
          triangle2Size = 12;
          triangle2X = series2.data[0].x2 * 5 - triangle2Size - yourScore / 5;
          triangle2Y = dataLabel2.y + chart.plotTop + 18;
          
          
          triangle2 = this.renderer.path([
            'M',
            triangle2X, // Define where the box starts (for x)
            triangle2Y,	// Define where the box starts (for y)
            triangle2X + triangle2Size,	// First point of shape
            triangle2Y + triangle2Size + 15,	// Second point of shape
            triangle2X + 2 * triangle2Size,	// Third point of shape
            triangle2Y,
            'z'])
            .attr({
            fill: 'black'
          }).add();
          triangle2.toFront();
          
          if (series2.data[0].x2 <= 89 && series2.data[0].x2 >= 9) {
          		this.renderer.text('Your Score', triangle2X - 60, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          } else if (series2.data[0].x2 <= 8) {
          		this.renderer.text('Your Score', chart.plotLeft, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          } else {
          		this.renderer.text('Your Score', 357, triangle2Y - 10).css({
                'font-size': '24px',
                'font-family': 'Arial Black'
              }).add();
          }
          
          
          var minPercentageText = this.renderer.text('0%', chart.plotLeft, triangle2Y + 70).css({
            'font-size': '24px',
            'font-family': 'Arial',
            'color': '#787878'
          }).add();
          
          var maxPercentageText = this.renderer.text('100%', 440, triangle2Y + 70).css({
            'font-size': '24px',
            'font-family': 'Arial',
            'color': '#787878'
          }).add();
  }