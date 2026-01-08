import { Recipe } from '@/types/recipe';

/**
 * Sample sourdough bread recipes for the application
 */
export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Basic Sourdough Bread',
    description: 'A classic sourdough loaf with a crispy crust and chewy interior. Perfect for beginners.',
    totalTimeMinutes: 1440, // 24 hours
    yield: '1 loaf',
    ingredientSections: [
      {
        name: 'Starter',
        ingredients: [
          '100g active sourdough starter',
          '100g bread flour',
          '100g water',
        ],
      },
      {
        name: 'Dough',
        ingredients: [
          '500g bread flour',
          '350g water',
          '10g salt',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Feed your sourdough starter and let it become active (bubbly and doubled in size).',
        durationMinutes: 240,
      },
      {
        stepNumber: 2,
        instruction: 'Mix the active starter with water in a large bowl until well combined.',
        durationMinutes: 5,
      },
      {
        stepNumber: 3,
        instruction: 'Add the flour and mix until no dry flour remains. Let rest for 30 minutes (autolyse).',
        durationMinutes: 30,
      },
      {
        stepNumber: 4,
        instruction: 'Add salt and work it into the dough by folding and kneading for 5 minutes.',
        durationMinutes: 5,
      },
      {
        stepNumber: 5,
        instruction: 'Perform stretch and folds every 30 minutes for 3-4 hours during bulk fermentation.',
        durationMinutes: 240,
      },
      {
        stepNumber: 6,
        instruction: 'Shape the dough and place in a proofing basket. Cover and refrigerate overnight.',
        durationMinutes: 720,
      },
      {
        stepNumber: 7,
        instruction: 'Preheat oven to 450°F (230°C) with a Dutch oven inside for 45 minutes.',
        durationMinutes: 45,
      },
      {
        stepNumber: 8,
        instruction: 'Score the dough and bake covered for 20 minutes, then uncovered for 25-30 minutes until golden brown.',
        durationMinutes: 50,
      },
    ],
  },
  {
    id: '2',
    name: 'Whole Wheat Sourdough',
    description: 'A hearty whole wheat sourdough with nutty flavor and dense texture.',
    totalTimeMinutes: 1500, // 25 hours
    yield: '1 loaf',
    ingredientSections: [
      {
        name: 'Dough',
        ingredients: [
          '150g active sourdough starter',
          '300g whole wheat flour',
          '200g bread flour',
          '350g water',
          '12g salt',
          '30g honey',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Mix active starter, water, and honey in a bowl until dissolved.',
        durationMinutes: 5,
      },
      {
        stepNumber: 2,
        instruction: 'Add both flours and mix until combined. Rest for 45 minutes.',
        durationMinutes: 45,
      },
      {
        stepNumber: 3,
        instruction: 'Add salt and knead into the dough for 10 minutes.',
        durationMinutes: 10,
      },
      {
        stepNumber: 4,
        instruction: 'Perform stretch and folds every 45 minutes for 4-5 hours.',
        durationMinutes: 300,
      },
      {
        stepNumber: 5,
        instruction: 'Shape and place in proofing basket. Refrigerate for 12-16 hours.',
        durationMinutes: 840,
      },
      {
        stepNumber: 6,
        instruction: 'Preheat oven to 450°F with Dutch oven for 45 minutes.',
        durationMinutes: 45,
      },
      {
        stepNumber: 7,
        instruction: 'Score and bake covered for 25 minutes, uncovered for 30 minutes.',
        durationMinutes: 55,
      },
    ],
  },
  {
    id: '3',
    name: 'Sourdough Baguettes',
    description: 'Crispy French-style baguettes with an open crumb structure.',
    totalTimeMinutes: 960, // 16 hours
    yield: '3 baguettes',
    ingredientSections: [
      {
        name: 'Dough',
        ingredients: [
          '200g active sourdough starter',
          '500g bread flour',
          '320g water',
          '10g salt',
        ],
      },
    ],
    steps: [
      {
        stepNumber: 1,
        instruction: 'Mix starter and water, then add flour. Rest for 30 minutes.',
        durationMinutes: 30,
      },
      {
        stepNumber: 2,
        instruction: 'Add salt and knead for 5 minutes until smooth.',
        durationMinutes: 5,
      },
      {
        stepNumber: 3,
        instruction: 'Perform 4 sets of stretch and folds, 30 minutes apart.',
        durationMinutes: 120,
      },
      {
        stepNumber: 4,
        instruction: 'Let dough bulk ferment for 6-8 hours at room temperature.',
        durationMinutes: 420,
      },
      {
        stepNumber: 5,
        instruction: 'Divide dough into 3 pieces and pre-shape into logs. Rest 20 minutes.',
        durationMinutes: 20,
      },
      {
        stepNumber: 6,
        instruction: 'Shape into baguettes and place in floured couche. Proof for 2-3 hours.',
        durationMinutes: 150,
      },
      {
        stepNumber: 7,
        instruction: 'Preheat oven to 475°F with baking stone and steam pan.',
        durationMinutes: 45,
      },
      {
        stepNumber: 8,
        instruction: 'Score baguettes, add steam, and bake for 20-25 minutes until golden.',
        durationMinutes: 25,
      },
    ],
  },
];
