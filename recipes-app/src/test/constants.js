// ============----------------COMPONENT LOGIN------------==============
// =====================================================================
export const VALID_EMAIL = 'alguem@pessoa.com';
export const VALID_PASSWORD = 'teste123';
export const INVALID_EMAIL = 'invalid-Login';
export const INVALID_PASSWORD = '123';

// ============----------------COMPONENT HEADER-----------==============
// =====================================================================
export const getElementsHeader = () => {
  const PROFILE_TOP_BTN = 'profile-top-btn';
  const PAGE_TITLE = 'page-title';
  const SEARCH_TOP_BTN = 'search-top-btn';

  return [
    PROFILE_TOP_BTN,
    PAGE_TITLE,
    SEARCH_TOP_BTN,
  ];
};

// ============----------------COMPONENT SEARCHBAR--------==============
// =====================================================================
export const getElementsSearchBar = () => {
  const SEARCH_INPUT = 'search-input';
  const INGREDIENT_SEARCH_RADIO = 'ingredient-search-radio';
  const NAME_SEARCH_RADIO = 'name-search-radio';
  const FIRST_LETTER_SEARCH_RADIO = 'first-letter-search-radio';
  const EXEC_SEARCH_BTN = 'exec-search-btn';

  return [
    SEARCH_INPUT,
    INGREDIENT_SEARCH_RADIO,
    NAME_SEARCH_RADIO,
    FIRST_LETTER_SEARCH_RADIO,
    EXEC_SEARCH_BTN,
  ];
};

// ============----------------PAGE PROFILE---------------==============
// =====================================================================
export const getElementsProfilePage = () => {
  const PROFILE_EMAIL = 'profile-email';
  const PROFILE_DONE_BTN = 'profile-done-btn';
  const PROFILE_FAVORITE_BTN = 'profile-favorite-btn';
  const PROFILE_LOGOUT_BTN = 'profile-logout-btn';

  return [
    PROFILE_EMAIL,
    PROFILE_DONE_BTN,
    PROFILE_FAVORITE_BTN,
    PROFILE_LOGOUT_BTN,
  ];
};

// ============----------------PAGE RECIPES---------------==============
// =====================================================================
export const getElementsDetails = () => {
  const RECIPE_PHOTO = 'recipe-photo';
  const RECIPE_TITLE = 'recipe-title';
  const RECIPE_CATEGORY = 'recipe-category';
  const INSTRUCTIONS = 'instructions';

  return [
    RECIPE_PHOTO,
    RECIPE_TITLE,
    RECIPE_CATEGORY,
    INSTRUCTIONS,
  ];
};
