export const flexAlignment = {
	center: "center",
	top: "flex-start",
	bottom: "flex-end"
};

export const flexOrientation = {
	horizontal: ["column", null, null, "row"],
	vertical: "column",
};

export const flexDirectionToBorder = (bt, bb, br, bl) => {
	bt ??= "none";
	bb ??= "none";
	br ??= "none";
	bl ??= "none";
	let borderMapping = {
		horizontal: {
			left: [bb, null, null, bl],
			right: [bt, null, null, br],
			top: [bl, null, null, bt],
			bottom: [br, null, null, bb]
		},
		vertical: {
			left: [bl],
			right: [br],
			top: [bt],
			bottom: [bb]
		}
	};
	return borderMapping;
};

export const flexDirectionToPadding = (pt, pb, pr, pl) => {
	pt ??= 0;
	pb ??= 0;
	pr ??= 0;
	pl ??= 0;
	let paddingMapping = {
		horizontal: {
			left: [pb, null, null, pl],
			right: [pt, null, null, pr],
			top: [pl, null, null, pt],
			bottom: [pr, null, null, pb]
		},
		vertical: {
			left: [pl],
			right: [pr],
			top: [pt],
			bottom: [pb]
		}
	};
	return paddingMapping;
}