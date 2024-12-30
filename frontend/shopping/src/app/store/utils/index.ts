import cloneDeep from 'lodash.clonedeep';
import { ModuleData } from '../definitions/module.definition';
import { ModuleEntityState } from '../definitions/store.definitions';

export function getData(state: ModuleEntityState): ModuleData {
  const data: ModuleData = cloneDeep(
    state.entities[state.selectedId || 0]!.data
  );
  return data;
}
