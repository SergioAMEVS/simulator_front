export function formatPercentage(number) {
  const num = parseFloat(number)
  if (isNaN(num)) {
    return '0.00%'
  }
  return num.toFixed() + '%'
}

export function formatDollar(number) {
  let num = parseFloat(number)
  if (isNaN(num)) {
    return '$0.00'
  }
  num = Math.floor(num)
  return '$' + num.toLocaleString('en-US')
}

export function convertToPercentage(array) {
  if (!Array.isArray(array)) {
    return []
  }

  return array.map((value) => parseFloat((value * 100).toFixed(2)))
}

export function convertProfillingToPercentage(value) {
  if (typeof value !== 'number') {
    return '0%'
  }

  const percentage = Math.round(value)

  return percentage + '%'
}

export function formatValue(value) {
  if (value >= 1000000) {
    return `${value / 1000000}M`
  } else if (value >= 1000) {
    return `${value / 1000}k`
  } else {
    return value.toString()
  }
}
