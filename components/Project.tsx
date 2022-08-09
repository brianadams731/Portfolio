
import Image from "next/image";
import { noLoad } from "../utils/imgLoaders";
import type { FileData } from "../src/parseProjectMd";

import styles from "../styles/Project.module.scss";
import { ProjectTech } from "./ProjectTech";
import { useState } from "react";
import { useExecuteWhenInView } from "../hooks/useExecuteWhenInView";

interface Props {
    data: FileData;
}

const formatFieldText = (text: string) => {
    return text?.replace(/ /g,"-")?.toLocaleLowerCase();
}


enum Animate{
    NONE = 0,

    CMD_PWD = 1,
    PWD_BOX = 2,

    CMD_IMG = 3,
    IMG_BOX = 4,
    IMG = 5,

    CMD_DESCRIPTION = 6,
    DESCRIPTION_BOX = 7,

    CMD_SKILLS = 8,
    SKILLS_BOX = 9,
    SKILLS = 10,

    VIEW_PROJECT = 11,
    VIEW_SOURCE = 12
}


const Project = ({ data }: Props): JSX.Element => {
    const [currentAnimation, setCurrentAnimation] = useState<Animate>(Animate.NONE);
    const [executeInView] = useExecuteWhenInView(()=>{
        setTimeout(()=>{
            setCurrentAnimation(Animate.CMD_PWD);
        },300)
    }, .11, true);
    
    const determineVisibility = (animateValue: Animate) =>{
        return animateValue<=currentAnimation?styles.visible:styles.hidden
    }
    const determineCursor = (animateValue: Animate) =>{
        return animateValue === currentAnimation?styles.cursorSpan:"";
    }
    const generateTypedAnimation = (stepsCount: number, animateValue:Animate):string|undefined =>{
        if(animateValue> currentAnimation){
            return;
        }
        const timePerCharacter = 0.036;
        const animationTime = stepsCount * timePerCharacter;
        return `typeIn ${animationTime}s steps(${stepsCount}, end) forwards`;
    }

    const triggerNextAnimation = (event: any, animationToTrigger:Animate) =>{
        if(event.animationName === "typeIn"){
            setTimeout(()=>{
                setCurrentAnimation(animationToTrigger);
            }, 300)
        }
    }
    return (
        <article className={styles.wrapper} ref={executeInView}>
            <p className={determineVisibility(Animate.NONE)}>{"[brian@portfolio]$ "}
                <span className={styles.wrapperSpan}>
                    <span className={determineCursor(Animate.NONE)||determineCursor(Animate.CMD_PWD)} style={{animation:generateTypedAnimation(3, Animate.CMD_PWD)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.CMD_IMG)}}></span>
                    pwd
                </span>
            </p>
            <p className={`${styles.bottomBuffer} ${determineVisibility(Animate.PWD_BOX)}`}>/home/brian/{data.frontMatter?.title?.replace(/ /g,"-")}</p>

            <p className={determineVisibility(Animate.CMD_IMG)}>{`[brian@portfolio]$ `}
                <span className={styles.wrapperSpan}>
                <span className={determineCursor(Animate.CMD_IMG)} style={{animation:generateTypedAnimation((11 + formatFieldText(data.frontMatter.title).length), Animate.CMD_IMG)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.CMD_DESCRIPTION)}}></span>
                    {`catimg ${formatFieldText(data.frontMatter.title)}.jpg`}
                </span>
            </p>
            <div className={`${styles.fieldset} ${determineVisibility(Animate.IMG_BOX)}`}>
                <p className={styles.fieldText}>{formatFieldText(data.frontMatter.title)}.jpg</p>
                <div className={`${styles.imgWrapper} ${styles.bottomBuffer} ${data.frontMatter.url?styles.pointer:""}`} onClick={()=>{
                    if(!data.frontMatter.url){
                        return;
                    }
                    window.open(data.frontMatter.url, '_blank')?.focus();
                }}>
                    <Image layout="fill" objectFit="contain" src={data.frontMatter.img} loader={noLoad} alt={data.frontMatter?.title} unoptimized />
                </div>
            </div>

            <p className={determineVisibility(Animate.CMD_DESCRIPTION)}>{`[brian@portfolio]$ `}
                <span className={styles.wrapperSpan}>
                <span className={determineCursor(Animate.CMD_DESCRIPTION)} style={{animation:generateTypedAnimation((8 + formatFieldText(data.frontMatter.title).length), Animate.CMD_DESCRIPTION)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.CMD_SKILLS)}}></span>

                    {`cat ${formatFieldText(data.frontMatter.title)}.txt`}
                </span>
            </p>
            <div className={`${styles.contentWrapper} ${styles.bottomBuffer} ${determineVisibility(Animate.DESCRIPTION_BOX)}`} dangerouslySetInnerHTML={{ __html: data.content }}></div>

            <p className={determineVisibility(Animate.CMD_SKILLS)}>{`[brian@portfolio]$ `}
                <span className={styles.wrapperSpan}>
                <span className={determineCursor(Animate.CMD_SKILLS)} style={{animation:generateTypedAnimation((8), Animate.CMD_SKILLS)}} onAnimationEnd={(e)=>{triggerNextAnimation(e,Animate.VIEW_PROJECT)}}></span>
                    neofetch
                </span>
            </p>
            <div className={`${styles.fieldset} ${determineVisibility(Animate.SKILLS_BOX)}`}>
                <p className={styles.fieldText}>Built With</p>
                <ProjectTech names={data.frontMatter.tech} />
            </div>

            {(data.frontMatter.url || data.frontMatter.githubRepo) &&
                <div className={styles.linkBox}>
                    {data.frontMatter.url &&
                        <a className={`${styles.url} ${determineVisibility(Animate.VIEW_PROJECT)}`} href={data.frontMatter.url} target="_blank" rel="noreferrer">
                            {`[brian@portfolio]$`} VIEW PROJECT
                        </a>
                    }
                    {
                        data.frontMatter.githubRepo &&
                        <a className={`${styles.github} ${determineVisibility(Animate.VIEW_PROJECT)}`} href={data.frontMatter.githubRepo} target="_blank" rel="noreferrer">
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