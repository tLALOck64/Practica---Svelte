<script>
    import { onMount } from 'svelte';
    import CharacterCard from '$lib/CharacterCard.svelte';
    import SearchForm from '$lib/SearchForm.svelte';
    import LoadingSpinner from '$lib/LoadingSpinner.svelte';
    import { DragonBallAPI, handleApiError } from '$lib/api.js';
    
    /**
     * Svelte 5 Runes Usage - State Management
     * 
     * The $state() rune replaces the traditional let declarations for reactive variables.
     * Key advantages of runes over traditional reactivity:
     * 
     * 1. Explicit reactivity - Clear distinction between reactive and non-reactive variables
     * 2. Better performance - More efficient dependency tracking and updates
     * 3. Simpler mental model - No magic, just explicit state declarations
     * 4. Better TypeScript integration - Improved type inference and safety
     * 
     * Each $state() creates a reactive signal that automatically updates the UI
     * when its value changes, triggering re-renders of dependent components.
     */
    let characters = $state([]);           // Reactive array for character list
    let loading = $state(false);           // Loading state for UI feedback
    let error = $state('');               // Error state for user messaging
    let currentPage = $state(1);          // Pagination state tracking
    let totalPages = $state(1);           // Total pages from API response
    let hasMore = $state(true);           // Infinite scroll control flag
    
    /**
     * Asynchronous Data Fetching Function
     * 
     * Implements pagination logic with loading states and error handling.
     * The 'reset' parameter allows for both initial loading and "load more" functionality.
     * 
     * State Management Pattern:
     * 1. Set loading state to provide user feedback
     * 2. Clear previous errors for fresh attempts
     * 3. Execute API call with proper error boundaries
     * 4. Update reactive state based on response
     * 5. Reset loading state regardless of outcome (finally block)
     */
    async function loadCharacters(page = 1, reset = false) {
        loading = true;    // Trigger loading spinner in UI
        error = '';        // Clear any previous error messages
        
        try {
            // API call through service layer - abstracts HTTP complexity
            const data = await DragonBallAPI.getAllCharacters(page, 12);
            
            // State update logic - handles both initial load and pagination
            if (reset) {
                characters = data.items || data;  // Replace entire array for new searches
            } else {
                characters = [...characters, ...(data.items || data)];  // Append for pagination
            }
            
            // Pagination metadata management
            totalPages = data.meta?.totalPages || 1;
            hasMore = page < totalPages;
            currentPage = page;
        } catch (err) {
            // Centralized error handling with user-friendly messages
            error = handleApiError(err);
        } finally {
            // Ensure loading state is always reset, preventing stuck spinners
            loading = false;
        }
    }
    
    /**
     * Search Function - Demonstrates Component Communication
     * 
     * This function is passed as a prop to SearchForm component, implementing
     * the "callback pattern" for parent-child communication in Svelte.
     * The search resets pagination state since we're changing the dataset.
     */
    async function searchCharacters(name, race) {
        loading = true;
        error = '';
        
        try {
            const data = await DragonBallAPI.searchCharacters(name, race, 1, 50);
            characters = data.items || data;
            hasMore = false; // Disable pagination for search results
        } catch (err) {
            error = handleApiError(err);
        } finally {
            loading = false;
        }
    }
    
    /**
     * Infinite Scroll Implementation
     * 
     * Provides "Load More" functionality by incrementing the page counter
     * and appending results to the existing array. Guards against concurrent
     * requests and respects pagination limits.
     */
    function loadMore() {
        if (!loading && hasMore) {
            loadCharacters(currentPage + 1, false);
        }
    }
    
    /**
     * Component Lifecycle - onMount Hook
     * 
     * onMount ensures the initial data load happens after component
     * is mounted to the DOM. This is crucial for SSR compatibility
     * and prevents hydration mismatches.
     */
    onMount(() => {
        loadCharacters(1, true);  // Initial load with reset=true
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-6">
            <h1 class="text-4xl font-bold text-center mb-2">
                 Dragon Ball Universe
            </h1>
            <p class="text-center text-orange-100">
                Explore the legendary characters from the Dragon Ball series
            </p>
        </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
        <!-- 
            Component Props Pattern:
            Passing functions as props enables child components to trigger
            parent state changes, maintaining unidirectional data flow
        -->
        <SearchForm onSearch={searchCharacters} />
        
        <!-- Conditional Rendering with Error Boundaries -->
        {#if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
                <strong>Error:</strong> {error}
                <button 
                    onclick={() => loadCharacters(1, true)}
                    class="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                    Retry
                </button>
            </div>
        {/if}
        
        <!-- Loading State Component -->
        <LoadingSpinner {loading} />
        
        <!-- Data Visualization with Reactive Updates -->
        {#if characters.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {#each characters as character (character.id)}
                    <CharacterCard {character} />
                {/each}
            </div>
            
            <!-- Pagination Control -->
            {#if hasMore && !loading}
                <div class="text-center">
                    <button
                        onclick={loadMore}
                        class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        Load More Characters
                    </button>
                </div>
            {/if}
        {:else if !loading && !error}
            <div class="text-center py-12">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-semibold text-gray-700 mb-2">No characters found</h3>
                <p class="text-gray-500">Try adjusting your search criteria</p>
            </div>
        {/if}
    </main>
    
    <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="container mx-auto px-4 text-center">
            <p class="text-gray-400">
                Dragon Ball characters data provided by 
                <a href="https://dragonball-api.com/" target="_blank" class="text-orange-400 hover:text-orange-300">
                    Dragon Ball API
                </a>
            </p>
            <p class="text-gray-500 text-sm mt-2">
                Built with SvelteKit & Tailwind CSS
            </p>
        </div>
    </footer>
</div>