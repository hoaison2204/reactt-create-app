export default async (context, inject) => {
  class ConditionalPoints {
    constructor(value, {
      rate = 1,
      since,
      until,
      name,
      categories,
      menus,
      cafeteria
    } = {}) {
      this.value = value
      this.rate = rate
      this.since = context.$moment(since || -8640000000000000)
      this.until = context.$moment(until || 8640000000000000)
      this.name = name || 'リラクサロン限定'
      this.categories = categories || { length: 0, includes() { return true } }
      this.menus = menus || { length: 0, includes() { return true } }
      this.cafeteria = Boolean(cafeteria)
    }
  }

  class Points {
    constructor(conditionalPoints, ...repeated) {
      this.values = (
        Array.isArray(conditionalPoints) ?
          conditionalPoints :
          [conditionalPoints]
      )
        .concat(repeated)
        .map(x => typeof x === 'object' ? x : { value: x })
        .map(x => new ConditionalPoints(x.value, { ...x }))
    }

    *[Symbol.iterator]() {
      for (const value of this.values)
        yield value
    }

    get total() {
      return this.values.reduce((acc, x) => acc += x.value, 0)
    }

    filter(cb) {
      return new Points(this.values.filter(cb))
    }

    get normal() {
      return this.filter(x => !x.cafeteria)
    }

    get cafeteria() {
      return this.filter(x => x.cafeteria)
    }
  }

  inject('points', { ConditionalPoints, Points })
}
