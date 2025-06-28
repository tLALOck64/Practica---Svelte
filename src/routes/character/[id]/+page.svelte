<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { DragonBallAPI, handleApiError } from '$lib/api.js';
    import LoadingSpinner from '$lib/LoadingSpinner.svelte';
    
    let character = $state(null);
    let loading = $state(true);
    let error = $state('');
    
    async function loadCharacter(id) {
        loading = true;
        error = '';
        
        try {
            character = await DragonBallAPI.getCharacterById(id);
        } catch (err) {
            error = handleApiError(err);
        } finally {
            loading = false;
        }
    }
    
    onMount(() => {
        const id = $page.params.id;
        if (id) {
            loadCharacter(id);
        }
    });
</script>

<div class="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
    <!-- Header -->
    <header class="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg">
        <div class="container mx-auto px-4 py-6">
            <div class="flex items-center justify-between">
                <a href="/" class="text-orange-100 hover:text-white transition-colors">
                    ← Back to Characters
                </a>
                <h1 class="text-3xl font-bold">Character Details</h1>
                <div></div>
            </div>
        </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
        {#if loading}
            <LoadingSpinner {loading} />
        {:else if error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <strong>Error:</strong> {error}
                <a href="/" class="ml-4 text-red-600 underline">Go back to characters</a>
            </div>
        {:else if character}
            <div class="bg-white rounded-lg shadow-xl overflow-hidden max-w-4xl mx-auto">
                <div class="md:flex">
                    <!-- Image Section -->
                    <div class="md:w-1/2">
                        <img 
                            src={character.image || '/placeholder-character.svg'} 
                            alt={character.name}
                            class="w-full h-96 md:h-full object-cover"
                        />
                    </div>
                    
                    <!-- Details Section -->
                    <div class="md:w-1/2 p-8">
                        <h1 class="text-4xl font-bold text-gray-800 mb-4">{character.name}</h1>
                        
                        <div class="space-y-4">
                            <div class="flex items-center">
                                <span class="font-semibold text-gray-700 w-24">Race:</span>
                                <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">
                                    {character.race}
                                </span>
                            </div>
                            
                            <div class="flex items-center">
                                <span class="font-semibold text-gray-700 w-24">Gender:</span>
                                <span class="text-gray-800">{character.gender}</span>
                            </div>
                            
                            <div class="flex items-center">
                                <span class="font-semibold text-gray-700 w-24">Ki:</span>
                                <span class="text-blue-600 font-bold">{character.ki || 'Unknown'}</span>
                            </div>
                            
                            <div class="flex items-center">
                                <span class="font-semibold text-gray-700 w-24">Max Ki:</span>
                                <span class="text-purple-600 font-bold">{character.maxKi || 'Unknown'}</span>
                            </div>
                            
                            {#if character.affiliation}
                                <div class="flex items-center">
                                    <span class="font-semibold text-gray-700 w-24">Affiliation:</span>
                                    <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                                        {character.affiliation}
                                    </span>
                                </div>
                            {/if}
                        </div>
                        
                        {#if character.description}
                            <div class="mt-6">
                                <h3 class="font-semibold text-gray-700 mb-2">Description:</h3>
                                <p class="text-gray-600 leading-relaxed">{character.description}</p>
                            </div>
                        {/if}
                        
                        <div class="mt-8">
                            <a 
                                href="/"
                                class="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block"
                            >
                                Back to Characters
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
    </main>
</div>
