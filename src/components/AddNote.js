import React, { useState, useRef, useEffect } from "react";
import HandleClickOutside from "./HandleClickOutside";
import { useSpring, animated } from "react-spring";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import "./animation.css";
import nextId from "react-id-generator";

// var interval = 3000;

function AddNote(props) {
	const initialnote = { key: nextId(), title: "", content: "" };
	const [note, setNote] = useState(initialnote);

	const [isExpand, setIsExpand] = useState(false);
	const ref = useRef(null); // ref to form div

	const titleAnimation = useSpring({
		opacity: isExpand ? 1 : 0,
		height: isExpand ? "31px" : "0px",
		display: isExpand ? "block" : "none",

		from: {
			opacity: 0,
			height: "0px",
			display: "none",
		},
	});
	const noteAnimation = useSpring({
		height: isExpand ? "77px" : "31px",
		from: {
			height: "31px",
		},
	});

	function onChange(e) {
		// clearTimeout(MyTimeout);

		const { name, value } = e.target;
		console.log("name and value", name, value);
		setNote((prevNote) => {
			return { ...prevNote, [name]: value };
		});

		// MyTimeout = setTimeout(() => {
		// 	console.log("clear timeout 2");
		// 	setIsExpand(false);
		// }, 4000);
	}

	const onSubmit = (event) => {
		// const note = {title: e.target.}

		// setNote((prevNote) => {
		// 	const keyId = nextId() + 10;
		// 	console.log(keyId);
		// 	return { ...prevNote, key: keyId };
		// });
		console.log(note.key);
		props.addNoteHandler(note);
		setNote(initialnote);
		event.preventDefault();
	};

	function onClick() {
		console.log("on Clicked");

		setIsExpand(true);
		console.log("isExpand", isExpand);
	}

	function Collapse() {
		setIsExpand(false);
	}

	HandleClickOutside(ref, Collapse, isExpand);

	// Textarea auto expand

	function AutoResize() {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	}
	function setAutoResize() {
		const textarea = document.querySelector("#auto-resizing");
		textarea.addEventListener("input", AutoResize, false);
	}

	useEffect(() => {
		setAutoResize(); // eslint-disable-next-line
	}, []);

	return (
		<div className="for-form">
			<form
				ref={ref}
				onSubmit={onSubmit}
				className="create-note"
				style={noteAnimation}
			>
				<animated.input
					type="text"
					onChange={onChange}
					name="title"
					value={note.title}
					placeholder="Title"
					style={titleAnimation}
				/>

				<animated.textarea
					type="text"
					onChange={onChange}
					onClick={onClick}
					name="content"
					value={note.content}
					placeholder="Add note"
					style={noteAnimation}
					id="auto-resizing"
				/>

				<Zoom in={isExpand}>
					<Fab type="submit">
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

// const clickOutsideConfig = {
// 	handleClickOutside: () => AddNote.handleClickOutside,
// };

// export default onClickOutside(AddNote, clickOutsideConfig);
/* {isExpand && (
					<input
						type="text"
						onChange={onChange}
						name="title"
						value={note.title}
						placeholder="Title"
					/>
				)}
				<textarea
					type="text"
					onChange={onChange}
					onClick={onClick}
					name="content"
					value={note.content}
					placeholder="Add note"
					rows={isExpand ? 3 : 1}
					className={`${isExpand ? "animation" : ""} `}
				/>
				<Zoom in={isExpand}>
					<Fab type="submit">
						<AddIcon />
					</Fab>
				</Zoom>*/
export default AddNote;
