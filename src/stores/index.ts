import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { ReadyStore } from './ready/initial';
import { PlayStore } from './play/initial';

import type { ReadyStateStore } from './ready/interface';
import type { PlayStateStore } from './play/interface';

type Store = ReadyStateStore & PlayStateStore;

const useStore = create<Store>(
	devtools(
		persist(
			(set, get, api) => ({
				...ReadyStore(
					set as unknown as SetState<ReadyStateStore>,
					get as GetState<ReadyStateStore>,
					api as StoreApi<ReadyStateStore>
				),
				...PlayStore(
					set as unknown as SetState<PlayStateStore>,
					get as GetState<PlayStateStore>,
					api as StoreApi<PlayStateStore>
				)
			}),
			{
				name: 'store'
			}
		)
	)
);

export default useStore;
