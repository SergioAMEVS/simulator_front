export function formatDate(dateString) {
  const options = { year: '2-digit', month: 'short', day: '2-digit' }
  const date = new Date(dateString)
  let formattedDate = date.toLocaleDateString('en-US', options)

  formattedDate = formattedDate.replace(/,| (?!\d)/g, '/')
  return formattedDate
}
