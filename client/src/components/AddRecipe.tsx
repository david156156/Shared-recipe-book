import { FieldArray, FormikProvider, useFormik } from "formik";
import { useState, useEffect, useRef, FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "../styles/index.css";
import { createRecipe } from "../services/recipeService";
import { Recipe } from "../interfaces/Recipe";
import { useRecipes } from "../context/recipeContext";

interface AddRecipeProps {
  onClose: () => void;
}

const AddRecipe: FunctionComponent<AddRecipeProps> = ({ onClose }) => {
  const { setRefreshed, refreshed } = useRecipes();
  const [ingredients, setIngredients] = useState([""]);
  const [instructions, setInstructions] = useState([""]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      ingredients: [""],
      instructions: [""],
      image: "",
      dairyMeatType: "",
      mealType: [],
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("שם המתכון הוא שדה חובה")
        .trim()
        .max(50, "הכותרת ארוכה מדי"),
      ingredients: Yup.array()
        .of(Yup.string().trim())
        .min(2, "נדרשים לפחות 2 מרכיבים"),
      instructions: Yup.array()
        .of(Yup.string().trim())
        .min(1, "יש להוסיף לפחות הוראה אחת"),
      image: Yup.string().trim().url("כתובת לא חוקית"),
      dairyMeatType: Yup.string()
        .oneOf(["בשרי", "חלבי", "פרווה"], "יש לבחור סוג")
        .required("שדה חובה"),
      mealType: Yup.array().of(Yup.string().min(3).trim()),
    }),
    validateOnBlur: true,
    onSubmit: async (values: Recipe) => {
      console.log(values);
      try {
        const response = await createRecipe(values);
        console.log(response);
        setRefreshed(!refreshed);
        alert("המתכון נוסף בהצלחה");
        onClose();
        formik.resetForm();
        setIngredients([""]);
        setInstructions([""]);
      } catch (error) {
        alert("הוספת המתכון נכשלה");
      }
    },
  });

  // פונקציות לניהול מערך הרכיבים
  const handleIngredientChange = (index: number, value: string) => {
    // עדכון מצב המערך הלוקאלי
    const updatedIngredients = [...ingredients];
    updatedIngredients[index] = value;
    setIngredients(updatedIngredients);

    // עדכון ערכי הטופס
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const addIngredient = () => {
    const updatedIngredients = [...ingredients, ""];
    setIngredients(updatedIngredients);
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  const removeIngredient = (index: number) => {
    // מונע מחיקת הרכיב האחרון
    if (ingredients.length <= 1) return;

    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
    formik.setFieldValue("ingredients", updatedIngredients);
  };

  // פונקציות לניהול מערך הוראות ההכנה
  const handleInstructionChange = (index: number, value: string) => {
    // עדכון מצב המערך הלוקאלי
    const updatedInstructions = [...instructions];
    updatedInstructions[index] = value;
    setInstructions(updatedInstructions);

    // עדכון ערכי הטופס
    formik.setFieldValue("instructions", updatedInstructions);
  };

  const addInstruction = () => {
    const updatedInstructions = [...instructions, ""];
    setInstructions(updatedInstructions);
    formik.setFieldValue("instructions", updatedInstructions);
  };

  const removeInstruction = (index: number) => {
    // מונע מחיקת ההוראה האחרונה
    if (instructions.length <= 1) return;

    const updatedInstructions = [...instructions];
    updatedInstructions.splice(index, 1);
    setInstructions(updatedInstructions);
    formik.setFieldValue("instructions", updatedInstructions);
  };
  return (
    <div>
      <h1 className="form-title">הוספת מתכון חדש</h1>
      <form className="form" onSubmit={formik.handleSubmit}>
        <div className="login-form-group">
          <label htmlFor="title">שם המתכון</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.title}
          />
          {formik.touched.title && formik.errors.title && (
            <div className="login-error">{formik.errors.title}</div>
          )}
        </div>

        <div className="login-form-group">
          <label htmlFor="dairyMeatType">סוג הארוחה</label>
          <select
            id="dairyMeatType"
            name="dairyMeatType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.dairyMeatType}
            className={
              formik.touched.dairyMeatType && formik.errors.dairyMeatType
                ? "select-error"
                : ""
            }
          >
            <option value="">בחר סוג</option>
            <option value="בשרי">בשרי</option>
            <option value="פרווה">פרווה</option>
            <option value="חלבי">חלבי</option>
          </select>
          {formik.touched.dairyMeatType && formik.errors.dairyMeatType && (
            <div className="login-error">{formik.errors.dairyMeatType}</div>
          )}
        </div>

        {/* רכיבים */}
        <div className="login-form-group">
          <label>רכיבים:</label>
          <div className="ingredients-container">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <button
                  type="button"
                  className="add-btn"
                  onClick={addIngredient}
                >
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "#004d01" }}
                  ></i>
                </button>
                <input
                  type="text"
                  placeholder={`רכיב ${index + 1}`}
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  className="name-input"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeIngredient(index)}
                  disabled={ingredients.length <= 1}
                  aria-label="הסר רכיב"
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#4d0000" }}
                  ></i>
                </button>
              </div>
            ))}
          </div>
          {formik.touched.ingredients &&
            typeof formik.errors.ingredients === "string" && (
              <div className="error-message">{formik.errors.ingredients}</div>
            )}
        </div>

        {/* הוראות הכנה */}
        <div className="login-form-group">
          <label>הוראות הכנה:</label>
          <div className="instructions-container">
            {instructions.map((instruction, index) => (
              <div key={index} className="instruction-row">
                <button
                  type="button"
                  className="add-btn"
                  onClick={addInstruction}
                >
                  <i
                    className="fa-solid fa-plus"
                    style={{ color: "#004d01" }}
                  ></i>
                </button>
                <input
                  type="text"
                  placeholder={`הוראה ${index + 1}`}
                  value={instruction}
                  onChange={(e) =>
                    handleInstructionChange(index, e.target.value)
                  }
                  onBlur={formik.handleBlur}
                  className="instruction-input"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => removeInstruction(index)}
                  disabled={instructions.length <= 1}
                  aria-label="הסר הוראה"
                >
                  <i
                    className="fa-solid fa-trash"
                    style={{ color: "#4d0000" }}
                  ></i>
                </button>
              </div>
            ))}
          </div>
          {formik.touched.instructions &&
            typeof formik.errors.instructions === "string" && (
              <div className="error-message">{formik.errors.instructions}</div>
            )}
        </div>

        <div className="login-form-group">
          <label htmlFor="image">קישור לתמונת המתכון</label>
          <input
            type="text"
            id="image"
            name="image"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.image}
          />
          {formik.touched.image && formik.errors.image && (
            <div className="login-error">{formik.errors.image}</div>
          )}
        </div>

        <button
          type="submit"
          className="login-submit-button"
          disabled={formik.isSubmitting || (!formik.isValid && formik.dirty)}
        >
          הוסף מתכון
        </button>
      </form>
    </div>
  );
};

export default AddRecipe;
