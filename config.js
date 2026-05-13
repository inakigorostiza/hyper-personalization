// Load .env file and inject PostHog API key
(function() {
    fetch('.env')
        .then(response => response.text())
        .then(data => {
            // Parse .env file
            const lines = data.split('\n');
            const env = {};
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed && !trimmed.startsWith('#')) {
                    const [key, value] = trimmed.split('=');
                    if (key && value) {
                        env[key.trim()] = value.trim();
                    }
                }
            });

            // Store API key in window for PostHog to use
            window.POSTHOG_API_KEY = env.POSTHOG_API_KEY || 'ph_YOUR_API_KEY_HERE';
        })
        .catch(error => {
            console.warn('Could not load .env file, using placeholder API key');
            window.POSTHOG_API_KEY = 'ph_YOUR_API_KEY_HERE';
        });
})();
