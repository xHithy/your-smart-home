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
   wsHost: 'api.kantanudarznieciba.lv',
   wsPort: 6001,
   wssPort: 6001,
   forceTLS: true,
   enabledTransports: ['ws', 'wss'],
   disableStats: true,
});

window.Client = pusher;

window.Echo = new Echo({
   broadcaster: 'pusher',
   client: pusher,
});
