// "use client"
import React, { useState } from "react";
import "./styles.css";
import FAQHeader from "./FAQHeader";
import FAQ from "./FAQ";

const FaqPage=() =>{
  const [faqs, setFaqs] = useState([
    {
      question: "What is the Chasing Methane’s Super Emitter dashboard?",
      answer:
        "The Chasing Methane Super Emitter dashboard aims to track and identify methane super-emission events from oil and gas facilities in India using satellite data. It focuses on detecting high-leak events or 'super emitters' that contribute significantly to total methane emissions.",
      open: true
    },
    {
      question: "Why methane?",
      answer: "Methane is a potent greenhouse gas, with a global warming potential over 25 times greater than carbon dioxide over a relatively short timescale. Reducing methane emissions is crucial in combating climate change and achieving environmental sustainability.",
      open: false
    },
    {
      question:
        "What are methane super-emitters?",
      answer: "Methane super-emitters are a small percentage (approximately 5%) of leaks from oil and natural gas systems that account for a disproportionate amount (over 60%) of total methane emissions (https://pubs.acs.org/doi/full/10.1021/acs.est.6b04303). These leaks are typically associated with high-pressure devices like high-bleed pneumatic air pumps and compressors.",
      open: false
    },
    {
        question:"Why are methane super-emitters important to identify?",
        answer:"Methane super-emitters, although constituting a small percentage of leaks, contribute disproportionately to total methane emissions. Identifying and addressing these super-emitters can lead to significant reductions in overall methane output with comparatively lower investments.",
        open:false
    },
    {
        question: "Why focus on methane leaks from oil and gas systems?",
        answer: "Oil and gas operations are significant (~30%) sources of man-made methane emissions due to the extraction, production, and distribution processes involved. By targeting methane leaks from these systems, we can address a major contributor to overall methane emissions.",
        open: false
    },
    {
        question: "How does the Super Emitter dashboard work?",
        answer: "Simple answer: The Super Emitter dashboard uses special pictures taken by a satellite in space. These pictures show us how much methane gas is around oil and gas places in India. Every day, the dashboard looks at these pictures and tries to find any strange or extra amounts of methane gas. If it finds a lot more gas than usual, it calls it a Super Emission event.                                                     Technical answer: The Super Emitter dashboard employs publicly-available satellite data to continually monitor methane concentrations across oil and gas facilities in India. On a daily basis, the dashboard identifies anomalies, which are significant deviations or unreasonable enhancements of methane levels over these facilities. If these anomalies surpass a predefined threshold, they are classified as Super Emission events. The selection of the anomaly threshold is based on a rigorous analysis of an even-more rigorous, machine-learning-based algorithm developed by the Netherlands Institute for Space Research (https://acp.copernicus.org/preprints/acp-2022-862/). In summary, we analyzed the output of a detailed model and trimmed the model down to be computationally efficient yet accurate. more output from the Netherlands Institute for Space Research becomes available, our reduced-complexity model will also improve at detecting leaks.         Aug 1st, 2023: A scientific basis document is under preparation and will be available soon.",
        open:false
    },
    {
        question: "Why is satellite data used in the Chasing Methane program?",
        answer: "Satellite data provides comprehensive and frequent coverage over large geographical areas, making it an effective tool for monitoring methane emissions from diverse oil and gas facilities. It allows for real-time and near-real-time analysis, enhancing leak detection and response capabilities, where hand-held or local monitoring costs are high.",
        open:false
    },
    {
        question: "What is the output of the Super Emitter dashboard?",
        answer: "The dashboard provides two major data: 1. The frequency of super emission events over the 21 oil and gas refineries in India, and 2. The time-series of the last two years of methane concentration over each of these refineries.",
        open:false
    },
    {
        question: "Who can access the Super Emitter dashboard?",
        answer : "The dashboard is accessible to the public free of cost.",
        open:false
    },
    {
        question: "How often is the dashboard data updated?",
        answer: "The dashboard data is daily updated to provide the most recent information on leak event frequency for each facility. Sometimes, the frequency of updates may vary depending on data availability and processing time.",
        open:false
    },
    {
        question: "What is the satellite data being used?",
        answer: "The dashboard uses the Sentinel-5 Precursor (Sentinel-5P) satellites’ methane products. Sentinel-5P is a part of the European Space Agency and the methane instrument was built by a joint venture between the Netherlands Space Office, Royal Netherlands Meteorological Institute, Netherlands Institute for Space Research, Netherlands Organization for Applied Scientific Research, and Airbus Defense and Space Netherlands.",
        open:false
    },
    {
        question: "Why is there a lot of missing data on many days?",
        answer: "Sentinel-5P clicks “photos” of a location at 1.30pm local time. Imagine a special camera in space that takes pictures of places on Earth at 1:30 pm every day. But sometimes, the places it tries to take pictures of have a lot of problems, like clouds, dirt, pollution, or humidity in the air. When this happens, the camera's pictures become blurry and messy, and we can't see things clearly. So, on those days, the camera doesn't give us any information because the pictures are not helpful. To make sure we get the right answers about the gas leaks, we don't use those blurry pictures and leave them out. This way, we can be more accurate and not make mistakes in our calculations.",
        open: false
    },
    {
        question: "Why should facility operators actively participate in the dashboard initiative?",
        answer: "Facility operators can benefit from participating in the dashboard initiative by gaining valuable insights into their emissions performance and comparing it with other facilities. It enables them to implement targeted emission reduction strategies, demonstrate environmental stewardship, and meet regulatory requirements effectively.",
        open:false
    },
    {
        question: "Is the dashboard specific to oil and gas facilities in India only?",
        answer : "Yes, the dashboard is designed specifically for oil and gas facilities located in India. It focuses on tracking methane super-emission events within the country.",
        open: false
    },
    {
        question: "Why is transparency important in methane emissions management?",
        answer : "Transparency fosters accountability and encourages collaboration among stakeholders. Openly sharing methane emissions data through the dashboard can lead to collective action, knowledge-sharing, and innovative solutions to reduce emissions effectively.",
        open:false
    }
]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="App">
      <FAQHeader />
      <div className="faqs">
        {faqs.map((faq, index) => (
          <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
        ))}
      </div>
    </div>
  );
}

export default FaqPage