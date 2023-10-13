<template>
  <div class="item" :class="{ grow: menu_item.subItems }" @click="gotoPath()">
    <div class="item-box">
      <Icon :name="menu_item.icon" class="w-20 h-20 sm:w-8 sm:h-8" />
      <p class="pt-2 sm:text-xs">{{ menu_item.name }}</p>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon';
export default {
  name: 'ItemBox',
  props: ['menu_item', 'mypageBoCode', 'companyCd', 'menuIndex', "mypageDisplayCode"],
  components: {
    Icon,
  },
  methods: {
    gotoPath() {
      this.$emit('gotoPath');
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  aspect-ratio: 240/190;
  box-shadow: 0px 0px 8px #00000029;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 0.5rem;
  opacity: 1;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
  &:hover {
    cursor: pointer;
    background-color: rgba(254, 226, 226);
  }

  .icon {
    background-color: rgba(255, 0, 0, 0.4);
  }

  &-box {
    text-align: center;
  }
}

@media (min-width: 376px) {
  .item-box {
    @apply rounded-md;
  }
}

.grow {
  flex-grow: 2;
}
</style>
