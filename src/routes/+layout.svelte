<script>
    import './styles.scss';
</script>
<div class="too-small">
    This design made for desktop only.
</div>
<div class="app">
    <main>
        <slot/>
    </main>
</div>

<style>
    .app {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }

    main {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 1rem;
        width: 100%;
        max-width: 64rem;
        margin: 0 auto;
        box-sizing: border-box;
    }

    .too-small {
        display: none;
    }

    @media (min-width: 480px) {
        footer {
            padding: 12px 0;
        }
    }

    @media (max-width: 950px) {
        .app {
            display: none;
        }

        .too-small {
            display: block;
            margin-top: 100px;
            color: var(--red);
            font-weight: 800;
            text-align: center;
            text-transform: uppercase;
        }
    }
</style>
