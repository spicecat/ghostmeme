import { useEffect, useState } from 'react';

export const lightTheme = {
    body: '#FFF',
    text: '#363537',
    toggleBorder: '#FFF',
    background: '#363537',
}
export const darkTheme = {
    body: '#363537',
    text: '#FAFAFA',
    toggleBorder: '#6B8096',
    background: '#999',
}

export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');

    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };

    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme && setTheme(localTheme)
    }, []);
    return [theme, themeToggler]
};
export const useDarkMode = () => {
    const [theme, setTheme] = useState('light');
    const [mountedComponent, setMountedComponent] = useState(false)
    const setMode = mode => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };
    const themeToggler = () => {
        theme === 'light' ? setMode('dark') : setMode('light')
    };
    useEffect(() => {
        const localTheme = window.localStorage.getItem('theme');
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, []);
    return [theme, themeToggler, mountedComponent]
};