import {
  convertToPercentage,
  formatPercentage,
  formatValue
} from './converter-numbers-to'

export function createLinechartComparison(dataChart) {
  return {
    legend: {
      data: dataChart?.legends
    },
    hasSmallCard: true,
    title: {
      subtextStyle: {
        align: 'center'
      },
      itemGap: 50,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const title = formatValue(params[0].axisValue)
        const items = params.map(
          (param) =>
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${param.color};"></span>${param.seriesName}: ${param.value}`
        )
        return `${title}<br/>${items.join('<br/>')}`
      }
    },
    grid: {
      left: '1%',
      right: '2%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataChart?.xAxisData,
      axisLabel: { formatter: formatValue },
      name: 'Price Points Tested (USD)',
      nameLocation: 'center',
      nameGap: 30
    },
    yAxis: {
      type: 'value',
      // min: 0,
      // max: 100,
      axisLabel: {
        formatter: '{value}%'
      }
    },
    color: ['#E3AF4A', '#E1842E', '#E0561B', '#018297'],
    series: dataChart?.legends.map((legend, index) => ({
      name: legend,
      type: 'line',
      smooth: true,
      data: dataChart?.seriesData[index]
    }))
  }
}

export function createLineStyleChartComparison(dataLineChart) {
  const filteredData = dataLineChart?.series?.data.filter((value) => value > 0)

  return {
    // lineChart[0].title
    color: ['#F29344'],
    title: {
      title: 'Price Sesitivity (Demand Curve)',

      top: 10,
      left: 'center',
      textStyle: {
        fontSize: 18
      }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        const title = formatValue(params[0].axisValue)
        const items = params.map(
          (param) =>
            `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
              param.color
            };"></span>${formatPercentage(param.value)}`
        )
        return `${title}<br/>${items.join('<br/>')}`
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dataLineChart?.xAxisData,
      axisLabel: { formatter: formatValue },
      name: 'Price Points Tested (USD)',
      nameLocation: 'center',
      nameGap: 40
    },
    yAxis: {
      type: 'value',
      // min: 0,
      // max: 100,
      axisLabel: {
        formatter: '{value}%'
      },
      name: '% of Respondents',
      nameLocation: 'center',
      nameGap: 50
    },
    series: [
      {
        data: convertToPercentage(filteredData),
        type: 'line',
        smooth: true
        // label: {
        //   show: true,
        //   position: 'top',
        //   formatter: '{c}%'
        // }
      }
    ]
  }
}

export function generateBarChartsComparison(data1, data2) {
  const chart1 = {
    xAxis: {
      type: 'category',
      data: data1.xAxis.data
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data1.series.data,
        type: 'bar'
      }
    ]
  }

  const chart2 = {
    xAxis: {
      type: 'category',
      data: data2.xAxis.data
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: data2.series.data,
        type: 'bar'
      }
    ]
  }

  return [chart1, chart2]
}
