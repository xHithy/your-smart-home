import Pusher from 'pusher-js';
import Echo from 'laravel-echo';

declare global {
   interface Window {
      Echo: Echo;
      Pusher: typeof Pusher;
      Client: any;
   }
}

window.Pusher = Pusher;

const pusher = new Pusher('12345', {
   cluster: 'mt1',
   wsHost: 'localhost',
   wsPort: 6001,
   forceTLS: false,
   enabledTransports: ['ws'],
});

window.Client = pusher;

window.Echo = new Echo({
   broadcaster: 'pusher',
   client: pusher,
});
