import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Restaurant } from '@/types/restaurantDetails';
import { RestaurantMenu } from '@/types/restaurantMenu';

export interface RestaurantState {
  detail: Restaurant | null
  menu: RestaurantMenu | null
  detailStatus: 'idle' | 'pending' | 'succeeded' | 'rejected',
  menuStatus: 'idle' | 'pending' | 'succeeded' | 'rejected',
  error: string | null
}

const isDevelopment = import.meta.env.VITE_ENV === 'development';
const apiBaseUrl = isDevelopment ? '/api/' : '/.netlify/functions/fetchData?endpoint=';

// Async thunks to fetch data
export const fetchRestaurantDetails = createAsyncThunk<Restaurant>(
  'restaurant/fetchDetails',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiBaseUrl}venue/9`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue('An unknown error occurred');
      }
    }
  }
)

export const fetchRestaurantMenu = createAsyncThunk<RestaurantMenu>(
  'restaurant/fetchMenu',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${apiBaseUrl}menu`, {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant menu');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        rejectWithValue(error.message);
      } else {
        rejectWithValue('An unknown error occurred');
      }
    }
  }
)

const initialState: RestaurantState = {
  detail: null,
  menu: null,
  detailStatus: 'idle',
  menuStatus: 'idle',
  error: null
}

const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    // clearRestaurant (state) {
    //   state.detail = null;
    //   state.detailStatus = 'idle';
    // },
  },
  extraReducers: (builder) => {
    builder
      // Handle restaurant details
      .addCase(fetchRestaurantDetails.pending, (state) => {
        state.detailStatus = 'pending';
      })
      .addCase(fetchRestaurantDetails.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.detail = action.payload;
      })
      .addCase(fetchRestaurantDetails.rejected, (state, action) => {
        state.detailStatus = 'rejected';
        state.error = action.error.message || 'Failed to fetch';
      })

      // Handle restaurant menu
      .addCase(fetchRestaurantMenu.pending, (state) => {
        state.menuStatus = 'pending';
      })
      .addCase(fetchRestaurantMenu.fulfilled, (state, action) => {
        state.menuStatus = 'succeeded';
        state.menu = action.payload;
      })
      .addCase(fetchRestaurantMenu.rejected, (state, action) => {
        state.menuStatus = 'rejected';
        state.error = action.error.message || 'Failed to fetch';
      });

  },
});

// export const { clearRestaurant } = restaurantSlice.actions;
export default restaurantSlice.reducer;
