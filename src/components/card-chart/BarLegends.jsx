import React from 'react'
import PropTypes from 'prop-types'

// const legendData = ['Highly Valuable', 'Neutral', 'Limited Value']
const legendColors = ['#8064A2', '#BCCCDA', '#CDBCE2']

const legendsContainerStyled = {
  display: 'flex',
  justifyContent: 'center',
  margin: '10px 0px 30px 0px'
}

const legendsItemsStyled = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 10px'
}

const legendChipStyled = {
  width: '18px',
  height: '8px',
  borderRadius: '2px',
  marginRight: '5px',
  cursor: 'pointer'
}

const legendFontStyled = {
  fontWeight: '400',
  fontSize: '0.9em',
  cursor: 'pointer'
}

export const BarLegends = ({ chartRefs, toggleSeries, legendData }) => {
  const handleClick = (name) => {
    toggleSeries(name)
    chartRefs.forEach((ref) => {
      const chartInstance = ref.current.getEchartsInstance()
      chartInstance.dispatchAction({
        type: 'legendToggleSelect',
        name
      })
    })
  }
  return (
    <div style={legendsContainerStyled}>
      {legendData &&
        legendData.map((item, index) => (
          <div key={index} style={legendsItemsStyled}>
            <div
              style={{
                ...legendChipStyled,
                backgroundColor: legendColors[index]
              }}
            ></div>
            <div style={legendFontStyled} onClick={() => handleClick(item)}>
              {item}
            </div>
          </div>
        ))}
    </div>
  )
}

BarLegends.propTypes = {
  chartRefs: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleSeries: PropTypes.func.isRequired,
  legendData: PropTypes.arrayOf(PropTypes.string)
}
