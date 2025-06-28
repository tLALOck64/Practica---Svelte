<script>
    let count = $state(0);

    function increment(){
        return count++
    }

    function decrement(){
        return count--
    }

</script>
<h1 class="text-2xl font-bold text-center text-red-600 uppercase"> hola mundo, mi nombre eduardo </h1>
<div>
    <button class=" bg-blue-500 rounded-sm shadow-2xl h-8 text-white p-2 hover:cursor-pointer hover:bg-blue-700" onclick={increment}>Incrementar</button>
    <button class="bg-red-500 rounded-sm shadow-2xl h-8 text-white p-2 hover:cursor-pointer transition-colors hover:bg-red-800 hover:bg-shadow-2xl" onclick={decrement}>Decrementar</button>
</div>
<p>Count: {count}</p>