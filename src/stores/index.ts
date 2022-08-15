import create, { GetState, SetState, StoreApi } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

import { ReadySlice } from './ready/slice';
import { PlaySlice } from './play/slice';

import type { ReadyStateSlice } from './ready/interface';
import type { PlayStateSlice } from './play/interface';

type Store = ReadyStateSlice & PlayStateSlice;

const UseStore = create<Store>(
	devtools(
		persist(
			(set, get, api) => ({
				...ReadySlice(
					set as unknown as SetState<ReadyStateSlice>,
					get as GetState<ReadyStateSlice>,
					api as StoreApi<ReadyStateSlice>
				),
				...PlaySlice(
					set as unknown as SetState<PlayStateSlice>,
					get as GetState<PlayStateSlice>,
					api as StoreApi<PlayStateSlice>
				)
			}),
			{
				name: 'store'
			}
		)
	)
);

export default UseStore;
