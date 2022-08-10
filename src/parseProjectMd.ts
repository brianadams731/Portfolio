import fs from 'fs/promises';
import matter from 'gray-matter';
import {marked} from "marked";

interface IProjectFrontMatter{
    title: string;
    status: string;
    img: string;
    tech: string[];

    url?: string;
    githubRepo?: string;
    priority?: number;
}
interface FileData {
    frontMatter: IProjectFrontMatter
    content: string;
}

const getAllFilesInDir = async (dirPath:string) =>{
    let filePaths: string[] = await fs.readdir(dirPath);
    filePaths = filePaths.map((file: string) => {
        return `${dirPath}${file}`;
    });
    filePaths = filePaths.filter(item => !item.includes(".ignore."));
    return filePaths;
}

const parseProjectMd = async (filePath: string):Promise<FileData> => {
    let file = await fs.readFile(filePath, "utf-8");
    const parsedFile = matter(file);
    const frontmatter = parsedFile.data as IProjectFrontMatter;
    const elements = marked.parse(parsedFile.content);

    return {
        frontMatter: frontmatter,
        content: elements,
    }    
};

export { parseProjectMd, getAllFilesInDir };
export type { FileData };
