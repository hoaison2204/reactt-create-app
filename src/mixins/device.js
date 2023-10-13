export default {
  methods: {
    isSmartPhone() {
      if (navigator.userAgent.match(/iPhone|Android.+Mobile/)) return true;
      return false;
    }
  }
}
