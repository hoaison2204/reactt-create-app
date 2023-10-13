// ================================
// common
// ================================
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import Wovn from "@/components/Wovn";
import FooterLink from "@/components/FooterLink";
import ItemOrder from "@/components/ItemOrder";

// ================================
// form
// ================================
import FormsCheckbox from "@/components/forms/Checkbox";
import FormsSelect from "@/components/forms/Select";

// ================================
// mypage
// ================================
import MypageSideMenu from "@/components/mypage/SideMenu";
import MypageOutline from "@/components/mypage/Outline";
import MypageOutlineInfo from "@/components/mypage/OutlineInfo";
import SectionContentTitle from "@/components/sectionContent/SectionContentTitle";
import MemberInfoSectionContentTitle from "@/components/sectionContent/MemberInfoSectionContentTitle";

// ================================
// Orders
// ================================
import Share from "@/components/mypage/orders/Share";
import ApplicantInfor from "@/components/mypage/orders/ApplicantInfor";
import ApplicationDetails from "@/components/mypage/orders/ApplicationDetails";
import ApplicationDetailsShop from "@/components/mypage/orders/ApplicationDetailsShop";
import ApplicationDetailsIC from "@/components/mypage/orders/ApplicationDetailsIC";
import ApplicationDetailsGC from "@/components/mypage/orders/ApplicationDetailsGC";
import BoxViewMore from "@/components/mypage/orders/BoxViewMore";
import CardMenu from "@/components/mypage/orders/CardMenu";
import CardMenuIC from "@/components/mypage/orders/CardMenuIC";
import CardMenuGC from "@/components/mypage/orders/CardMenuGC";
import ShareDialog from "@/components/mypage/orders/ShareDialog";
import ItemTitle from "@/components/mypage/orders/ItemTitle";
import PaymentInfor from "@/components/mypage/orders/PaymentInfor";
import PaymentInforIC from "@/components/mypage/orders/PaymentInforIC";
import PaymentInforShop from "@/components/mypage/orders/PaymentInforShop";
import PaymentInforGC from "@/components/mypage/orders/PaymentInforGC";
import LotteryResult from "@/components/mypage/orders/LotteryResult";
import MypageOrderItem from "@/components/mypage/orders/MypageOrderItem";
import ShippingInfomation from "@/components/mypage/orders/ShippingInfomation";
import SenderInfomation from "@/components/mypage/orders/SenderInfomation";
import QuestionsFromShopDataGC from "@/components/mypage/orders/QuestionsFromShopDataGC";

// ================================
// coupon
// ================================
import CouponListBlock from "@/components/mypage/coupon/ListBlock";
import CouponDetailTop from "@/components/mypage/coupon/DetailTop";
import CouponMemberDetailTop from "@/components/mypage/coupon/MemberDetailTop";
import CouponTabs from "@/components/mypage/coupon/Tabs";
import CouponPassword from "@/components/mypage/coupon/Password";
import PastCouponListItem from "@/components/mypage/coupon/PastCouponListItem";


// ================================
// Menus
// ================================
import MenuBlock from "@/components/MenuBlock";
import MenusImageSlider from "@/components/menus/ImageSlider";
import MenusPhotoSlider from "@/components/menus/PhotoSlider";
import MenusSliderCarousel from "@/components/menus/SliderCarousel";
import MenusSlider from "@/components/menus/Slider";
import MenusPersonalInformationConsent from "@/components/menus/PersonalInformationConsent";

// ================================
// subscription
// ================================
import NetflixActive from "@/components/mypage/subscription/netflix_bandle/active"
import NetflixInActive from "@/components/mypage/subscription/netflix_bandle/inactive"
import NetflixKyutokuActive from "@/components/mypage/subscription/netflix-kyutoku/active"
import NetflixKyutokuInActive from "@/components/mypage/subscription/netflix-kyutoku/inactive"
import NetflixKyutokuActiveContinue from "@/components/mypage/subscription/activeContinue"
import Recovery from "@/components/mypage/subscription/recovery"
import Error from "@/components/mypage/subscription/error"
import Cancel from "@/components/mypage/subscription/cancel"
import ChangeMail from "@/components/mypage/subscription/changeMail"
import ChangeOptFlag from "@/components/mypage/subscription/changeOpt"
import Success from "@/components/mypage/subscription/success"

// ================================
// order
// ================================
import OrderStep from "@/components/order/Step";
// ================================
// components
// ================================
import Button from "@/components/Button";
import ButtonLink from "@/components/ButtonLink";
import TextButton from "@/components/TextButton";
import Modal from "@/components/Modal";
import Notify from "@/components/Notify";
import Thumbnail from "@/components/Thumbnail";
import Paginator from "@/components/Paginator";
import Icon from "@/components/Icon";
import UserMenus from "@/components/UserMenus";
import DrawerMenuSp from "@/components/DrawerMenuSp";
import Loading from "@/components/Loading";
import LoadingPage from "@/components/LoadingPage";
import LoadingContent from "@/components/LoadingContent";
import LoadingProcess from "@/components/LoadingProcess";
import SearchBlock from "@/components/SearchBlock";
import Tooltip from "@/components/Tooltip";
import Balloon from "@/components/Balloon";

// ================================
// modal
// ================================
import CommonModal from "@/components/CommonModal";
import AccountModal from "@/components/modal/Account";
import LoginGuidanceModal from "@/components/modal/LoginGuidance";
import FirstLoginModal from "@/components/modal/FirstLogin";
import ModalFrame from "@/components/modal/ModalFrame";

