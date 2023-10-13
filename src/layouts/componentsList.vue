<template>
  <div class="l-default l-default__container">
    <div class="l-default l-default__content" id="capture">
      <main class="l-main components-list-main">
        <div class="l-side">
          <ComponentsListNavigation class="l-side__wrap" />
        </div>
        <div class="components-list-content">
          <div class="components-list-containers">
            <div class="components-list-container">
              <h1 class="c-page-title">
                コンポーネントリスト
                <span
                  v-if="pageTitle && pageComponentName !== 'ComponentsList'"
                >
                  - {{ pageTitle }}</span
                >
              </h1>
            </div>
            <!-- /.components-list-container-->
          </div>
          <!-- /.components-list-containers-->

          <router-view />
        </div>
      </main>
    </div>
    <Debug />
  </div>
</template>


<script>
export default {
  computed: {
    pageComponentName() {
      return this.$route.name || "";
    },
    pageTitle() {
      return this.$route.meta.page.name || "";
    }
  },
};
</script>


<style lang="scss">
.l-side {
  @include mq() {
    margin-right: 0;
    margin-bottom: 2rem;
  }
}

.components-list-main {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 4rem;
  padding: 0 1rem;
  min-width: 320px;
  max-width: 1300px;
  .l-side__list__item {
    &.router-link-exact-active {
      color: $Red1;
      font-weight: bold;
    }
  }
  @include mq("md", "min") {
    flex-wrap: nowrap;
    padding-bottom: 4rem;
  }
}

.components-list-content {
  padding: 0 1rem;
  width: 100%;
  @include mq("md", "min") {
    max-width: 980px;
  }

  pre {
    padding: 2rem;
    background-color: $CoolGray5;
    border: 1px solid $CoolGray3;
    color: $CoolGray;
    border-radius: 4px;
    &:not(:last-child) {
      margin-bottom: 2rem;
    }
  }
}

.components-list-containers {
  &:not(:last-child) {
    margin-bottom: 4rem;
  }
}

.components-list-container {
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
  > :last-child {
    margin-bottom: 0;
  }
}

.components-list-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -1rem 0 0 -2rem;
  > * {
    padding: 1rem 0 0 2rem;
    width: 50%;
  }
  @include mq() {
    justify-content: center;
    text-align: center;
    > * {
      width: 100%;
    }
  }

  &--narrow {
    > * {
      width: auto;
    }
  }
}

.components-list-icons {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: -1rem 0 0 -2rem;
  > * {
    padding: 1rem 0 0 2rem;
    width: 20%;
    text-align: center;
  }
  @include mq() {
    > * {
      width: 50%;
      word-break: break-all;
    }
  }
}

.components-list-colors {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: -1rem 0 0 -2rem;
  > * {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 1rem 0 0 2rem;
    max-width: 9rem;
    p {
      width: 100%;
      text-align: center;
      font-size: 14px;
      &:not(:last-child) {
        margin-bottom: 0.5rem;
      }
    }
  }
  @include mq() {
    > * {
      width: 33.333%;
      word-break: break-all;
    }
  }
}

.components-list-color {
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  width: 4rem;
  height: 4rem;
  border: 1px $CoolGray solid;
}

.components-list-color-code {
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.components-list-color-variable {
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}

.components-list-color-label {
  color: $CoolGray;
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
}
</style>
