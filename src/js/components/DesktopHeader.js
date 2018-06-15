import React from 'react';
import PropTypes from 'prop-types';
import Container from 'js/components/grid/Container';
import Link from 'js/components/Link';
import cn from 'classnames';
import SearchInput from 'js/components/SearchInput';

export default class DesktopHeader extends React.Component {
	static defaultProps = {
		navItems: [],
		searchPlaceholder: ''
	};

	static propTypes = {
		navItems: PropTypes.array,
		searchPlaceholder: PropTypes.string
	};

	render() {
		const { searchPlaceholder, navItems } = this.props;

		return (
			<nav className={cn('desktop-header')}>
				<Container>
					<div className={'nav'}>{this.renderMenu(navItems)}</div>
					<SearchInput searchPlaceholder={searchPlaceholder} />
				</Container>
			</nav>
		);
	}

	renderMenu(navItems) {
		return (
			<ul>
				{navItems.map(({ url, title, ID: id, children }) => {
					return (
						<li key={id}>
							<Link to={url.replace(location.origin, '') || '/'}>{title.toUpperCase()}</Link>
							{children && this.renderMenu(children)}
						</li>
					);
				})}
			</ul>
		);
	}
}
