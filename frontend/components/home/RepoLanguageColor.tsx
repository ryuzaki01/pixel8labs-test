import { useMemo } from 'react';
const RepoLanguageColor = ({
                             language
                           } : { language: string }) => {

  const fillColor = useMemo(() => {
    if (language === 'Ruby') {
      return '#B42318'
    }

    if (language === 'Python') {
      return '#026AA2'
    }

    if (language === 'Javascript') {
      return '#FEC84B'
    }

    return '#aaa'
  }, [language]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill={fillColor}/>
    </svg>
  )
}

export default RepoLanguageColor;