// ================================
// cms
// ================================
import CMS from "@/components/CMS";


// ================================
// development
// ================================
import Debug from "@/components/Debug";
// demo用
import DemoCmsString from "@/components/demo/CmsString";

// ================================
// plugin
// ================================
import VueQRCodeComponent from "vue-qrcode-component";

import Vue from "vue";

// ================================
// common
// ================================
Vue.component("Header", Header);
Vue.component("Footer", Footer);
Vue.component("PageHeader", PageHeader);
Vue.component("Wovn", Wovn);
Vue.component("FooterLink", FooterLink);

// ================================
// form
// ================================
Vue.component("FormsCheckbox", FormsCheckbox);
Vue.component("FormsSelect", FormsSelect);

// ================================
// mypage
// ================================
Vue.component("MypageSideMenu", MypageSideMenu);
Vue.component("MypageOutline", MypageOutline);
Vue.component("MypageOutlineInfo", MypageOutlineInfo);
Vue.component("SectionContentTitle", SectionContentTitle);
Vue.component("MemberInfoSectionContentTitle", MemberInfoSectionContentTitle);
Vue.component("ItemOrder", ItemOrder);

// ================================
// Orders
// ================================
Vue.component("Share", Share);
Vue.component("ApplicantInfor", ApplicantInfor);
Vue.component("ApplicationDetails", ApplicationDetails);
Vue.component("ApplicationDetailsShop", ApplicationDetailsShop);
Vue.component("ApplicationDetailsIC", ApplicationDetailsIC);
Vue.component("ApplicationDetailsGC", ApplicationDetailsGC);
Vue.component("BoxViewMore", BoxViewMore);
Vue.component("CardMenu", CardMenu);
Vue.component("CardMenuIC", CardMenuIC);
Vue.component("CardMenuGC", CardMenuGC);
Vue.component("ShareDialog", ShareDialog);
Vue.component("ItemTitle", ItemTitle);
Vue.component("PaymentInfor", PaymentInfor);
Vue.component("PaymentInforIC", PaymentInforIC);
Vue.component("PaymentInforShop", PaymentInforShop);
Vue.component("PaymentInforGC",PaymentInforGC);
Vue.component("LotteryResult", LotteryResult);
Vue.component("MypageOrderItem", MypageOrderItem);
Vue.component("ShippingInfomation", ShippingInfomation);
Vue.component("SenderInfomation", SenderInfomation);
Vue.component("QuestionsFromShopDataGC",QuestionsFromShopDataGC);

// ================================
// coupon
// ================================
Vue.component("CouponListBlock", CouponListBlock);
Vue.component("CouponDetailTop", CouponDetailTop);
Vue.component("CouponMemberDetailTop", CouponMemberDetailTop);
Vue.component("CouponTabs", CouponTabs);
Vue.component("CouponPassword", CouponPassword);
Vue.component("PastCouponListItem", PastCouponListItem);

// ================================
// Menus
// ================================
Vue.component("MenuBlock", MenuBlock);
Vue.component("MenusImageSlider", MenusImageSlider);
Vue.component("MenusPhotoSlider", MenusPhotoSlider);
Vue.component("MenusSliderCarousel", MenusSliderCarousel);
Vue.component("MenusSlider", MenusSlider);
Vue.component(
  "MenusPersonalInformationConsent",
  MenusPersonalInformationConsent
);

// ================================
// subscription
// ================================
Vue.component("NetflixActive", NetflixActive);
Vue.component("NetflixInActive", NetflixInActive);
Vue.component("NetflixKyutokuActive", NetflixKyutokuActive);
Vue.component("NetflixKyutokuInActive", NetflixKyutokuInActive);
Vue.component("NetflixKyutokuActiveContinue", NetflixKyutokuActiveContinue);
Vue.component("SubscriptionRecovery", Recovery);
Vue.component("SubscriptionError", Error);
Vue.component("SubscriptionCancel", Cancel);
Vue.component("ChangeMail", ChangeMail);
Vue.component("ChangeOptFlag", ChangeOptFlag);
Vue.component("Success", Success);

// ================================
// order
// ================================
Vue.component("OrderStep", OrderStep);


// ================================
// components
// ================================
Vue.component("Button", Button);
Vue.component("ButtonLink", ButtonLink);
Vue.component("TextButton", TextButton);
Vue.component("Modal", Modal);
Vue.component("Notify", Notify);
Vue.component("Thumbnail", Thumbnail);
Vue.component("Paginator", Paginator);
Vue.component("Icon", Icon);
Vue.component("UserMenus", UserMenus);
Vue.component("DrawerMenuSp", DrawerMenuSp);
Vue.component("Loading", Loading);
Vue.component("LoadingPage", LoadingPage);
Vue.component("LoadingContent", LoadingContent);
Vue.component("LoadingProcess", LoadingProcess);
Vue.component("SearchBlock", SearchBlock);
Vue.component("Tooltip", Tooltip);
Vue.component("Balloon", Balloon);

// ================================
// modal
// ================================
Vue.component("CommonModal", CommonModal);
Vue.component("AccountModal", AccountModal);
Vue.component("LoginGuidanceModal", LoginGuidanceModal);
Vue.component("FirstLoginModal", FirstLoginModal);
Vue.component("ModalFrame", ModalFrame);

// ================================
// cms
// ================================
Vue.component("CMS", CMS);

// ================================
// development
// ================================
Vue.component("Debug", Debug);
// demo用
Vue.component("DemoCmsString", DemoCmsString);

// ================================
// plugin
// ================================
Vue.component("VueQRCodeComponent", VueQRCodeComponent);
