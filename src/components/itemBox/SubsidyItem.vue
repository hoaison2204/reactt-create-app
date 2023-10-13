<template>
<div class="subsidy">
  <div class="subsidy__content">
    {{ subsidy.availableDataList }}
    <p class="text-base font-bold">{{ subsidy.availableDataList.dispSubsidyNm }}</p>
    <div class="subsidy__info">
      <div class="subsidy__info__container">
        <div class="flex">
          <p class="subsidy__label">有効期限</p>
          <p class="">{{ subsidy.availableDataList.receptionDateTo }}</p>
        </div>

        <div v-if="subsidy.remainingCount || subsidy.remainingAmount" class="flex align-items-center">
          <p class="subsidy__label">保有枚数</p>
          <span v-if="subsidy.remainingCount">
            <span class="subsidy__count">
              {{ subsidy.remainingCount }}
            </span>
          枚
          </span>
          <span v-else-if="subsidy.remainingAmount">
            <span class="subsidy__count">
              {{ subsidy.remainingAmount }}
            </span>
          円
          </span>
        </div>
      </div>
      <div v-if="subsidy.members" class="subsidy__info__container">
        <div class="flex">
          <p class="subsidy__label">保有枚数</p>
          <span
              v-for="(item, i) in subsidy.members" :key="i">
            {{ item }}
          </span>
        </div>
      </div>
    </div>
  </div>
  <p class="subsidy__subInfo" v-if="subsidy.subText"> {{subsidy.subText}}</p>
  <div v-if="!isLast" class="p-mypage-outline--separate"></div>
</div>
</template>

<script>
export default {
  name: 'SubsidyItem',
  props: {
    subsidy: {
      type: Object,
      default: {},
    },
    isLast: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.subsidy {
  &__info {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 768px) {
      width: 100%;
    }

    &__container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 0.5rem;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: start;
    }
  }

  &__label {
    margin-right: 1rem;
    padding: 0.125rem 0.4rem;
    border-radius: 2px;
    background-color: $CoolGray4;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: 768px) {
      margin-right: 0.25rem;
      font-size: 10px;
    }
  }

  &__subInfo {
    font-size: 12px;
    color: $CoolGray4;
  }

  &__count {
    font-size: 32px;
    font-weight: 600;
    margin-left: 0.5rem;
  }
}
</style>