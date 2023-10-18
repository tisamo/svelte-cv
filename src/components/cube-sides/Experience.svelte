<script>
    export let workplaces;
</script>

<div class="container">
    {#each workplaces as w}
    <div>
    <div class="workplace">
        {w.title}
    </div>
        {#if w?.link}
            <a href={w.link} target="_blank">
                {w.link}
            </a>
        {/if}
        {#if w?.date}
    <div class="date">
        {w.date}
    </div>
        {/if}
        {#if w?.description}
    <div class="text">
        {#each w.description as d}
            {d}
            {/each}
    </div>
        {/if}
    </div>
    {/each}

</div>


<style>
   .container{
       display: flex;
       flex-direction: column;
       text-transform: uppercase;
       font-weight: 600;
       row-gap: 30px;
       padding-top:20px;
   }

   .workplace{
       color: var(--red);
       font-size: 20px;
       margin-bottom: 5px;
   }

   .date{
       color: var(--blue);
       font-size:16px;
       margin-bottom:10px;
   }

   .text{
       font-size: 12px;
       line-height: 24px;
   }
   a{
       font-size:12px;
   }

</style>