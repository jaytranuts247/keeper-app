import React, { useState } from "react";
// import Masonry from "react-masonry-component";
import { XMasonry, XBlock } from "react-xmasonry";
// import { useSpring, animated } from "react-spring";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Note from "./components/Note";
import InitialNotes from "./components/notes";
import AddNote from "./components/AddNote";

/*
	- Add animation when expand and collapse Note 
	- add XMasonry layout for note
	- add animation for note when added and show up 
*/

function App() {
	const [notes, setNotes] = useState(InitialNotes);
	// const [isDelete, setIsDelete] = useState(false);

	function addNoteHandler(note) {
		setNotes((prevNotes) => {
			return [...prevNotes, note];
		});
	}

	function onEditNote(idx, toUpdateNote) {
		const newNotes = [...notes];
		newNotes[idx] = toUpdateNote;
		setNotes(newNotes);
	}
	function deleteNote(id) {
		setNotes((notes) =>
			notes.filter((note, idx) => {
				return note.key !== id;
			})
		);
	}

	return (
		<div className="App">
			<Header />
			<AddNote addNoteHandler={addNoteHandler} />
			<div className="container">
				<XMasonry>
					{notes.map((note, index) => {
						return (
							<XBlock key={note.key}>
								<Note
									id={note.key}
									title={note.title}
									content={note.content}
									deleteNote={deleteNote}
									onEditNote={onEditNote}
								/>
							</XBlock>
						);
					})}
				</XMasonry>
			</div>

			<Footer />
		</div>
	);
}
/*
<XMasonry>
				{notes.map((note, index) => {
					return (
						<XBlock key={note.key}>
							<Note
								id={note.key}
								title={note.title}
								content={note.content}
								deleteNote={deleteNote}
								onEditNote={onEditNote}
							/>
						</XBlock>
					);
				})}
			</XMasonry>

			*/
/*
<Transition
					items={notes}
					keys={(note) => note.key}
					from={{ opacity: 0 }}
					enter={{ opacity: 1 }}
					leave={{ opacity: 0 }}
				>
					{(note) => (styles) => (
						<animated.div styles={styles}>
							<Note
								id={note.key}
								key={note.key}
								title={note.title}
								content={note.content}
								deleteNote={deleteNote}
								onEditNote={onEditNote}
							/>
						</animated.div>
					)}
				</Transition>
*/
/*
<XMasonry>
					<Transition
						items={notes}
						keys={(note) => note.key}
						from={{ opacity: 0 }}
						enter={{ opacity: 1 }}
						leave={{ opacity: 0 }}
					>
						{(note) => (styles) => (
							<animated.div styles={styles}>
								<XBlock>
									<Note
										id={note.key}
										key={note.key}
										title={note.title}
										content={note.content}
										deleteNote={deleteNote}
										onEditNote={onEditNote}
									/>
								</XBlock>
							</animated.div>
						)}
					</Transition>
				</XMasonry>
*/
export default App;
