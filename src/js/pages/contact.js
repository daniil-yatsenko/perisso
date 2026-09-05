// Contact page: pre-selects the "intent" field from the URL query string.
// e.g. /contact?intent=demo -> #intent gets the option with value "demo".

const getIntentParam = (data) => {
	// Barba parses the next URL's query string into an object on data.next.url.query.
	const fromBarba = data?.next?.url?.query?.intent;
	if (fromBarba) return decodeURIComponent(fromBarba);

	// Fallback for direct loads / anything Barba didn't parse.
	return new URLSearchParams(window.location.search).get("intent");
};

const contactInit = (page = document, data = null) => {
	const intent = getIntentParam(data);
	if (!intent) return;

	const field = page.querySelector("#intent");
	if (!field) return;

	if (field.tagName === "SELECT") {
		const option = Array.from(field.options).find((o) => o.value === intent);
		if (!option) return;
		field.value = option.value;
	} else {
		// Plain <input> (or a custom dropdown backed by an input): set the value directly.
		field.value = intent;
	}

	// Let any listeners (form libs, custom dropdown UI) react to the change.
	field.dispatchEvent(new Event("input", { bubbles: true }));
	field.dispatchEvent(new Event("change", { bubbles: true }));
};

export { contactInit };
