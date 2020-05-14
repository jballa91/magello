import React, { Fragment } from "react";
import { useAuth0 } from "../magello-spa";
import styles from "../styles/SplashPage.module.css";

const SplashPage = () => {
  const { loading } = useAuth0();

  if (loading) {
    return (
      <img
        src={require("../images/magellogo.gif")}
        alt="loading"
        height="100px"
        width="100px"
      />
    );
  }

  return (
    <div className={styles.page_container}>
      <div className={styles.parallax_1}>
        <div className={styles.head_container_1}>
          <h3 className={styles.headLine}>Welcome to your excursion.</h3>
          <p className={styles.blurb}>
            Ferdinand Magellan (c. 1480 – 27 April 1521) was a Portuguese
            explorer who organised the Spanish expedition to the East Indies
            from 1519 to 1522, resulting in the first circumnavigation of the
            Earth, which was completed by Juan Sebastián Elcano.
          </p>
        </div>
      </div>
      <div className={styles.card_container}>
        <div className={styles.card}>
          <div className={styles.card_logo_container}>
            <img
              className={styles.card_logo}
              src={require("../images/maps-and-flags.png")}
              alt="globe"
            />
          </div>
          <div className={styles.card_blurb_container}>
            <h3 className={styles.card_blurb_header}>
              The world is a big place
            </h3>
            <p className={styles.card_blurb_text}>
              You may be voyaging into the unkown with a ship full of
              crewmembers paid with alcohol and the spoils of piracy, but that
              doesn't mean you have to go alone.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card_logo_container}>
            <img
              className={styles.card_logo}
              src={require("../images/summertime.png")}
              alt="wave"
            />
          </div>
          <div className={styles.card_blurb_container}>
            <h3 className={styles.card_blurb_header}>
              The sea, she's a dangerous mistress
            </h3>
            <p className={styles.card_blurb_text}>
              We all know you're a big brave boy, so you don't have to risk
              everything all willy-nilly. Let us help you plan for the worst.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card_logo_container}>
            <img
              className={styles.card_logo}
              src={require("../images/miscellaneous.png")}
              alt="compass"
            />
          </div>
          <div className={styles.card_blurb_container}>
            <h3 className={styles.card_blurb_header}>Math is hard</h3>
            <p className={styles.card_blurb_text}>
              Magellan had access to a back staff, compass, compass rose, and a
              lead line. He had to plan on paper, too. What a chump.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.parallax_2}>
        <div className={styles.head_container_2}>
          <h3 className={styles.headLine}>Welcome to the 21st Century.</h3>
          <p className={styles.blurb}>
            You're not Ferdinand Magellan. Bummer! But you do have access to
            tons of useful technologies like GPS and Magello to help make your
            voyage fun and easy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
