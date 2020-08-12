import React from 'react';
import {render} from 'react-dom';

// Constrct once, use it anytime
class Panel extends React.Component {
    state = {
        active: false
    }

    // Tip: $r.open() in console can invoke the method
    open = () => {
        this.setState({
            active: true
        })
    };

    close = () => {
        this.setState({
            active: false
        });
    }
    render() {
        const _class = {
            true: 'panel-wrapper active',
            false: 'panel-wrapper'
        }
        return (
            // Entire page
            <div className={_class[this.state.active]}>
                {/* gray out area in the left */}
                {/* close panel when click on gray out area */}
                <div className="over-layer" onClick={this.close}></div>

                {/* pop up panel */}
                <div className="panel">
                    <div className="head">
                        <span className="close" onClick={this.close}>x</span>
                        <p className="has-text-centered">Child Compoenent</p>
                    </div>
                </div>
            </div>
        )
    }
}
// lesson 25
// 页面加载的时候就创建element，被 append 到 root element 下面的 div
const _div = document.createElement('div');
document.body.append(_div);

const _panel = render(<Panel />, _div);
export default _panel;