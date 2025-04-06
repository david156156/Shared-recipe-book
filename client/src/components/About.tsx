import { FunctionComponent } from "react";

interface AboutProps {}

const About: FunctionComponent<AboutProps> = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">אודות ספר המתכונים המשותף</h1>
      <p className="about-description">
        "ספר המתכונים המשותף" הוא פלטפורמה ייחודית שנועדה לחבר בין אנשים דרך
        אהבתם לבישול ואפייה. האתר מאפשר לכל משתמש לשתף מתכונים אישיים, לגלות
        מתכונים חדשים, וליצור קהילה קולינרית מגוונת ומעשירה.
      </p>

      <section className="about-section">
        <h2>מטרות האתר</h2>
        <p>
          המטרה העיקרית של האתר היא ליצור מקום שבו כל אחד יכול לשתף את הידע
          הקולינרי שלו, ללמוד מאחרים, ולמצוא השראה למנות חדשות. אנו מאמינים בכוח
          של אוכל לחבר בין אנשים, והאתר נועד להיות גשר בין תרבויות, טעמים
          וסגנונות בישול שונים.
        </p>
      </section>

      <section className="about-section">
        <h2>מה תוכלו לעשות באתר?</h2>
        <ul>
          <li>לשתף מתכונים אישיים עם הקהילה.</li>
          <li>לגלות מתכונים חדשים ומגוונים מכל העולם.</li>
          <li>לשמור מתכונים אהובים למועדפים.</li>
          <li>לדרג ולהגיב על מתכונים של משתמשים אחרים.</li>
          <li>ליצור פרופיל אישי ולנהל את המתכונים שלכם.</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>איך האתר עובד?</h2>
        <p>האתר בנוי בצורה פשוטה ונוחה לשימוש:</p>
        <ol>
          <li>הרשמה: כל משתמש יכול להירשם לאתר וליצור פרופיל אישי.</li>
          <li>
            שיתוף מתכונים: ניתן להוסיף מתכונים חדשים דרך טופס פשוט הכולל שם
            מתכון, רכיבים, הוראות הכנה ותמונה.
          </li>
          <li>
            חיפוש מתכונים: ניתן לחפש מתכונים לפי קטגוריות, סוגי ארוחות, או מילות
            מפתח.
          </li>
          <li>
            אינטראקציה: ניתן לדרג מתכונים, להוסיף תגובות, ולשמור מתכונים
            למועדפים.
          </li>
        </ol>
      </section>

      <section className="about-section">
        <h2>איך להתממשק עם האתר?</h2>
        <p>
          האתר מספק ממשק API מתקדם שמאפשר למפתחים להתממשק עם הפלטפורמה ולבצע
          פעולות כמו:
        </p>
        <ul>
          <li>שליפת מתכונים לפי קטגוריות או מילות מפתח.</li>
          <li>הוספת מתכונים חדשים דרך קריאות API.</li>
          <li>עדכון או מחיקת מתכונים קיימים.</li>
          <li>ניהול משתמשים ופרופילים.</li>
        </ul>
        <p>
          למידע נוסף על ה-API, ניתן לעיין בתיעוד המלא בעמוד{" "}
          <a href="/api-docs" className="about-link">
            תיעוד API
          </a>
          .
        </p>
      </section>

      <section className="about-section">
        <h2>מי אנחנו?</h2>
        <p>
          אנחנו צוות של חובבי בישול ואפייה, שמאמינים בכוח של שיתוף ידע קולינרי.
          המטרה שלנו היא לחבר בין אנשים דרך אוכל וליצור פלטפורמה שתהיה נגישה
          לכולם.
        </p>
      </section>

      <section className="about-section">
        <h2>צרו קשר</h2>
        <p>
          יש לכם שאלות, הצעות או רעיונות? נשמח לשמוע מכם! אתם מוזמנים לפנות
          אלינו דרך עמוד{" "}
          <a href="/contact" className="about-link">
            צור קשר
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default About;
