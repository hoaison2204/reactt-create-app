<template>
  <div v-if="visible" class="debug">
    <div>
      <h1 class="c-title">Debug Commands</h1>
      <p class="c-lead">F2 で閉じる</p>
      <ul>
        <li>
          <ButtonLink
            to="/components-list"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            コンポーネントリスト<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            href="/swagger/dist/"
            style-type="primary"
            position="right"
            tag="a"
          >
            API Spec<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/page-list"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            作成ページリスト<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/dev/routes"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            URL 一覧<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/demo"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            Demo：データ削減<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/demo/translation"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            Demo：翻訳テストページ<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/demo/elements"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            Demo：エレメント一覧（コンポーネントリストに統合？）<Icon
              name="arrow_circle_right_white"
            />
          </ButtonLink>
        </li>
        <li>
          <ButtonLink
            to="/api-list"
            style-type="primary"
            position="right"
            @click.native="hide"
          >
            開発環境API一覧<Icon name="arrow_circle_right_white" />
          </ButtonLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false
    };
  },
  methods: {
    keydown(event) {
      if (event.code === "F2" || event.keyCode === 113)
        this.visible = !this.visible;
    },
    hide() {
      this.visible = false;
    }
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
  },
  destroyed() {
    window.removeEventListener("keydown", this.keydown);
  }
};
</script>

<style lang="scss" scoped>
.debug {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 255, 255, 0.75);

  div {
    position: absolute;
    top: 2em;
    right: 2em;
    bottom: 2em;
    left: 2em;
    padding: 2rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    background: white;
    border: 1px solid gray;
    border-radius: 1em;
  }
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  margin: 1em 0;
}
</style>
