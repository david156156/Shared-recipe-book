import { FunctionComponent, useState } from "react";
import { useRecipes } from "../context/recipeContext";
import { useUser } from "../context/userContext";
import DeleteRecipeModal from "./DeleteRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import { deleteRecipe } from "../services/recipeService";
import { Recipe } from "../interfaces/Recipe";
import AddRecipe from "./AddRecipe";

interface MeBookProps {}

const MeBook: FunctionComponent<MeBookProps> = () => {
  const [openEditRecipeModal, setOpenEditRecipeModal] = useState(false);
  const [openDeleteRecipeModal, setOpenDeleteRecipeModal] = useState(false);
  const [recipeToDelete, setRecipeToDelete] = useState<string | null>(null);
  const [recipeToEdit, setRecipeToEdit] = useState<Recipe | null>(null);

  const {
    recipes,
    setRecipes,
    handleRecipeClick,
    handleLikeRecipe,
    openAddRecipeModal,
    setOpenAddRecipeModal,
  } = useRecipes();
  const { user } = useUser();

  const myBook = recipes.filter((recipe) =>
    recipe.userId?.includes(user?._id || "")
  );

  const handleDeleteRecipe = () => {
    if (recipeToDelete) {
      deleteRecipe(recipeToDelete);
      const updatedRecipes = recipes.filter(
        (recipe) => recipe._id !== recipeToDelete
      );
      setRecipes(updatedRecipes);
      setRecipeToDelete(null);
      setOpenDeleteRecipeModal(false);
    }
  };

  if (!user) {
    return (
      <div className="container" style={{ minHeight: "65vh", padding: "2rem" }}>
        <h1>התחבר או הירשם כדי לגשת לספר המתכונים שלך.</h1>
      </div>
    );
  }
  return (
    <>
      <div className="recipes-container">
        <section className="hero-section">
          <div className="hero-content">
            <h1>ספר המתכונים שלי</h1>
          </div>
        </section>
        <div className="main-content">
          {myBook.map((recipe) => (
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
                <div className="card-text-container">
                  <p className="card-text">
                    <i
                      className="fa-solid fa-pen-to-square"
                      style={{ color: "#004d01" }}
                      onClick={() => {
                        setOpenEditRecipeModal(true);
                        setRecipeToEdit(recipe);
                      }}
                    ></i>
                  </p>
                  <p className="card-text">
                    <i
                      className="fa-solid fa-trash"
                      style={{ color: "#ff4242" }}
                      onClick={() => {
                        setRecipeToDelete(recipe._id || null);
                        setOpenDeleteRecipeModal(true);
                      }}
                    ></i>
                  </p>
                </div>
              </div>
            </div>
          ))}

          {openEditRecipeModal && (
            <div>
              <div
                className="add-recipe-modal"
                onClick={() => setOpenEditRecipeModal(false)}
              ></div>
              <div className="add-recipe-modal-content">
                <EditRecipeModal
                  recipe={recipeToEdit!}
                  onClose={() => setOpenEditRecipeModal(false)}
                />
              </div>
            </div>
          )}
          {openDeleteRecipeModal && (
            <div>
              <div
                className="add-recipe-modal"
                onClick={() => setOpenDeleteRecipeModal(false)}
              ></div>
              <div className="add-recipe-modal-content">
                <DeleteRecipeModal
                  onClose={() => setOpenDeleteRecipeModal(false)}
                  onDelete={handleDeleteRecipe}
                />
              </div>
            </div>
          )}
        </div>
        <div
          className="add-recipe-button"
          onClick={() => setOpenAddRecipeModal(true)}
        >
          <i className="fa-solid fa-plus"></i>
        </div>
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

export default MeBook;
