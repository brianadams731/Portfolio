import Head from 'next/head';
import { Skills } from '../components/Skills';
import { Title } from '../components/Title';
import styles from '../styles/Home.module.scss';

import { getAllFilesInDir, parseProjectMd } from '../src/parseProjectMd';
import type { FileData } from '../src/parseProjectMd';
import { Project, ProjectBreak } from '../components/Project';
import { AsciiArt, AsciiArtSelection } from '../components/AsciiArt';
import { Contact } from '../components/Contact';

interface Props {
    projects: FileData[];
}

const Home = ({ projects }: Props): JSX.Element => {

    return (
        <div className={styles.wrapper}>
            <Head>
                <title>Brian Adams</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Title />
                <Skills />
                <div id="projects" className={styles.projectWrapper}>
                    <AsciiArt selection={AsciiArtSelection.PROJECTS} />
                    {projects.map((project, index) => {
                        return (
                            <div key={project.frontMatter.title}>
                                <Project data={project} />
                                {index !== (projects.length - 1) && <ProjectBreak />}
                            </div>
                        )
                    })}
                </div>
                <Contact />
            </main>
        </div>
    );
};

export async function getStaticProps() {
    const mdDir = 'projects/';
    const filePaths = await getAllFilesInDir(mdDir)
    const mdData = await Promise.all(filePaths.map((path) => parseProjectMd(path)));
    const parsedData = mdData.map((item) => {
        if (!item.frontMatter.priority) {
            item.frontMatter.priority = 1000;
        }
        return item;
    }).sort((a, b) => {
        return a.frontMatter.priority! - b.frontMatter.priority!;
    })

    return {
        props: {
            projects: parsedData,
        },
    };
}
export default Home;
