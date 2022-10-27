/**
 * Default CSS LESS SCSS definition for typescript,
 * will be overridden with file-specific definitions by rollup
 */
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// eslint-disable-next-line
declare interface AnyObject {
  [key: string]: any;
}

// eslint-disable-next-line
declare type Any = any;
