import React from 'react';
import PropTypes from 'prop-types';
import Container from 'js/components/grid/Container';
import { withConsumer } from 'js/store/Store';
import './CaseStudyTile.scss';

class CaseStudyTile extends React.Component {
	static defaultProps = {
		title: 'Case Studies',
		caseStudies: []
	};

	static propTypes = {
		title: PropTypes.string,
		caseStudies: PropTypes.array
	};

	state = {
		caseStudyPages: []
	};

	componentDidMount() {
		const { pages, caseStudies } = this.props;

		let caseStudyPages = [];

		caseStudies.forEach(caseStudy => {
			caseStudyPages.push(pages.filter(page => page.link === caseStudy)[0]);
		});

		this.setState({ caseStudyPages });
	}

	render() {
		const { title } = this.props;
		const { caseStudyPages } = this.state;
		return (
			<div className={'case-study-tile'}>
				<Container>
					<h2 className={'title'}>{title}</h2>
				</Container>
				<div className={'case-studies'}>
					{caseStudyPages.map(({ img, excerpt }, i) => (
						<article className={'case-study'} key={i}>
							<img src={img} />
							<Container dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
						</article>
					))}
				</div>
			</div>
		);
	}
}

export default withConsumer(CaseStudyTile);
