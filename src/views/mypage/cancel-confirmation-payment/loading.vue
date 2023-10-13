<template>
  <div class="l-main" style="width: 100%;">
    <div class="c-card">
      <div class="c-card__inner">
        <LoadingContent />
      </div>
    </div>
  </div>
</template>
<script>
import { getCookieValue, createSetCookie } from '@/utils/cookie'
import { get } from "lodash";

const TOAST_OPTION = {
  duration: 30000
}

export default {
  data() {
    return {};
  },
  created() {},
  async mounted() {
    this.$meta.setDocumentTitle("お申し込みキャンセル（内容確認）");
    this.$page.showSideMenu = false;
    this.setBreadcrumb();
    this.handleCancelOrder();
  },
  computed: {},
  methods: {
    async handleCancelOrder() {
      const query = this.$route.query;

      const cancelOrderCookie =localStorage.getItem('orderCancelInfo');

      if (cancelOrderCookie) {
        const payload = JSON.parse(cancelOrderCookie);
        const acptNo = _.get(payload, "acptNo", "");
        const params = {
          acptNo
        };
        if (query && query.param) {
          payload.param = encodeURIComponent(query.param);
          payload.orderRequestTransactionId = getCookieValue('orderRequestTransactionId');
        }
        await this.$repositories("orders")
          .cancelOrder(payload)
          .then((response) => {
                if(response?.isError){
                const error = response?.data 

                try { 
                const messageError = JSON.parse(_.get(error, 'error.message', null)) || null    
                  if(typeof error === 'object' && error.statusCode === 400 && error.message){
                    this.$toasted.error(error?.message, TOAST_OPTION)
                  } else if(messageError && Array.isArray(messageError) ){
                    let errorText =  ''
                    messageError.forEach((error)=>{
                    errorText += `${error?.errorMsg} <br> `
                    })
                    this.$toasted.error(errorText, TOAST_OPTION);
                    
                    document.cookie = createSetCookie("orderRequestTransactionId", "", new Date(0));
                    this.$router.push({
                    path: "/mypage/cancel-complete",
                    query: params
                    });    

                  } else if (typeof error === 'object' && error.errorDetail){
                    this.$toasted.error(error?.errorDetail, TOAST_OPTION)
                  } else {
                    this.$toasted.error('キャンセルに失敗しました')
                  }

                } catch (error) {
                  this.$toasted.error('キャンセルに失敗しました')
                }                

            } else {
              const cancelNo = get(response, "data.cancelNo[0]","") || ""
              // const cancelNo = response.cancelNo?.[0] || '';
              this.$store.commit("orders/cancelNo", cancelNo);
              localStorage.removeItem('orderCancelInfo');
              // document.cookie = createSetCookie("orderCancelInfo", "", new Date(0));
              document.cookie = createSetCookie("orderRequestTransactionId", "", new Date(0));
              this.$router.push({
              path: "/mypage/cancel-complete",
              query: params
              });
            }

        });
      } else {
        localStorage.removeItem('orderCancelInfo');
        this.$router.push('/error')
        return;
      }
    },

    setBreadcrumb() {
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("マイページ", "/mypage")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("お申し込み一覧", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb("お申し込み情報詳細", "/mypage/orders")
      );
      this.$page.setBreadcrumb(
        this.$page.formatBreadcrumb(
          "お申し込みキャンセル（内容確認）",
          "/mypage/cancel-confirmation"
        )
      );
    }
  },
  watch: {
    $route() {
      this.setBreadcrumb();
    }
  }
};
</script>
