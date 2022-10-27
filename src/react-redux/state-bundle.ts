import { produce } from 'immer';
import type { SubReducer } from '.';

// 更新全局数据
export const updateGlobals: SubReducer<AnyObject> = (state, payload) =>
  produce(state, (draft) => {
    draft.global = payload;
  });
