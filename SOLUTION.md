# Solution

## How to Run

### API
1. Navigate to the API project: `cd BikeShop.API`
2. Run the application: `dotnet run`

The API will start on `http://localhost:5111`. The database is created and seeded automatically on first run.

### Frontend
1. Navigate to the UI project: `cd BikeShop.UI`
2. Install dependencies: `npm install`
3. Start the development server: `ng serve`

The application will be available at `http://localhost:4200`.

### Tests
- Backend: `cd BikeShop.Tests && dotnet test`
- Frontend: `cd BikeShop.UI && ng test`

## Task 1 – API Implementation
### Architecture
I structured the backend using a layered, Domain-Driven Design approach across three projects:

- **BikeShop.Domain** – Contains the `Bike` entity and `IBikeRepository` interface, with no dependencies on infrastructure or framework concerns.
- **BikeShop.Infrastructure** – Implements `BikeRepository` using Entity Framework Core with SQLite. Migrations and `BikeShopContext` live here.
- **BikeShop.API** – ASP.NET Core Web API exposing REST endpoints via `BikesController`. I used DTOs to decouple the API contract from the domain model.

### Database
I chose SQLite for simplicity. EF Core migrations handle schema creation, and I seed the database on startup from the existing JSON data so the application works immediately on first run.

### Assumptions
- I used GUIDs as public-facing identifiers rather than integer IDs to avoid exposing internal database sequencing.

---

## Task 2 – Bug Fix

The duplicate favourites bug was caused by `addBikeToFavourites` not checking whether the bike reference already existed in localStorage before appending it. I fixed this by reading the existing array first and only adding the reference if it is not already present.

---

## Task 3 – New Features

### Details Page
I built a details page that displays full bike information when a bike card is clicked. It reads the `reference` from the route parameter, fetches the bike from the API, and checks localStorage to reflect whether it is already in favourites. A fallback placeholder image is shown if the bike image fails to load.

### Create Page
I implemented a reactive form with client-side validation mirroring the backend validation rules (required fields, max lengths, decimal precision, URL format). On success the user is navigated directly to the new bike's details page.

### Design Decisions
- I kept validation rules (max lengths, regex patterns) consistent between the Angular form validators and the .NET `DataAnnotations` on `CreateBikeDto`.
- I restricted image URLs to either a valid `http/https` URL or a local `/assets/images/` path to support both external images and the bundled assets.

### Image Handling
I submitted image URLs as a text field rather than implementing a file uploader, as a deliberate trade-off given the time constraints. In a production system I would have images uploaded to the backend, stored in blob storage, and the URL persisted in the database — keeping all bike data self-contained within the system.

---

## Improvements With More Time
- **Authorisation** – I would add user accounts so favourites can be stored against a user in the database rather than localStorage, persisting across devices and sessions. The `POST /api/bikes` endpoint would also be restricted to authorised users only.
- **Edit/Delete bikes** – I would implement full CRUD controls,  `PUT /api/bikes/{reference}` and `DELETE /api/bikes/{reference}` endpoints with corresponding frontend pages for authorised users.
- **Caching** - I would add response caching on `GET /api/bikes` to reduce database load under concurrent traffic (e.g. Redis).
- **Pagination** – Currently `GET /api/bikes` returns all bikes. For large catalogues I would add pagination.
- **Filtering/Sorting** – I would add query params to filter on models, categories etc, and sort by price or weight.
- **Checkout/Basket** – With user accounts in place, I would add a basket feature so users can add bikes and proceed to checkout, making the app a fully functional e-commerce platform.
- **Production database** – I used SQLite for development simplicity, but for a deployed application I would switch to a more robust database like PostgreSQL or SQL Server.
- **Global error handling** – I would add an Angular `HttpInterceptor` and a .NET exception middleware to centralise error handling rather than handling it per-component.
- **Cancellation tokens** – I would pass `CancellationToken` through the controller actions and repository methods so in-flight database queries are cancelled if the client disconnects, reducing wasted resource usage under load.
- **Rate Limiting** - I would add rate limiting to the API to protect against abuse.
- **Increased test coverage** – I would expand unit tests to cover all methods and edge cases, and add integration tests for the API endpoints.
- **CI pipeline** – I would add a GitHub Actions workflow to run `dotnet test` and `ng test` on every push.