<template>
  <div>
    <Modal :visible="visible" @ok="showPopup" @cancel="showPopup" class="h-5/6">
      <a-card style="max-width: 680px;" :bordered="false" class="card">
        <div class="title " >メールで送る</div>
        <div class="description1 py-3">ご指定のメールアドレスへ、情報をお送りします。</div>
        <div class="description1">※下記「送信する」ボタンを押すと、即時メールが返信されます</div>
        <a-input  type="text sm:hidden" :maxLength="maxLength" class="input1" v-model.trim="email" placeholder="メールアドレスをご入力ください。" />

        <div class="description2">ご指定のメールアドレスへ、</div>
        <div class="description4">情報をお送りします。</div>

        <div class="description2">※下記「送信する」ボタンを押すと、即時</div>
        <div class="description5">メールが返信されます。</div>

        <div class="description2">※メール本文記載のURLは、PCホームペー</div>
        <div class="description5">ジ用のURLとなります。</div>

        <a-input  type="text" class="input2" :maxLength="maxLength" v-model.trim="email" placeholder="メールアドレスをご入力ください。" />

        <div class="description6" v-if="errCode === '1'">メールアドレスを入力してください。</div>

        <div class="description6" v-if="errCode === '2'">メールアドレスの形式が不正です</div>

        <div class="description6" v-if="emailLength >= maxLength">「255文字以内で入力をお願い致します」</div>

        <a-button size="large" class="submit-btn" @click="sendMail()"><span class="title-btn">送信する</span></a-button>
      </a-card>

    </Modal>
  </div>
</template>

<script>
import { Modal } from '@/components/primitive'

export default {
  name: "PopUpSendMail",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    errCode: {
      type: String,
      default: '0'
    }
  },
  components: {
    Modal
  },
  data() {
    return {
      email: null,
      maxLength: 255,
      emailLength: 0
    }
  },
  watch: {
    email(val) {
      this.emailLength = val.length
    },
    visible(val) {
      if (val) {
        this.email = ''
      }
    }
  },
  methods: {
    sendMail() {
      this.$emit('sendMail', this.email)
    },
    showPopup($event) {
      this.$emit('show', $event)
      this.email = null
    }
  }
}
</script>
