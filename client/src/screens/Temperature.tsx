import { useEffect } from 'react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}

window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 12345,
    cluster: 'mt1',
    wsHost: 'localhost',
    wsPort: 6001,
    forceTLS: false,
    enabledTransports: ['ws'],
});

const Temperature = () => {
    useEffect(() => {
        window.Echo.channel('temperature-channel').listen('LogTemperatureEvent', (event: { temperature: any }) => {
            console.log(event);
        });

        return () => {
            window.Echo.leaveChannel('temperature-channel');
        };
    }, []);

    return (
        <div>
            {/* Your component JSX */}
        </div>
    );
};

export default Temperature;
