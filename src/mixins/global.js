export const REGEX =  {
  KATAKANA: new RegExp(/^([ァ-ンｧ-ﾝﾞﾟ]|ー|\s)+$/),
  KATAKANA_ROMAJI: new RegExp(/^([ァ-ンｧ-ﾝﾞﾟa-zA-Z]|ー|\s)+$/),
  KANJI: new RegExp(/^[一-龥ぁ-ん]|\s+$/),
  KANJI_ROMAJI: new RegExp(/^[一-龥ぁ-んa-zA-Z]|\s+$/),
  HIRAGANA: new RegExp(/^[ぁ-ん]+$/),
  NOT_SPECIALCHAR: new RegExp(/^([ァ-ンｧ-ﾝﾞﾟ一-龥ぁ-んァ-ンａ-ｚＡ-Ｚa-zA-Z0-9０-９々ヴ]|\s)+$/),
  NOT_SPECIALCHAR_NUMBER: new RegExp(/^([ァ-ンｧ-ﾝﾞﾟ一-龥ぁ-んァ-ンａ-ｚＡ-Ｚa-zA-Z々ヴ]|\s)+$/)
}
