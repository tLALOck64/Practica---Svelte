<script>
    let { loading } = $props();
</script>

{#if loading}
    <div class="flex flex-col items-center justify-center py-12">
        <div class="relative">
            <!-- Dragon Ball spinning animation -->
            <div class="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full animate-spin relative">
                <div class="absolute inset-2 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full">
                    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div class="w-2 h-2 bg-red-600 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
        
        <p class="mt-4 text-gray-600 font-medium animate-pulse">
            Loading Dragon Ball characters...
        </p>
        
        <div class="flex space-x-1 mt-2">
            <div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
            <div class="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
        </div>
    </div>
{/if}
