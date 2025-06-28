<script>
    /**
     * Props Rune Usage - Component Interface Definition
     * 
     * The $props() rune in Svelte 5 provides a clean and type-safe way to define
     * component interfaces. Key benefits over traditional prop declarations:
     * 
     * 1. Destructuring Support - Clean syntax for extracting specific props
     * 2. Better TypeScript Integration - Improved type inference and checking
     * 3. Runtime Validation - Automatic prop validation in development
     * 4. Default Values - Built-in support for default prop values
     * 5. Explicit Interface - Clear component API definition
     * 
     * The destructured 'character' becomes a reactive reference that automatically
     * updates the component when the parent passes new data.
     */
    let { character } = $props();
</script>

<!--
    Component Template with Reactive Data Binding
    
    This template demonstrates several Svelte concepts:
    - Reactive interpolation: {character.name} automatically updates
    - Conditional rendering: {#if character.affiliation}
    - Attribute binding: alt={character.name}
    - Event handling: href="/character/{character.id}"
    - CSS class binding: Dynamic classes based on state
-->
<a href="/character/{character.id}" class="block">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer animate-slide-up">
        <div class="relative">
            <img 
                src={character.image || '/placeholder-character.svg'} 
                alt={character.name}
                class="w-full h-64 object-cover"
                loading="lazy"
            />
            <div class="absolute top-2 right-2">
                <span class="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {character.race}
                </span>
            </div>
        </div>
        
        <div class="p-4">
            <h3 class="text-xl font-bold text-gray-800 mb-2 hover:text-orange-600 transition-colors">{character.name}</h3>
            
            <div class="space-y-2">
                <div class="flex justify-between items-center">
                    <span class="text-gray-600 font-medium">Ki:</span>
                    <span class="text-blue-600 font-bold">{character.ki || 'Unknown'}</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-gray-600 font-medium">Max Ki:</span>
                    <span class="text-purple-600 font-bold">{character.maxKi || 'Unknown'}</span>
                </div>
                
                <div class="flex justify-between items-center">
                    <span class="text-gray-600 font-medium">Gender:</span>
                    <span class="text-gray-800">{character.gender}</span>
                </div>
                
                <!-- Conditional Rendering Example -->
                {#if character.affiliation}
                    <div class="mt-3">
                        <span class="text-gray-600 font-medium">Affiliation:</span>
                        <span class="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mt-1">
                            {character.affiliation}
                        </span>
                    </div>
                {/if}
            </div>
            
            {#if character.description}
                <p class="text-gray-600 text-sm mt-3 line-clamp-3">{character.description}</p>
            {/if}
            
            <div class="mt-4 text-center">
                <span class="text-orange-600 font-medium text-sm">Click to view details →</span>
            </div>
        </div>
    </div>
</a>
