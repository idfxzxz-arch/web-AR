// Storage keys
export const STORAGE_KEYS = {
  BMC_DATA: 'krear_bmc_data',
  QUIZ_RESULT: 'krear_quiz_result',
  ASSESSMENT_RADAR: 'krear_assessment_radar',
  ACTIVE_PRODUCT: 'krear_active_product_id',
  COMPLETED_MODULES: 'krear_completed_modules'
};

/**
 * Get item from LocalStorage with fallback
 */
export const getItem = (key, fallback = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return fallback;
  }
};

/**
 * Set item in LocalStorage
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Remove item from LocalStorage
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};

/**
 * Clear all KREAR-related keys
 */
export const clearKrearData = () => {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
};

