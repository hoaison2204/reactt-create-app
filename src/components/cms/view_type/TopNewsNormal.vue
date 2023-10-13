<template>
  <div class="TopNewsNormal">
    <ul>
      <li
          v-for="(item, i) in item_list"
          :key="i"
      >
        <a
            :href="`/information/` + item.id"
        >
          <dl>
            <dd>
              <span class="TopNewsNormal__date">
                {{
                  $moment(item.pub_date).format("YYYY年MM月DD日")
                }}
              </span>
              <span
                  v-if="item.news_name"
                  class="c-label c-label--common"
              >
                {{ item.news_name }}
              </span>
            </dd>
            <dt>{{ item.display_title }}</dt>
          </dl>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>

export default {
  name: "TopNewsNormal",
  props: {
    item_list: {
      type: Array,
    }
  },
  components: {
  },

  data() {
    return {
    };
  },
  watch: {},
  computed: {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
$Red: #da291c;
$CoolBlack: #1f2021;
.TopNewsNormal {
  ul {
  }
  li {
    margin-bottom: 1rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  a {
    color: $CoolBlack;
    font-size: 1rem;
    &:hover {
      text-decoration: none;
      dt {
        color: $Red;
      }
    }
  }
  dl {
    dd {
      .TopNewsNormal__date {
        color: #a8aaad;
        font-size: 1rem;
        padding-right: 1rem;
      }
    }
    dt {
    }
  }
}
</style>