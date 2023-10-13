<template>
  <div class="OtherPage">
    <template v-if="view_type === 'detail'">
      <OtherPageDetail
          @catchTitle="setTitle"
      />
    </template>
  </div>
</template>
<script>
import OtherPageDetail from "@/components/cms/view_type/OtherPageDetail.vue";

export default {
  name: "OtherPage",
  props: {
    view_type: {
      type: String,
      default: "",
    },
  },
  components: {
    OtherPageDetail,
  },

  data() {
    return {
    };
  },
  watch: {},
  computed: {
  },
  methods: {
    setTitle(title){
      this.$emit('catchTitle',title);
    },
  },
}
</script>