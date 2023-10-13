<template>
  <button :type="type" :class="classObject">
    <slot />
  </button>
</template>

<script>
export default {
  data: () => ({
    blockName: "c-button"
  }),
  props: {
    type: {
      type: String,
      default: "button"
    },
    target: {
      type: String,
      default: ""
    },
    styleType: {
      type: String,
      default: "primary"
    },
    width: {
      type: String,
      default: ""
    },
    color: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    /**
     * CSSクラス名を構成するブロック名とエレメント名を__で結合して返却する
     * @return {string} - ブロック名とエレメント名を__で結合したテキスト
     */
    styleTypeClass() {
      return this.blockName + "__" + this.styleType || "";
    },
    /**
     * CSSクラス名を構成するエレメント名とモディファイ名（幅）を--で結合して返却する
     * @return {string} - エレメント名とモディファイ名（幅）を--で結合したテキスト
     */
    widthClass() {
      if (!this.width) return;
      return this.styleTypeClass + "--" + this.width || "";
    },
    /**
     * CSSクラス名を構成するエレメント名とモディファイ名（色）を--で結合して返却する
     * @return {string} - エレメント名とモディファイ名（色）を--で結合したテキスト
     */
    colorClass() {
      if (!this.color) return;
      return this.styleTypeClass + "--" + this.color || "";
    },
    /**
     * CSSクラス名を構成するエレメント名とモディファイ名（配置）を--で結合して返却する
     * @return {string} - エレメント名とモディファイ名（配置）を--で結合したテキスト
     */
    positionClass() {
      if (!this.position) return;
      return this.styleTypeClass + "--" + this.position || "";
    },
    /**
     * CSSクラス名を構成するエレメント名と"inactive"を--で結合して返却する（非活性の要素用）
     * @return {string} - エレメント名と"inactive"を--で結合したテキスト
     */
    disabledClass() {
      if (!this.disabled) return;
      return this.styleTypeClass + "--" + "inactive" || "";
    },
    /**
     * 上記で定義した全てのクラス名をbutton要素用に返却する
     * @return {array} - 上記で定義した全てのクラス名テキスト
     */
    classObject() {
      return [
        "c-button",
        this.styleTypeClass,
        this.widthClass,
        this.colorClass,
        this.positionClass,
        this.disabledClass
      ];
    }
  }
};
</script>
