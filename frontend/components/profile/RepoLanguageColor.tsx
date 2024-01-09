const languageColor: Record<string, string> = {
  Ruby: '#B42318',
  Python: '#026AA2',
  JavaScript: '#FEC84B',
  TypeScript: '#3178c6',
  SVG: '#ff9900',
  Go: '#00ADD8',
  Java: '#b07219',
  'C++': '#f34b7d',
  'PHP': '#4F5D95',
  'HTML': '#e34c26',
  'CSS': '#563d7c',
}


const RepoLanguageColor = ({
                             language
                           } : { language: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <circle cx="6" cy="6" r="6" fill={languageColor[language] || '#aaa'}/>
    </svg>
  )
}

export default RepoLanguageColor;
