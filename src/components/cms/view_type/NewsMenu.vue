<template>
  <div class="newsMenu" v-model="dataMaker">
    <LoadingContent v-if="isLoading" />
    <template v-if="!isLoading">
      <ul>
        <li class="newsMenu__title">カテゴリ</li>
        <li
            @click="saveCategoryToStore('', 'all')"
        >
          <router-link to="/information">すべて</router-link>
        </li>
        <li
            v-for="value in titles"
            :key="value.id"
            @click="saveCategoryToStore(value.id, 'name')"
        >
          <router-link to="/information">{{ value.name }}</router-link>
        </li>
      </ul>

      <ul>
        <li class="newsMenu__title">過去のお知らせ</li>
        <li
            v-for="value in years"
            :key="value"
            @click="saveCategoryToStore(value, 'year')"
        >
          <router-link to="/information">{{ value }}年</router-link>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>

export default {
  name: 'NewsMenu',
  props: {
    cms_response: {
      type: Object,
      default: null
    }
  },

  data() {
    return {
      data : null,
      titles: [],
      years: [],
      isLoading: true,
    }
  },
  watch:{},
  computed: {
    async dataMaker(){
      this.isLoading = true;
      if(this.$props.cms_response != null) {
        const res = await this.$props.cms_response;
        const sideMenu = res.objects[0].data;
        if(sideMenu != null) {
          this.data = sideMenu;
          this.makeDataList(this.data);
          this.isLoading = false;
        }
      }
    }
  },
  methods: {
    makeDataList(obj){
      this.titleList(obj);
      this.yearList(obj);
    },
    titleList(obj) {
      const titleLists = [];
      obj.forEach( (item) => {
        if(item.attributes){
          titleLists.push({name: item.attributes.name, id: item.id})
        }
      });
      this.titles = titleLists;
    },
    yearList(obj) {
      let yearLists = [];
      if(obj != null) {
        obj.forEach( (item) => {
          if(item.year) {
            yearLists.push(item.year);
          }
        });
        this.years = yearLists;
      } else {
        for (let n = 0; n < 6 ; n++) {
          const item = this.$moment().subtract(n, 'y').format('YYYY');
          yearLists.push(item);
        }
        this.years = yearLists;
      }
    },
    saveCategoryToStore(selectedId, controlId) {
      if (controlId === "all") {
        this.$store.commit("information/categoryAll", selectedId);
      } else if (controlId === "name") {
        this.$store.commit("information/categoryName", selectedId);
      } else  {
        this.$store.commit("information/categoryYear", selectedId);
      }
    },
  },

  created() {
  },
  mounted() {
  },
  updated() {
  },
  destroyed() {
  },

}
</script>

<style lang="scss" scoped>
.newsMenu {
  .newsMenu__title {
    font-size: .75rem;
    font-weight: 700;
    line-height: 1.5;
    color: #a8aaad;
    margin-bottom: 13.5px;
  }
}
</style>