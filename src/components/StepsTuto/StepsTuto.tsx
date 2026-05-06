import headImg from "../../images/headerTuto.png"
import heroImg from "../../images/heroTuto.jpg"
import storeImg from "../../images/storeTuto.png"
import footerImg from "../../images/footerTuto.jpg"
import contactImg from "../../images/conatactImg.png"
import getStoreImg from "../../images/getStoreImg.png"
import styles from "./StepsTuto.module.css"; // Changed to CSS Module import

function StepsTuto() {
  return (
    <div className={styles['steps-tuto']}>
      <h2>How to Launch Your Store in 6 Simple Steps</h2>
      <div className={styles.steps}>
        <div className={styles.step}>
          <h3><span>Step 1:</span> Define Your Identity (The Header)</h3>
          <p>Upload your logo, choose a navigation style, and set up your menu links.</p>
          <img src={headImg} alt="Header Tutorial" />
        </div>
        <div className={styles.step}>
          <h3><span>Step 2:</span> Make an Impact (The Hero Section)</h3>
          <p>Add a bold headline,a description about your brand, and a picture of your chosen.</p>
          <img src={heroImg} alt="Hero Tutorial" />
        </div>
        <div className={styles.step}>
          <h3><span>Step 3:</span> Showcase Your Products (The Store Section)</h3>
          <p>Select your desired products and add them to your store.</p>
          <img src={storeImg} alt="Store Tutorial" />
        </div>
        <div className={styles.step}>
          <h3><span>Step 4:</span> Enable Customer Connection (Contact Section)</h3>
          <p>Add your contact information,such as Whatsapp,Instagram,and Email.</p>
          <img src={contactImg} alt="Contact Tutorial" />
        </div>
        <div className={styles.step}>
          <h3><span>Step 5:</span> Wrap It Up (The Footer)</h3>
          <p>Add your contact information, social media links, and essential pages link.</p>
          <img src={footerImg} alt="Footer Tutorial" />
        </div>
        <div className={styles.step}>
          <h3><span>Step 6:</span> Get your Store</h3>
          <p>Download your completed store's source code (HTML, CSS, and images), and deploy it instantly to web.</p>
          <img src={getStoreImg} alt="Get Store Tutorial" />
        </div>
      </div>
    </div>
  );
}

export default StepsTuto;