import React, {Component, PropTypes} from 'react';

const propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.string,
        PropTypes.array
    ]),
    className: PropTypes.string,
    type: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([
            'base', 'revert'
        ])
    ]),
    imageMode: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf(['first', 'second'])
    ]),
    onboardingMode: PropTypes.bool,
    onboardingModeType: PropTypes.oneOf([
        'second', 'third', 'fourth', 'fifth', 'sixth', 'final'
    ])
};

const defaultProps = {};

export default class OnboardingWallpapers extends Component {
    makeClasses(initial) {
        const { className, type, imageMode, onboardingMode, onboardingModeType } = this.props

        const classes = [initial, className]

        if(type) classes.push('wall_type_' + type)
        if(imageMode) classes.push('wall_image_' + imageMode)
        if(onboardingMode) classes.push('wall_onboarding')
        if(onboardingModeType) classes.push('wall_onboarding_' + onboardingModeType)

        return classes.join(' ')
    }
    render() {
        return (
            <div className={this.makeClasses('wall')}>
                <div className="container">
                    <svg xmlns="http://www.w3.org/2000/svg" id="Layers" viewBox="0 0 1287.11 1169.22" className="icon icon-wall">
                        <path className="on-styled" id="_1" d="M669.58 562.11L390.82 793.79C306.9 863.54 330 998 432.31 1035.78l332.14 122.66c94.13 34.77 198-17.64 226-114l66.37-228.68a242.08 242.08 0 0 0-87.16-261.08 242.08 242.08 0 0 0-300.08 7.43z" data-name={1} style={{fill: '#5a83f5'}} />
                        <g className="on-styled" id="_2" data-name={2}>
                            <path d="M1194.6 253.42L801.17 17.75C730.72-24.45 639.43 12 617.43 91.12L533.5 392.93a151.87 151.87 0 0 0 45.89 154.62l52.28 46.08 37.92-31.51a242.08 242.08 0 0 1 300.05-7.43 241.88 241.88 0 0 1 88.92 132.56L1213.5 567c105.73-82.1 95.93-244.8-18.9-313.58z" style={{fill: '#f9475d'}} />
                            <path d="M631.67 593.62l138.25 121.86a190.28 190.28 0 0 0 242.49 7.57l46.14-35.81a241.88 241.88 0 0 0-88.92-132.56 242.08 242.08 0 0 0-300.05 7.43z" style={{fill: '#714df4', opacity: '0.6'}} />
                        </g>
                        <g className="on-styled" id="_3" data-name={3}>
                            <path d="M224.84 642.61l85-156.46c47.43-87.29 170.22-93.92 226.78-12.25l148.8 214.84c70 101.13-22.57 235.08-141.93 205.28L309.7 835.63c-84.59-21.12-126.48-116.41-84.86-193.02z" style={{fill: '#dc6ef5'}} />
                            <path d="M686 688.5l-61.62-89-233.79 194.34A141.46 141.46 0 0 0 351 846.22l192.7 48.13.76.18c53.21 13 101.48-7.11 131.95-41.63h.15c37.37-42.9 48.09-108.62 9.44-164.4z" style={{fill: '#8164dd'}} />
                        </g>
                        <g className="on-styled" id="_4" data-name={4}>
                            <path d="M247.71 436L231 167.63c-4.25-68.32 58.5-121.45 125.18-106l279.3 64.69c105 24.33 146.37 151.75 75.61 233.1l-156.9 180.44C451.54 657.89 257.41 592.07 247.71 436z" style={{fill: '#ffb302'}} />
                            <path d="M635.51 126.32l-26.19-6.07-75.82 272.68a151.86 151.86 0 0 0 29.12 137.25l148.51-170.76c70.76-81.35 29.42-208.77-75.62-233.1z" style={{fill: '#f45e4a', opacity: '0.5'}} />
                            <path d="M536.63 473.89c-56.56-81.67-179.35-75-226.78 12.25l-25.64 47.19c63.13 80 192.56 95.54 270 6.53l15.66-18z" style={{opacity: '0.5', fill: '#f74854'}} />
                        </g>
                        <g className="on-styled" id="_5" data-name={5}>
                            <path d="M231 167.63c-3.5-56.31 38.51-102.29 90.73-108.07a131.91 131.91 0 0 0-35.28-9.12l-96.3-11a132 132 0 0 0-121.1 52.51L26 150.09a132 132 0 0 0 2.27 160.22 132 132 0 0 0 133.62 47l79.82-18.5z" style={{fill: '#995aa8'}} />
                            <path d="M392.57 129.05a132 132 0 0 0-70.81-69.5c-52.22 5.78-94.23 51.76-90.73 108.07l10.64 171.23 65.4-15.16c80.35-18.62 124.15-105.53 91.32-181.2z" style={{fill: '#f95d45'}} />
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

OnboardingWallpapers.propTypes = propTypes;
OnboardingWallpapers.defaultProps = defaultProps;
