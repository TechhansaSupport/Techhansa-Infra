import React, { createContext, useState, useEffect, useContext } from 'react';

const ProjectContext = createContext({ hasProjects: true });

export function ProjectProvider({ children }) {
  const [hasProjects, setHasProjects] = useState(true);

  useEffect(() => {
    fetch(`/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error('API Request failed');
        return res.json();
      })
      .then(data => {
        setHasProjects(data && data.length > 0);
      })
      .catch(err => {
        console.error('Failed to fetch projects status:', err);
        setHasProjects(false);
      });
  }, []);

  return (
    <ProjectContext.Provider value={{ hasProjects }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectContext = () => useContext(ProjectContext);
