# Your Smart Home

## Local development setup
This is a quick step-by-step guide on how to run the project locally.
### Setup the API
1. Navigate to `cd api`
2. Make `.env` file according to `.env.example`
3. Install vendors `composer install`
4. Sail the app `./vendor/bin/sail up`
5. Run migrations `./vendor/bin/sail artisan migrate`
6. Run database seeders `./vendor/bin/sail artisan db:seed`
7. Run the websockets server `./vendor/bin/sail artisan websockets:serve`

### Setup the client
1. Navigate to `cd client`
2. Install dependencies `npm install`
3. Serve ReactJS `npm start`

### Setup Arduino boards
1. Find your devices IPv4 and copy it
2. Paste it in Arduino board config
3. Upload the code to Arduino