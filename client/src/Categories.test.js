import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import CategoryPage from './Pages/Categories';
import CategoriesSlice from './Redux/CategoriesSlice'; // Assuming you have a rootReducer

// Mock the useDispatch hook to spy on dispatched actions
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

// Mock the fetchCategories and fetchCourses actions
const mockFetchCategories = jest.fn();
const mockFetchCourses = jest.fn();

jest.mock('./Redux/CategoriesSlice', () => ({
  ...jest.requireActual('./Redux/CategoriesSlice'),
  fetchCategories: () => mockFetchCategories(),
}));

jest.mock('./Redux/CoursesSlice', () => ({
  ...jest.requireActual('./Redux/CoursesSlice'),
  fetchCourses: () => mockFetchCourses(),
}));

// Mock the useSelector hook to return mock state
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('CategoryPage', () => {
  beforeEach(() => {
    // Reset mock calls and states before each test
    jest.clearAllMocks();
    jest.resetModules();
  });

  test('fetches data correctly', async () => {
    // Mock the useSelector hook to return some dummy data
    const mockCategories = [{ id: 1, title: 'Category 1', type: 'category1' }];
    const mockCourses = [{ id: 1, title: 'Course 1', category: 'category1' }];

    useSelector.mockReturnValueOnce({ categories: mockCategories });
    useSelector.mockReturnValueOnce({ Courses: { courses: mockCourses } });

    render(
      <Provider store={createStore(CategoriesSlice)}>
        <CategoryPage />
      </Provider>
    );

    // Expect the fetchCategories and fetchCourses to be called
    expect(mockFetchCategories).toHaveBeenCalled();
    expect(mockFetchCourses).toHaveBeenCalled();

    // Wait for the component to render with the fetched data
    await waitFor(() => {
      // Verify that the CategoryPage component renders correctly with the fetched data
      // You can add more specific assertions based on your component structure
      expect(screen.getByText('Category 1')).toBeInTheDocument();
      expect(screen.getByText('Course 1')).toBeInTheDocument();
    });
  });
});
