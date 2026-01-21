
import { useParams } from 'react-router-dom';
import React from 'react';

function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors de la récupération des détails.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{textAlign:'center',marginTop:'2rem'}}>Chargement...</div>;
  if (error) return <div style={{color:'red',textAlign:'center',marginTop:'2rem'}}>{error}</div>;
  if (!meal) return <div style={{color:'#ff9800',textAlign:'center',marginTop:'2rem'}}>Recette non trouvée.</div>;

  // Fonction pour extraire ingrédients et quantités
  const getIngredients = (meal) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const ingredients = getIngredients(meal);

  return (
    <div style={{textAlign: 'center', marginTop: '3rem'}}>
      <h2>{meal.strMeal}</h2>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{width:'250px',borderRadius:'12px',margin:'1rem 0'}} />
      <p><b>Catégorie :</b> {meal.strCategory} | <b>Origine :</b> {meal.strArea}</p>
      <div style={{margin:'2rem auto',maxWidth:'400px',textAlign:'left'}}>
        <b>Ingrédients :</b>
        <ul>
          {ingredients.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <p style={{maxWidth:'600px',margin:'2rem auto',textAlign:'left'}}><b>Instructions :</b><br />{meal.strInstructions}</p>
    </div>
  );
}

export default RecipeDetail;
