import moment from 'moment'

export default (_, inject) => {
  moment.locale('ja')
  inject('moment', moment)
}
