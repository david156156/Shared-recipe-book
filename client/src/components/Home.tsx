import { useState } from "react";
import "../styles/index.css";
import AddRecipe from "./AddRecipe";
import { useRecipes } from "../context/recipeContext";
import { useUser } from "../context/userContext";

interface Recipe {}

const Home = () => {
  const {
    recipes,
    loading,
    handleRecipeClick,
    handleLikeRecipe,
    openAddRecipeModal,
    setOpenAddRecipeModal,
  } = useRecipes();
  const { user } = useUser();
  const [search, setSearch] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [selectedDishType, setSelectedDishType] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const uniqueMealTypes = Array.from(
    new Set(
      recipes
        .flatMap((recipe) => recipe.mealType || [])
        .filter((mealType) => mealType)
    )
  );

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesDishType =
      selectedDishType === "" || recipe.dairyMeatType === selectedDishType;
    const matchesMealType =
      selectedMealType === "" ||
      (recipe.mealType && recipe.mealType.includes(selectedMealType));
    return matchesSearch && matchesDishType && matchesMealType;
  });

  const resetFilters = () => {
    setSearch("");
    setSelectedMealType("");
    setSelectedDishType("");
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="recipes-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>ברוכים הבאים לספר המתכונים המשותף</h1>
            <p>גלו מתכונים חדשים והוסיפו את המתכונים האהובים עליכם</p>
          </div>
        </section>

        <div className="search-bar-container">
          <div className="search-bar-container-row">
            <input
              type="text"
              className="search-bar"
              placeholder="חפש מתכון..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="search-bar-container-row">
            <select
              value={selectedDishType}
              onChange={(e) => setSelectedDishType(e.target.value)}
              className="select"
            >
              <option value="">סוג מתכון</option>
              <option value="בשרי">בשרי</option>
              <option value="חלבי">חלבי</option>
              <option value="פרווה">פרווה</option>
            </select>
            <select
              value={selectedMealType}
              onChange={(e) => setSelectedMealType(e.target.value)}
              className="select"
            >
              <option value="">סוג ארוחה</option>
              {uniqueMealTypes.map((mealType) => (
                <option key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>

            <button onClick={resetFilters} className="filter-reset-btn">
              איפוס סינון
            </button>

            <div className="view-options">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
                aria-label="תצוגת רשת"
              >
                <i className="fa-solid fa-th"></i>
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
                aria-label="תצוגת רשימה"
              >
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        <div
          className={`main-content ${
            viewMode === "list" ? "list-view" : "grid-view"
          }`}
        >
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="card">
              <img
                onClick={() => handleRecipeClick(recipe._id || "")}
                src={recipe.image}
                className="card-img-top"
                alt={recipe.title}
              />
              <div className="card-body">
                <div className="card-text-container">
                  <h5 className="card-title">{recipe.title}</h5>
                  <p className="card-text">
                    {recipe.likes?.length}
                    <i
                      onClick={() => handleLikeRecipe(recipe._id || "")}
                      className="fa-solid fa-heart"
                      style={{ color: "#ff4242" }}
                    ></i>
                  </p>
                </div>
                <div className="card-text-container">
                  <p className="card-text">{recipe.dairyMeatType}</p>
                  <p className="card-text">
                    {recipe.ingredients.length} רכיבים
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {user && (
          <div
            className="add-recipe-button"
            onClick={() => setOpenAddRecipeModal(true)}
          >
            <i className="fa-solid fa-plus"></i>
          </div>
        )}

        {openAddRecipeModal && (
          <div>
            <div
              className="add-recipe-modal"
              onClick={() => setOpenAddRecipeModal(false)}
            ></div>
            <div className="add-recipe-modal-content">
              <AddRecipe onClose={() => setOpenAddRecipeModal(false)} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
