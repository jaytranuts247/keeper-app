import { useEffect } from "react";

function HandleClickOutside(ref, callback, when) {
	// const savedCallback = useRef(callback);
	// useEffect(() => {
	// 	savedCallback.current = callback;
	// });
	function handler(e) {
		if (ref.current && !ref.current.contains(e.target)) {
			// savedCallback.current();
			callback();
		}
	}
	useEffect(() => {
		if (when) {
			document.addEventListener("click", handler);
		}
		return () => document.removeEventListener("click", handler);
	}, [when]);
}

export default HandleClickOutside;
