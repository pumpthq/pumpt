import React from 'react';

const VerticalScroller = (props) => {
    return (
                    <div className="container scroll-container">
                        <div className="scroll-container__inner">
                            { props.children }
                        </div>
                    </div>
    )
}

export default VerticalScroller
