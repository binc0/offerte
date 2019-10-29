/* global Selectr */

/**
 * Initialising global variables
 */
const ACTIVE_CLASS = 'visible';
const sort = {
 plibither8/feat/difficulty-sort-url-params
	ALPHABETICAL_ASC: (a, b) => a.dataset.name > b.dataset.name ? 1 : -1,
	ALPHABETICAL_DESC: (a, b) => a.dataset.name < b.dataset.name ? 1 : -1,
	DIFFICULTY_ASC: (a, b) => a.dataset.difficulty > b.dataset.difficulty ? 1 : -1,
	DIFFICULTY_DESC: (a, b) => a.dataset.difficulty < b.dataset.difficulty ? 1 : -1

	ALPHABETICAL_ASCENDING: (a, b) => a.dataset.name > b.dataset.name ? 1 : -1,
	ALPHABETICAL_DESCENDING: (a, b) => a.dataset.name < b.dataset.name ? 1 : -1,
	/* eslint-disable unicorn/no-nested-ternary */
	DIFFICULTY_ASCENDING: (a, b) => a.dataset.difficulty === b.dataset.difficulty ? (a.dataset.name > b.dataset.name ? 1 : -1) : a.dataset.difficulty > b.dataset.difficulty ? 1 : -1,
	DIFFICULTY_DESCENDING: (a, b) => a.dataset.difficulty === b.dataset.difficulty ? (a.dataset.name > b.dataset.name ? 1 : -1) : a.dataset.difficulty < b.dataset.difficulty ? 1 : -1,
	DATEADDED_ASCENDING: (a, b) => a.dataset.dateadded > b.dataset.dateadded ? 1 : -1,
	DATEADDED_DESCENDING: (a, b) => a.dataset.dateadded < b.dataset.dateadded ? 1 : -1
	/* eslint-enable unicorn/no-nested-ternary */
master
};

const contentEl = document.querySelector('#content');
const filterInput = document.querySelector('#filter');
const sortingInput = document.querySelector('#sorting');
const tagsSelect = document.querySelector('#tags');
const showExpired = document.querySelector('#expired');

const activateElements = els => Array.from(els).forEach(node => node.classList.add(ACTIVE_CLASS));
const allowDifficultySelect = shouldAllow => sortingInput.querySelectorAll('.difficulty')
	.forEach(node => {
		node.disabled = !shouldAllow;
	});

const parameters = {
	tags: {
		default: '',
		getValue: () => selectr.getValue().join(' '),
		setValue: value => selectr.setValue(value.split(' '))
	},
	difficulty: {
		default: 'all',
		getValue: () => filterInput.value,
		setValue: value => {
			filterInput.value = ['easy', 'medium', 'hard'].includes(value) ?
				value :
				'all';
		}
	},
	sort: {
		default: 'alphabetical',
		getValue: () => sortParams.sort.toLowerCase(),
		setValue: value => {
			sortParams.sort = ['alphabetical', 'difficulty'].includes(value) ?
				value.toUpperCase() :
				'ALPHABETICAL';
		}
	},
	order: {
		default: 'asc',
		getValue: () => sortParams.order.toLowerCase(),
		setValue: value => {
			sortParams.order = ['asc', 'desc'].includes(value) ?
				value.toUpperCase() :
				'ASC';
		}
	}
};

const sortParams = {
	sort: null,
	order: null
};

let search;
let selectr;

function updateUrl() {
	const newSearch = new URLSearchParams(window.location.search);
	for (const [paramName, paramObj] of Object.entries(parameters)) {
		const paramValue = paramObj.getValue();
		if (['', paramObj.default].includes(paramValue)) {
			newSearch.delete(paramName);
			continue;
		}
		newSearch.set(paramName, paramValue);
	}
	const newSearchString = newSearch.toString();
	let newRelativePathQuery = window.location.pathname;
	if (newSearchString) {
		newRelativePathQuery += `?${newSearchString}`;
	}
	history.pushState(null, '', newRelativePathQuery);
}

