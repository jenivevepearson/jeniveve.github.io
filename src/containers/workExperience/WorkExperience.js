import React, {useContext, useEffect, useState} from "react";
import "./WorkExperience.scss";
import ExperienceCard from "../../components/experienceCard/ExperienceCard";
import {workExperiences} from "../../portfolio"; // Correct import
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const [papers, setPapers] = useState([]);

  // Fetch papers from NASA ADS
  useEffect(() => {
    const fetchPapers = async () => {
      if (workExperiences.display) {
        const data = await workExperiences.experience();
        setPapers(data);
      }
    };

    fetchPapers();
  }, []);

  if (workExperiences.display) {
    return (
      <div id="experience">
        <Fade bottom duration={1000} distance="20px">
          <div className="experience-container" id="workExperience">
            <div>
              <h1 className="experience-heading">Recent Publications</h1>
              <div className="experience-cards-div">
                {/* Render NASA ADS papers */}
                {papers.map((paper, i) => (
                  <ExperienceCard
                    key={i}
                    isDark={isDark}
                    cardInfo={{
                      company: paper.company,
                      desc: paper.desc,
                      date: paper.date,
                      companylogo: paper.companylogo,
                      role: paper.role,
                      descBullets: paper.descBullets,
                      link: paper.link // Add link to NASA ADS
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fade>
      </div>
    );
  }
  return null;
}
