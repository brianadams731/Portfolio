
import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import type { FileData } from "../src/parseProjectMd";

import styles from "../styles/Project.module.scss";
import { ProjectTech } from "./ProjectTech";

interface Props {
    data: FileData;
}

const formatFieldText = (text: string) => {
    return text?.replace(/ /g,"-")?.toLocaleLowerCase();
}

const Project = ({ data }: Props): JSX.Element => {
    return (
        <article className={styles.wrapper}>
            <p>{"[brian@portfolio]$ pwd"}</p>
            <p className={styles.bottomBuffer}>/home/brian/{data.frontMatter?.title?.replace(/ /g,"-")}</p>

            <p>{`[brian@portfolio]$ catimg ${formatFieldText(data.frontMatter.title)}.jpg`}</p>
            <div className={styles.fieldset}>
                <p className={styles.fieldText}>{formatFieldText(data.frontMatter.title)}.jpg</p>
                <div className={`${styles.imgWrapper} ${styles.bottomBuffer}`}>
                    <Image layout="fill" objectFit="contain" src={data.frontMatter.img} loader={noLoad} alt={data.frontMatter?.title} unoptimized />
                </div>
            </div>

            <p>{`[brian@portfolio]$ cat ${formatFieldText(data.frontMatter.title)}.txt`}</p>
            <div className={`${styles.contentWrapper} ${styles.bottomBuffer}`} dangerouslySetInnerHTML={{ __html: data.content }}></div>

            <p>{`[brian@portfolio]$ neofetch`}</p>
            <div className={styles.fieldset}>
                <p className={styles.fieldText}>{formatFieldText(data.frontMatter.title)}.jpg</p>
                <ProjectTech names={data.frontMatter.tech} />
            </div>

            {(data.frontMatter.url || data.frontMatter.githubRepo) &&
                <div className={styles.linkBox}>
                    {data.frontMatter.url &&
                        <a className={`${styles.url}`} href={data.frontMatter.url} target="_blank" rel="noreferrer">
                            {`[brian@portfolio]$`} VIEW PROJECT
                        </a>
                    }
                    {
                        data.frontMatter.githubRepo &&
                        <a className={`${styles.github}`} href={data.frontMatter.githubRepo} target="_blank" rel="noreferrer">
                            {`[brian@portfolio]$`} VIEW SOURCE CODE
                        </a>
                    }
                </div>
            }

        </article>
    )
}

const ProjectBreak = () =>{
    return (
        <div className={styles.projectBreak}>
            <p>{"#".repeat(100)}</p>
        </div>
    )
}

export { Project, ProjectBreak };