function handleDifficulty(difficultyChanged) {
	const {value} = filterInput;
	Array.from(contentEl.querySelectorAll(`.${ACTIVE_CLASS}`))
		.forEach(swag => swag.classList.remove(ACTIVE_CLASS));

	if (value === parameters.difficulty.default) {
		activateElements(contentEl.querySelectorAll('.item'));
		allowDifficultySelect(true);
	} else {
		activateElements(contentEl.querySelectorAll(`.${value}`));
		allowDifficultySelect(false);
	}

	if (difficultyChanged && sortingInput.selectedIndex > 1) {
		sortingInput.selectedIndex = 0;
		return true;
	}

	return false;
}

function handleSort() {
	Array.from(contentEl.children)
		.map(child => contentEl.removeChild(child))
		.sort(sort[sortingInput.value])
		.forEach(sortedChild => contentEl.append(sortedChild));
}

function handleTags() {
	const tags = selectr.getValue();

  plibither8/feat/difficulty-sort-url-params
	if (tags.length === 0) {
		return;
	}

  master
	Array.from(contentEl.querySelectorAll('.item')).forEach(el => {
		const show = (showExpired.checked || !el.classList.contains('tag-expired')) &&
			tags.reduce((sho, tag) => sho || el.classList.contains(`tag-${tag}`), tags.length === 0);
		if (!show) {
			el.classList.remove('visible');
		}
	});
 plibither8/feat/difficulty-sort-url-params
}

function handleSort() {
	if (!sortParams.sort || !sortParams.order) {
		if (!sortParams.sort) {
			sortParams.sort = sortingInput.value.split('_')[0];
		}
		if (!sortParams.order) {
			sortParams.order = sortingInput.value.split('_')[1];
		}
		sortingInput.value = [sortParams.sort, sortParams.order].join('_');
	}
	[sortParams.sort, sortParams.order] = sortingInput.value.split('_');
	Array.from(contentEl.children)
		.map(child => contentEl.removeChild(child))
		.sort(sort[sortingInput.value])
		.forEach(sortedChild => contentEl.appendChild(sortedChild));


	search.set('tags', tags.join(' '));

	search.set('expired', showExpired.checked || '');
}

function updateUrl() {
	let nextPath = window.location.pathname;

	const emptyParams = [];
	for (const [key, value] of search) {
		if (!value.trim()) {
			emptyParams.push(key);
		}
	}

	emptyParams.forEach(param => search.delete(param));

	const queryString = search.toString();
	if (queryString) {
		nextPath += `?${queryString}`;
	}

	history.pushState(null, '', nextPath);
 master
}

// The cascade is the function which handles calling filtering and sorting swag
function cascade(force = false) {
	force |= handleDifficulty(this === filterInput);
	if (force || this === sortingInput) {
		handleSort();
 plibither8/feat/difficulty-sort-url-params
	}
	if (!force) {
		updateUrl();

   master
	}

	handleTags();
	updateUrl();
}

window.addEventListener('load', () => {
	selectr = new Selectr('#tags', {
		multiple: true,
		searchable: false,
		placeholder: 'Choose tags...',
		data: window.swagTags.map(tag => ({value: tag, text: tag}))
	});
	selectr.on('selectr.init', () => tagsSelect.classList.remove('hidden'));

	if ('URLSearchParams' in window) {
		search = new URLSearchParams(window.location.search);
 plibither8/feat/difficulty-sort-url-params
		for (const [paramName, paramObj] of Object.entries(parameters)) {
			if (search.has(paramName)) {
				paramObj.setValue(search.get(paramName));
			}


		if (search.has('tags')) {
			selectr.setValue(search.get('tags').split(' '));
 master
		}

		showExpired.checked = search.get('expired') === 'true';
	}

	selectr.on('selectr.change', cascade);
	filterInput.addEventListener('input', cascade);
	sortingInput.addEventListener('input', cascade);
	showExpired.addEventListener('change', cascade);

	cascade.call(window, true);
});
