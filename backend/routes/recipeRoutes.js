import express from 'express';

import recipeControllers from '../controllers/recipeControllers.js';

const { getAllRecipes, getRecipe, addRecipe, updateRecipe, deleteRecipe } =
    recipeControllers;

const router = express.Router();

// routes
router.get('/recipes', getAllRecipes);
router.get('/recipes/:id', getRecipe);
router.post('/recipes', addRecipe);
router.put('/recipes/:id', updateRecipe);
router.delete('/recipes/:id', deleteRecipe);

export default router;
