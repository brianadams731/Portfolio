import Head from 'next/head';
import { Skills } from '../components/Skills';
import { Title } from '../components/Title';
import styles from '../styles/Home.module.scss';

import { getAllFilesInDir, parseProjectMd } from '../src/parseProjectMd';
import type { FileData } from '../src/parseProjectMd';
import { Project, ProjectBreak } from '../components/Project';
import { AsciiArt, AsciiArtSelection } from '../components/AsciiArt';

interface Props {
    projects: FileData[];
}

const Home = ({ projects }: Props): JSX.Element => {

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Brian Adams</title>
                <meta
                    name="description"
                    content="Brian Adams portfolio"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Title />
                <Skills />
                <div id="projects" className={styles.projectWrapper}>
                    <AsciiArt selection={AsciiArtSelection.PROJECTS} />
                    {projects.map(project => <Project key={project.frontMatter.title} data={project} />)}
                </div>
            </main>
        </div>
    );
};

export async function getStaticProps() {
    const mdDir = 'projects/';
    const filePaths = await getAllFilesInDir(mdDir)
    const mdData = await Promise.all(filePaths.map((path) => parseProjectMd(path)));
    return {
        props: {
            projects: mdData,
        },
    };
}
export default Home;
