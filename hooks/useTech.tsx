import { MutableRefObject, useRef } from "react"
interface MappedObj {
    [key: string]: MappedTech;
}

interface MappedTech {
    imgURL: string;
    title: string;
}

const useTech = (): [MutableRefObject<MappedObj>] => {
    const ref = useRef<MappedObj>({
        typescript: {
            imgURL: "/logos/ts.svg",
            title: "TypeScript"
        },
        next: {
            imgURL: "/logos/next.svg",
            title: "NextJS"
        },
        react: {
            imgURL: "/logos/react.svg",
            title: "React"
        },
        redux: {
            imgURL: "/logos/redux.svg",
            title: "Redux"
        },
        node: {
            imgURL: "/logos/node.svg",
            title: "Node"
        },
        express: {
            imgURL: "/logos/express.svg",
            title: "Express"
        },
        jest: {
            imgURL: "/logos/jest.svg",
            title: "Jest"
        },
        postgres: {
            imgURL: "/logos/postgres.svg",
            title: "Postgres"
        },
        html: {
            imgURL: "/logos/html.svg",
            title: "HTML"
        },
        css: {
            imgURL: "/logos/css.svg",
            title: "CSS"
        },
        scss: {
            imgURL: "/logos/sass.svg",
            title: "SCSS"
        },
        python: {
            imgURL: "/logos/python.svg",
            title: "Python"
        },
        flask: {
            imgURL: "/logos/flask.svg",
            title: "flask"
        },
        java: {
            imgURL: "/logos/java.svg",
            title: "Java"
        },
        git: {
            imgURL: "/logos/git.svg",
            title: "Git"
        },
    })
    return [ref];
}

export { useTech };