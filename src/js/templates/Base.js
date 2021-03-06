import React from 'react';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Header from 'js/components/Header';
import Footer from 'js/components/Footer';
import MobileNav from 'js/components/MobileNav';
import { withConsumer } from 'js/store/Store';
import stripHtmlTags from 'js/util/stripHtmlTags';
import cn from 'classnames';
import PropTypes from 'prop-types';

const searchPage = {
	title: {
		rendered: 'Search'
	},
	excerpt: {
		rendered: 'Search Page'
	}
};

class Base extends React.Component {
	static propTypes = {
		mobileNavOpen: PropTypes.func
	};

	state = {
		mobileMenu: false,
		page: undefined,
		mobileMode: undefined
	};

	onClick = val => {
		this.setState({ mobileMenu: val });
		this.props.mobileNavOpen(val);
	};

	changedSize = val => {
		this.setState({ mobileMode: val });
	};

	onLocationChange = () => {
		const { pages } = this.props;
		let page;
		if (location.pathname === '/search/') {
			page = searchPage;
		} else {
			page = pages.find(page => page.link === location.href);
		}
		this.setState({ page, mobileMenu: false });
		window.scrollTo(0, 0);
	};

	componentDidMount() {
		const { history } = this.props;
		history.listen(this.onLocationChange);
		this.onLocationChange();
	}

	render() {
		const { children, primaryNavigation, header, footer } = this.props;
		const { page, mobileMenu, mobileMode } = this.state;
		return (
			<>
				{page && (
					<Helmet>
						<title>{page.title.rendered}</title>
						<meta name="description" content={stripHtmlTags(page.excerpt.rendered)} />
					</Helmet>
				)}
				{this.state.mobileMode && (
					<MobileNav visible={mobileMenu} navItems={primaryNavigation} closeMenu={this.onClick} />
				)}
				<Header
					changedSize={this.changedSize}
					title={CONFIG.SITE_NAME.toUpperCase().split(' ')}
					showMobileMenu={this.onClick}
					navItems={primaryNavigation}
					{...header}
				/>
				<div className={cn('content-wrapper', { 'nav-open': mobileMenu && mobileMode })}>{children}</div>
				<Footer {...footer} />
			</>
		);
	}
}

export default withRouter(withConsumer(Base));
