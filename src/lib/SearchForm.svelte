<script>
    /**
     * Callback Prop Pattern - Parent-Child Communication
     * 
     * The 'onSearch' prop is a function passed from the parent component,
     * implementing the callback pattern for upward communication.
     * This maintains unidirectional data flow while allowing child components
     * to trigger actions in their parents.
     */
    let { onSearch } = $props();
    
    /**
     * Local State Management with Runes
     * 
     * These state variables are local to this component and manage
     * the form's internal state. They're reactive and will trigger
     * UI updates when modified.
     */
    let searchTerm = $state('');      // User input for character name
    let selectedRace = $state('');    // Selected race filter
    
    // Static data for race dropdown - could be moved to a constants file
    const races = [
        'All',
        'Saiyan',
        'Namekian', 
        'Human',
        'Frieza Race',
        'Android',
        'Majin',
        'God',
        'Angel'
    ];
    
    /**
     * Event Handler - Search Execution
     * 
     * Processes form data and triggers the parent callback with clean parameters.
     * Implements the transformation logic for "All" selection.
     */
    function handleSearch() {
        onSearch(searchTerm, selectedRace === 'All' ? '' : selectedRace);
    }
    
    /**
     * Keyboard Event Handler - Enhanced UX
     * 
     * Allows users to submit search by pressing Enter key,
     * improving form accessibility and user experience.
     */
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }
</script>

<!-- 
    Form Template with Two-Way Data Binding
    
    Demonstrates Svelte's bind:value directive for two-way data binding
    between form inputs and component state variables.
-->
<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-4 text-center">Search Dragon Ball Characters</h2>
    
    <div class="flex flex-col md:flex-row gap-4 items-end">
        <div class="flex-1">
            <label for="search" class="block text-sm font-medium text-gray-700 mb-2">
                Character Name
            </label>
            <input
                id="search"
                type="text"
                bind:value={searchTerm}
                onkeypress={handleKeyPress}
                placeholder="Search for characters..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
            />
        </div>
        
        <div class="md:w-48">
            <label for="race" class="block text-sm font-medium text-gray-700 mb-2">
                Race
            </label>
            <select
                id="race"
                bind:value={selectedRace}
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all duration-200"
            >
                {#each races as race}
                    <option value={race}>{race}</option>
                {/each}
            </select>
        </div>
        
        <button
            onclick={handleSearch}
            class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 active:scale-95"
        >
            Search
        </button>
    </div>
</div>
