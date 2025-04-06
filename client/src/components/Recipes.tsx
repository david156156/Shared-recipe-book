import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/index.css";
// טיפוס למתכון
interface Recipe {
  _id: string;
  title: string;
  category: string[];
  image: string;
  likes: number;
}

const Recipes = () => {
  // מצב לשמירת נתוני המתכונים
  const [newRecipes, setNewRecipes] = useState<Recipe[]>([]);
  const [popularRecipes, setPopularRecipes] = useState<Recipe[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [popularCarouselIndex, setPopularCarouselIndex] = useState(0);

  const navigate = useNavigate();

  // טעינת מתכונים בעת טעינת הדף
  useEffect(() => {
    // בפרויקט אמיתי, כאן תבצע בקשת API
    // לצורך הדוגמה, אני אשתמש בנתונים לדוגמה
    const dummyRecipes: Recipe[] = [
      {
        _id: "1",
        title: "פנקייק שוקולד",
        category: ["ארוחת בוקר", "קינוחים"],
        image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93",
        likes: 25,
      },
      {
        _id: "2",
        title: "פסטה ברוטב עגבניות",
        category: ["ארוחת צהריים", "איטלקי"],
        image: "https://images.unsplash.com/photo-1598866594230-a7c12756260f",
        likes: 18,
      },
      {
        _id: "3",
        title: "סלט יווני",
        category: ["ארוחת צהריים", "ים תיכוני", "צמחוני"],
        image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af",
        likes: 32,
      },
      {
        _id: "4",
        title: "עוגת גבינה",
        category: ["קינוחים"],
        image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad",
        likes: 45,
      },
      {
        _id: "5",
        title: "שקשוקה",
        category: ["ארוחת בוקר", "ישראלי"],
        image: "https://images.unsplash.com/photo-1590412200988-a436970781fa",
        likes: 38,
      },
      {
        _id: "6",
        title: "המבורגר ביתי",
        category: ["ארוחת צהריים", "אמריקאי"],
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
        likes: 29,
      },
      {
        _id: "7",
        title: "פאד תאי",
        category: ["ארוחת ערב", "אסייתי"],
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e",
        likes: 22,
      },
      {
        _id: "8",
        title: "טאקו מקסיקני",
        category: ["ארוחת ערב", "מקסיקני"],
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
        likes: 31,
      },
    ];

    // מיון מתכונים חדשים (במציאות, אלו יהיו המתכונים שנוספו לאחרונה)
    setNewRecipes([...dummyRecipes].sort(() => Math.random() - 0.5));

    // מיון מתכונים פופולריים לפי לייקים
    setPopularRecipes([...dummyRecipes].sort((a, b) => b.likes - a.likes));
  }, []);

  // מעבר קרוסלה קדימה
  const nextSlide = (carousel: "new" | "popular") => {
    if (carousel === "new") {
      setCarouselIndex((prevIndex) =>
        prevIndex >= Math.floor(newRecipes.length / 3) * 3 ? 0 : prevIndex + 3
      );
    } else {
      setPopularCarouselIndex((prevIndex) =>
        prevIndex >= Math.floor(popularRecipes.length / 3) * 3
          ? 0
          : prevIndex + 3
      );
    }
  };

  // מעבר קרוסלה אחורה
  const prevSlide = (carousel: "new" | "popular") => {
    if (carousel === "new") {
      setCarouselIndex((prevIndex) =>
        prevIndex === 0 ? Math.floor(newRecipes.length / 3) * 3 : prevIndex - 3
      );
    } else {
      setPopularCarouselIndex((prevIndex) =>
        prevIndex === 0
          ? Math.floor(popularRecipes.length / 3) * 3
          : prevIndex - 3
      );
    }
  };

  // ניווט למתכון
  const goToRecipe = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <>
      <div className="recipes-container">
        <div className="recipes-wrapper">
          <div className="new-recipes-section">
            <h2>מתכונים חדשים</h2>
            <div className="carousel-container">
              <button
                className="carousel-button prev"
                onClick={() => nextSlide("new")}
              >
                &#10095;
              </button>

              <div className="carousel-content">
                {newRecipes
                  .slice(carouselIndex, carouselIndex + 3)
                  .map((recipe) => (
                    <div
                      key={recipe._id}
                      className="recipe-card"
                      onClick={() => goToRecipe(recipe._id)}
                    >
                      <div className="recipe-image-container">
                        <img src={recipe.image} alt={recipe.title} />
                        <div className="recipe-likes">
                          <span>❤️ {recipe.likes}</span>
                        </div>
                        <div className="recipe-overlay">
                          <h3>{recipe.title}</h3>
                          <div className="recipe-categories">
                            {recipe.category.slice(0, 2).map((cat, idx) => (
                              <span key={idx} className="category-tag">
                                {cat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              <button
                className="carousel-button next"
                onClick={() => prevSlide("new")}
              >
                &#10094;
              </button>
            </div>

            <div className="carousel-dots">
              {Array.from({ length: Math.ceil(newRecipes.length / 3) }).map(
                (_, idx) => (
                  <span
                    key={idx}
                    className={`dot ${
                      Math.floor(carouselIndex / 3) === idx ? "active" : ""
                    }`}
                    onClick={() => setCarouselIndex(idx * 3)}
                  ></span>
                )
              )}
            </div>

            <div className="view-all-container">
              <Link to="/recipes/new" className="view-all-button">
                צפייה בכל המתכונים החדשים
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recipes;
