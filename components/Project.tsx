
import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import type {FileData} from "../src/parseProjectMd";

import styles from "../styles/Project.module.scss";
import { ProjectTech } from "./ProjectTech";

interface Props {
    data: FileData;
}

const Project = ({ data }: Props): JSX.Element => {
    return (
        <article className={styles.wrapper}>
            <h1 className={styles.title}>Title: {data.frontMatter.title}</h1>
            <p className={styles.status}>Status: {data.frontMatter.status}</p>
            <div className={styles.imgWrapper}>
                <Image layout="fill" objectFit="contain" src={data.frontMatter.img} loader={noLoad} unoptimized />
            </div>
                
            <div className={styles.contentWrapper} dangerouslySetInnerHTML={{__html:data.content}}></div>

            {(data.frontMatter.url || data.frontMatter.githubRepo) &&
                <div className={styles.linkBox}>
                    {data.frontMatter.url && 
                        <a  className={`${styles.url}`} href={data.frontMatter.url} target="_blank">
                            View Project
                        </a>
                    }
                    {
                        data.frontMatter.githubRepo && 
                        <a className={`${styles.github}`} href={data.frontMatter.githubRepo} target="_blank">
                            View Code
                        </a>
                    }
                </div>
            }

            <ProjectTech names={data.frontMatter.tech} />

        </article>
    )
}

export { Project };