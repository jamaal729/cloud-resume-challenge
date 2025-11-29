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
            <div className="employer">{exp.employer}</div>
            <div className="meta">{exp.role}{exp.period ? ` — ${exp.period}` : ''}</div>
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

      {/* Education section */}
      <section className="section" id="education">
        <h2>Education</h2>
        {Array.isArray(data?.education) && data.education.map((edu, i) => (
          <div className="education-entry" key={i}>
            <strong>{edu.institution}</strong> — {edu.credential}{edu.date ? `, ${edu.date}` : ''}
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
            <strong>Databases & Technologies</strong> — {Array.isArray(data?.skills?.databasesTechnologies) ? data.skills.databasesTechnologies.join(', ') : ''}
          </p>
        </div>
      </section>
    </>
  );
}
