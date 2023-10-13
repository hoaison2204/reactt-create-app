import LINK_LIST from '@/assets/data/link/index'
import CryptoJS from 'crypto-js';
import moment from "moment";

/**
 * 暗号化Key
 */
const EncryptionKey = "BPFLOGINd3=UzQz@";
/**
 * 暗号化初期ベクター
 */
const CryptographicInitialVector = "BPFLOGINTOBE-ONE";
/**
 * ハッシュ生成用キーワード
 */
const HashGenerationKeywords = "BPFLOGIN7qZEk32#";
/**
 * ハッシュ生成用ロジック名
 */
const HashGenerationLogicName = "v1.0.0";
/**
 * SSOリンク 先頭付与url
 */
const SSO_URL = "https://bopf.benefit-one.inc/bssso?mode=bssso&ssoTrnstTo=https://bs.benefit-one.co.jp/bs/pages/bo/sso/cl/bpflogin.faces&trnsttourl=";

/**
 * target: 'リンク先URL指定' data/link配下より特定
 */
export default ({$utils, $auth}, inject) => inject('postingLink', (target='') => {

  // PCとSPをユーザーエージェントで切り分ける
  const responsiveType = $utils.isSmartPhone()?'SP':'PC';

  // 遷移先URL情報取得
  const str = target.split('/');
  if(str.length <= 1) return LINK_LIST;

  // 遷移先リンク取得
  let text_link = (LINK_LIST[str[0]][str[1]].SSO ? SSO_URL : "") + LINK_LIST[str[0]][str[1]][responsiveType];

  return {
    title: LINK_LIST[str[0]][str[1]].title,
    url: text_link,
    target: LINK_LIST[str[0]][str[1]].target_brank ? '_blank' : '_self'
  };
})
