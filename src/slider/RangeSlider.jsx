import React from "react";
import Slider from "@mui/material/Slider";

const minDistance = 1;

export default function RangeSlider({ loop1, loop2, disabled, rangeChanged }) {
	const [value1, setValue1] = React.useState([loop1, loop2]);

	const handleChange1 = (
		event,
		newValue,
		activeThumb,
	) => {
		if (!Array.isArray(newValue)) {
			return;
		}

		if (activeThumb === 0) {
			setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
		} else {
			setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
		}

		rangeChanged(newValue);
	};

	const sliderStyle = { 
		"& .MuiSlider-thumb": {
			height: "15px",
			width: "15px",
		},
		"& .MuiSlider-track": {
			height: "3px",
		},
		"& .MuiSlider-rail": {
			height: "3px",
		},
	};

	return (
		<Slider sx={sliderStyle} size="small" min={0} max={60} defaultValue={60} 
			getAriaLabel={() => "Minimum distance"}
			value={[loop1, loop2]}
			disabled={disabled}
			onChange={handleChange1}
			disableSwap
		/>
	);
}