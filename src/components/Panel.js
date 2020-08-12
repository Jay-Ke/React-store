import React from "react";
import { render } from "react-dom";

// Constrct once, use it anytime
class Panel extends React.Component {
	state = {
		active: false,
        component: null,
        callback: () => {}
	};

	// Tip: $r.open() in console can invoke the method
	open = (options) => {
        const { component, callback } = options;
        const _key = new Date().getTime()
        // Since component is passed in as a constructor, need to transform into component
        // Set unique key to re-render the component everytime it get loaded.
        const _component = React.createElement(component, {close: this.close, key: _key});
		this.setState({
			active: true,
            component: _component,
            callback: callback
		});
	};

	close = (data) => {
        // alert(data);
		this.setState({
			active: false,
        });
        this.state.callback(data);
	};
	render() {
		const _class = {
			true: "panel-wrapper active",
			false: "panel-wrapper",
		};
		return (
			// Entire page
			<div className={_class[this.state.active]}>
				{/* gray out area in the left */}
				{/* close panel when click on gray out area */}
				<div className="over-layer" onClick={this.close}></div>

				{/* pop up panel */}
				<div className="panel">
					<div className="head">
						<span className="close" onClick={this.close}>
							x
						</span>
						{/* <p className="has-text-centered">Child Compoenent</p> */}
						{this.state.component}
					</div>
				</div>
			</div>
		);
	}
}
// lesson 25
// 页面加载的时候就创建element，被 append 到 root element 下面的 div
const _div = document.createElement("div");
document.body.append(_div);

const _panel = render(<Panel />, _div);
export default _panel;
