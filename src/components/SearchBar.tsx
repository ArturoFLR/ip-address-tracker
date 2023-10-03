import { useState } from "react";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
	handleNewSearch: (searchParam: string, searchParamType: string) => void
}

const SearchBar = ( {handleNewSearch}: SearchBarProps) => {

	const [error, setError] = useState(false);

	function validateNewSearchParam () {
		const inputELement = document.getElementById("searchInput") as HTMLInputElement;
		const searchParam = inputELement.value;

		const regexIP = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
		const regexDomain = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;
		const ipParamValidated = regexIP.test(searchParam);
		const domainParamValidated = regexDomain.test(searchParam);
		
		if (ipParamValidated) {
			animateSearchText(inputELement.value);
			inputELement.value = "";
			handleNewSearch(searchParam, "ipAddress");
			setError(false);
		}else if (domainParamValidated) {
			animateSearchText(inputELement.value);
			inputELement.value = "";
			handleNewSearch(searchParam, "domain");
			setError(false);
		}else {
			setError(true);
		}
	}

	function handleEnterKeyPress (event: React.KeyboardEvent<HTMLInputElement>): void {
		if (event.key === "Enter") {
			validateNewSearchParam();
		}
		
	}

	function animateSearchText (animatedText: string) {
		const animatedParagraph = document.getElementById("animatedSearchText") as HTMLParagraphElement;
		animatedParagraph.innerText = animatedText;
		animatedParagraph.classList.add(styles.searchTextCopyAnimated);
		setTimeout( () => {
			animatedParagraph.classList.remove(styles.searchTextCopyAnimated);
		}, 1000);
	}

	return (
		<div className={styles.mainContainer}>
			<input type="text" placeholder="Search by IP or domain" id="searchInput" onKeyDown={handleEnterKeyPress}></input>
			<button type="button" onClick={validateNewSearchParam}>
				<img alt="" src="icon/icon-arrow.svg"></img>
			</button>
			<p className={ error ? `${styles.errorMessage} ${styles.showErrorMessage}` : `${styles.errorMessage}`} >Enter a valid IP or Domain!</p>
			<p className={styles.searchTextCopy} id="animatedSearchText" ></p>
		</div>
	);
};

export default SearchBar;
