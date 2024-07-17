const services = [
  'Financial Services',
  'Manufacturing',
  'Service providers',
  'Public sector',
  'Healthcare',
  'Retail'
]

const industry = [
  'Reduce Risk',
  'Reduce Cost',
  'Enhance Security',
  'Demonstrate Compliance',
  'Optimize Productivity',
  'Manage Reputation / Improve Brand',
  'Enable Business Capabilities Through New Technology',
  'Digital Transformation',
  'Grow Revenues',
  'Improve End User Experience',
  'Improve Customer Experience'
].reverse()

// HETMAP DATA
const rawData = `34%	32%	23%	30%	20%	23%
33%	42%	37%	21%	31%	22%
39%	22%	40%	40%	26%	35%
16%	16%	25%	28%	19%	15%
19%	42%	21%	25%	24%	28%
17%	14%	14%	19%	14%	20%
37%	23%	29%	24%	22%	27%
37%	33%	41%	35%	36%	36%
25%	37%	37%	21%	36%	35%
22%	19%	17%	26%	34%	34%
22%	20%	19%	31%	38%	24%`

const lines = rawData.split('\n').reverse()
const dataHeatmap = []

lines.forEach((line, i) => {
  const elements = line.split('\t')
  elements.forEach((element, j) => {
    dataHeatmap.push([j, i, parseFloat(element)])
  })
})

export { dataHeatmap, services, industry }
