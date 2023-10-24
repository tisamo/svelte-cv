<script>
    import {superForm, superValidate} from 'sveltekit-superforms/client';
    import {emailSchema} from "./email-schema.ts";
    import {onMount} from "svelte";
    import {env} from "$env/dynamic/public";


    $form;

    onMount(async () => {
        await superValidateForm();
    })
    // Client API:
    const {form, errors, enhance} = superForm($form, {
        validators: emailSchema
    });

    async function superValidateForm() {
        await superValidate(emailSchema);
    }

    async function sendEmail() {
        //Looks like superform validation only works with pages so i have to find a workaround
        // const formData = await superValidate(emailSchema);
        const errorValues = Object.values($errors);
        // If there is no validation error the value should be undefined
        if (!errorValues.length) {
            return;
        }
        const err = errorValues.filter((e) => e !== undefined);
        if (!err.length) {
            const contactFormData = {...$form};
            contactFormData['replyTo'] = 'kristof.krasznai95@gmail.com';
            contactFormData['accessKey'] = 'c8a0ea6f-b3f7-49b1-8249-f90d5bf499a0';
            const rawResponse = await fetch('https://api.staticforms.xyz/submit', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(contactFormData)
            });
            if (rawResponse.status === 200) {
                alert('email sent');
            }
        }
    }


</script>

<div>
    <div class="text">You can email me using this form!</div>
    <form id="myForm" method="post" use:enhance>
        <label for="name">Name</label>
        <input type="text" name="name" id="name" bind:value={$form.name}>
        {#if $errors.name}
            <small>Field is required!</small>
        {/if}
        <label type="text" for="email">Email</label>
        <input type="text" name="email" id="email" bind:value={$form.email}>
        {#if $errors.email}
            <small>Incorrect email</small>
        {/if}
        <label type="text" for="subject">Subject</label>
        <input type="text" name="subject" id="subject" bind:value={$form.subject}> <!-- Optional -->
        {#if $errors.subject}
            <small>Field is required!</small>
        {/if}
        <label for="message">Message</label>
        <textarea id="message" cols="10" name="message" bind:value={$form.message}></textarea> <!-- Optional -->
        {#if $errors.message}
            <small>Field is required!!</small>
        {/if}
        <button on:click={sendEmail}>Send</button>
    </form>
</div>

<style>
    .text {
        font-weight: 600;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    label {
        font-weight: 600;
        font-size: 20px;
        color: var(--red);
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    input {
        margin-bottom: 10px;
        height: 25px;
        padding-left: 5px;
        border: 1px solid black;
    }

    textarea {
        padding: 5px;
        min-height: 140px;
        border: 1px solid black;
    }

    button {
        text-align: left;
        color: var(--red);
        font-size: 25px;
        background-color: unset;
        width: min-content;
        margin-top: 20px;
        font-weight: 600;
        border: unset;
        cursor: pointer;
    }

    small {
        color: red;
        font-size: 12px;
        font-weight: 600;
    }
</style>
