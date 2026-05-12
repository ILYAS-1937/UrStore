// src/components/FAQ/FAQ.tsx
import React, { useState } from 'react';
import styles from './FAQ.module.css';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "How do I create my store?",
    answer: "Simply click on the 'Get Your Store' button in the hero section and follow our intuitive setup wizard to configure your branding, header, and footer."
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes! We offer a fully-featured 14-day free trial so you can test out all the customization options before committing."
  },
  {
    question: "Can I use my own custom domain?",
    answer: "Absolutely. Once your store is set up, you can connect your existing domain or purchase a new one directly through your dashboard settings."
  },
  {
    question: "How can I contact the creators of UrStore?",
    answer: "You can reach out to the creators directly via email. Contact Moataz Mohamed at medmigamo@gmail.com, or Ilyas Tarzi at taziiliyas05@gmail.com."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    // If clicking the already open item, close it. Otherwise, open the new one.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.container}>
        <h2 className={styles.title}>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${activeIndex === index ? styles.active : ''}`}
            >
              <button
                className={styles.questionButton}
                onClick={() => toggleAccordion(index)}
              >
                <span className={styles.questionText}>{item.question}</span>
                <span className={styles.icon}>
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className={styles.answerContainer}>
                <p className={styles.answerText}>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;