/**
 * Dragon Ball API Service Layer
 * 
 * This module implements a service layer pattern using ES6 classes to encapsulate
 * all API interactions with the Dragon Ball API. The class-based approach provides
 * several advantages:
 * 
 * 1. Namespace organization - All related API methods are grouped under DragonBallAPI
 * 2. Static methods eliminate the need for instantiation since we don't need state
 * 3. Consistent error handling and fallback mechanisms across all endpoints
 * 4. Easy mocking and testing capabilities
 * 5. Clear separation of concerns between data fetching and UI components
 */

import { mockCharacters, mockPlanets } from './mockData.js';

// API configuration - centralized endpoint management
const API_BASE_URL = 'https://dragonball-api.com/api';

/**
 * DragonBallAPI Class
 * 
 * Implements the Service Layer pattern for API interactions.
 * Uses static methods since we don't need instance state - all methods are stateless
 * and operate independently. This approach is more memory efficient and provides
 * a cleaner API surface.
 */
export class DragonBallAPI {
    /**
     * Fetches paginated character data from the Dragon Ball API
     * 
     * Implementation Details:
     * - Uses modern fetch API for HTTP requests
     * - Implements pagination through query parameters
     * - Graceful degradation: Falls back to mock data on network failures
     * - Returns standardized response format for consistent component handling
     * 
     * @param {number} page - Current page number (1-indexed)
     * @param {number} limit - Items per page for pagination control
     * @returns {Promise<Object>} Paginated response with items and metadata
     */
    static async getAllCharacters(page = 1, limit = 12) {
        try {
            // Construct URL with query parameters for pagination
            const response = await fetch(`${API_BASE_URL}/characters?page=${page}&limit=${limit}`);
            
            // HTTP status validation - ensures we handle 4xx/5xx responses appropriately
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching characters, using mock data:', error);
            
            // Fallback mechanism: Client-side pagination simulation using mock data
            // This ensures the application remains functional even when the API is unavailable
            const startIndex = (page - 1) * limit;
            const endIndex = startIndex + limit;
            const paginatedMockData = mockCharacters.slice(startIndex, endIndex);
            
            // Return API-compatible response structure for seamless fallback
            return {
                items: paginatedMockData,
                meta: {
                    totalItems: mockCharacters.length,
                    itemCount: paginatedMockData.length,
                    itemsPerPage: limit,
                    totalPages: Math.ceil(mockCharacters.length / limit),
                    currentPage: page
                }
            };
        }
    }
    
    /**
     * Retrieves individual character details by ID
     * 
     * Uses RESTful URL pattern (/characters/:id) for resource identification.
     * Implements the same fallback pattern as getAllCharacters for consistency.
     */
    static async getCharacterById(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/characters/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching character, using mock data:', error);
            
            // Mock data lookup with type conversion for ID matching
            const character = mockCharacters.find(char => char.id === parseInt(id));
            if (character) {
                return character;
            }
            throw new Error('Character not found');
        }
    }
    
    /**
     * Search functionality with client-side filtering
     * 
     * Note: The Dragon Ball API has limited search capabilities, so we implement
     * client-side filtering after fetching the data. In a production environment,
     * server-side search would be preferred for performance.
     */
    static async searchCharacters(name = '', race = '', page = 1, limit = 12) {
        try {
            let url = `${API_BASE_URL}/characters?page=${page}&limit=${limit}`;
            
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Client-side filtering implementation
            // This approach works for small datasets but should be server-side for larger ones
            let filteredItems = data.items || data;
            
            if (name) {
                filteredItems = filteredItems.filter(character => 
                    character.name.toLowerCase().includes(name.toLowerCase())
                );
            }
            
            if (race) {
                filteredItems = filteredItems.filter(character => 
                    character.race.toLowerCase().includes(race.toLowerCase())
                );
            }
            
            return {
                ...data,
                items: filteredItems
            };
        } catch (error) {
            console.error('Error searching characters, using mock data:', error);
            
            // Fallback search using mock data with same filtering logic
            let filteredItems = [...mockCharacters];
            
            if (name) {
                filteredItems = filteredItems.filter(character => 
                    character.name.toLowerCase().includes(name.toLowerCase())
                );
            }
            
            if (race) {
                filteredItems = filteredItems.filter(character => 
                    character.race.toLowerCase().includes(race.toLowerCase())
                );
            }
            
            return {
                items: filteredItems,
                meta: {
                    totalItems: filteredItems.length,
                    itemCount: filteredItems.length,
                    itemsPerPage: limit,
                    totalPages: 1,
                    currentPage: page
                }
            };
        }
    }
    
    /**
     * Planets endpoint - demonstrates extensibility of the service layer
     * Could be expanded to include transformations, relationships, etc.
     */
    static async getPlanets() {
        try {
            const response = await fetch(`${API_BASE_URL}/planets`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching planets, using mock data:', error);
            return {
                items: mockPlanets,
                meta: {
                    totalItems: mockPlanets.length,
                    itemCount: mockPlanets.length,
                    itemsPerPage: 10,
                    totalPages: 1,
                    currentPage: 1
                }
            };
        }
    }
}

/**
 * Centralized Error Handling Utility
 * 
 * Provides user-friendly error messages based on different failure scenarios.
 * This separation allows for easy customization of error messages and
 * potential integration with error reporting services.
 */
export function handleApiError(error) {
    if (error.message.includes('Failed to fetch')) {
        return 'Network error. Please check your internet connection.';
    } else if (error.message.includes('404')) {
        return 'Character not found.';
    } else if (error.message.includes('500')) {
        return 'Server error. Please try again later.';
    } else {
        return 'An unexpected error occurred. Please try again.';
    }
}
