import React from 'react';
import IconPrototype from './prototype';

class LoadingIcon extends IconPrototype {

    render() {
        return (
<svg className={'icon-loading'} width="80px"  height="80px"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="59.6" cy="50" fill="#ff7c81" r="18">
      <animate attributeName="cx" calcMode="linear" values="32;68;32" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
    </circle>
    <circle cx="40.4" cy="50" fill="#ffbd7f" r="18">
      <animate attributeName="cx" calcMode="linear" values="32;68;32" keyTimes="0;0.5;1" dur="1" begin="0s" repeatCount="indefinite"></animate>
    </circle>
    <circle cx="59.6" cy="50"  fill="#ff7c81" r="18">
      <animate attributeName="cx" calcMode="linear" values="32;68;32" keyTimes="0;0.5;1" dur="1" begin="-0.5s" repeatCount="indefinite"></animate>
      <animate attributeName="fill-opacity" values="0;0;1;1" calcMode="discrete" keyTimes="0;0.499;0.5;1" repeatCount="indefinite" dur="1s"></animate>
    </circle>
  </svg>
    );
    }
}

LoadingIcon.propTypes = {};
LoadingIcon.defaultProps = {};

export default LoadingIcon;
