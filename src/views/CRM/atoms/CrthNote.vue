<!-- ログイン ログインボタン注釈 -->
<template>
  <p
    class="crth-a-login-note"
    :class="{ 'crth-sp': note.spOnly }"
  >
    <span>{{ note.title }}</span>
    {{ note.text }}
    <template v-if="note.linkText">
      <a :href="note.link">{{ note.linkText }}</a>
    </template>
  </p>
</template>

<script>
export default {
  name: "AtomsCrthNote",
  props: {
    /**
     * 注釈の情報
     */
    note: {
      type: Object,
      default: () => {}
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/css/CRM/crth/note.scss";
</style>
