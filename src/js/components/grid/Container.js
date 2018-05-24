import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './Container.scss';

export default class Container extends React.Component {
	static defaultProps = {
		sizes: {
			xs: 12,
			sm: 12,
			md: 12,
			lg: 12,
			xl: 12
		},
		col: true
	};

	static propTypes = {
		sizes: PropTypes.object,
		className: PropTypes.string,
		col: PropTypes.bool
	};

	render() {
		const { className, children, sizes, col, ...rest } = this.props;
		const colClasses = Object.keys(sizes).map(size => `col-${size}-${sizes[size]}`);

		return (
			<div className={cn('container-fluid', 'container-component', className)}>
				<div className={'row'}>
					{col && (
						<div className={cn(colClasses)} {...rest}>
							{children}
						</div>
					)}
					{!col && children}
				</div>
			</div>
		);
	}
}