import React from "react";

export default function SectionsBlock() {
  return (
    <>
      {/* SUMMARY */}
      <section className="section" id="summary">
        <h2>Summary</h2>

        <div>
          Software Developer with over five years of experience in building API and data applications. Proven
          expertise in providing robust integration interfaces and technical support for Web API and ETL
          applications.
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section" id="experience">
        <h2>Experience</h2>

        {/* Peloton */}
        <div className="experience-item">
          <div className="employer">Peloton Computer Enterprises, Calgary</div>
          <div className="meta">Software Developer / Platform API Specialist — Feb 2020 – Jul 2025</div>
          <div className="details">
            <ul>
              <li>
                Developed Mapbox applications, creating enhanced navigation and geographic view of asset
                locations, enabling customers’ easy access to their data and applications.
              </li>
              <li>
                Wrote and secured Web API applications with OAuth 2.0 in C#/.NET, Node.js, and Python for
                continuous testing and troubleshooting to maintain API integrity.
              </li>
              <li>
                Engineered Web API client applications using .NET to facilitate customer integration and
                training, providing a foundational tool for accessing application data via Peloton API.
              </li>
              <li>
                Automated the creation of HTML API documentation from Swagger/OpenAPI JSON using .NET Regex
                and other libraries, converting the manual process into an efficient and standardized one.
              </li>
              <li>
                Created ETL pipelines using Microsoft Fabric PySpark to automate data replication from Azure
                SQL Database to Snowflake, resulting in significant cost and time savings.
              </li>
              <li>
                Developed Snowflake utility library scripts using SQL, Python, and Snowpark to provide clients
                with advanced data functionalities like time travel, track changes, tasks, and streams.
              </li>
              <li>
                Built ETL data warehouse synchronizations from Azure SQL Database to Snowflake using Fivetran,
                providing clients with easy access to their application data.
              </li>
            </ul>
          </div>
        </div>

        {/* Userful */}
        <div className="experience-item">
          <div className="employer">Userful Corporation, Calgary</div>
          <div className="meta">Software Developer — Nov 2018 – Dec 2018</div>
          <div className="details">
            <ul>
              <li>
                Designed an interactive browser front-end using JavaScript/jQuery to operate the Userful
                Control Center REST API.
              </li>
            </ul>
          </div>
        </div>

        {/* FMC */}
        <div className="experience-item">
          <div className="employer">FMC Technologies (TechnipFMC), Norway</div>
          <div className="meta">Dynamic Simulations Engineer — Dec 2012 – Nov 2015</div>
          <div className="details">
            <ul>
              <li>
                Developed dynamic simulation applications of oil and gas systems using Java to predict and
                verify operational philosophy for oil and gas clients, enabling them to optimize and ensure the
                safety and integrity of their operations.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section className="section" id="education">
        <h2>Education</h2>

        <div className="education-entry">
          <strong>Lighthouse Labs, Calgary</strong> — Web Development Certificate (Full Stack JavaScript), Jan.
          2020
        </div>

        <div className="education-entry">
          <strong>Southern Alberta Institute of Technology, Calgary</strong> — .NET Development Certificate, Jun.
          2019
        </div>

        <div className="education-entry">
          <strong>University of Liverpool, UK</strong> — MSc Software Engineering, Jun. 2019
        </div>
      </section>

      {/* SKILLS */}
      <section className="section" id="skills">
        <h2>Technical Skills</h2>

        <div className="skills-list">
          <p>
            <strong>Languages</strong> — C#, JavaScript / TypeScript, Java, Python
          </p>
          <p>
            <strong>Web Development</strong> — ASP.NET Core, Node.js, OAuth 2.0 Security, REST API
          </p>
          <p>
            <strong>Databases & Technologies</strong> — SQL Server, Azure SQL Database, Postgres, Snowflake, MS
            Fabric, PySpark
          </p>
        </div>
      </section>
    </>
  );
}
