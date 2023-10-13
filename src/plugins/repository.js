import { RepositoryFactory } from '@/repositories/repository-factory';

export default (_, inject) => {
  const repositories = (name) => {
    return RepositoryFactory.get(name);
  };
  inject('repositories', repositories);
};