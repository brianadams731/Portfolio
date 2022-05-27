
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
            <h1>Title: {data.frontMatter.title}</h1>
            <p>Status: {data.frontMatter.status}</p>
            <div className={styles.imgWrapper}>
                <Image layout="fill" objectFit="contain" src={data.frontMatter.img} loader={noLoad} unoptimized />
            </div>
                
            <div className={styles.contentWrapper} dangerouslySetInnerHTML={{__html:data.content}}></div>
            <ProjectTech names={data.frontMatter.tech} />
        </article>
    )
}

export { Project };