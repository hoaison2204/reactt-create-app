<template>
  <div class="newsList" v-model="waitContent">
    <ul v-if="data.length">
      <li
          v-for="item in data"
          :key="item.id"
      >
        <dl>
          <dd>
            <span class="date">
              {{ $moment(item.pub_date).format("YYYY年MM月DD日") }}
            </span>
            <span class="tag" v-if="item.news_type_name">
              {{ item.news_type_name }}
            </span>
          </dd>
          <dt
              @click="showDetail(item.id)"
          >

              {{ item.display_title }}

          </dt>
        </dl>
      </li>
    </ul>
    <ul v-else>
      <li>該当するお知らせはありません。</li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'NewsList',
  props: {
    item_list: {
      type: Array,
    }
  },

  data() {
    return {
      data : null,
    }
  },
  watch:{},
  computed: {
    async waitContent(){
      await this.makeList();
    },
  },
  methods: {
    makeList() {
      this.data = this.$props.item_list;
    },
    showDetail(id) {
      this.$router.push("/information/" + id);
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
$CoolBlack: #1f2021;
.newsList {
  ul {}
  li {
    padding: 1rem 1.5rem;
    display: block;
    color: #1f2021;
    border-bottom: 1px solid #dddddd;
    width: 100%;
  }
  dl {
    dt {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 400;
      cursor: pointer;
    }
    dd {
      display: flex;
      margin-bottom: 0.25rem;
      .date {
        font-size: 0.75rem;
        line-height: 1.5;
        padding: 0.2rem 0;
        margin-right: 0.5rem;
      }
      .tag {
        color: $CoolBlack;
        font-size: 0.63rem;
        line-height: 1.2;
        background-color: #eaeaea;
        padding: 0.4rem 0.5rem;
        border-radius: 2px;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>