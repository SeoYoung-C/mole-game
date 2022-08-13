import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import { ReadyStore } from './ready/initial';

import type { ReadyStateStore } from './ready/interface';

type Store = ReadyStateStore;

const useStore = create<Store>(
	devtools(
		persist(
			(set, get, api) => ({
				...ReadyStore(
					set as unknown as SetState<ReadyStateStore>,
					get as GetState<ReadyStateStore>,
					api as StoreApi<ReadyStateStore>
				)
			}),
			{
				name: 'store'
			}
		)
	)
);

export default useStore;
