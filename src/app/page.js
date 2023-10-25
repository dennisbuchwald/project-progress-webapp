"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";

export default function Home() {
	const [projectNameQuery, setProjectNameQuery] = useState("");
	const [selectedProject, setSelectedProject] = useState(null);
	const [projects, setProjects] = useState([]);
	const [notFound, setNotFound] = useState(false); // Neuer State

	useEffect(() => {
		fetch("/projects.json")
			.then((response) => response.json())
			.then((data) => setProjects(data));
	}, []);

	const handleProjectSearch = () => {
		const project = projects.find(
			(p) => p.name.toLowerCase() === projectNameQuery.toLowerCase()
		);
		if (project) {
			setSelectedProject(project);
			setNotFound(false);
		} else {
			setNotFound(true);
			setSelectedProject(null);
		}
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		handleProjectSearch();
	};

	if (!selectedProject) {
		return (
			<main className={styles.main}>
				<h1 className={styles.headline}>Projektname eingeben:</h1>
				<form onSubmit={handleFormSubmit} className={styles.formContainer}>
					<section className={styles.inputS0ection}>
						<input
							className={styles.projectInput}
							value={projectNameQuery}
							onChange={(e) => setProjectNameQuery(e.target.value)}
						/>
						<div className={styles.tooltip}>
							?
							<span className={styles.tooltipText}>
								Geben Sie den genauen Projektnamen ein. Ohne Leerzeichen. Groß-
								und Kleinschreibung wird ignoriert.
							</span>
						</div>
					</section>
					<button className={styles.btn} type="submit">
						Projekt suchen
					</button>
				</form>

				{notFound && <p>Projekt nicht gefunden</p>}
			</main>
		);
	}

	return (
		<main className={styles.main}>
			<h1 lass={styles.headline}>{selectedProject.name}</h1>
			<div className={styles.progressContainer}>
				<div
					className={styles.progressBar}
					style={{ width: `${selectedProject.progress}%` }}
				>
					{selectedProject.progress}%
				</div>
			</div>
			<p>{selectedProject.phase}</p>
			<a href={selectedProject.link}>Link zum Projekt</a>
		</main>
	);
}
