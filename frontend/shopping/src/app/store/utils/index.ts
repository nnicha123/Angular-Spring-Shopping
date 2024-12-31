import cloneDeep from 'lodash.clonedeep';
import { ModuleData } from '../definitions/module.definition';
import { ModuleEntityState } from '../definitions/store.definitions';
import { Product } from '../../models/product';

export function getData(state: ModuleEntityState): ModuleData {
  const data: ModuleData = cloneDeep(
    state.entities[state.selectedId || 0]!.data
  );
  return data;
}

export function getProducts(state: ModuleEntityState): Product[] {
  const products: Product[] =
    cloneDeep(state.entities[state.selectedId || 0]?.products) || [];
  return products;
}
