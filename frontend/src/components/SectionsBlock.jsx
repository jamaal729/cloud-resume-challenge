import React from 'react';

export default function SectionsBlock({ data }) {
  return (
    <>
      {/* Summary section */}
      <section className="section" id="summary">
        <h2>Summary</h2>
        <div>{data?.summary}</div>
      </section>

      {/* Experience section */}
      <section className="section" id="experience">
        <h2>Experience</h2>

        {Array.isArray(data?.experience) && data.experience.map((exp, idx) => (
          <div className="experience-item" key={idx}>
            {/* <div className="employer">{exp.employer}</div> */}
            <div className="meta">{exp.role} | {exp.employer} {exp.period ? ` — ${exp.period}` : ''}</div>
            <div className="details">
              {Array.isArray(exp.items) && (
                <ul>
                  {exp.items.map((it, i) => <li key={i}>{it}</li>)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </section>

      {/* Skills section */}
      <section className="section" id="skills">
        <h2>Technical Skills</h2>
        <div className="skills-list">
          <p>
            <strong>Languages</strong> — {Array.isArray(data?.skills?.languages) ? data.skills.languages.join(', ') : ''}
          </p>
          <p>
            <strong>Web Development</strong> — {Array.isArray(data?.skills?.webDevelopment) ? data.skills.webDevelopment.join(', ') : ''}
          </p>
          <p>
            <strong>Cloud</strong> — {Array.isArray(data?.skills?.cloudServices) ? data.skills.cloudServices.join(', ') : ''}
          </p>
          <p>
            <strong>Data</strong> — {Array.isArray(data?.skills?.databasesTechnologies) ? data.skills.databasesTechnologies.join(', ') : ''}
          </p>
        </div>
      </section>

      {/* Certifications section */}
      <section className="section" id="certifications">
        <h2>Certification</h2>
        {Array.isArray(data?.certifications) && data.certifications.map((cert, i) => (
          <div className="certification-entry" key={i}>
            <strong>{cert.name}</strong> — {cert.description}{cert.date ? `, ${cert.date}` : ''}
          </div>
        ))}
      </section>

      {/* Projects section */}
      <section className="section" id="projects">
        <h2>Cloud Project</h2>
        {Array.isArray(data?.projects) && data.projects.map((proj, i) => (
          <div className="project-entry" key={i}>
            <strong>{proj.name}</strong> — {proj.description}{proj.date ? `, ${proj.date}` : ''}
          </div>
        ))}
      </section>

      {/* Education section */}
      <section className="section" id="education">
        <h2>Education</h2>
        {Array.isArray(data?.education) && data.education.map((edu, i) => (
          <div className="education-entry" key={i}>
            <strong>{edu.institution}</strong> — {edu.credential}{edu.date ? `, ${edu.date}` : ''}
          </div>
        ))}
      </section>

    </>
  );
}
