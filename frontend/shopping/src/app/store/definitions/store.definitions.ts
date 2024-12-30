import { ModuleData, ModuleStatus } from './module.definition';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

export interface ModuleEntity {
  data: ModuleData;
  status: ModuleStatus;
  isLoggedIn: boolean;
}

export interface ModuleEntityState extends EntityState<ModuleEntity> {
  selectedId: number | null;
}

const selectedCustomerId = (entity: ModuleEntity): number => {
  return entity.data.id;
};

export const moduleEntityAdapter: EntityAdapter<ModuleEntity> =
  createEntityAdapter<ModuleEntity>({
    selectId: selectedCustomerId,
  });
