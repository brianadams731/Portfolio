import { ImageLoaderProps } from "next/image";

const noLoad = ({src, width, quality}:ImageLoaderProps) => {
    return src;
};

export { noLoad };
