import { lazy } from "react";

// Import all page components statically using Vite's glob pattern
// This allows Vite to analyze and bundle all imports at build time
const modules = import.meta.glob<{ default: React.ComponentType<any> }>(
    './pages/*/*.tsx',
    { eager: true }
);

// Build component map from static imports
// Map file paths like './pages/english/identifyLetter.tsx' to component names like 'identifyLetter'
export const componentMap: { [key: string]: React.LazyExoticComponent<React.ComponentType<any>> } = {};

// Helper to normalize file paths to component names
const getComponentKey = (filePath: string): string => {
    const match = filePath.match(/\.\/pages\/[^/]+\/(.+)\.tsx$/);
    return match ? match[1] : '';
};

// Populate map from imported modules
Object.entries(modules).forEach(([filePath, module]) => {
    const key = getComponentKey(filePath);
    if (key) {
        componentMap[key] = lazy(() => Promise.resolve(module));
    }
});

// Also export layout components separately
const layoutModules = import.meta.glob<{ default: React.ComponentType<any> }>(
    './layouts/*.tsx',
    { eager: true }
);

const getLayoutComponentKey = (filePath: string): string => {
    const match = filePath.match(/\.\/layouts\/(.+)\.tsx$/);
    return match ? match[1] : '';
};

Object.entries(layoutModules).forEach(([filePath, module]) => {
    const key = getLayoutComponentKey(filePath);
    if (key) {
        componentMap[key] = lazy(() => Promise.resolve(module));
    }
});
