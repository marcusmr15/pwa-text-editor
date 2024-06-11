// Get the installation button element by its ID
const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt event triggered');
    console.log("Event:", event);

    // Prevent the default mini-infobar from appearing on mobile
    event.preventDefault();

    // Store the triggered event for later use
    window.deferredPrompt = event;

    // Remove the hidden class from the install button to make it visible
    butInstall.classList.toggle('hidden', false);
});

// Listen for the button click event to trigger the installation prompt
butInstall.addEventListener('click', async () => {
    // Get the deferred prompt event
    const promptEvent = window.deferredPrompt;

    // If there's no deferred prompt, exit the function
    if (!promptEvent) {
        return;
    }

    // Show the installation prompt
    promptEvent.prompt();

    // Reset the deferred prompt variable since it can only be used once
    window.deferredPrompt = null;

    // Hide the install button again
    butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event to know when the app is installed
window.addEventListener('appinstalled', (event) => {
    console.log('App installed successfully');

    // Clear the deferred prompt variable
    window.deferredPrompt = null;
});
