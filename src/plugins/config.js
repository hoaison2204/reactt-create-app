const TITLE = 'benefit-one_mock'

export default async (_, inject) => {
  inject('config', {
    title: TITLE,
    author: 'Benefit One Inc.',
    pageSize: 10,
    responsiveWidth: 1024
  })
}
