import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { Spacing, FontSizes, BorderRadius } from '../constants/theme';

const screenWidth = Dimensions.get('window').width;

type Recipe = {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  ingredients: string[];
  instructions: string[];
};

export default function RecipesScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'High Protein', 'Low Carb', 'Vegetarian', 'Quick & Easy'];

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Grilled Chicken & Quinoa Bowl',
      calories: 450,
      protein: 45,
      carbs: 38,
      fat: 12,
      prepTime: '15 min',
      cookTime: '20 min',
      servings: 2,
      difficulty: 'Easy',
      tags: ['High Protein', 'Gluten-Free'],
      ingredients: [
        '200g chicken breast',
        '1 cup quinoa',
        '1 cup broccoli',
        '1/2 avocado',
        'Olive oil',
        'Lemon juice',
        'Salt & pepper',
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Season chicken with salt, pepper, and lemon juice',
        'Grill chicken for 6-7 minutes per side until cooked through',
        'Steam broccoli for 5 minutes',
        'Slice avocado',
        'Assemble bowl with quinoa, sliced chicken, broccoli, and avocado',
        'Drizzle with olive oil and extra lemon juice',
      ],
    },
    {
      id: '2',
      name: 'Protein Pancakes',
      calories: 320,
      protein: 28,
      carbs: 35,
      fat: 8,
      prepTime: '5 min',
      cookTime: '10 min',
      servings: 1,
      difficulty: 'Easy',
      tags: ['High Protein', 'Quick & Easy', 'Vegetarian'],
      ingredients: [
        '1 scoop protein powder (vanilla)',
        '2 eggs',
        '1 banana',
        '1/4 cup oats',
        '1/2 tsp baking powder',
        'Cinnamon to taste',
        'Berries for topping',
      ],
      instructions: [
        'Mash banana in a bowl',
        'Add eggs and mix well',
        'Add protein powder, oats, baking powder, and cinnamon',
        'Mix until smooth batter forms',
        'Heat non-stick pan over medium heat',
        'Pour batter to make 3-4 pancakes',
        'Cook 2-3 minutes per side until golden',
        'Top with fresh berries',
      ],
    },
    {
      id: '3',
      name: 'Salmon with Roasted Vegetables',
      calories: 520,
      protein: 42,
      carbs: 25,
      fat: 28,
      prepTime: '10 min',
      cookTime: '25 min',
      servings: 2,
      difficulty: 'Medium',
      tags: ['High Protein', 'Low Carb', 'Omega-3'],
      ingredients: [
        '2 salmon fillets (150g each)',
        '2 cups mixed vegetables (bell peppers, zucchini, cherry tomatoes)',
        '2 tbsp olive oil',
        '2 cloves garlic, minced',
        'Fresh dill',
        'Lemon',
        'Salt & pepper',
      ],
      instructions: [
        'Preheat oven to 400°F (200°C)',
        'Chop vegetables into bite-sized pieces',
        'Toss vegetables with 1 tbsp olive oil, garlic, salt, and pepper',
        'Spread vegetables on baking sheet',
        'Season salmon with salt, pepper, and dill',
        'Place salmon on vegetables',
        'Drizzle with remaining olive oil and lemon juice',
        'Bake for 20-25 minutes until salmon is cooked through',
        'Serve with lemon wedges',
      ],
    },
    {
      id: '4',
      name: 'Veggie Stir-Fry with Tofu',
      calories: 380,
      protein: 22,
      carbs: 42,
      fat: 15,
      prepTime: '15 min',
      cookTime: '12 min',
      servings: 2,
      difficulty: 'Easy',
      tags: ['Vegetarian', 'Quick & Easy', 'Low Fat'],
      ingredients: [
        '200g firm tofu',
        '2 cups mixed vegetables (broccoli, carrots, snap peas)',
        '1 cup brown rice',
        '2 tbsp soy sauce',
        '1 tbsp sesame oil',
        '2 cloves garlic, minced',
        '1 tsp ginger, grated',
        'Sesame seeds',
      ],
      instructions: [
        'Cook brown rice according to package',
        'Press tofu to remove excess water, then cube',
        'Heat sesame oil in wok or large pan',
        'Fry tofu until golden on all sides, remove and set aside',
        'Add garlic and ginger to pan, cook 30 seconds',
        'Add vegetables, stir-fry for 5-6 minutes',
        'Return tofu to pan',
        'Add soy sauce and toss everything together',
        'Serve over rice and garnish with sesame seeds',
      ],
    },
  ];

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesFilter =
      selectedFilter === 'All' || recipe.tags.includes(selectedFilter);
    const matchesSearch =
      searchQuery === '' ||
      recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      recipe.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return colors.success;
      case 'Medium':
        return colors.warning;
      case 'Hard':
        return colors.error;
      default:
        return colors.text;
    }
  };

  const renderRecipeCard = (recipe: Recipe) => (
    <TouchableOpacity
      key={recipe.id}
      style={[styles.recipeCard, { backgroundColor: colors.card }]}
      onPress={() => setSelectedRecipe(recipe)}
    >
      <LinearGradient
        colors={[colors.primary + '10', 'transparent']}
        style={styles.recipeGradient}
      >
        <View style={styles.recipeHeader}>
          <View style={styles.recipeInfo}>
            <Text style={[styles.recipeName, { color: colors.text }]}>{recipe.name}</Text>
            <View style={styles.recipeTags}>
              {recipe.tags.slice(0, 2).map((tag, index) => (
                <View
                  key={index}
                  style={[styles.tag, { backgroundColor: colors.primary + '20' }]}
                >
                  <Text style={[styles.tagText, { color: colors.primary }]}>{tag}</Text>
                </View>
              ))}
            </View>
          </View>
          <View
            style={[
              styles.difficultyBadge,
              { backgroundColor: getDifficultyColor(recipe.difficulty) + '20' },
            ]}
          >
            <Text
              style={[styles.difficultyText, { color: getDifficultyColor(recipe.difficulty) }]}
            >
              {recipe.difficulty}
            </Text>
          </View>
        </View>

        <View style={styles.macrosRow}>
          <View style={styles.macroItem}>
            <Ionicons name="flame" size={18} color={colors.error} />
            <Text style={[styles.macroValue, { color: colors.text }]}>{recipe.calories}</Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>kcal</Text>
          </View>
          <View style={styles.macroItem}>
            <Ionicons name="fitness" size={18} color={colors.success} />
            <Text style={[styles.macroValue, { color: colors.text }]}>{recipe.protein}g</Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>protein</Text>
          </View>
          <View style={styles.macroItem}>
            <Ionicons name="nutrition" size={18} color={colors.warning} />
            <Text style={[styles.macroValue, { color: colors.text }]}>{recipe.carbs}g</Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>carbs</Text>
          </View>
          <View style={styles.macroItem}>
            <Ionicons name="water" size={18} color={colors.info} />
            <Text style={[styles.macroValue, { color: colors.text }]}>{recipe.fat}g</Text>
            <Text style={[styles.macroLabel, { color: colors.textSecondary }]}>fat</Text>
          </View>
        </View>

        <View style={styles.recipeFooter}>
          <View style={styles.timeInfo}>
            <Ionicons name="time" size={16} color={colors.textSecondary} />
            <Text style={[styles.timeText, { color: colors.textSecondary }]}>
              Prep: {recipe.prepTime} • Cook: {recipe.cookTime}
            </Text>
          </View>
          <View style={styles.servingsInfo}>
            <Ionicons name="restaurant" size={16} color={colors.textSecondary} />
            <Text style={[styles.servingsText, { color: colors.textSecondary }]}>
              {recipe.servings} servings
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderRecipeDetail = () => {
    if (!selectedRecipe) return null;

    return (
      <View style={styles.detailContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedRecipe(null)}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
          <Text style={[styles.backText, { color: colors.text }]}>Back to Recipes</Text>
        </TouchableOpacity>

        <View style={[styles.detailHeader, { backgroundColor: colors.card }]}>
          <LinearGradient
            colors={[colors.primary, colors.secondary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.detailGradient}
          >
            <Text style={styles.detailName}>{selectedRecipe.name}</Text>
            <View style={styles.detailBadges}>
              <View style={styles.detailBadge}>
                <Text style={styles.badgeText}>{selectedRecipe.difficulty}</Text>
              </View>
              <View style={styles.detailBadge}>
                <Text style={styles.badgeText}>{selectedRecipe.servings} servings</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        <View style={[styles.nutritionCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Nutrition Per Serving</Text>
          <View style={styles.nutritionGrid}>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {selectedRecipe.calories}
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                Calories
              </Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {selectedRecipe.protein}g
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>
                Protein
              </Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {selectedRecipe.carbs}g
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Carbs</Text>
            </View>
            <View style={styles.nutritionItem}>
              <Text style={[styles.nutritionValue, { color: colors.text }]}>
                {selectedRecipe.fat}g
              </Text>
              <Text style={[styles.nutritionLabel, { color: colors.textSecondary }]}>Fat</Text>
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Ingredients</Text>
          {selectedRecipe.ingredients.map((ingredient, index) => (
            <View key={index} style={styles.ingredientItem}>
              <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
              <Text style={[styles.ingredientText, { color: colors.text }]}>{ingredient}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Instructions</Text>
          {selectedRecipe.instructions.map((instruction, index) => (
            <View key={index} style={styles.instructionItem}>
              <View style={[styles.stepNumber, { backgroundColor: colors.primary }]}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
              <Text style={[styles.instructionText, { color: colors.text }]}>
                {instruction}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.addToMealButton, { backgroundColor: colors.primary }]}>
          <Ionicons name="add-circle" size={24} color="#FFF" />
          <Text style={styles.addToMealText}>Add to Meal Plan</Text>
        </TouchableOpacity>

        <View style={{ height: Spacing.xl }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          {navigation.canGoBack() && (
            <TouchableOpacity
              style={styles.headerBackButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
          )}
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>Recipes</Text>
            <Text style={styles.headerSubtitle}>Healthy & delicious meals</Text>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        {!selectedRecipe ? (
          <>
            <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
              <Ionicons name="search" size={20} color={colors.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: colors.text }]}
                placeholder="Search recipes..."
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.filtersScroll}
              contentContainerStyle={styles.filtersContent}
            >
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter}
                  style={[
                    styles.filterChip,
                    {
                      backgroundColor:
                        selectedFilter === filter ? colors.primary : colors.card,
                    },
                  ]}
                  onPress={() => setSelectedFilter(filter)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      { color: selectedFilter === filter ? '#FFF' : colors.text },
                    ]}
                  >
                    {filter}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {filteredRecipes.map((recipe) => renderRecipeCard(recipe))}
          </>
        ) : (
          renderRecipeDetail()
        )}

        <View style={{ height: Spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerBackButton: {
    marginRight: Spacing.md,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255,255,255,0.85)',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: Spacing.lg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderRadius: 16,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  searchInput: {
    flex: 1,
    fontSize: FontSizes.md,
  },
  filtersScroll: {
    marginBottom: Spacing.lg,
  },
  filtersContent: {
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 20,
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  recipeCard: {
    borderRadius: 20,
    marginBottom: Spacing.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  recipeGradient: {
    padding: Spacing.lg,
  },
  recipeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.md,
  },
  recipeInfo: {
    flex: 1,
  },
  recipeName: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.sm,
  },
  recipeTags: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tagText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
  },
  difficultyBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  macrosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spacing.md,
  },
  macroItem: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: FontSizes.md,
    fontWeight: '800',
    marginTop: 4,
  },
  macroLabel: {
    fontSize: FontSizes.xs,
  },
  recipeFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  timeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: FontSizes.xs,
  },
  servingsInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  servingsText: {
    fontSize: FontSizes.xs,
  },
  detailContainer: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  backText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
  },
  detailHeader: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
  },
  detailGradient: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  detailName: {
    fontSize: FontSizes.xxl,
    fontWeight: '800',
    color: '#FFF',
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  detailBadges: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  detailBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  badgeText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '700',
  },
  nutritionCard: {
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '800',
    marginBottom: Spacing.md,
  },
  nutritionGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  nutritionItem: {
    alignItems: 'center',
  },
  nutritionValue: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    marginBottom: 4,
  },
  nutritionLabel: {
    fontSize: FontSizes.sm,
  },
  section: {
    padding: Spacing.lg,
    borderRadius: 16,
    marginBottom: Spacing.lg,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  ingredientText: {
    fontSize: FontSizes.md,
    flex: 1,
  },
  instructionItem: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepNumberText: {
    color: '#FFF',
    fontSize: FontSizes.sm,
    fontWeight: '800',
  },
  instructionText: {
    flex: 1,
    fontSize: FontSizes.md,
    lineHeight: 22,
  },
  addToMealButton: {
    flexDirection: 'row',
    padding: Spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  addToMealText: {
    color: '#FFF',
    fontSize: FontSizes.lg,
    fontWeight: '800',
  },
});
