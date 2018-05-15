import React from 'react';
import PropTypes from 'prop-types';
import './Banner.scss';
import { themedir } from 'js/config';
import Container from 'js/components/grid/Container';
import Grid from 'js/util/Grid';
import cn from 'classnames';

export default class Banner extends React.Component {
	static defaultProps = {
		backgroundImage: {
			xs: themedir + '/img/banner.jpg',
			sm: themedir + '/img/banner.jpg',
			md: themedir + '/img/banner.jpg',
			lg: themedir + '/img/banner.jpg',
			xl: themedir + '/img/banner.jpg'
		},
		titleContent: 'Comprehensive diagnosis and treatment of all arterial and venous disorders',
		short: false
	};

	static propTypes = {
		backgroundImage: PropTypes.object,
		titleContent: PropTypes.string,
		short: PropTypes.bool
	};

	grid;
	state = {
		backgroundImage: this.props.backgroundImage.xs
	};

	componentDidMount() {
		const { backgroundImage, short } = this.props;

		if (short) return;

		this.grid = new Grid();
		this.grid.register('xs', 'on', () => {
			this.setState({ backgroundImage: backgroundImage.xs });
		});
		this.grid.register('sm', 'on', () => {
			this.setState({ backgroundImage: backgroundImage.sm });
		});
		this.grid.register('md', 'on', () => {
			this.setState({ backgroundImage: backgroundImage.md });
		});
		this.grid.register('lg', 'on', () => {
			this.setState({ backgroundImage: backgroundImage.lg });
		});
		this.grid.register('xl', 'on', () => {
			this.setState({ backgroundImage: backgroundImage.xl });
		});
		this.grid.exec();
	}

	componentWillUnmount() {
		const { short } = this.props;
		if (short) return;

		this.grid.destroy();
		this.grid = undefined;
	}

	render() {
		const { titleContent, short, overlap } = this.props;
		const { backgroundImage } = this.state;

		return (
			<section className={cn('banner', { short, overlap })} style={{ backgroundImage: `url(${backgroundImage})` }}>
				<Container>
					<div className={'inner-banner'}>
						<h2 className={'banner-title'}>
							<span className={'inner-content'}>{titleContent}</span>
						</h2>
						{this.props.children}
					</div>
				</Container>
			</section>
		);
	}
}
