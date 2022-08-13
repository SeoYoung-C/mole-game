type IconName = 'bomb' | 'mole' | 'holeBottom' | 'holeWave';

export type Icons = {
	[key in IconName]: JSX.Element;
};

export interface IconProps extends React.ComponentPropsWithoutRef<'svg'> {
	name: IconName;
}
