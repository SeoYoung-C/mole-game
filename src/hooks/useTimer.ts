import { useState, useEffect, useRef, useCallback } from 'react';

type intervalRefType = NodeJS.Timeout | null;

interface UseTimerHooks {
	time: number;
	start: () => void;
	end: () => void;
	pouse: () => void;
}

const useTimer = (initial: number, ms: number, callBackFunc?: () => void): UseTimerHooks => {
	const [time, setTime] = useState<number>(initial);
	const intervalRef = useRef<intervalRefType>(null);

	const start = useCallback(() => {
		if (intervalRef.current !== null) {
			return;
		}
		intervalRef.current = setInterval(() => {
			callBackFunc?.();
			setTime(prev => prev - 1);
		}, ms);
	}, [callBackFunc, ms]);

	const end = useCallback(() => {
		if (intervalRef.current === null) {
			return;
		}
		clearInterval(intervalRef.current);
		intervalRef.current = null;
		setTime(initial);
	}, [initial]);

	const pouse = useCallback(() => {
		if (intervalRef.current === null) {
			return;
		}
		clearInterval(intervalRef.current);
		intervalRef.current = null;
	}, []);

	useEffect(() => {
		return () => {
			end();
		};
	}, [end]);

	return { time, start, end, pouse };
};

export default useTimer;
