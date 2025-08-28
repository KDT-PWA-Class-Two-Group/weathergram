import { useContext } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

// 테마 커스텀 훅
export const useTheme = () => {
    const context = useContext(ThemeContext)
    if(!context){
        throw new Error('useTheme를 사용하려면 ThemeProvider를 해야 합니다')
    }

    return context;
}
