import auth from "./auth";
import axios from "./axios";
import config from "./config";
import html2canvas from "./html2canvas";
import moment from "./moment";
import page from "./page";
import points from "./points";
import pref from "./pref";
import colors from "./colors";
import icon from "./icon";
import category from "./category";
import log from "./log";
import meta from "./meta";
import demo from "./demo";
import utils from "./utils";
import enums from "./enums";
import vueScrollto from "./vue-scrollto";
import repository from "./repository";
import zipcode from "./zipcode";
import modal from "./modal";
import maps from "./maps";
import copy from "./copy";
import postingLink from "./postingLink";
import dynamicJs from "./dynamicJs";
import mypage from "./mypage";
import orders from "./orders";
import mapIcons from "./mapIcons";
import error from "./error";
import notify from "./notify";
import loading from "./loading";
import categories from "./categories";
import menuIcons from "./menuIcons";
import wovn from "./wovn";

Number.prototype.format = function() {
  return new Intl.NumberFormat().format(this);
};

export default [
  auth,
  axios,
  config,
  html2canvas,
  moment,
  page,
  points,
  pref,
  colors,
  icon,
  category,
  log,
  meta,
  demo,
  utils,
  enums,
  vueScrollto,
  repository,
  zipcode,
  modal,
  maps,
  copy,
  postingLink,
  dynamicJs,
  mypage,
  orders,
  mapIcons,
  error,
  notify,
  loading,
  categories,
  menuIcons,
  wovn
];
