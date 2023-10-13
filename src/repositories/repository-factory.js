// 動作モードlocal以外
import cafe from "./repository-cafe";
import cms from "./repository-cms";
import mypage from "./repository-mypage";
import orders from "./repository-orders";
import user from "./repository-user";
import menus from "./repository-menus";
import login from "./repository-login";
import search from "./repository-search";
import subsidy from "./repository-subsidy";
import file from "./repository-file";
import tcf from "./repository-tcf";

// 動作モードlocal
import mock_cafe from "./mock/repository-cafe";
import mock_cms from "./mock/repository-cms";
import mock_mypage from "./mock/repository-mypage";
import mock_orders from "./mock/repository-orders";
import mock_user from "./mock/repository-user";
import mock_menus from "./mock/repository-menus";
import mock_login from "./mock/repository-login";
import mock_search from "./mock/repository-search";
import mock_meta from "./mock/repository-meta";
import mock_subsidy from "./mock/repository-subsidy";
import mock_file from "./mock/repository-file";
import mock_tcf from "./repository-tcf";
import areaMock from "./mock/mockdata/areaMock";

import CONST_DATA from "@/mixins/const/constData";

// モード：mockかどうか
const mode = process.env.VUE_APP_DEV_MODE === CONST_DATA.ENV.LOCAL ? "mock" : "";

// 動作モードlocal以外
const repository = {
  cafe,
  cms,
  mypage,
  orders,
  user,
  menus,
  login,
  search,
  subsidy,
  file,
  tcf,
  areaMock
};

// 動作モードlocal
const mock_repository = {
  mock_cafe,
  mock_cms,
  mock_mypage,
  mock_orders,
  mock_user,
  mock_menus,
  mock_login,
  mock_search,
  mock_meta,
  mock_subsidy,
  mock_file,
  mock_tcf,
  areaMock
};

// 動作モードがlocalの場合はrepositoryの矛先を変更する
const repositories = mode === "mock" ? mock_repository : repository;

export const RepositoryFactory = {
  get: (name) => {
    const repositoryName = mode === "mock" ? `mock_${name}` : name;
    return (
      repositories[repositoryName] ||
      console.error(`${repositoryName} repository is not found.`)
    );
  }
};
