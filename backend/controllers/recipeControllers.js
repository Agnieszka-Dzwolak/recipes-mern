import Recipe from '../models/recipe.js';

const recipeControllers = {
    getAllRecipes: async (req, res) => {
        try {
            const recipes = await Recipe.find();
            if (recipes.length === 0) {
                res.status(404).json({ message: 'No recipes found' });
            } else {
                res.status(200).json(recipes);
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const recipe = await Recipe.findOne({ _id: id });

            if (recipe) {
                res.status(200).json(recipe);
            } else {
                res.status(404).json({ message: 'Recipe not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    addRecipe: async (req, res) => {
        const { title, ingredients, description, image } = req.body;
        try {
            if (title && ingredients && description && image) {
                const newRecipe = new Recipe({
                    title,
                    ingredients,
                    description,
                    image
                });
                await newRecipe.save();
                res.status(201).json(newRecipe);
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    updateRecipe: async (req, res) => {
        const { id } = req.params;
        const { title, ingredients, description, image } = req.body;

        try {
            if (title && ingredients && description && image) {
                const updatedRecipe = await Recipe.updateOne(
                    { _id: id },
                    { title, ingredients, description, image }
                );

                if (updatedRecipe.modifiedCount === 0) {
                    res.status(400).json({ message: 'Recipe not updated' });
                } else {
                    res.status(200).json({
                        message: 'Recipe has been updated'
                    });
                }
            } else {
                res.status(400).json({ message: 'All fields are required' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteRecipe: async (req, res) => {
        const { id } = req.params;
        try {
            const deletedRecipe = await Recipe.deleteOne({ _id: id });

            if (deletedRecipe.deletedCount === 0) {
                res.status(400).json({ message: 'Recipe cannot be deleted' });
            } else {
                res.status(200).json({
                    message: 'Recipe deleted successfully'
                });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default recipeControllers;
