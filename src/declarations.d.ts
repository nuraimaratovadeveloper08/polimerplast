declare module '*.mp4' {
    const src: string;
    export default src;
  }
  
  declare module '*.mov' {
    const src: string;
    export default src;
  }
  declare module '*.png' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpg' {
    const content: string;
    export default content;
  }
  
  declare module '*.jpeg' {
    const content: string;
    export default content;
  }
  
  declare module '*.svg' {
    const content: any;
    export default content;
  }

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export {};