import React from 'react';

import { ReactComponent as Bomb } from './svgs/bomb.svg';
import { ReactComponent as Mole } from './svgs/mole.svg';
import { ReactComponent as HoleBottom } from './svgs/hole-bottom.svg';
import { ReactComponent as HoleWave } from './svgs/hole-wave.svg';

import { IconProps, Icons } from './interface';

const Icon = (props: IconProps) => {
	const { name, ...left } = props;

	const ICONS: Icons = {
		bomb: <Bomb {...left} />,
		mole: <Mole {...left} />,
		holeBottom: <HoleBottom {...left} />,
		holeWave: <HoleWave {...left} />
	};

	const getIcon = (type: string) => {
		let comp = <Mole />;

		const found = Object.entries(ICONS).find(([k]) => k.toLowerCase() === type.toLowerCase());
		if (found) {
			[, comp] = found;
		}

		return comp;
	};

	return getIcon(name);
};

export default Icon;

Icon.defaultProps = {
	className: ''
};
