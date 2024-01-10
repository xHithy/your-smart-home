import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

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
