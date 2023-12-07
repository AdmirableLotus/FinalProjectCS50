# FinalProjectCS50
Conceptual Design:
1. Homepage:
Warm and welcoming homepage with a hero section containing a touching message.
"Log In" and "Register" buttons prominently displayed.
2. Authentication:
Secure user authentication system for logging in and registering.
Password recovery/reset functionality.
3. User Dashboard:
Once logged in, users are directed to a personalized dashboard.
Dashboard includes sections for "My Journals," "Shared Journals," and "Upcoming Deliveries."
4. Create a Journal:
Users can create different journals, each dedicated to a specific theme (memories, recipes, etc.).
Journal creation form includes title, description, and optional cover photo.
5. Journal Entries:
Users can add entries to their journals with text, images, and possibly videos.
Entry editor allows for rich formatting and media embedding.
6. Sharing & Recipients:
Users can choose to keep journals private or share them with specific recipients.
For each journal, users can specify recipients, set delivery dates, and leave messages for them.
7. Delivery System:
A scheduling system that automatically sends journals to recipients on specified dates (e.g., birthdays, special occasions).
Users can receive reminders about upcoming deliveries.
8. Notifications:
Users receive email and text notifications when a journal is sent.
Notifications include a link to access the shared journal.
9. Profile & Settings:
Users can manage their profiles, update personal information, and configure notification preferences.
10. Security & Privacy:
diff
Copy code
- Use encryption to ensure the privacy and security of journal entries.
- Implement secure authentication practices.
11. Responsive Design:
csharp
Copy code
- Ensure the website is responsive, providing a seamless experience across devices.
Visual Design:
Color Scheme:

Soft and calming colors, such as pastels or muted tones, to evoke emotions and comfort.
Typography:

Use a combination of serif and sans-serif fonts for a balanced and readable look.
Imagery:

Utilize family-friendly and warm imagery, possibly incorporating nature or personal photographs.
UI Elements:

Clean and intuitive interface with clear calls to action (CTAs).
Animations:

Subtle animations for a more engaging and comforting user experience.
Technical Stack:
Frontend:

HTML, CSS, JavaScript
React or Vue.js for a dynamic user interface
Backend:

Node.js or Django for server-side logic
Express or Django REST framework for API development
Database:

MongoDB or PostgreSQL for storing user data and journals
Authentication:

JWT (JSON Web Tokens) or OAuth for secure user authentication
Delivery System:

Task scheduler (e.g., Celery for Python/Django) for handling automatic deliveries
Notifications:

Use email APIs (SendGrid, Mailgun) and SMS APIs for notifications
Deployment:

Cloud platforms like AWS, Heroku, or DigitalOcean
