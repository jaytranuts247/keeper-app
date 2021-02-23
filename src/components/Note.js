import React, { useState, useRef, useEffect } from "react";
// import { useTransition, useSpring, animated } from "react-spring";
import DeleteIcon from "@material-ui/icons/Delete";
import SendIcon from "@material-ui/icons/Send";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";

function Note(props) {
	const initialNote = {
		id: "",
		title: "",
		content: "",
	};
	const [IsEdit, setIsEdit] = useState(false);
	// const [Zindex, setZindex] = useState({ zIndex: "1" });
	// const [isDelete, setIsDelete] = useState(false);

	const [note, setNote] = useState(initialNote);

	function AutoResize() {
		this.style.height = "auto";
		this.style.height = this.scrollHeight + "px";
	}
	function setAutoResize() {
		const textarea1 = document.querySelector("#auto-resizing1");
		console.log(textarea1);
		textarea1.addEventListener("input", AutoResize, false);
	}

	useEffect(() => {
		const updateNote = {
			id: props.id,
			title: props.title,
			content: props.content,
		};
		setNote(updateNote);
		if (IsEdit) setAutoResize();
	}, []);

	function onDelete(e) {
		// setIsDelete(true);
		console.log("Delete iTem");
		props.deleteNote(props.id);

		e.preventDefault();
	}

	function onChange(e) {
		const { name, value } = e.target;
		setNote((prevNote) => {
			return { ...prevNote, [name]: value };
		});
	}

	const onEdit = () => {
		return (
			<div className="note">
				<input
					type="text"
					name="title"
					value={note.title}
					onChange={onChange}
				/>
				<textarea
					id="auto-resizing1"
					type="text"
					name="content"
					value={note.content}
					onChange={onChange}
				/>
				<button
					onClick={() => {
						props.onEditNote(props.id, note);
						setIsEdit(false);
					}}
				>
					<SendIcon />
				</button>
				<button onClick={() => setIsEdit(false)}>
					<CloseIcon />
				</button>
			</div>
		);
	};

	const onShow = () => {
		return (
			<div className="note">
				<h1>{props.title}</h1>
				<p>{props.content}</p>
				<button onClick={onDelete}>
					<DeleteIcon />
				</button>
				<button onClick={() => setIsEdit(true)}>
					<EditIcon />
				</button>
			</div>
		);
	};

	return IsEdit ? onEdit() : onShow();
}
/*
<animated.div className="note" style={DeleteAnimation}>
	<h1>{props.title}</h1>
	<p>{props.content}</p>
	<button onClick={onDelete}>
		<DeleteIcon />
	</button>
	<button onClick={() => setIsEdit(true)}>
		<EditIcon />
	</button>
</animated.div>;
*/
// {
// 	fadingTextPropsTransition.map(({ item, props, key }) => (
// 		<animated.div key={key} style={{ ...props, position: "absolute" }}>
// 			<p className={s.Carousel__Title}>{item.title}</p>
// 		</animated.div>
// 	));
// }

// fadeOutPropsTransition.map(({ note, styleprops, key }) => (
// 			<animated.div className="note" key={key} style={{ styleprops }}>
// 				<h1>{props.title}</h1>
// 				<p>{props.content}</p>
// 				<button onClick={onDelete}>
// 					<DeleteIcon />
// 				</button>
// 				<button onClick={() => setIsEdit(true)}>
// 					<EditIcon />
// 				</button>
// 			</animated.div>
// 		))
export default Note;
