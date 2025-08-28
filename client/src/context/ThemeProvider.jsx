import { useState, useEffect} from "react";
import { ThemeContext } from "./ThemeContext";

//테마 상태 관리 isDarkMode에 값이 없으면 기본값 false
export const ThemeProvider = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('isDarkMode')
        return savedMode ? JSON.parse(savedMode) : false
    });
    //상태가 변할 때 마다 로컬 스토리지에 저장 > 전역에 dark 클래스 토글        
    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
        if(isDarkMode){
            document.documentElement.classList.add('dark')
        }else{
            document.documentElement.classList.remove('dark')
        }
    }, [isDarkMode]);

    // 다크모드 토글
    const toggleDarkMode = () => {
        setIsDarkMode(prevMode => !prevMode)
    };
    
    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode}}>
            {children}
        </ThemeContext.Provider>
    )
}

