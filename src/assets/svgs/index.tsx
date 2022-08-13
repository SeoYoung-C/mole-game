import React from 'react';

import { ReactComponent as Bomb } from 'assets/svgs/bomb.svg';
import { ReactComponent as Mole } from 'assets/svgs/mole.svg';
import { ReactComponent as HoleBottom } from 'assets/svgs/hole-bottom.svg';
import { ReactComponent as HoleWave } from 'assets/svgs/hole-wave.svg';

type IconName = 'bomb' | 'mole' | 'holeBottom' | 'holeWave';

type Icons = {
	[key in IconName]: JSX.Element;
};

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
	name: IconName;
}

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
